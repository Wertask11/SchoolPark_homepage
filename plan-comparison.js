/* Public policy only. No account, checkout, user identifiers or analytics. */
(function () {
  'use strict';
  const COPY = {
    ja: {free:'free（無料・見学）',month:'円 / 月（税込）',yen:'円',role:['読む・少し試す','参加する','蓄積・研究する','対話しながら進める'],detail:'利用枠を詳しく比較する',label:'Emuのプラン比較',rows:['公開知識の閲覧','公開投稿／月','保存した知識','下書き・自分用の経験知','研究ノート（保管中を含む）','質問募集／月','募集への回答／月','議論を立てる／月'],latest:'新着20件',all:'公開知識全体',unlimited:'件数制限なし※',unit:'件',note:'月間枠は日本時間の暦月。支払更新日は契約日基準です。上限を超える既存記録も削除しません。研究は保管中も数えます。※不正利用等の制限があります。',ai:'Knowledge LabのAI・意味検索は共通の無料枠で、実行保証はありません。有料プランのAI無制限特典ではありません。proの対話・保証は規定条件をご確認ください。',failure:'利用枠を取得できませんでした。契約前にアプリの最新条件をご確認ください。'},
    en: {free:'free / visitor',month:' JPY / month (tax incl.)',yen:' JPY',role:['Read and try','Participate','Collect and research','Progress through dialogue'],detail:'Compare usage limits',label:'Emu plan comparison',rows:['Public knowledge access','Public posts / month','Saved knowledge','Drafts and private experiences','Research notes (including archived)','Questions / month','Answers / month','New discussions / month'],latest:'Latest 20',all:'All public knowledge',unlimited:'No monthly count limit*',unit:'',note:'Monthly quotas follow the Japanese calendar month. Billing renews on your contract date. Existing records exceeding a limit are retained. Archived research counts towards the limit. *Abuse restrictions apply.',ai:'Knowledge Lab AI and semantic search share free quotas; availability is not guaranteed. Paid plans do not include unlimited AI. Pro dialogue and guarantees have specific terms.',failure:'Limits could not be loaded. Check the latest conditions in the app before subscribing.'},
    zh: {free:'free（免费参观）',month:'日元／月（含税）',yen:'日元',role:['阅读与少量体验','参与','积累与研究','通过对话推进'],detail:'详细比较使用额度',label:'Emu方案比较',rows:['公开知识阅读','公开投稿／月','保存的知识','草稿与私人经验','研究笔记（含归档）','知识征集／月','回答／月','发起讨论／月'],latest:'最新20条',all:'全部公开知识',unlimited:'无月度件数上限※',unit:'件',note:'月度额度按日本时间自然月计算，账单续订日仍按合同日期。超额的已有记录不会删除，归档研究也计入额度。※仍限制滥用行为。',ai:'Knowledge Lab的AI与语义搜索使用共通免费额度，不保证可执行。付费方案不含无限AI。pro对话及保障适用特定条件。',failure:'无法获取额度。订阅前请在应用内确认最新条件。'},
    ko: {free:'free（무료 견학）',month:'엔 / 월（세금 포함）',yen:'엔',role:['읽고 조금 체험','참여','축적·연구','대화하며 진행'],detail:'이용 한도 자세히 비교',label:'Emu 플랜 비교',rows:['공개 지식 열람','공개 게시 / 월','저장한 지식','초안·비공개 경험','연구 노트（보관 포함）','질문 모집 / 월','답변 / 월','토론 개설 / 월'],latest:'최신 20건',all:'전체 공개 지식',unlimited:'월간 건수 제한 없음※',unit:'건',note:'월 한도는 일본 시간 달력 월 기준이며 결제 갱신일은 계약일 기준입니다. 한도를 초과한 기존 기록도 삭제하지 않습니다. 보관한 연구도 합산합니다. ※부정 이용 제한이 있습니다.',ai:'Knowledge Lab AI·의미 검색은 공통 무료 한도이며 실행이 보장되지 않습니다. 유료 플랜도 AI 무제한이 아닙니다. pro 대화·보장은 규정 조건을 확인하세요.',failure:'한도를 가져오지 못했습니다. 계약 전에 앱에서 최신 조건을 확인해 주세요.'}
  };
  const KEYS = ['guest','light','plus','pro'];
  const esc = x => String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function render(data, language) {
    const requested = String(language||'ja').split('-')[0], lang = Object.hasOwn(COPY,requested)?requested:'ja', c = COPY[lang];
    if(!data || !Array.isArray(data.plans) || data.monthlyPeriod!=='Asia/Tokyo-calendar-month') throw Error('INVALID_CATALOG');
    const plans = KEYS.map(k=>data.plans.find(p=>p.key===k));
    for(const p of plans) {
      if(!p || !p.storage || !['latest-20','all-public'].includes(p.readerScope))throw Error('INVALID_CATALOG');
      for(const n of [p.amount,p.post,p.request,p.answer,p.discussion,p.storage.saved,p.storage.drafts,p.storage.notes])if(!Number.isSafeInteger(n)||n<0)throw Error('INVALID_CATALOG');
    }
    const num = n => n>=1000000?c.unlimited:n.toLocaleString(lang==='ja'?'ja-JP':lang)+c.unit;
    const name = p => p.key==='guest'?c.free:p.key;
    const getters=[p=>p.readerScope==='latest-20'?c.latest:c.all,p=>num(p.post),p=>num(p.storage.saved),p=>num(p.storage.drafts),p=>num(p.storage.notes),p=>num(p.request),p=>num(p.answer),p=>num(p.discussion)];
    return '<div class="hp-plan-cards">'+plans.map((p,i)=>'<article data-plan-card="'+p.key+'"><h3>'+esc(name(p))+'</h3><strong>'+p.amount.toLocaleString('ja-JP')+esc(p.amount?c.month:c.yen)+'</strong><p>'+esc(c.role[i])+'</p><p>'+esc(c.rows[1])+': '+esc(num(p.post))+'</p></article>').join('')+'</div>'+
      '<details><summary>'+esc(c.detail)+'</summary><div class="hp-plan-table" role="region" tabindex="0" aria-label="'+esc(c.label)+'"><table><caption>'+esc(c.label)+'</caption><thead><tr><th scope="col"></th>'+plans.map(p=>'<th scope="col">'+esc(name(p))+'</th>').join('')+'</tr></thead><tbody>'+getters.map((f,i)=>'<tr><th scope="row">'+esc(c.rows[i])+'</th>'+plans.map(p=>'<td>'+esc(f(p))+'</td>').join('')+'</tr>').join('')+'</tbody></table></div></details><p>'+esc(c.note)+'</p><p>'+esc(c.ai)+'</p>';
  }
  if(typeof module==='object'&&module.exports){module.exports={render,COPY};return;}
  const roots=document.querySelectorAll('[data-hp-plans]');if(!roots.length)return;
  let data=null;
  function draw(){for(const root of roots){if(data){root.innerHTML=render(data,document.documentElement.lang);root.dataset.loaded='true';}}}
  new MutationObserver(draw).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  fetch('/api/billing/features',{credentials:'omit'}).then(async r=>{if(!r.ok)throw Error('UNAVAILABLE');data=await r.json();draw();}).catch(()=>{data=null;const lang=document.documentElement.lang.split('-')[0];roots.forEach(root=>{root.textContent=(COPY[lang]||COPY.ja).failure;root.dataset.loaded='false';});});
})();
