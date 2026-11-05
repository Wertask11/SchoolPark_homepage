'use strict';
/* Camellia 紹介ページ（2026年11月 全面改修）。
   本番の Camellia（2026-11-05 に確認）の状態と食い違うことを書いていないか、文言・リンク・辞書・構造化データを確かめる。 */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const html = read('Camellia.html');
function dict(...files) {
  const out = {};
  for (const f of files) vm.runInNewContext(read(f), { registerChesI18n: (d) => { for (const [l, v] of Object.entries(d)) out[l] = { ...out[l], ...v }; } });
  return out;
}
const d = dict('i18n-camellia.js', 'i18n-camellia-v2.js');
const visible = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');

test('新しいブランドメッセージが最初に伝わる（見出し・サブコピー・ブランド文）', () => {
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1].replace(/<br>/g, '');
  assert.equal(h1, '「知る」だけで終わらない。');
  assert.ok(html.indexOf('今日は、自分のために何する？') < html.indexOf('Camelliaは、あなたの選択と行動を応援します。'));
  for (const s of ['自分を知る。', '気持ちを言葉にする。', '今日の選択肢を見つける。', '自分で選ぶ。', '実際に行動する。', 'その経験を積み重ねる。'])
    assert.ok(visible.includes(s), s);
  assert.match(visible, />知る<[\s\S]*?>選ぶ<[\s\S]*?>行動する</);
});

test('体験のCTAは本番のCamelliaへ、PlaceのCTAは本番のPlaceへ', () => {
  assert.match(html, /<a class="btn btn-main" data-i18n="cam.v2.h.cta" href="https:\/\/camellia-beta.vercel.app\/"/);
  assert.ok(visible.includes('まずは今日のCheckから。登録前に体験できます。'));
  assert.match(html, /href="https:\/\/camellia-beta.vercel.app\/\?open=place"[^>]*>Placeを見てみる</);
  assert.ok(fs.existsSync(path.join(root, 'camellia-place.html')), '店舗さま向けページが無い');
});

test('体験の循環：Today→Camellia→Discover→Place→My→翌日のToday の順。Circleは残っている', () => {
  const names = [...html.matchAll(/<p class="loop-name">([^<]+)<\/p>/g)].map((m) => m[1]);
  assert.deepEqual(names, ['Today', 'Camellia', 'Discover', 'Place', 'My']);
  assert.ok(html.indexOf('<li class="loop-next"') > html.indexOf('<p class="loop-name">My<'));
  assert.match(visible, /同じテーマや関心を持つ人と、つながる。/);
});

test('Placeは専用の大きなセクション。デモであることと、実在店舗の掲載・予約が未開始であることを書く', () => {
  const place = html.slice(html.indexOf('<section class="place"'), html.indexOf('<!-- ⑤'));
  assert.ok(place.length > 3000, 'Placeの欄が小さい');
  for (const s of ['今日の自分に合う、', '「今日は静かに過ごしたい」', 'カフェ・本屋', 'ヨガ・ピラティス', 'ワークショップ', '美容室・リラクゼーション'])
    assert.ok(place.includes(s), s);
  assert.match(place, /掲載イメージのデモ/);
  assert.match(place, /実在店舗の掲載・予約はまだ始まっていません/);
  assert.match(place, /実在の店舗・施設ではありません/);
  assert.doesNotMatch(visible, /提携店舗|提携済み|予約できます(?!か)/);
});

test('パートナー共有はプレビュー・準備中。送れる・自動で共有される、とは書かない', () => {
  const share = html.slice(html.indexOf('<!-- ⑤'), html.indexOf('<!-- ⑥'));
  assert.match(share, /プレビュー・準備中/);
  assert.match(share, /実際に送ることはまだできません/);
  assert.match(share, /自動で共有されることはありません/);
  assert.doesNotMatch(share, /<button|共有する<\/a>|送信する/);
});

test('料金：Free 0円とPlus 月額500円（提供準備中）。Plusに申し込み・購入のボタンを置かない', () => {
  const plans = html.slice(html.indexOf('<!-- ⑥'), html.indexOf('<!-- ⑦'));
  const plus = plans.slice(plans.indexOf('class="plan plus"'));
  assert.match(plans, /0円/);
  assert.match(plus, /月額500円/);
  assert.match(plus, /提供準備中/);
  assert.doesNotMatch(plus, /<a |<button|加入する|今すぐ購入|申し込む/);
  for (const s of ['Today / Check', '今日のあなた', '今日の一枚', 'Camellia（基本の会話）', 'Discover', 'Circle', 'My', 'Placeの基本体験'])
    assert.ok(plans.includes(s), s);
});

test('Camellia ID は無料・LINE/Google。すべてログインなしで使える、とは書かない', () => {
  const id = html.slice(html.indexOf('<!-- ⑦'), html.indexOf('<!-- ⑧'));
  assert.match(id, /まず体験。<br>残したくなったら、Camellia ID。/);
  assert.match(id, /無料。LINE・Google/);
  assert.match(id, /ログインが必要な機能もあります/);
  assert.doesNotMatch(visible, /すべての機能.*ログインなし|登録なしで全/);
});

test('医療・診断・治療を提供しない、と書いてある', () => {
  assert.match(visible, /診断や治療は行いません/);
});

test('画面に出す辞書のキーは、4つの言語すべてにある', () => {
  const keys = [...new Set([...html.matchAll(/data-i18n(?:-html)?="([^"]+)"/g)].map((m) => m[1]))];
  assert.ok(keys.length > 80);
  for (const lang of ['ja', 'en', 'zh', 'ko']) for (const k of keys) assert.ok(d[lang] && d[lang][k], lang + ' に ' + k + ' が無い');
  for (const lang of ['en', 'zh', 'ko']) assert.doesNotMatch(d[lang]['cam.v2.plus.note'], /購入|purchase now|buy now/i);
});

test('構造化データ：FAQは画面と同じ文。提供中なのはFreeだけ（Plusを販売中として載せない）', () => {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  const faq = blocks[0];
  assert.equal(faq['@type'], 'FAQPage');
  const pairs = [['cam.lp.029', 'cam.lp.031'], ['cam.v2.faq.place.q', 'cam.v2.faq.place.a'], ['cam.v2.faq.plus.q', 'cam.v2.faq.plus.a'], ['cam.v2.faq.share.q', 'cam.v2.faq.share.a'], ['cam.lp.034', 'cam.lp.035']];
  pairs.forEach(([q, a], i) => {
    assert.equal(faq.mainEntity[i].name, d.ja[q]);
    assert.equal(faq.mainEntity[i].acceptedAnswer.text, d.ja[a]);
  });
  const app = blocks[1]['@graph'].find((x) => x['@type'] === 'WebApplication');
  assert.equal(app.name, 'Camellia');
  assert.equal(app.url, 'https://camellia-beta.vercel.app/');
  assert.equal(app.provider.name, '合同会社型DAO SchoolPark');
  assert.deepEqual([app.audience.suggestedMinAge, app.audience.suggestedMaxAge, app.audience.suggestedGender], [18, 45, 'female']);
  assert.equal(app.offers.price, '0');
  assert.doesNotMatch(JSON.stringify(blocks[1]), /"price":\s*"?500|Camellia Plus/, 'Plusを販売中として載せている');
  for (const f of ['Today', 'Camellia', 'Discover', 'Place', 'My', 'Circle']) assert.ok(app.featureList.some((x) => x.startsWith(f)), f);
  assert.match(app.featureList.find((x) => x.startsWith('Place')), /デモ/);
});

test('ページで使う画像はすべてリポジトリにある', () => {
  for (const [, src] of html.matchAll(/<img[^>]+src="([^"]+)"/g)) assert.ok(fs.existsSync(path.join(root, src)), src);
});

test('トップのCamellia紹介も新しいメッセージ（4言語）。ほかのサービスの紹介文は変えない', () => {
  const src = read('i18n.js');
  const vals = [...src.matchAll(/"home\.014": "([^"]*)"/g)].map((m) => m[1]);
  assert.equal(vals.length, 8);
  for (const re of [/「知る」だけで終わらない/, /Not just knowing/, /不止于/, /아는 것/]) assert.equal(vals.filter((v) => re.test(v)).length, 2, String(re));
  assert.doesNotMatch(src, /"home\.014": "18〜45歳の女性に向けたウェルビーイングアプリ/);
  assert.match(read('index.html'), /data-i18n="home.014"[^>]*>「知る」だけで終わらない/);
  assert.match(src, /"home\.009": "Emuで人の経験から学び/);
});
