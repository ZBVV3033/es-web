# 合并端口说明（负责人并入主站时按此对接）

> 目标：在**主站顶部导航**把「卡面图鉴」与「最新★5预览」做成并列模块、上方切换；主站**下方既有内容一律不动**。
> 本地预览壳：仓库根 `preview-hub.html`（顶部两标签 + iframe）仅供本地查看；**已决策为直接内联正式版，不以 iframe 作为交付形态**，合并按 §2 第4步内联。
> 模块源：`latest-preview/`（最新预览）、`cards-workbench/sample/cards_sample.html`（卡面图鉴）。

## 1. 主站现有切换机制（本地快照 `root_index.html` 实测；行号仅定位，真实仓库以克隆后的 index.html 为准）
- **顶部标签**：`#page-es` 内 `.es-tabs` 在 **L863–870**；按钮 `data-view` 依次为 `acc(864,hidden) / mv(865) / enc图鉴(866) / timeline五星时间线(867,默认active) / jp日服情报(868) / sched卡池排期(869)`。新增按钮放在 `enc`(866) 之后。
- **视图容器**：`.es-view` 在 **L871–899**：`#view-acc(871)`、`#view-mv(874)`、`#view-enc图鉴(881–886)`、`#view-timeline(887–893)`、`#view-jp(894)`、`#view-sched(897)`；新增 `#view-preview` 建议紧跟 `#view-enc` 之后。默认可见 `#view-timeline`，其余 `hidden`。
- **切换 JS**：`switchEsView(view)` 在 **L2997–3010**：①L2998 给匹配按钮加 `active`；②**L2999 视图数组** `["acc","mv","enc","timeline","jp","sched"]` 控制 `#view-<v>` 的 hidden；③L3003–3008 按视图调用 `renderAcc/renderMv/renderEnc/renderTimeline/renderJp/renderSched`；④L3009 `updateMobileNav("es",view)`。接入需三处：视图数组加 `"preview"`、加 `if(view==="preview") renderPreview();`、新增 `#view-preview` 与按钮。
- `renderEs()`（L2941）是空壳注释，真正显隐由 `switchEsView` 负责；`switchPage("es")`（L2983–2995）只负责页面级容器与调 `renderEs()`。
- **移动端**：`#mNav` 在 L966，由 `updateMobileNav` 生成；克隆真实仓库后需核对其视图映射是否也要登记 `preview`（桌面标签已切到的前提下，移动导航补齐即可）。
- 本次“最新预览”沿用 `es-tab + data-view` 风格，不另起导航体系；下方 `page-songs/wz/term/log` 等 section 一律不改。

## 2. 建议补丁（最小改动）
1. 顶部标签组新增一项（放在 `enc 图鉴` 之后即可）：
   ```html
   <button type="button" class="es-tab" data-view="preview">最新预览</button>
   ```
2. 新增视图容器（与现有 `#view-enc` 同级）：
   ```html
   <section id="view-preview" class="es-view" hidden></section>
   ```
3. 切换逻辑里注册 `preview`：点击 `es-tab` 时，隐藏其它 `.es-view`、显示 `#view-preview`；首次进入再初始化渲染（懒加载，避免拖慢主站首屏）。
4. 落地方式（**已决策＝直接内联正式版**，不采用 iframe 交付）：
   - 把 `latest-preview/data.js` 的三个全局数组（`PREVIEW_CARDS/PREVIEW_BANNERS/PREVIEW_META`）与 `index.html` 中的 `localISO/shiftISO/cardsOf/bannersOf/cardPic/cardHTML/bannerHTML/render` 内联进 `#view-preview`，复用主站配色与组件、去掉 iframe；
   - `preview-hub.html` 只作本地预览参考，不进入主站正式运行链路；内联后图片 `img` 前缀按 §4 映射改写，避免相对路径失效；
   - 若内联时体积敏感，可把 `data.js` 作为独立脚本由主站 `<script>` 引入（数据与渲染分离），但视图 HTML/JS 必须落在主站 `#view-preview`，而非 iframe。

## 3. 数据契约（`latest-preview/data.js`，正式内联时必须保持字段一致）
三个全局数组：
- `PREVIEW_CARDS`：单人★5卡；`PREVIEW_BANNERS`：宣传横幅；`PREVIEW_META`：标题/口径/兜底说明。

卡片字段：
`id, mode(cn|jp), group(current|recent30d|archive), star(固定5), char, card, sourceType(event|scout), sourceName, dateISO(YYYY-MM-DD), type, img, imgReady(bool), sourceUrl, note, lowQuality(bool)`
横幅字段：
`id, mode, title, dateISO, kind(event|scout), img, imgReady(bool), lowQuality(bool), sourceUrl, note`

关键规则（并入后不得破坏）：
- `group=archive` 永不渲染；页面只渲染 `current` 与 `recent30d`。
- `imgReady=false` 只渲染占位框、**不插 `<img>`**，避免离线裂图或挂错人；拿到并目视核验后才置 `true`。
- `recent30d` 由页面按本机日期自动判定：`TODAY=本地当天`，`WIN_START=TODAY-29天`；当期(current)条目不重复进近30天。正式内联时保留 `localISO/shiftISO/TODAY/WIN_START` 逻辑，不要写死日期。
- 稀有度只认框色+星数：金/红框 + 五颗亮星 = ★5；绿框★4、蓝框★3、多人同框**禁止**进★5网格。
- CN 与 JP 严格分开，不把日服图当国服。

## 4. 图片与替换标记约定（统一替换用）
- 目录：卡面 `latest-preview/preview_img/cards/`；横幅 `latest-preview/preview_img/banner/`。并入主站时建议映射到主站 `assets/preview/cards|banner/`，并在 `data.js` 内把 `img` 前缀改为对应相对路径。
- `lowQuality=true`：第三方/低清图，UI 角标显示“待官方替换”；主站应提供同款角标（横幅 `wiki横幅·待官方替换`，卡面 `待官方替换`）。拿到官方高清后：替换图片文件、`lowQuality` 置 `false`、更新 `note` 来源。
- `imgReady=true` 且无 `lowQuality` = 正式图；`imgReady=false` = 占位，禁止用过期/错人图顶替。

## 5. 当前资产与缺口（基准日 2026-11-02；近30天 2026-10-04～11-02）
已就位（均已目视本人/标题，第三方低清带 lowQuality 标记）：
- 当期卡面★5：`cards/jp-stage-nagisa.png`（乱凪砂，单卡1026378、池1027003，原文已核2026-10-25~11-10）。
- 归档卡面（不渲染）：`cards/jp-fv-tsukasa.png`（司，193430；池193443原文为2020旧复刻池）。
- 当期横幅：`banner/jp-stage-nagisa.jpg`（Stage：凪砂，对应★5凪砂已在网格）。归档横幅（不渲染）：司編`jp-scout-tsukasa.jpg`、ハロウィンBOX `jp-scout-halloween-box.jpg`，原文均为2020旧池/复刻，禁止冒充当期。
已纠错归档（group=archive，页面/横幅均不渲染，仅留档）：
- `banner/jp-scout-wata.jpg` 与池199178：2020旧复刻池，★5为旧卡［瞳に映る姿］涉，非2026当期。
- 旧作“!”活动 events/12（ダークナイトハロウィン，晃牙/凛月/零/ひなた）：非Music当期，不顶替。
待补（占位，不猜人）：
- CN 涟纯【觉醒的试炼】、逆先夏目【一起悠然度过的夏天】：人名/卡名已经官方微博核实为当期唯一★5，卡面与横幅待下载（微博详情见 data.js `sourceUrl`）。
- JP 其余进行中池子（ソレイユ/ドーリーナイト/Arcadian/宙編2/Stage真緒 等）★5：逐池核☆5行与单卡锚、目视金框五亮星本人后再入网格。

## 6. “每次更新主站也更新”的落地建议
- 数据与图片外置、与主站逻辑解耦：日常更新只改 `data.js` + `preview_img/`，不改主站视图代码。
- 手动版：替换 `data.js` 与图片目录后提交，主站顶部“最新预览”即更新。
- 自动版（可选）：主站数据层改为加载同目录 `data.js`（或主站构建时拷贝 `latest-preview/data.js` → 主站 assets）；用定时脚本抓取当期公告/单卡锚点、下载并目视规则校验（星框、人物署名、档期在窗口内）后自动置 `imgReady`。脚本默认 dry-run，不自动 PUT；提交前人工复核待核条目。
- 合并提交注意：不要覆盖主站下方既有视图；新增改动仅限顶部 tab、`#view-preview`、新增数据/图片资产三类。

## 7. 提交环境与落地顺序（2026-11-02 核对）
- 当前工作根 `new-chat-4` **不是 git 仓库**（无 `.git`、无 remote），`root_index.html` / `v2943_index.html` 仅为本地快照；真实仓库 `https://github.com/ZBVV3033/es-web` 需先克隆，以其 `index.html` 为准落地，不直接改快照冒充正式文件。
- 落地顺序：
  1. 克隆仓库到独立目录；**token 只用于临时 git 操作，不写入 remote/config/任何仓库文件、不进 commit message 与文档**，任务完成后建议在 GitHub 轮换令牌。
  2. 按 §1 实测锚点在真实 index 增加：顶部 `data-view="preview"` 按钮、`#view-preview` 容器、`renderPreview()`、把 `"preview"` 加进 `switchEsView` 视图数组并注册渲染钩子；移动端 `#mNav` 映射一并核对。
  3. 第一版采用**数据外置**：主站以 `<script src="latest-preview/data.js"></script>` 引入三数组，视图 HTML/渲染 JS 落在 `#view-preview`（无 iframe，符合“直接内联正式版”）；`imgReady=true` 的图在主站根引用时统一加前缀 `latest-preview/`，或按 §4 迁入 `assets/preview/` 后改前缀（二选一，先求可用、再做目录美化）。
  4. 浏览器核对：图鉴↔最新预览切换、CN/JP 切换、当期/近30天计数、archive 不渲染、低清角标、占位不裂图、既有 `acc/mv/enc/timeline/jp/sched` 视图无回归。
  5. 提交 `latest-preview/`（data.js + preview_img）、主站补丁后推送 main；提交前跑 `PLAN.md §5` 验收清单。
- 回滚边界：新增只追加 tab / `#view-preview` / 外置脚本 / 素材，不改既有渲染函数主体；异常时单独移除新增元素与 `renderPreview` 即可恢复原状。
- 已知素材现状：当期就位卡面 1（凪砂）、当期就位横幅 1（凪砂），均 lowQuality；归档旧池卡面/横幅仅留档不渲染；CN 两条 `imgReady=false` 占位；`preview_img/xhs_ref/` 为拒收参考图，不被 `data.js` 引用、不随主站功能必需提交（可保留在 data 目录但不挂载）。

### 7.1 本地集成验证（2026-11-03；工作副本 `es-web-integrated.html`，由快照 `root_index.html` 复制后落补丁，非正式仓库文件）
- 已按 `INLINE_PATCH.md` 落地：顶部「图鉴 / 最新预览」相邻切换、`#view-preview` 隔离 CSS（`pv-` 前缀 + `#view-preview` 作用域）、`switchEsView` 注册 `preview`、`<script src="latest-preview/data.js">` 外置引入、**无 iframe**，符合“直接内联正式版”。
- 浏览器 DOM 断言通过：CN 当期卡 2 / 横幅 2、零 `<img>`（占位不裂图）、待补角标 2、横幅占位 2；JP 当期卡 1 / 横幅 1、实际图片 2（凪砂卡面 + 凪砂横幅）、卡片/横幅容器内不含司編/ハロウィンBOX/渉編旧池条目、角色=乱凪砂；切回既有 `enc` 视图可见、离开 preview 自动隐藏；副本全部内联脚本 `node --check` RC0。
- 仍待真实仓库与上线：①当前目录非 git、到 github.com 此前 TLS/连接失败，未克隆真实 `index.html`，标签/`switchEsView` 锚点需在克隆后复核；②移动端窄屏换行/网格未截图核对；③远程提交推送待网络可达后按 §7 顺序执行，token 不写入 remote/config/文件/commit、完成后轮换。

### 7.2 图鉴模块（enc）老格式近期填充（2026-11-03）
- 用户拍板：**保留旧图鉴“左侧角色按钮＋右侧卡面/服装网格”老格式，不新增独立横幅位**；最近30天 CN/JP ★5 人物置顶优先填充，原 8 条手工图鉴后置。
- 数据外置 `data.js -> ENC_RECENT`（共 9 条：JP 4＝凪砂10-25〔就位真图〕、朱樱司10-10、衣更真绪10-14、Raika10-15；CN 5＝涟纯10-31、逆先夏目10-30、月永雷欧10-17、游木真10-16、神崎飒马10-12）。`renderEnc` 合并规则：`REC 按 dateISO 倒序置顶 + G.ENCY 其余后置`；无图条目渲染 `.enc-img-ph` 占位框＋卡名/五星/备注/来源链接；旧 `assets/cards/*` 失效图由 `img.onerror` 替换为占位，不裂图、不猜图。
- 验证：集成副本内联脚本 RC0、`data.js` RC0；浏览器断言角色按钮 17（9 近期＋8 旧手工）、最新 10-31 涟纯置顶、凪砂真图 1 张、旧手工条目保留、切回“最新预览”视图回归正常；Node 数据断言 REC=9、日期落在 2026-10-05～11-03、不引用归档旧图与旧池链接。
- 边界：司 1021078（2026-10-10）、真绪 1021904（2026-10-14）、Raika 1022639（2026-10-15）为 **Basic 体系**，已在 info 标明；归档 2020 司 193443／BOX 194659／涉 199178 不进入 `ENC_RECENT`；除凪砂外其余条目标准卡面未取得，保持占位文字状态，取得合格 ★5 图后再置 `img`。
