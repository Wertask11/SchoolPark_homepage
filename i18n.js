/* ══════════════════════════════════════════════════════════════
   CHES ホームページ 多言語辞書（日本語 / English / 中文 / 한국어）

   使い方:
     - ふつうの文字   <span data-i18n="nav.pillars">理念</span>
     - タグを含む文字 <h2 data-i18n-html="pillars.title">学校より…</h2>
     - 属性           data-i18n-placeholder / data-i18n-title / data-i18n-aria
     - 切替           setChesLang('en')

   ・辞書に無いキーは日本語に、それも無ければキー名を返す。
   ・ブランド名（CHES / Camellia / Heartoo / Emu / SchoolPark）と
     トークンのアドレスは訳さない。
   ・選んだ言語は localStorage に残す。Emu 側と同じキーを使うので、
     どちらかで切り替えるともう一方にも引き継がれる。
   ══════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var STORAGE_KEY = "emu_lang";     // Emu アプリと共有する
  var LANGS = [
    { code: "ja", label: "日本語",  locale: "ja-JP" },
    { code: "en", label: "English", locale: "en-US" },
    { code: "zh", label: "中文",    locale: "zh-CN" },
    { code: "ko", label: "한국어",  locale: "ko-KR" }
  ];

  var DICT = {
    ja: {
      "doc.title": "CHES | 合同会社型DAO SchoolPark",
      "org.name": "合同会社型DAO SchoolPark",

      "nav.pillars": "理念",
      "nav.world": "See one world",
      "nav.token": "EMUER",
      "nav.pass": "公式パス",
      "nav.investor": "投資家",
      "nav.explore": "探検しよう",
      "nav.menu": "メニュー",
      "nav.lang": "言語",

      "hero.sub": "旺盛、冷静、時に激しく、本気で楽しもう。",
      "hero.watch": "映像を見る",
      "hero.close": "✕ 閉じる",

      "pillars.title": "学校より学べて<br>公園より楽しめて<br>会社より稼げる場所を。",
      "pillars.1.h": "学校より学べる",
      "pillars.1.p": "体験と経験を通じて、知識を知恵に昇華させる。教科書ではなく、実践から学ぶリテラシー。",
      "pillars.2.h": "公園より楽しい",
      "pillars.2.p": "無我夢中で遊べる場所。星座、議論、イベント——遊びの中に学びと発見がある。",
      "pillars.3.h": "会社より稼げる",
      "pillars.3.p": "投稿・貢献・活動がEMUERになる。頑張りがそのまま報酬に変わる、生きた知識の経済圏。",

      "stmt.mark": "CHES宣言",
      "stmt.line1": "私は、ここにCHESを宣言する。",
      "stmt.line2": "旺盛、冷静、時に激しく、本気で楽しもう。",
      "stmt.sign": "—— 2026年7月 合同会社型DAO SchoolPark",

      "world.title": "世界に広がる、<br>学びの輪。",
      "world.desc": "CHESの活動は、いま世界中へ。検索や応援がリアルタイムで地球に灯ります。ドラッグで地球を回して、応援を灯してみてください。",

      "fleet.title": "SchoolPark、<br>それは一つの世界。",
      "fleet.camellia.tag": "「もう一度、自分を好きになる」— 女性ウェルネス/女性ウェルビーイング",
      "fleet.camellia.p": "女性ウェルネス/女性ウェルビーイングプラットフォーム。美・健康・こころ・性・学び，お金・つながりの6領域から、女性の人生を等しく支える。",
      "fleet.camellia.btn": "もっと詳しく見る",
      "fleet.heartoo.tag": "「♡を貴女に」— スマート結婚指輪",
      "fleet.heartoo.p": "空中にハートを描いてフリックで放つと、相手に光のハートが届く。NFCでSchoolPark入場とEMUER決済にも使用可能。",
      "fleet.heartoo.btn": "製品を購入する",
      "fleet.emu.tag": "Education community — 分散型SNS",
      "fleet.emu.p": "学校では学べない、教えてくれない、本当に大切な情報を共有する新しい学びの場。",
      "fleet.emu.btn": "知識を共有する",
      "fleet.sp.tag": "最高に楽しい心躍る場所",
      "fleet.sp.p": "DXR — 分散型複合現実<br>Decentralized Mixed Reality。オンラインとオフラインの境界が消える最終形。",
      "fleet.sp.btn": "体験する",

      "token.title": "を流れるトークン。",
      "token.desc": "CHESは4つのブランドではない。一つの世界。<br>Camelliaは、女性を。Heartooは、カップルや夫婦を。Emuは、知的好奇心や学びに満ち溢れた大人や子供を。SchoolParkは、家族を。<br><br>その世界を貫く共通トークンがEMUER。Emuで集めて、Camelliaで育てて、Heartooで支払い、SchoolParkで使う。<br><br>EMUERはトークンの名前であり、この世界で生きる人たちの呼び名でもある。学んだ人、貢献した人、誰かの役に立った人——その全員がEMUERだ。<br><br>人が学び、育ち、愛し、集い、その価値が一つのトークンとして世界を巡っていく。その光景のすべてが、分散型複合現実（DXR）。<br><br>そしてその場所は、学校より学べて、公園より楽しくて、会社より稼げる。国籍にも、学歴にも、義務教育にも——何にも縛られない。<br><br>それこそが、SchoolParkなのです。",
      "token.li1": "投稿・Good・Changeなど活動によって自動付与",
      "token.li2": "Emu内取引所でNFTと交換可能",
      "token.li3": "公式NFTの割引購入に使用可能",
      "token.li4": "将来的にHeartooのNFC決済とも接続予定",
      "token.li5": "イベント限定ポイントとしても利用（換金なし）",

      "nft.title": "SchoolPark公式パス",
      "nft.desc": "保有することでCHESの一員となり、SchoolParkからの特別な優遇を受けられます。",
      "nft.1.tag": "第1弾 — 有料",
      "nft.1.sub": "SchoolPark公式パス第一弾",
      "nft.2.tag": "第2弾 — オファー",
      "nft.2.sub": "SchoolPark公式パス第二弾",
      "nft.3.tag": "第3弾",
      "nft.3.sub": "SchoolPark公式パス第三弾",
      "nft.left": "残り",
      "nft.normal": "ノーマル残り",
      "nft.premium": "プレミアム残り",
      "nft.buyHexa": "HEXAで購入する",
      "nft.buyOpensea": "Openseaで購入する",

      "foot.brand": "合同会社型DAO SchoolPark。<br>Camellia・Heartoo・Emu・SchoolParkを展開して世界を創る。",
      "foot.pass": "公式パス",
      "foot.contact": "問い合わせ",
      "foot.investor": "投資家/取材",
      "foot.terms": "利用規約",
      "foot.privacy": "プライバシーポリシー",
      "foot.tokusho": "特商法表記",
      "foot.rights": "© 2026 合同会社型DAO SchoolPark. ALL RIGHTS RESERVED."
    },

    en: {
      "doc.title": "CHES | LLC-type DAO SchoolPark",
      "org.name": "LLC-type DAO SchoolPark",

      "nav.pillars": "Philosophy",
      "nav.world": "See one world",
      "nav.token": "EMUER",
      "nav.pass": "Official pass",
      "nav.investor": "Investors",
      "nav.explore": "Explore",
      "nav.menu": "Menu",
      "nav.lang": "Language",

      "hero.sub": "Eager, clear-headed, fierce at times. Let's enjoy this for real.",
      "hero.watch": "Watch the film",
      "hero.close": "✕ Close",

      "pillars.title": "A place to learn more than school,<br>enjoy more than a park,<br>and earn more than a job.",
      "pillars.1.h": "Learn more than at school",
      "pillars.1.p": "Turn knowledge into wisdom through real experience. Literacy that comes from practice, not from textbooks.",
      "pillars.2.h": "Enjoy more than a park",
      "pillars.2.p": "A place to lose yourself in play. Constellations, debates, events — learning and discovery live inside play.",
      "pillars.3.h": "Earn more than at a job",
      "pillars.3.p": "Posts, contributions and activity become EMUER. A living knowledge economy where effort turns straight into reward.",

      "stmt.mark": "The CHES Declaration",
      "stmt.line1": "Here, I declare CHES.",
      "stmt.line2": "Eager, clear-headed, fierce at times. Let's enjoy this for real.",
      "stmt.sign": "—— July 2026, LLC-type DAO SchoolPark",

      "world.title": "A circle of learning,<br>spreading across the world.",
      "world.desc": "CHES is reaching out worldwide. Searches and cheers light up the globe in real time. Drag to spin the earth and light one up yourself.",

      "fleet.title": "SchoolPark —<br>one single world.",
      "fleet.camellia.tag": "\"Learn to like yourself again\" — wellness and wellbeing for women",
      "fleet.camellia.p": "A wellness and wellbeing platform for women. Beauty, health, the heart, sexuality, learning, money and connection — six areas that support a woman's life equally.",
      "fleet.camellia.btn": "Learn more",
      "fleet.heartoo.tag": "\"A ♡ for you\" — a smart wedding ring",
      "fleet.heartoo.p": "Draw a heart in the air and flick it, and a heart of light reaches the person you love. NFC also works for SchoolPark entry and EMUER payments.",
      "fleet.heartoo.btn": "Buy the product",
      "fleet.emu.tag": "Education community — a decentralized SNS",
      "fleet.emu.p": "A new place for learning, where people share what school never teaches but truly matters.",
      "fleet.emu.btn": "Share what you know",
      "fleet.sp.tag": "The most joyful place there is",
      "fleet.sp.p": "DXR — Decentralized Mixed Reality.<br>The final form, where the line between online and offline disappears.",
      "fleet.sp.btn": "Try it",

      "token.title": ", the token that flows through it.",
      "token.desc": "CHES is not four brands. It is one world.<br>Camellia is for women. Heartoo is for couples and partners. Emu is for curious adults and children who love to learn. SchoolPark is for families.<br><br>EMUER is the token running through all of it. Earn it in Emu, grow it in Camellia, pay with it in Heartoo, spend it in SchoolPark.<br><br>EMUER is the name of the token, and also what we call the people living in this world. Those who learned, who contributed, who helped someone — all of them are EMUER.<br><br>People learn, grow, love and gather, and that value travels the world as a single token. All of it together is Decentralized Mixed Reality (DXR).<br><br>And that place lets you learn more than school, enjoy more than a park, and earn more than a job. Bound by no nationality, no diploma, no compulsory schooling.<br><br>That is what SchoolPark is.",
      "token.li1": "Granted automatically through posts, Good, Change and other activity",
      "token.li2": "Exchangeable for NFTs at the Emu marketplace",
      "token.li3": "Usable for discounts on official NFTs",
      "token.li4": "Planned to connect with Heartoo's NFC payments",
      "token.li5": "Also usable as event-only points (not redeemable for cash)",

      "nft.title": "SchoolPark official pass",
      "nft.desc": "Holding one makes you part of CHES and brings special treatment across SchoolPark.",
      "nft.1.tag": "Vol.1 — paid",
      "nft.1.sub": "SchoolPark official pass, volume 1",
      "nft.2.tag": "Vol.2 — offer",
      "nft.2.sub": "SchoolPark official pass, volume 2",
      "nft.3.tag": "Vol.3",
      "nft.3.sub": "SchoolPark official pass, volume 3",
      "nft.left": "Left:",
      "nft.normal": "Normal left:",
      "nft.premium": "Premium left:",
      "nft.buyHexa": "Buy on HEXA",
      "nft.buyOpensea": "Buy on OpenSea",

      "foot.brand": "LLC-type DAO SchoolPark.<br>Building a world through Camellia, Heartoo, Emu and SchoolPark.",
      "foot.pass": "Official pass",
      "foot.contact": "Contact",
      "foot.investor": "Investors / press",
      "foot.terms": "Terms of use",
      "foot.privacy": "Privacy policy",
      "foot.tokusho": "Commercial transaction notice",
      "foot.rights": "© 2026 LLC-type DAO SchoolPark. ALL RIGHTS RESERVED."
    },

    zh: {
      "doc.title": "CHES | 合同会社型DAO SchoolPark",
      "org.name": "合同会社型DAO SchoolPark",

      "nav.pillars": "理念",
      "nav.world": "See one world",
      "nav.token": "EMUER",
      "nav.pass": "官方通行证",
      "nav.investor": "投资者",
      "nav.explore": "去探索",
      "nav.menu": "菜单",
      "nav.lang": "语言",

      "hero.sub": "旺盛、冷静，时而炽烈，认真地享受吧。",
      "hero.watch": "观看影片",
      "hero.close": "✕ 关闭",

      "pillars.title": "比学校更能学，<br>比公园更好玩，<br>比公司更能赚的地方。",
      "pillars.1.h": "比学校更能学",
      "pillars.1.p": "通过体验与经历，把知识升华为智慧。不是来自教科书，而是从实践中获得的素养。",
      "pillars.2.h": "比公园更好玩",
      "pillars.2.p": "可以忘我玩耍的地方。星座、讨论、活动——在玩之中，就有学习与发现。",
      "pillars.3.h": "比公司更能赚",
      "pillars.3.p": "发帖、贡献、活动都会变成EMUER。努力直接变成回报，这是活的知识经济圈。",

      "stmt.mark": "CHES宣言",
      "stmt.line1": "我在此宣告CHES。",
      "stmt.line2": "旺盛、冷静，时而炽烈，认真地享受吧。",
      "stmt.sign": "—— 2026年7月 合同会社型DAO SchoolPark",

      "world.title": "向世界扩展的，<br>学习之环。",
      "world.desc": "CHES的活动正走向世界。搜索与声援会实时点亮地球。请拖动旋转地球，点亮你的声援。",

      "fleet.title": "SchoolPark，<br>它就是一个世界。",
      "fleet.camellia.tag": "「重新喜欢上自己」— 女性健康与幸福",
      "fleet.camellia.p": "面向女性的健康与幸福平台。从美、健康、心灵、性、学习、金钱、连结六个领域，平等地支持女性的人生。",
      "fleet.camellia.btn": "了解更多",
      "fleet.heartoo.tag": "「把♡送给你」— 智能结婚戒指",
      "fleet.heartoo.p": "在空中画一个心并轻轻一挥，光的心便会送到对方那里。NFC还可用于SchoolPark入场与EMUER支付。",
      "fleet.heartoo.btn": "购买产品",
      "fleet.emu.tag": "Education community — 去中心化社群",
      "fleet.emu.p": "分享学校学不到、也没人教，却真正重要的信息的新学习场所。",
      "fleet.emu.btn": "分享知识",
      "fleet.sp.tag": "最开心、最令人雀跃的地方",
      "fleet.sp.p": "DXR — 去中心化混合现实<br>Decentralized Mixed Reality。线上与线下界限消失的最终形态。",
      "fleet.sp.btn": "去体验",

      "token.title": "中流动的代币。",
      "token.desc": "CHES不是四个品牌，而是一个世界。<br>Camellia面向女性。Heartoo面向情侣与夫妻。Emu面向充满好奇心与求知欲的大人和孩子。SchoolPark面向家庭。<br><br>贯穿这个世界的共同代币就是EMUER。在Emu获得，在Camellia培育，在Heartoo支付，在SchoolPark使用。<br><br>EMUER既是代币的名字，也是生活在这个世界里的人的称呼。学习过的人、做出贡献的人、帮助过别人的人——他们全都是EMUER。<br><br>人们学习、成长、相爱、相聚，而这份价值化作一枚代币在世界中流转。这一切景象，就是去中心化混合现实（DXR）。<br><br>而那个地方，比学校更能学，比公园更好玩，比公司更能赚。不被国籍、学历、义务教育——不被任何东西束缚。<br><br>那正是SchoolPark。",
      "token.li1": "通过发帖、Good、Change等活动自动发放",
      "token.li2": "可在Emu内的交易所兑换NFT",
      "token.li3": "可用于官方NFT的折扣购买",
      "token.li4": "未来计划与Heartoo的NFC支付连接",
      "token.li5": "也可作为活动限定积分使用（不可兑换现金）",

      "nft.title": "SchoolPark官方通行证",
      "nft.desc": "持有即成为CHES的一员，可享受来自SchoolPark的特别优待。",
      "nft.1.tag": "第1弹 — 付费",
      "nft.1.sub": "SchoolPark官方通行证 第一弹",
      "nft.2.tag": "第2弹 — 报价",
      "nft.2.sub": "SchoolPark官方通行证 第二弹",
      "nft.3.tag": "第3弹",
      "nft.3.sub": "SchoolPark官方通行证 第三弹",
      "nft.left": "剩余",
      "nft.normal": "普通剩余",
      "nft.premium": "高级剩余",
      "nft.buyHexa": "在HEXA购买",
      "nft.buyOpensea": "在OpenSea购买",

      "foot.brand": "合同会社型DAO SchoolPark。<br>通过Camellia・Heartoo・Emu・SchoolPark创造世界。",
      "foot.pass": "官方通行证",
      "foot.contact": "联系我们",
      "foot.investor": "投资者/采访",
      "foot.terms": "使用条款",
      "foot.privacy": "隐私政策",
      "foot.tokusho": "特定商业交易法标示",
      "foot.rights": "© 2026 合同会社型DAO SchoolPark. ALL RIGHTS RESERVED."
    },

    ko: {
      "doc.title": "CHES | 합동회사형 DAO SchoolPark",
      "org.name": "합동회사형 DAO SchoolPark",

      "nav.pillars": "이념",
      "nav.world": "See one world",
      "nav.token": "EMUER",
      "nav.pass": "공식 패스",
      "nav.investor": "투자자",
      "nav.explore": "탐험하기",
      "nav.menu": "메뉴",
      "nav.lang": "언어",

      "hero.sub": "왕성하게, 냉정하게, 때로는 뜨겁게. 진심으로 즐기자.",
      "hero.watch": "영상 보기",
      "hero.close": "✕ 닫기",

      "pillars.title": "학교보다 배우고<br>공원보다 즐겁고<br>회사보다 벌 수 있는 곳을.",
      "pillars.1.h": "학교보다 배운다",
      "pillars.1.p": "체험과 경험을 통해 지식을 지혜로 끌어올린다. 교과서가 아니라 실천에서 얻는 리터러시.",
      "pillars.2.h": "공원보다 즐겁다",
      "pillars.2.p": "정신없이 놀 수 있는 곳. 별자리, 토론, 이벤트——노는 가운데 배움과 발견이 있다.",
      "pillars.3.h": "회사보다 번다",
      "pillars.3.p": "게시·기여·활동이 EMUER가 된다. 노력이 그대로 보상이 되는, 살아 있는 지식의 경제권.",

      "stmt.mark": "CHES 선언",
      "stmt.line1": "나는 여기에 CHES를 선언한다.",
      "stmt.line2": "왕성하게, 냉정하게, 때로는 뜨겁게. 진심으로 즐기자.",
      "stmt.sign": "—— 2026년 7월 합동회사형 DAO SchoolPark",

      "world.title": "세계로 퍼져 가는,<br>배움의 고리.",
      "world.desc": "CHES의 활동은 지금 전 세계로. 검색과 응원이 실시간으로 지구에 불을 밝힙니다. 드래그해 지구를 돌리고, 응원을 켜 보세요.",

      "fleet.title": "SchoolPark,<br>그것은 하나의 세계.",
      "fleet.camellia.tag": "「다시 한번, 나를 좋아하게」— 여성 웰니스/웰빙",
      "fleet.camellia.p": "여성 웰니스·웰빙 플랫폼. 아름다움·건강·마음·성·배움·돈·연결의 6개 영역에서 여성의 인생을 고르게 떠받칩니다.",
      "fleet.camellia.btn": "자세히 보기",
      "fleet.heartoo.tag": "「♡를 당신에게」— 스마트 결혼반지",
      "fleet.heartoo.p": "공중에 하트를 그려 튕기면, 빛의 하트가 상대에게 닿습니다. NFC로 SchoolPark 입장과 EMUER 결제에도 사용할 수 있습니다.",
      "fleet.heartoo.btn": "제품 구매하기",
      "fleet.emu.tag": "Education community — 분산형 SNS",
      "fleet.emu.p": "학교에서는 배울 수 없고 가르쳐 주지도 않는, 정말 중요한 정보를 나누는 새로운 배움의 장.",
      "fleet.emu.btn": "지식 나누기",
      "fleet.sp.tag": "가장 즐겁고 설레는 곳",
      "fleet.sp.p": "DXR — 분산형 복합현실<br>Decentralized Mixed Reality. 온라인과 오프라인의 경계가 사라지는 최종 형태.",
      "fleet.sp.btn": "체험하기",

      "token.title": "를 흐르는 토큰.",
      "token.desc": "CHES는 네 개의 브랜드가 아니다. 하나의 세계다.<br>Camellia는 여성을. Heartoo는 연인과 부부를. Emu는 지적 호기심과 배움으로 가득한 어른과 아이를. SchoolPark는 가족을.<br><br>그 세계를 관통하는 공통 토큰이 EMUER. Emu에서 모으고, Camellia에서 키우고, Heartoo에서 지불하고, SchoolPark에서 쓴다.<br><br>EMUER는 토큰의 이름이자, 이 세계에 사는 사람들의 이름이기도 하다. 배운 사람, 기여한 사람, 누군가에게 도움이 된 사람——그 모두가 EMUER다.<br><br>사람이 배우고, 자라고, 사랑하고, 모이며, 그 가치가 하나의 토큰이 되어 세계를 돈다. 그 광경 전부가 분산형 복합현실(DXR).<br><br>그리고 그곳은 학교보다 배우고, 공원보다 즐겁고, 회사보다 벌 수 있다. 국적에도, 학력에도, 의무교육에도——무엇에도 얽매이지 않는다.<br><br>그것이 바로 SchoolPark입니다.",
      "token.li1": "게시·Good·Change 등 활동에 따라 자동 지급",
      "token.li2": "Emu 내 거래소에서 NFT와 교환 가능",
      "token.li3": "공식 NFT의 할인 구매에 사용 가능",
      "token.li4": "향후 Heartoo의 NFC 결제와도 연결 예정",
      "token.li5": "이벤트 한정 포인트로도 이용（현금 교환 불가）",

      "nft.title": "SchoolPark 공식 패스",
      "nft.desc": "보유하면 CHES의 일원이 되어, SchoolPark의 특별한 혜택을 받을 수 있습니다.",
      "nft.1.tag": "제1탄 — 유료",
      "nft.1.sub": "SchoolPark 공식 패스 제1탄",
      "nft.2.tag": "제2탄 — 오퍼",
      "nft.2.sub": "SchoolPark 공식 패스 제2탄",
      "nft.3.tag": "제3탄",
      "nft.3.sub": "SchoolPark 공식 패스 제3탄",
      "nft.left": "남은 수량",
      "nft.normal": "노멀 남은 수량",
      "nft.premium": "프리미엄 남은 수량",
      "nft.buyHexa": "HEXA에서 구매",
      "nft.buyOpensea": "OpenSea에서 구매",

      "foot.brand": "합동회사형 DAO SchoolPark.<br>Camellia・Heartoo・Emu・SchoolPark로 세계를 만듭니다.",
      "foot.pass": "공식 패스",
      "foot.contact": "문의하기",
      "foot.investor": "투자자/취재",
      "foot.terms": "이용약관",
      "foot.privacy": "개인정보 처리방침",
      "foot.tokusho": "특정상거래법 표기",
      "foot.rights": "© 2026 합동회사형 DAO SchoolPark. ALL RIGHTS RESERVED."
    }
  };

  var current = "ja";
  var ready = false;

  function supported(code) {
    for (var i = 0; i < LANGS.length; i++) if (LANGS[i].code === code) return true;
    return false;
  }
  function localeTag() {
    for (var i = 0; i < LANGS.length; i++) if (LANGS[i].code === current) return LANGS[i].locale;
    return "ja-JP";
  }
  function detect() {
    var list = (navigator.languages && navigator.languages.length)
      ? navigator.languages : [navigator.language || "ja"];
    for (var i = 0; i < list.length; i++) {
      var tag = String(list[i]).toLowerCase();
      if (tag.indexOf("ja") === 0) return "ja";
      if (tag.indexOf("zh") === 0) return "zh";
      if (tag.indexOf("ko") === 0) return "ko";
      if (tag.indexOf("en") === 0) return "en";
    }
    return "ja";
  }

  function t(key) {
    var table = DICT[current] || DICT.ja;
    if (table[key] != null) return table[key];
    if (DICT.ja[key] != null) return DICT.ja[key];
    return key;
  }

  function apply(root) {
    var scope = root || document;
    scope.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    // タグを含む文（<br> やブランド色の span）だけ innerHTML で入れる。
    // 中身は上の辞書だけが出どころなので、外部の入力は混ざらない。
    scope.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });
    scope.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
    });
    scope.querySelectorAll("[data-i18n-title]").forEach(function (el) {
      el.setAttribute("title", t(el.getAttribute("data-i18n-title")));
    });
    scope.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
    });
    // ページごとにキーを変えられる。指定が無ければトップページのものを使う
    document.title = t(window.CHES_TITLE_KEY || "doc.title");
  }

  function syncSelects() {
    document.querySelectorAll("[data-lang-select]").forEach(function (select) {
      if (!select.options.length) {
        LANGS.forEach(function (lang) {
          var option = document.createElement("option");
          option.value = lang.code;
          option.textContent = lang.label;
          select.appendChild(option);
        });
      }
      if (select.value !== current) select.value = current;
    });
  }

  function setChesLang(code) {
    if (!supported(code)) code = "ja";
    current = code;
    try { localStorage.setItem(STORAGE_KEY, code); } catch (e) {}
    document.documentElement.setAttribute("lang", localeTag());
    syncSelects();
    apply();
    broadcastToFrames(code);
  }

  /* 同じオリジンなので localStorage は共有され、読み込み時は揃う。
     切り替えたその場で反映させるため、開いている iframe にも伝える。 */
  function broadcastToFrames(code) {
    try {
      document.querySelectorAll(iframe).forEach(function (frame) {
        try {
          if (frame.contentWindow) {
            frame.contentWindow.postMessage({ type: "emu-lang", lang: code }, location.origin);
          }
        } catch (e) {}
      });
    } catch (e) {}
  }

  window.addEventListener("message", function (event) {
    if (event.origin !== location.origin || !event.data) return;
    if (event.data.type !== "emu-lang") return;
    if (event.data.lang && event.data.lang !== current) setChesLang(event.data.lang);
  });

  function init() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    current = supported(saved) ? saved : detect();
    document.documentElement.setAttribute("lang", localeTag());
    syncSelects();
    apply();
    ready = true;
    document.addEventListener("change", function (e) {
      var select = e.target.closest && e.target.closest("[data-lang-select]");
      if (select) setChesLang(select.value);
    });
  }

  /* ページごとの辞書を後から足す。
     各ページは i18n.js のあとに i18n-<ページ名>.js を読み込み、
     この関数で自分のぶんだけ登録する。defer なので順番は保たれる。 */
  function register(parts) {
    Object.keys(parts).forEach(function (lang) {
      if (!DICT[lang]) DICT[lang] = {};
      var table = parts[lang];
      Object.keys(table).forEach(function (key) { DICT[lang][key] = table[key]; });
    });
    // 初期化のあとに登録された場合は、その場で反映する
    if (ready) apply();
  }

  window.registerChesI18n = register;
  window.CHES_LANGS = LANGS;
  window.chesT = t;
  window.setChesLang = setChesLang;
  window.getChesLang = function () { return current; };
  window.applyChesI18n = apply;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
