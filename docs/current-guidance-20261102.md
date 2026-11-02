# Camellia and Emu plan guidance — 2026-11-02

Status: implemented, local verification passed, Preview build succeeded. **Not merged, not published to Production, actual Preview browser verification blocked by the executor's HTTPS CONNECT policy.** Do not equate build success with page/API/measurement verification.

Baseline main: `02c1318128f8767db24939c8e2d1519583122dd7` (PR #8), initially clean with no open PR. Dedicated branch `feat/current-camellia-plans-20261102`.

## Sources and confirmed statements

Camellia latest fetched main `994a72ea94b6d418089f0dcf5693443fac925c91` (PR #58): `screens/AccountScreen.tsx` offers LINE and Google; Production actual browser showed those choices. Guest Check is possible before login; preserving records/full account flow needs login and eligibility/consent. Invite requirement is a server setting unavailable to unauthenticated inspection. Do not claim universally invite-only or fully open. Target remains women 18–45. Place real-store partnerships are not verified; copy states demo/preparation status and conditional visibility. Legacy internal Passport callback code is not advertised as a public login method.

Emu main `7c7a434233fe91518f476dfc04d5be2a2743e990`: policy module and actual public Production `/api/billing/features` agree on free 0/light 500/plus 3,000/pro 10,000 JPY tax included; latest 20/all-public reading; monthly posts 0/5/30/no count cap; saved 10/100/1000/1000; drafts 1/30/1000/1000; notes 3/30/1000/1000. Requests/answers/discussions are rendered from the same API, not a duplicated entitlement calculation. Storage policy API reports active since Nov 1 JST; complete published Rules cannot independently be read, so this is not advertised as a fully verified rollout. PR #212 remains an unapproved draft and is not a specification source.

Official pass retains existing plus/applicable SchoolPark rights and original purchase/individual promises. Pro dialogue remains separate and conditional. No undecided future series, changed price, increased rewards, unlimited AI or migration completion claim. Seven-day light gift and initial-public-post 100 EMUER campaign (Oct 29–Nov 28 JST) are separate existing benefits, not ongoing monthly rights.

## Files and purposes

- `Camellia.html`: visible copy, meta/OG and FAQ JSON-LD agree on LINE/Google, current check-first entry and conditional access/Place status.
- `i18n-camellia.js`: affected Japanese, English, Chinese and Korean keys, remove stale Passport login translations.
- `index.html`, `i18n.js`: current Camellia teaser and concise confirmed-price plan entry in four languages.
- `Emu.html`, `i18n-emu.js`: current app links, plan comparison entry, existing pass and campaign distinction, remove unsupported unconditional discount/bounty implications.
- `schoolpark.html`: point plan CTA to the readable comparison before checkout.
- `plan-comparison.js`, `plan-comparison.css`: accessible responsive four-plan cards/comparison table, strict numeric/enum validation; actual existing policy API is authoritative. API failure shows an unavailable explanation, never invented limits.
- `vercel.json`: narrow public GET policy API rewrite to existing Render endpoint; no billing write route.
- `tests/current-guidance.test.cjs`, fixture: four tests for API-driven rendering, invalid schema/XSS refusal, translated login/JSON-LD and read-only proxy.

## Validation and release gates

- Four Node tests pass. Syntax and diff checks pass. Static HTML/JS site has no declared lint/typecheck/build package task; Vercel Preview build is successful.
- Actual Chromium local browser at 375/390/412/768/1280 for homepage, Camellia, Emu comparison and companion Emu plan page: 20 views, no page errors/overflow. Changed content checked in ja/en/zh/ko. Plan API is an actual Production read-only relay, not mocked. Local screenshots and JSON evidence: `/workspace/outputs/hp-plans-analytics-20261102`.
- Initial actual Production read-only browser baseline confirms the outdated Passport claim on this HP and the correct LINE/Google UI on Camellia. No Production accounts, charges, publications, rewards or contract modifications.
- Runtime policy currently denies the new Emu hostname and exact Preview hosts with HTTPS CONNECT 403. Additive environment draft saved; owner must review/save/publish it before executor can verify Preview. PostHog host is also requested for the companion Emu implementation. A saved draft is not an applied policy.
- Companion unchanged Emu migration emulator test expects November credit 2 but gets 0 (6 pass/1 fail); cause/Production impact unresolved. Current backend/Rules are unchanged. Do not promote a failed migration test into a blanket rollout claim.
- After Preview page/API checks succeed, normal release is already authorized. Merge and verify Vercel Production source/assets/links/policy response. Until then do not mark published or Production verified.

Companion implementation details, event allowlist/privacy/remaining dashboard verification: `Wertask11/emu-realtime`, branch `feat/hp-plans-analytics-20261102`, `docs/usage-measurement/2026-11-02.md`. Camellia is reference-only and unchanged.
