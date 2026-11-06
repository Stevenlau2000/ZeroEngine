/* WorkBuddy 介绍站 · 内容与交互 */
(function () {
  'use strict';
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------------- 02 · 八项能力 ---------------- */
  const features = [
    { n: '01', t: '一句话派活，权限你说了算', d: '三种模式按「放权程度」选：Ask 只答不改文件、Plan 先出计划等你点头、Craft 放手直接干。新手从 Ask 开始，重要文件先备份。', eg: '例：先问「这份标书该怎么拆」，看完计划再让它执行。' },
    { n: '02', t: '交回来的是文件，不是一段话', d: 'Word、Excel、PPT、PDF、网页、可视化看板都能直接产出；右侧面板可预览文件、逐行看它改了什么。', eg: '例：一句话出 30 页投标书初稿，改动处红绿标出。' },
    { n: '03', t: '给 AI 配装备：技能 Skills', d: '内置 20+ 技能包，覆盖文档、报表、海报、整理；兼容 OpenClaw 社区上万技能，可导入本地 zip，也能让它自己做一个。', eg: '例：装个票据技能，批量读发票直接出报销表。' },
    { n: '04', t: '接上公司原有的系统', d: '连接器像数据线：腾讯文档、QQ 邮箱、ima / 乐享知识库、TAPD、微云，还能用 MCP 接自己的业务系统。每个都需主动授权、随时可关。', eg: '例：从邮箱收附件 → 整理成表 → 写回腾讯文档。' },
    { n: '05', t: '换个专业角色来干', d: '专家中心有 31 个专家团、213 位专家、14 大品类。单点问题叫专家，复杂任务叫专家团自动拆成产品 / 架构 / 开发 / 测试并行干。', eg: '例：召唤「软件开发团」，交付一套完整原型。' },
    { n: '06', t: '人不在电脑前也能派活', d: '手机微信 / 企微 / 飞书 / 钉钉发一句指令，电脑上的 WorkBuddy 执行；小程序还有云上模式，不依赖电脑在线。', eg: '例：通勤路上发条消息，到公司看完整执行记录。' },
    { n: '07', t: '到点自己干，结果自动送达', d: '把重复、规则明确、不用实时盯的活设成定时任务，结果自动存到指定文件夹，并推送到邮箱或小程序。', eg: '例：每天 8:30 行业简报自动发到邮箱。' },
    { n: '08', t: '一个人做对，全公司照做', d: '资料库把公司文件、知识库接进来；做对一次存成套路与模板，项目页再让多人、多 Agent 共享上下文与成果。', eg: '例：金牌项目经理的周报模板，全员一键复用。' }
  ];
  $('#featureGrid').innerHTML = features.map(f => `
    <article class="card reveal">
      <div class="num">CAPABILITY ${f.n}</div>
      <h3>${esc(f.t)}</h3>
      <p>${esc(f.d)}</p>
      <div class="eg"><b>举个例　</b>${esc(f.eg)}</div>
    </article>`).join('');

  /* ---------------- 03 · 岗位地图 ---------------- */
  const roleGroups = [
    { key: 'growth', label: '经营增长', roles: [
      ['销售', '客户方案、报价书、投标书；见客户前背景简报；拜访纪要与商机提醒'],
      ['市场', '活动海报、宣传短视频；公众号推文、发布会 PPT；竞品动态与舆情周报'],
      ['电商 · 新零售', '商品详情与上新文案；店铺数据日报；评价分析、主图批量改'],
      ['客服', '读知识库答常见问题；投诉整理转业务；每周客诉归因'],
      ['总裁办', '汇总各部门周报；备会议材料、跟进决议；行业动态与讲稿初稿']
    ]},
    { key: 'delivery', label: '产品交付', roles: [
      ['研发', '写代码、查问题、补测试；技术文档整理；代码评审意见先列'],
      ['产品', '竞品调研、需求文档；用户反馈整理；原型与版本说明'],
      ['项目管理', '排计划、盯进度；项目日报；风险与问题清单随时更新'],
      ['设计', '草图与配图；按品牌规范批量改尺寸；活动物料一套出齐'],
      ['工程 · 质量', '施工日志、验收资料；质量问题归类；对照规范初审方案']
    ]},
    { key: 'operation', label: '业务运营', roles: [
      ['采购 · 供应链', '连 ERP 查库存、录订单；供应商比价表；到货付款节点提醒'],
      ['物流 · 仓储', '跟踪发货、核对运单；异常先列；库存周转分析'],
      ['门店运营', '汇门店销售数据；巡店报告与陈列建议；店长日报一键汇总'],
      ['行政 · 运营', '每天读邮件出摘要；会议纪要与待办；差旅会务安排'],
      ['IT · 流程', '连接内外部系统；按时跑审批、提流程；员工 IT 问题先答']
    ]},
    { key: 'control', label: '职能管控', roles: [
      ['财务', '拉数对账、经营分析表；异常先标；报销单据初审'],
      ['人事', '招聘 JD、简历初筛；约面试、入职材料；制度问答与考勤汇总'],
      ['法务', '合同初审、条款逐条比对；风险点标好交负责人定；法规更新提醒'],
      ['审计 · 内控', '抽查凭证、比对制度；疑点清单；审计底稿初稿'],
      ['培训', '把好干货做成课件；新人上手手册一键出；出考题、整理学习记录']
    ]}
  ];
  $('#roleTabs').innerHTML = roleGroups.map((g, i) =>
    `<button class="tab ${i === 0 ? 'active' : ''}" data-rtab="${g.key}">${g.label}（${g.roles.length}）</button>`).join('');
  $('#rolePanels').innerHTML = roleGroups.map((g, i) => `
    <div class="tab-panel ${i === 0 ? 'active' : ''}" id="rpanel-${g.key}">
      <div class="roles">${g.roles.map((r, j) => `
        <div class="role">
          <div class="ic" style="color:var(--gold);font-size:12px;letter-spacing:.1em">${String(i * 5 + j + 1).padStart(2, '0')} / 20</div>
          <h4>${esc(r[0])}</h4><p>${esc(r[1])}</p>
        </div>`).join('')}</div>
    </div>`).join('');

  const funcs = [
    ['销售', '~90x', '客户方案、竞品分析、报价单、大客户跟进'],
    ['市场', '~15x', '宣发物料批量生成、多平台分发、SEO 文章'],
    ['采购', '~12x', '订单汇总、供应商比价、寻源分析'],
    ['仓储', '~10x', '库存看板、异常校对、安全库存计算'],
    ['交付', '~90x', '需求结构化、WBS 拆解、风险预警、里程碑'],
    ['客服', '~18x', 'FAQ 应答、售后知识库、反馈分类'],
    ['法务', '~10x', '合同条款审查、模板批量生成、法规更新'],
    ['财务', '~30x', '发票 OCR、财报分析、对账、税务申报'],
    ['人力', '~20x', 'JD 与简历筛选、人才盘点、风险预警'],
    ['行政', '数倍', '活动方案、会议纪要、文件整理'],
    ['研发', '~8x', '需求转 PRD、代码生成、测试用例'],
    ['IT', '~10x', '巡检自动化、接口文档、日志告警'],
    ['经营', '~24x', '经营体检、选址评估、多 Agent 项目评审']
  ];
  $('#funcGrid').innerHTML = funcs.map(f => `
    <div class="func"><div class="top"><h4>${esc(f[0])}</h4><span class="x">${f[1]}</span></div><p>${esc(f[2])}</p></div>`).join('');

  /* ---------------- 04 · 行业方案 ---------------- */
  const industries = [
    {
      tag: 'INDUSTRY 01', accent: '#4C8DFF', name: '制造 · 柔性制造 / 非标订单',
      pain: '非标报价全靠技术骨干，图纸参数人工翻；老师傅的经验留不住，新人上手要两三个月。',
      steps: ['把图纸与需求解析成结构化清单，报价口径写进模板', '把「拆需求 → 选料 → 算价 → 出报价单」做成可复用流程', '把老工程师的判断规则沉淀成 Skill，新人照着跑'],
      result: '非标售前报价相关工作量 −50%+', src: '量化来自《FDE 案例 100》NO.17（柔性制造）；属案例口径，非通用承诺。',
      video: 'assets/videos/demo-manufacture.mp4', vtitle: '制造业智能报价 · 场景演示', vlabel: '看演示：智能报价'
    },
    {
      tag: 'INDUSTRY 02', accent: '#F0786A', name: '连锁零售 · 餐饮 / 门店',
      pain: '门店周报靠人工翻系统、拉表格、看评价；异常归因凭经验，整改靠口头传达，没有闭环。',
      steps: ['自动汇总多店经营数据与本地生活平台评价', '自动识别营收下滑、口碑下跌、回复率过低并逐条归因', '输出整改清单（责任方 / 动作 / 预期），支持周次切换与单店下钻'],
      result: '单店周复盘 2–3 小时 → 30 秒', src: '量化来自包道集团公开分享卡：统计工时下压 80%+，周复盘覆盖率提升。',
      video: 'assets/videos/demo-retail.mp4', vtitle: '促销复盘自动报告 · 场景演示', vlabel: '看演示：促销复盘'
    },
    {
      tag: 'INDUSTRY 03', accent: '#C9A24B', name: '专业服务 · 咨询 / 法律 / 招投标',
      pain: '标书、合同、评审材料又多又厚；专家经验在少数人脑子里，AI 工具多了反而管不住。',
      steps: ['先跑通单点：采购文件审核、清标、超长方案评审各做 MVP', '场景超过 100 个后上统一平台：管入口、权限、成果与模型调度', '把咨询师的工作过程萃取成 Skill，变成公司级资产'],
      result: '文件审核 2 小时 → 5 分钟', src: '量化来自某工程管理咨询公司案例：2000+ 页方案评审 1 周 → 10 分钟，个人版升企业版决策 1 个月。',
      video: 'assets/videos/demo-faq.mp4', vtitle: '企业办公提效 · 8 个问题解答', vlabel: '看演示：企业办公'
    },
    {
      tag: 'INDUSTRY 04', accent: '#8B7CF6', name: '内容与媒体 · 电商运营 / 教育',
      pain: '日更、多平台分发、排版改尺寸全是重复活；好内容靠人，规模化就卡在人。',
      steps: ['内容日历批量生成，一次排完一个月的选题', '一键排版与多平台分发，图文 / 短视频共用素材', '数据回流复盘，把跑通的写法存成自己的 Skill'],
      result: '68 天沉淀 23 个可复用 Skill', src: '案例来自深圳 AI 先锋教师沙龙（新沙小学）：1797 篇习作、80 万+ 语料分析，生成「一人一册」习作集。',
      video: 'assets/videos/demo-media.mp4', vtitle: '新媒体运营工作台 · 场景演示', vlabel: '看演示：新媒体工作台'
    },
    {
      tag: 'INDUSTRY 05', accent: '#3FC6F0', name: '研发与 IT · 软件 / 系统集成',
      pain: '需求说不清、重复代码多、接口调试费时；文档总要等人补，人一走就断档。',
      steps: ['多轮对话把口头需求变成结构化清单与 PRD', '自动生成前后端代码与测试用例，MCP 一键接外部能力', '从代码反推接口文档，部署与巡检交给自动化'],
      result: '需求拆解 1–2 天 → 1–2 小时', src: '量化来自腾讯云渠道案例 A（深圳某 AI 科技公司）：研发效率 +100%、重复编码 −90%。案例 B（物业）为定性，无硬指标。',
      video: 'assets/videos/demo-dev.mp4', vtitle: '小程序开发 · 从代码生成到文档反推', vlabel: '看演示：开发与文档'
    },
    {
      tag: 'INDUSTRY 06', accent: '#4ED8A0', name: '政企 · 强合规组织',
      pain: '数据不能出域、系统各自为政；AI 用起来容易，管起来难：权限、留痕、审计都要有交代。',
      steps: ['从知识问答、公文与材料审核这类低风险场景做 MVP', '统一入口调度多模型与已有 OCR / 知识库 / 自研工具', '按合规要求选 SaaS、VPC 专享或私有化，配 SSO、审计与租户隔离'],
      result: '财务流程 半月 → 1–2 天', src: '量化来自《FDE 案例 100》NO.09（央国企财务，落地 10 个场景）；部署方式见版本对比资料。',
      video: 'assets/videos/intro-full.mp4', vtitle: 'WorkBuddy 数字员工上岗 · 完整解说', vlabel: '看完整解说'
    }
  ];
  $('#industryGrid').innerHTML = industries.map(x => `
    <article class="ind reveal" style="--accent:${x.accent}">
      <div class="tag"><i></i>${x.tag}</div>
      <h3>${esc(x.name)}</h3>
      <p class="pain"><b>常见痛点　</b>${esc(x.pain)}</p>
      <ol>${x.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol>
      <div class="result"><b>${esc(x.result)}</b><span>${esc(x.src)}</span></div>
      <div class="ind-foot">
        <button class="play-link" data-video="${x.video}" data-title="${esc(x.vtitle)}" data-desc="${esc(x.name)}"><span class="tri">▶</span>${esc(x.vlabel)}</button>
      </div>
    </article>`).join('');

  /* ---------------- 05 · 视频 ---------------- */
  const demos = [
    { cat: '制造 / 报价', t: '制造业智能报价', d: '从图纸与需求到报价单，看非标订单怎么被结构化。', f: 'manufacture' },
    { cat: '零售 / 复盘', t: '促销复盘自动报告', d: '促销数据自动汇总、归因，直接交回一份复盘报告。', f: 'retail' },
    { cat: '营销 / 投流', t: '短剧投流日报', d: '多平台投放数据回收，日报自动生成。', f: 'ad' },
    { cat: '内容 / 运营', t: '新媒体运营工作台', d: '选题、成稿、分发在一个工作台里跑完。', f: 'media' },
    { cat: '内容 / 排版', t: '公众号批量一键排版', d: '多篇稿件一次排版，重复操作交给它。', f: 'wechat' },
    { cat: '办公 / 写作', t: '人机双写', d: '人和 AI 同一份文档里协作改稿。', f: 'writing' },
    { cat: '企业 / 问答', t: '企业办公提效 8 问', d: '采购前最常问的 8 个问题，一次答清。', f: 'faq' },
    { cat: '研发 / 文档', t: '从代码生成到文档反推', d: '小程序开发实战，代码写完文档也有了。', f: 'dev' }
  ];
  $('#demoGrid').innerHTML = demos.map(v => `
    <div class="vcard" data-video="assets/videos/demo-${v.f}.mp4" data-title="${esc(v.t)}" data-desc="${esc(v.d)}">
      <div class="cover"><img src="assets/posters/demo-${v.f}.jpg" alt="${esc(v.t)}" loading="lazy"><span class="p">▶</span><span class="dur">片段 26s</span></div>
      <div class="info"><div class="cat">${esc(v.cat)}</div><h4>${esc(v.t)}</h4><p>${esc(v.d)}</p></div>
    </div>`).join('');

  const caseCats = [
    { k: 'all', label: '全部（12）' },
    { k: 'digital', label: '数字人 · 口播带货' },
    { k: 'live', label: '直播 · 电商促销' },
    { k: 'food', label: '美食 · 餐饮助农' },
    { k: 'beauty', label: '美妆 · 健康医美' },
    { k: 'fashion', label: '服饰 · 珠宝搭配' },
    { k: 'drama', label: '短剧 · 创意特效' }
  ];
  const cases = [
    ['digital', '08', '数字人口播 · 案例 08'], ['digital', '23', '数字人口播 · 案例 23'],
    ['live', '02', '电商促销 · 案例 02'], ['live', '14', '电商促销 · 案例 14'],
    ['food', '01', '餐饮助农 · 案例 01'], ['food', '38', '餐饮助农 · 案例 38'],
    ['beauty', '11', '美妆健康 · 案例 11'], ['beauty', '49', '美妆健康 · 案例 49'],
    ['fashion', '10', '服饰珠宝 · 案例 10'], ['fashion', '28', '服饰珠宝 · 案例 28'],
    ['drama', '07', '短剧特效 · 案例 07'], ['drama', '25', '短剧特效 · 案例 25']
  ];
  $('#caseFilters').innerHTML = caseCats.map((c, i) =>
    `<button class="tab ${i === 0 ? 'active' : ''}" data-cfilter="${c.k}">${c.label}</button>`).join('');
  const caseLabel = k => (caseCats.find(c => c.k === k) || {}).label || k;
  function renderCases(filter) {
    const list = filter === 'all' ? cases : cases.filter(c => c[0] === filter);
    $('#caseGrid').innerHTML = list.map(([k, n, t]) => `
      <div class="case-card" data-video="assets/cases/${k}-${n}.mp4" data-title="${esc(t)}" data-desc="${esc(caseLabel(k))} · 零点引擎《零小剪》AI 内容创作引擎生成">
        <div class="cover">
          <img src="assets/posters/case-${k}-${n}.jpg" alt="${esc(t)}" loading="lazy">
          <span class="p">▶</span>
          <span class="lb">${esc(t)}<small>行业成片 · 点击播放</small></span>
        </div>
      </div>`).join('');
  }
  renderCases('all');

  /* ---------------- 07 · FAQ ---------------- */
  const faqs = [
    ['跟 ChatGPT 这类聊天 AI 有什么不同？', '最直白的差别：聊天 AI 给你一段答案，WorkBuddy 给你一份干完的活。它能在你指定的工作目录里读写文件、调用技能、连接公司系统，按目标自己拆步骤执行，交回来的是文档、表格、PPT、网页。你不需要一直盯着，也不需要把结果复制来复制去。'],
    ['公司资料会不会传出去？安全吗？', '三层防护：权限模式（Ask / Plan / Craft）决定它能动什么、运行沙箱与黑白名单隔离、入口拦截与熔断。企业版另有 SSO、组织架构、操作留痕、用量审计，支持 VPC 专享与私有化部署，可签 DPA。资质口径：首批通过信通院可信 AI 智能体评估、智能体 PIA 二星+级。敏感场景建议先小范围试点并做权限评审。'],
    ['员工不会用怎么办？要培训多久？', '界面就是「说一句话」，比记业务系统菜单简单。渠道材料的落地方式是：全员配上 → 交几件真活干出样板 → 全公司照着用，原厂与本地认证伙伴提供陪跑。真正需要培训的不是操作，而是「把目标说清楚」——记住三要素：做什么、有什么材料、要什么样。'],
    ['要换掉现有的 ERP / OA / 文档系统吗？', '不用。系统继续管记录、跑流程；数字员工通过连接器与 MCP 连上它们，把系统干不了的活补上：读懂内容、做分析、处理流程外的例外、跨系统串活、交成果。这是叠加，不是替换。'],
    ['多少钱？怎么判断够不够用？', '个人版 0 / 99 / 199 / 999 元每月四档，企业版 2,376 元/人/年（SaaS，1 坐席起）与 3,792 元/人/年（专有云，100 坐席起）。采用「订阅 + 积分」：账号费固定，积分按实际任务消耗。别按积分算，按「件」算——先全员真用一个月，用账单除以产出件数，再和以前外包、加急的单价对比。价格会随活动调整，下单前看腾讯云公示。'],
    ['一个人买和公司买，差别在哪？', '个人版是本机客户端、纯个人、无协作与管理后台。企业版多出团队共享积分池、多人多 Agent 协同、共享上下文与知识资产、SSO / 权限 / 审计 / 成本分析、企业自定义技能与专家、云端 7×24 自动化、专属客户成功经理与 SLA。判断标准只有一句：是否多人协作、是否要管理与合规。'],
    ['人不在电脑前还能用吗？', '可以。Claw 远程模式支持从微信 / 企微 / QQ / 飞书 / 钉钉发指令，由电脑上的 WorkBuddy 执行；微信小程序另有「云上模式」，云端沙箱即开即用，通勤差旅不依赖电脑在线。注意电脑模式需要 PC 开机联网、未休眠，锁屏不影响。'],
    ['我们行业很特殊，能定制吗？', '可以，路径通常是三步：先改知识层（把行业规范、模板、历史案例接进资料库），再改技能层（把高频做法做成 Skill / 专家），最后改连接层（用 MCP 接自家业务系统）。行业案例清单显示，跨行业复用的骨架高度通用，差异化主要在行业知识与合规护栏。'],
    ['页面上的效率和收益数字能直接引用吗？', '请按出处引用，不要混用。本页数字分别来自腾讯云渠道材料、公开客户分享卡与《FDE 案例 100》等整理资料，均为特定客户、特定场景下的口径，不构成通用效果或收益承诺。对外提案时建议写明来源，并引导客户先跑一个月建立自己的基线。']
  ];
  $('#faqList').innerHTML = faqs.map((f, i) => `
    <div class="faq-item">
      <button class="faq-q"><span class="n">${String(i + 1).padStart(2, '0')}</span><span>${esc(f[0])}</span><span class="plus">+</span></button>
      <div class="faq-a"><div>${esc(f[1])}</div></div>
    </div>`).join('');

  /* ---------------- 交互 ---------------- */
  // Tab：岗位
  $('#roleTabs').addEventListener('click', e => {
    const b = e.target.closest('[data-rtab]'); if (!b) return;
    $$('#roleTabs .tab').forEach(x => x.classList.toggle('active', x === b));
    $$('#rolePanels .tab-panel').forEach(p => p.classList.toggle('active', p.id === 'rpanel-' + b.dataset.rtab));
  });
  // Tab：视频两大类
  $('#videoTabs').addEventListener('click', e => {
    const b = e.target.closest('[data-vtab]'); if (!b) return;
    $$('#videoTabs .tab').forEach(x => x.classList.toggle('active', x === b));
    $$('#videos .tab-panel').forEach(p => p.classList.toggle('active', p.id === 'vpanel-' + b.dataset.vtab));
  });
  // 行业成片筛选
  $('#caseFilters').addEventListener('click', e => {
    const b = e.target.closest('[data-cfilter]'); if (!b) return;
    $$('#caseFilters .tab').forEach(x => x.classList.toggle('active', x === b));
    renderCases(b.dataset.cfilter);
  });
  // FAQ 折叠
  $('#faqList').addEventListener('click', e => {
    const q = e.target.closest('.faq-q'); if (!q) return;
    const item = q.parentElement, wasOpen = item.classList.contains('open');
    $$('#faqList .faq-item').forEach(x => x.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });

  // 视频弹窗
  const modal = $('#videoModal'), video = $('#modalVideo');
  const pModal = $('#purchaseModal');
  function openVideo(el) {
    const src = el.dataset.video; if (!src) return;
    $('#modalTitle').textContent = el.dataset.title || '视频演示';
    $('#modalDesc').textContent = el.dataset.desc || '';
    video.src = src;
    video.setAttribute('playsinline', '');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    const p = video.play(); if (p && p.catch) p.catch(() => {});
  }
  function closeVideo() {
    modal.classList.remove('open');
    video.pause(); video.removeAttribute('src'); video.load();
    if (!pModal.classList.contains('open')) document.body.style.overflow = '';
  }
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-video]');
    if (el) { e.preventDefault(); openVideo(el); }
  });
  $('#modalClose').addEventListener('click', closeVideo);
  modal.addEventListener('click', e => { if (e.target === modal) closeVideo(); });

  // 购买引导弹窗（06 · 怎么买）
  function openPurchase() {
    if (modal.classList.contains('open')) closeVideo();
    pModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closePurchase() {
    pModal.classList.remove('open');
    if (!modal.classList.contains('open')) document.body.style.overflow = '';
  }
  $$('[data-purchase]').forEach(b => b.addEventListener('click', openPurchase));
  $('#purchaseClose').addEventListener('click', closePurchase);
  pModal.addEventListener('click', e => { if (e.target === pModal) closePurchase(); });

  // ESC 关闭当前弹窗
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (pModal.classList.contains('open')) closePurchase();
    else if (modal.classList.contains('open')) closeVideo();
  });

  // 移动导航
  $('#burger').addEventListener('click', () => $('#navLinks').classList.toggle('open'));
  $$('#navLinks a').forEach(a => a.addEventListener('click', () => $('#navLinks').classList.remove('open')));

  // 滚动：淡入 / 导航高亮 / 返回顶部
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: .08, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach(el => io.observe(el));
  // 动态渲染出的卡片也加上淡入
  $$('#featureGrid .card, #industryGrid .ind').forEach(el => { el.classList.add('reveal'); io.observe(el); });

  const navLinks = $$('#navLinks a');
  const sections = navLinks.map(a => $(a.getAttribute('href'))).filter(Boolean);
  const toTop = $('#toTop');
  function onScroll() {
    const y = window.scrollY + 120;
    let active = sections[0];
    sections.forEach(s => { if (s.offsetTop <= y) active = s; });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + (active && active.id)));
    toTop.classList.toggle('show', window.scrollY > 620);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();
