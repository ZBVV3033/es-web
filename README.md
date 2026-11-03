# es-web 图鉴重做 · 协作工作台（cards-workbench）

> 用途：换机协作。本目录是**重做过程中的小样 + 可复跑管线 + 数据清单**，隔离存放，**不改动线上主工程**（根 `index.html`、`versions/`、`assets/` 保持原样）。
> 当前阶段：**静态小样 v0.7（已接入首批 15 张五星真图）**；尚未集成进主工程、尚未部署 Pages。

---

## 一、目录结构

```
cards-workbench/
├─ README.md                     # 本说明：口径 / 进度 / 缺口 / 复跑步骤 / 红线
├─ 图鉴重做计划.md                # 完整工作计划（含设计模型、分阶段、验收标准）
├─ sample/
│  ├─ cards_sample.html          # 两层视图小样：一级组合块逐人最新卡面 → 二级角色页五星/四星分区
│  ├─ cards_g5.js                 # ES_CARDS_G5：首批 15 条五星卡数据（数据与界面解耦）
│  └─ img/g5/<id>_h2.png         # 首批 15 张五星【花后/开花】真图，640×800
├─ data/
│  ├─ g5_all.tsv                  # gamerch 五星一览全量解析（200 条：id/日卡名/角色假名/h1/h2/日期/来源）
│  ├─ g5_focus.tsv                # 首批重点角色 15 条（含花前 h1、花后 h2 两个图 hash）
│  └─ stands_members.tsv          # 从主工程站位表 ES_STANDS_EXTRA 抽取的「组合=>显式成员」证据
├─ scripts/
│  ├─ parse_g5.ps1                # 解析五星一览 → data/g5_all.tsv、g5_focus.tsv（含花前h1/花后h2 hash）
│  ├─ download_g5.ps1             # 按 TSV 下载 h1(花前)/h2(花后) 原图并记录真实宽高
│  ├─ build_cards.ps1             # 由 g5_focus.tsv 生成 sample/cards_g5.js（数据与界面解耦）
│  ├─ verify.ps1                  # 自检：JS语法/记录数/图存在/归属红线（奏汰必须流星隊）
│  └─ run_all.ps1                 # 一键串联 parse→download→build→verify（新机推荐入口）
└─ checks/
   ├─ check_report.log            # 小样静态校验（JS 语法、图路径、括号配平、闭合）
   ├─ verify.log                  # 工作流自检结果（ready/star5/图缺失/归属断言）
   ├─ g5_parse.log                # 解析计数
   └─ g5_dl.log                   # 下载成功/失败、尺寸、字节
```

## 二、权威口径（防止挂错组合 / 写错名字，红线）

1. **组合归属以主工程为准**：`buildIdolGroups()`（按主组合曲出现次数推导，每偶像只归一个主组合）+ `ES_ROLE_NAMES`。**旧图鉴 `ENCY.unit` 错误多，禁止沿用**（实证：衣更真绪旧标 MaM，实为 Trickstar；深海奏汰旧样误挂 UNDEAD，**实为流星隊**，已在小样纠正）。
2. **角色规范中文名 / 日文名** 对齐主工程；gamerch 只提供**日文卡名、来源档期、卡图**，不决定角色归属。
3. **卡名三语**：日文＝gamerch/fandom 原文；英文＝fandom 标题（待逐卡补）；中文＝国服官方译名优先，无官方译名时意译并加 `*`，**不编造**；缺字段留空并在数据里标注。
4. **来源**：`scout`＝卡池（スカウト/フィーチャー等），`event`＝活动；来源名 + 档期日期随卡记录。
5. **星级以图内金星数逐张核对**：列表页可能混入非五星，卡框颜色随属性（Brilliant/Sparkle/Glitter/Flash）变化，**不能用框色判稀有度**；低清/无署名图不得绑定到具体卡名入库。
6. **队长**：主工程无 leader 记录，小样统一显示「队长：待核实」占位，核实前不写死人名。
7. **令牌红线**：任何访问令牌只允许临时本地带鉴权使用，**禁止写入本目录任何文件、禁止提交、禁止在交付文本中回显**。

## 三、已完成 / 已验证（截至当前）

- 两层信息架构小样成型：一级＝组合块内逐人显示该成员最新卡面；二级＝点开角色后**五星区 / 四星区分开**；含搜索、计数、来源徽标、详情弹窗、移动端响应式、`cn||jp` 兜底显示。
- 打通 gamerch 采集通道（本机直连可用）：五星一览静态表格，图 hash（`data-src=resize/<base64>` 解码得 `entry/<HASH>.png`）、日卡名、角色、日期、来源同表相邻，可程序化配对。
- 首批 **15 条五星花后（h2）真图**全部下载成功、零失败，实测 640×800；逐张肉眼核对署名与五颗金星。
  - 角色分布：HiMERU 4、涟纯 4、深海奏汰 4、衣更真绪 3；Kanna / Raika 在该五星页未命中，走占位。
- 静态校验：外部 JS `node --check` 通过；小样引用图路径零缺失；结构闭合（详见 `checks/check_report.log`，以最新一次重跑为准）。
- 归属纠错：深海奏汰 `UNDEAD → 流星隊`（依据主工程站位表「五色のShooting☆Star!!!!!!」成员：守泽千秋、南云铁虎、仙石忍、深海奏汰、高峯翠）。

## 四、未完成 / 下一步（不要误判为已交付）

1. **四星卡面**：当前 gamerch 131711 仅五星；四星列表页数据源待探明后采集，小样四星区现为占位。
2. **花前（未开花 h1）**：TSV 已带 h1 hash，`download_g5.ps1` 默认双版下载；当前入库的 15 张仅花后 h2，**花前待批量下载并在 UI 做花前/花后双图切换或并排**。
3. **「几个组合的全部角色」**：当前仅 4 名已映射角色；流星隊其余 4 人、其余组合成员待按权威成员表补齐（无图先占位，不挂错组合）。
4. **三语补全**：多数卡 `en/cn` 为空，仅日文卡名 + 来源；英文待 fandom 文本补，中文待按口径翻译。
5. **队长核实**：待官方/fandom 组合页确认后置顶打徽标。
6. **集成与部署**：未替换主工程旧 `renderEnc/ENCY`；未更新 `PROJECT-NOTES.md`；未做 Pages 部署。集成时图片统一到 `assets/cards/`，并同步版本号与未完成清单。

## 五、新机复跑步骤（可复用工作流）

**前置**：Windows + PowerShell 7（`pwsh`）；`node` 可选（verify 语法检查用，缺失会跳过该项）；网络可访问 `gamerch.com` 与 `cdn.gamerch.com`；克隆/拉取本仓库后进入 `cards-workbench/`。

**一键（推荐）**：
```powershell
cd cards-workbench
pwsh scripts/run_all.ps1     # 解析 → 下载花前h1+花后h2 → 生成 cards_g5.js → 自检
# 完成后用浏览器直接打开 sample/cards_sample.html（无需服务器，引用相对路径）
```

**分步（排错时用）**：
```powershell
pwsh scripts/parse_g5.ps1      # 1) 首次自动下载快照 data/g131711.html，解析出 g5_all.tsv / g5_focus.tsv
pwsh scripts/download_g5.ps1   # 2) 下载双版卡图到 sample/img/g5（只下花后：加 -Versions h2）
pwsh scripts/build_cards.ps1   # 3) TSV → sample/cards_g5.js（srcType=scout/event、双图字段、ready/missing）
pwsh scripts/verify.ps1       # 4) 自检；退出码非 0 表示有问题，详见 checks/verify.log
```
- **扩展角色/组合**：先在 `parse_g5.ps1` 与 `build_cards.ps1` 的 `$roleMap` 增加「角色假名 → ROLE_META.key」，并在小样 `ROLE_META` 补权威成员；未映射角色一律跳过，防止挂错组合。
- **数据字段**：`img`=花后 h2（主展示，兼容当前小样）；`imgBefore`=花前 h1、`imgBloomed`=花后 h2，供后续花前/花后双图 UI 使用；`en/cn` 暂空待补。
- **归属红线**：组合归属以主工程 `buildIdolGroups()`/`ES_ROLE_NAMES` 为准；`verify.ps1` 内置奏汰归属断言（必须流星隊、不得 UNDEAD），改数据后重跑自检。

## 六、本目录刻意未纳入的本地文件（避免污染协作库）

- `root_index.html`、`v2943_index.html`：主工程只读/版本副本，仓库已有正式版，不重复提交。
- `sample/img/g5/crop/`：星区放大核对用临时裁剪图（体积大、证据性可选）。
- `sample/img/` 根目录低清缩略 / 3★ 验证图 / Q 版头像：仅通道验证，非正式数据。
- `dbg.txt`、`*_probe.txt`、`netreach.txt`、`probe_allchar100134.html` 等纯网络探测临时文件。
- 任何含令牌的临时脚本/命令：运行后即弃，不入库。

## 七、线上边界

- 本工作台只用于协作与小样确认；正式上线前才会把定型后的 `ES_ROLE_META + ES_CARDS` 与图片并入主工程。
- 歌曲库、MV 服装页、账号所持卡（localStorage）、排期/术语/关系网等既有功能保持不动，降低回归风险。
