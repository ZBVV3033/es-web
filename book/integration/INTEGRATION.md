# es-web 图鉴 · 合并端口与集成说明（供负责人合并到主工程）

> 目的：把本工作台（cards-workbench）产出的**卡面图鉴模块**作为主网站「图鉴」视图的一部分合并进去。
> 边界：本工作台**不直接修改线上主工程、不保存 token、不自动 commit/push**；以下为标准化产物清单、字段契约、注入步骤与更新同步约定。

## 1. 当前产物现状（本地实测口径）

| 类别 | 数量 | 说明 |
|---|---|---|
| 五星全集 | 47 | 成对真图 22 + 单侧标准图 2 + 待补图占位 23 |
| 四星真图 | 40 | 成对 640×800 |
| 真图条目 | 64 | `cards_g5.js` 24 + `cards_g4.js` 40；`data/deploy_manifest.tsv` 显示 missing=0 |
| 图片文件 | 126 | `sample/img/g5/` 46 个、`sample/img/g4/` 80 个 |
| 占位数据 | 23 | `sample/cards_g5_placeholders.js`（空卡面 + 元数据，不绑定图片、不计真图数） |

- 四人：mao 衣更真绪(Trickstar)、jun 涟纯(Eden)、himeru HiMERU(Crazy:B)、kanata 深海奏汰(流星隊)。
- 归属红线：奏汰必须流星隊、不得 UNDEAD；151832 等千秋卡不得挂真绪；多人同框/近似宽卡不自动入库。

## 2. 可合并产物清单

### 2.1 数据模块（独立 JS，便于替换）
| 文件 | 作用 |
|---|---|
| `sample/cards_g5.js` | 五星真图数组 `ES_CARDS_G5`（24 条：22 成对 + 2 单侧） |
| `sample/cards_g4.js` | 四星真图数组 `ES_CARDS_G4`（40 条） |
| `sample/cards_g5_placeholders.js` | 五星占位数组 `ES_G5_PLACEHOLDERS`（23 条，空卡面） |
| `data/g5_master_full.tsv` | 四人五星全集台账（art=pair/single/none） |
| `data/deploy_manifest.tsv` | 条目→绑定图片文件清单（用于部署前核对缺失） |

### 2.2 UI 渲染（从 `sample/cards_sample.html` 抽取）
- CSS：`.card/.pic/.rbadge/.status-tag/.st-ready/.st-single`、五星/四星分区 `.sec-title`、占位卡 `.ph-card/.ph-pic/.ph-tag/.ph-empty`。
- JS 渲染：`renderUnits()`（组合→成员最新卡）、`renderRole()`（角色页五星/四星分区 + 待补图占位网格）、`cardHTML()`（真图/单侧/切换按钮）、`switchForm()`、`openDetail()/renderDetail()`、`zoomMain()/closeZoom()`。
- 数据合并：`ES_CARDS = [...ES_CARDS_G5, ...ES_CARDS_G4]`；占位数组仅用于角色页占位网格，**不并入真图计数**。

### 2.3 图片资源
- 命名约定：未开花 `<wikiId>_h1.<ext>`，开花（默认显示）`<wikiId>_h2.<ext>`。
- 部署目录建议：主工程 `assets/cards/g5/`、`assets/cards/g4/`；合并时把 `img/` 内相对路径前缀统一替换为部署前缀。

## 3. 数据字段契约（合并后保持一致）

| 字段 | 取值/说明 |
|---|---|
| `id` | `g5_<wikiId>` / `g4_<wikiId>`，稳定主键 |
| `role` | `mao` / `jun` / `himeru` / `kanata` |
| `star` | 5 或 4；不写 Da/Vo/Pf 三围、中心/Live 技能、完凸数值 |
| `type` | 四色：`Sparkle` / `Brilliant` / `Flash` / `Glitter`（仅颜色属性，不写数值） |
| `jp` / `en` / `cn` | 日文卡名 / 英文 / 中文；`cn` 为意译，标注“待国服官方译名校准” |
| `status` | `ready`（真图/单侧）；占位条目不进 `ES_CARDS` |
| `img` / `imgBloomed` | 开花图（默认显示）；`imgBefore` 为未开花图 |
| `srcType` | `scout`（卡池）/ `event`（活动）/ `""`（无法归类不臆造） |
| `srcCat` | `feature` / `memorial` / `newsong` / `tour` / `point` / `""` |
| `srcName` / `srcDate` | 来源卡池/活动名、追加日期 |
| `link` | 权威单卡页 URL（gamerch） |
| `note` | 口径备注；`side:"single"` 表示单侧缺对侧；`mvOutfit`/`mvVerified` 仅在权威 MV 衣装一覧核实后填写 |

## 4. 负责人合并步骤（建议顺序）

1. **备份**主工程 `index.html`（及 `versions/<当前版本>/index.html`），先在本地副本操作。
2. **导航**：沿用现有「图鉴」入口标签；在该视图容器内**替换旧 `renderEnc` 卡面区**为上述图鉴视图；保留服装页、账号页等其他模块不动。
3. **注入样式**：把第 2.2 节 CSS 合并进主工程 `<style>`（避免与既有类名冲突时加 `es-` 前缀）。
4. **注入数据与渲染**：先放数据 JS，再放 `ES_CARDS` 合并与渲染函数；占位数组仅在角色页渲染占位网格。
5. **图片路径**：拷贝 `sample/img/g5|g4` 到部署目录，把数据中的 `img/g5/...`、`img/g4/...` 前缀替换为部署前缀。
6. **本地验证**（合并后必跑）：
   - 真图条目 missing=0（对照 `data/deploy_manifest.tsv`）；
   - 角色归属断言：奏汰=流星隊、真绪=Trickstar、涟纯=Eden、HiMERU=Crazy:B；
   - 计数：真图 5★24 / 4★40；占位 23 张不进真图统计；
   - 单侧 2 张带“单侧·缺对侧”角标；占位卡无图片请求、不显示低清缩略。
7. **部署**：确认无误后再按主工程既有发布流程上线；本工作台不执行发布。

## 5. 更新同步机制

### 5.1 当前（无仓库克隆 / 无 token / 禁止推送）
- 单向手动：本工作台是**数据源**，主工程是**发布端**。
- 本地更新流：新增或替换真图 → 更新 `cards_g5.js`/`cards_g4.js` → 重跑 `scripts/export_bundle.py` 复核 missing=0 → 负责人按第 4 节把数据 JS、CSS/JS 片段、图片替换到主工程。
- 本仓**不内置、不保存任何访问 token，不自动 commit/push**。

### 5.2 未来可选自动同步（需负责人提供受控环境）
- 若后续获得只读 + 推送权限，可新增独立同步脚本调用 GitHub Contents API：把数据 JS 与图片清单生成 `dist/`，按 commit 信息“chore(ency): sync card data”提交；**密钥必须由 CI 或负责人保管，不写入仓库**。
- 自动同步前仍需先过第 4.6 节本地验证，避免把错误归属/低清图发布出去。

## 6. 质量红线（合并与后续补图都适用）
1. 图片必须本人、朝向正确（未开花/开花不挂反、不挂他人）。
2. 不用 320×400 缩略、横版横幅、去框立绘顶替标准卡面；不做 AI 超分。
3. 元数据（四色类型、来源、日期、MV 有无）以权威页面为准；中文缺漏补意译并标注待校准。
4. 多人同框、近似宽度（639/643）卡默认不收；若放宽口径需逐张勾选并打标注（见 `data/g5_checkin_list.md`）。
5. 补图优先级：先以占位卡保证“全部五星可见、名单不缺漏”；一旦取得合规标准成对图，再替换对应占位条目并保留来源记录。

## 7. 相关证据与清单文件
- 通道实测：`data/source_channel_eval.md`（官方穷尽结论、非官方通道适用性）
- 候选处置：`data/g5_checkin_list.md`、`data/g5_visual_verdict.md`
- 全集台账：`data/g5_master_full.tsv`、`data/inventory_master.tsv`
- 可复跑脚本：`scripts/build_placeholders_js.py`、`scripts/export_bundle.py`、`scripts/analyze_g5_full.py`
