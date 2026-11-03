# v2.9.31 代码 / UI / 截图归档台账

- 归档日期：2026-11-03
- 主文件：`es-web-integrated.html`
- 数据层：`latest-preview/data.js`
- 截图目录：`changelog-shots/v2.9.31/`

## 1. 前端代码位置（`es-web-integrated.html`，行号随编辑漂移，以函数名为准）

| 函数 / 选择器 | 存档内容 |
|---|---|
| `setEncMain(mode)` | 控制 `#view-preview` 与 `#encWrap` 互斥显隐；`mode==="enc"` 进入图鉴，`mode==="pv"` 才进入活动预览并渲染 `renderPreview()`。 |
| `encNav` | 图鉴三层视图状态：`units`=组合块、`role`=角色卡网格、`card`=单卡详情；另存 `role`、`card`、`q`。 |
| `encRoles()` | 合并旧 `ENCY` 8 人与 `ENC_RECENT` 9 条；为每张卡补 `stars`；近期条目按 `server` 归入「近期 ★5 · 日服 JP」或「近期 ★5 · 国服 CN」。 |
| `encGroupList()` | 当前展示顺序带 `prod`：Star Production（Trickstar、流星隊）→ CosPro（Eden、Crazy:B、2wink）→ 其他/近期 JP/CN。 |
| `encUnitsHTML(roles)` | 一级组合块：顶部 `.eg-index` 快速定位锚点、`details.eg-unit` 折叠块、★收藏置顶（`encPinnedGroups()` 写 localStorage）、组合头与成员最新卡缩略。 |
| `encRoleHTML(role)` | 二级角色页：返回组合列表、角色情报、五星卡面分区、其他星级分区、卡块网格；每张卡带未开花/开花切换按钮。 |
| `encCardHTML(role,idx)` | 三级单卡详情：主图切换按钮 + 未开花/开花双缩略；右侧角色、组合、星级、属性、卡名、来源、3DMV服装、原文链接、备注行。 |
| `renderEnc()` | 按 `encNav.view` 输出三层 HTML；绑定搜索输入、`img[data-zoom]` 灯箱、缺失旧图 `onerror` 占位、外链跳转。 |
| `window.encOpenRole / encOpenCard / encBackRole / encBackUnits / encTogglePin / encJump / encToggleBloom` | 供组合块、角色块、卡块、收藏星、锚点跳转和花前/花后切换的内联点击调用。 |
| `bannerHTML(b)` | 在 `.pv-media` 横幅图内输出 `.pv-cd[data-end]` 倒计时角标；倒计时绑定到顶部活动宣传图横幅，不绑到 ★5 卡面。 |
| `cardHTML(c)` | ★5 当期卡片只输出静态 `.pv-period` 起止日期，移除卡片上的实时倒计时。 |
| `pvCdTick()` | 委托刷新 `#view-preview .pv-cd[data-end]`；剩余 ≤24h 标红，到期显示「已结束」。 |
| `renderPreview()` | `cardsOf(MODE)` 取当期；`encRec` 先按 `MODE` 过滤 `server`（jp→JP，cn→CN），再用 `curChars` 在渲染层排除当期角色；底层 `ENC_RECENT` 不删除、不改写。 |
| `renderLog()` | 详细日志支持 `detail`、`ui`、`code`、`shots`；截图节点点击 `openZoom()` 放大。 |
| CSS：`.eg-mode / .eg-unit / .eg-uhead / .eg-mem-grid / .eg-rep` | 图鉴一级组合块与成员缩略；`.eg-mode` 隐藏旧左列 `.enc-side`。 |
| CSS：`.eg-role-head / .eg-sec / .eg-grid / .eg-card / .eg-pic` | 图鉴二级角色头、星级分区和卡面网格；含星级角标、真图状态、未开花/开花标签。 |
| CSS：`.eg-detail / .eg-mainpic / .eg-thumbs / .eg-row` | 图鉴三级详情布局：主图、双缩略、表格化信息行。 |
| CSS：`.pv-banner / .pv-media / .pv-banner .pv-cd` | 活动预览横幅等宽展示；倒计时为横幅图上的深色角标。 |
| CSS：`.pv-rec / .pv-rec-server` | 近40天图鉴式记录卡；国服 CN 蓝色标记，日服 JP 紫色标记。 |

## 2. 数据层（`latest-preview/data.js`）

| 位置 | 存档内容 |
|---|---|
| `bn-cn-night` | `group:"current"`；`startISO:"2026-10-24T12:00:00+08:00"`；`endISO:"2026-11-04T22:00:00+08:00"`；图为 `preview_img/banner/bn-cn-night.jpg`；缺高清图时只打待替换标记，不插值放大。 |
| `ENC_RECENT` | 每条含 `server:"JP"` 或 `server:"CN"`、`dateISO`、`name`、`info`、`cards`、`outfits`；前端按顶部 CN/JP 按钮过滤，禁止两服记录混排。 |
| 旧 `ENCY` | 8 个旧收录对象继续保留；旧资产缺失时前端显示占位，不裂图、不猜图。 |

## 3. UI 变更摘要

1. 图鉴恢复为老版三层视觉：一级组合块、二级角色卡网格、三级单卡详情。
2. 组合块展示队长待核实、5★/4★/成员计数与成员最新卡缩略；卡块展示星级、真图已入库/待补官方图、未开花/开花标签和来源徽标。
3. 单卡详情为左侧主图 + 花前/花后双缩略，右侧列出角色、组合、星级、属性、卡名、来源、服装和备注。
4. 布局小样：总览组合块两列紧凑展示，便于容纳更多组合；单卡详情桌面保持左图右表。
5. 总览小样：每个组合整行展示；按 Star Production → CosPro → 其他/近期记录分组，成员缩略横向紧凑排列。
6. 活动预览顶部横幅承担实时倒计时；★5 卡片只显示静态档期。
7. 近40天追加按 CN/JP 严格分服，采用图鉴式记录：服务器色标 + 情报 + 卡面缩略/占位 + 来源。
8. 更新日志详细版支持展开查看 UI、代码位置、截图缩略图并点击放大。
9. 交互小样：顶部快速定位锚点、组合折叠、★收藏置顶；角色网格与详情主图支持未开花/开花按钮切换；近期追加列表渲染层排除当期角色。

## 4. 截图清单

| 文件 | 用途 |
|---|---|
| `enc-units.png` | 图鉴一级组合块：组合头、队长待核实、星级计数与成员最新卡缩略。 |
| `enc-role-grid.png` | 图鉴二级角色页：五星/其他星级分区卡面网格与未开花/开花标签。 |
| `enc-card-detail.png` | 图鉴三级单卡详情：返回角色页、主图、双缩略与右侧信息行。 |
| `layout-units-two-col.png` | 布局小样：总览组合块两列紧凑展示。 |
| `layout-detail-two-col.png` | 布局小样：单卡详情左图右表布局。 |
| `layout-rows-star-cospro.png` | 总览小样：组合整行、Star Production 先于 CosPro 分组。 |
| `enc-index-nav-collapse.png` | 快速定位锚点、折叠箭头与收藏星标小样。 |
| `enc-bloom-grid-toggle.png` | 角色网格未开花/开花按钮；缺花后图时开花按钮禁用。 |
| `enc-bloom-detail-toggle.png` | 单卡详情主图切换按钮与双缩略槽。 |
| `recent-dedup-cn.png` | CN 近期列表渲染去重后保留 3 条。 |
| `recent-dedup-jp.png` | JP 近期列表渲染去重后保留 3 条。 |
| `enc-main.png` | 改造前旧左列视图留档。 |
| `banner-countdown-cn.png` | 当期宣传图横幅上的倒计时角标。 |
| `recent-cn.png` | 国服 CN 近40天追加记录。 |
| `recent-jp.png` | 日服 JP 近40天追加记录。 |

## 5. 校验记录

- `node _chk.js`：`blocks= 9 bad= 0 dataExit= 0`
- `node --check latest-preview/data.js`：通过。
- 浏览器实测：图鉴组合层正常输出分组小标题 Star Production、CosPro、其他/限定收录、近期记录；组合顺序为 Trickstar、流星隊、Eden、Crazy:B、2wink、SPP、近期 JP、近期 CN；成员块 17 个；角色页可进入；单卡详情输出 9 行信息、左右两栏与 2 个缩略槽。
- 浏览器实测：图鉴组合层输出 8 个锚点、8 个折叠组合块、8 个收藏星标；收藏 Trickstar 后进入「已置顶收藏」；组合折叠可通过 summary 点击收起；成员块 17 个。
- 浏览器实测：角色网格与单卡详情均渲染未开花/开花按钮；当前本地图鉴数据缺少可靠花后图的卡片，开花按钮保持禁用；不伪造花后素材。
- 浏览器回归：活动预览仍渲染 3 条横幅、3 个 `data-end` 倒计时节点；近期列表渲染去重后 CN 3 条、JP 3 条；底层 `ENC_RECENT` 数据未改写。
- 缺失旧图资源触发 `onerror` 占位替换，不报 JS 语法错误；只剩本地旧图片文件不存在的资源 404。

## 6. 未覆盖 / 待补口径

- 国服涟纯/夏目花后、日服 AREA07 高峯翠/葵裕太竖版花前花后仍缺官方稳定图，保持占位，不拿旧卡、群像预告或聊天截图顶替。
- 队长位无官方核实时统一显示「队长：待核实」，不臆断队长。
- 属性字段仍待官方/wiki 核实；当前只显示待补口径，不编造 Da/Vo/Pf。
