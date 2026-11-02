'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8');
const {render}=require('../plan-comparison.js'),catalog=require('./fixtures/plan-catalog-20261102.json');
function dict(file){const out={};vm.runInNewContext(read(file),{registerChesI18n:d=>{for(const [l,v]of Object.entries(d))out[l]={...out[l],...v};}});return out;}
test('public plan rendering uses authoritative numeric limits in all supported languages',()=>{
 for(const lang of ['ja','en','zh','ko']){
  const html=render(catalog,lang);assert.equal((html.match(/data-plan-card=/g)||[]).length,4);
  assert.match(html,/500/);assert.match(html,/3,000/);assert.match(html,/10,000/);
  assert.ok(!html.includes('undefined'));assert.ok(!html.includes('NaN'));
  const changed=structuredClone(catalog);changed.plans[1].post=8;assert.notEqual(render(changed,lang),html);
 }
});
test('malformed policy and textual payloads fail closed instead of publishing invented limits',()=>{
 for(const value of [-1,NaN,Infinity,'<script>alert(1)</script>']){
  const data=structuredClone(catalog);data.plans[1].storage.saved=value;assert.throws(()=>render(data,'ja'),/INVALID_CATALOG/);
 }
 assert.throws(()=>render({...catalog,plans:catalog.plans.slice(1)},'ja'));
 assert.equal(render(catalog,'unsupported<>'),render(catalog,'ja'));
});
test('Camellia login explanations and FAQ JSON-LD agree on LINE and Google',()=>{
 const html=read('Camellia.html');assert.ok(!html.includes('SchoolPark Passport'));
 const d=dict('i18n-camellia.js');for(const lang of ['ja','en','zh','ko'])for(const key of ['cam.lp.025','cam.lp.031','cam.lp.045']){
  assert.match(d[lang][key],/LINE/);assert.match(d[lang][key],/Google/);assert.doesNotMatch(d[lang][key],/Passport/);
 }
 const schema=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(x=>JSON.parse(x[1]));
 assert.equal(schema[0].mainEntity[0].acceptedAnswer.text,d.ja['cam.lp.031']);
 assert.equal(schema[0].mainEntity[0].name,d.ja['cam.lp.029']);
 assert.doesNotMatch(html,/実店舗の方と協力/);
});
test('public comparison proxy and links use the existing read-only policy endpoint',()=>{
 const cfg=JSON.parse(read('vercel.json'));assert.deepEqual(cfg.rewrites,[{source:'/api/billing/features',destination:'https://emu-realtime.onrender.com/api/billing/features'}]);
 assert.match(read('Emu.html'),/membership-plans\.html/);assert.match(read('index.html'),/Emu\.html#plans/);
 assert.doesNotMatch(read('plan-comparison.js'),/Authorization|Bearer|walletAddress|Passport ID|localStorage/);
});
