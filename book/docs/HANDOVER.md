# es-web 卡面图鉴 · 详细交接文档（HANDOVER）

> 交接对象：后续维护者 / 仓库负责人 / 负责人合并负责人。
> 版本口径：本地静态图鉴小样 v0.9；`book/` 为隔离成果快照，尚未并入主站 `index.html`。
> 阅读顺序：先看第 0 节速览 → 第 4 节字段 → 第 9 节合并步骤 → 第 14 节待办。

## 0. 一页速览

| 维度 | 当前结论 |
|---|---|
| 角色范围 | mao 衣更真绪、jun 涟纯、himeru HiMERU、kanata 深海奏汰 |
| 真图 5★ | 24 条（成对 640×800 共 22 对 + 单侧标准图 2 张） |
| 真图 4★ | 40 条（成对 640×800） |
| 五星全集 | 47 = 成对 22 + 单侧 2 + 待补图占位 23（mao 6 / jun 7 / himeru 4 / kanata 6） |
| 真图图片文件 | `img/g5` 46 个、`img/g4` 80 个；部署清单 missing=0 |
| 图鉴状态三档 | `ready` 标准真图 / `lowres` 低清预览（预留规范，未自动挂载） / `placeholder` 空占位 |
| 主站集成 | 未完成（#6）；线上主站仍由根 `index.html` 承载，本次推送只新增 `book/`，未改主站文件 |
| 安全约束 | 不把 token 写入仓库/脚本/提交信息；公开仓库禁止硬编码密钥 |

## 1. 项目目标与范围

1. 为指定偶像建立静态卡面图鉴：一级“组合 → 成员最新卡”，二级“角色 → 五星区 / 四星区”，支持卡面切换（未开花/开花）、来源档期、详情查看与放大。
2. 保证“名单完整、不缺漏”：标准真图优先；无标准图的卡先用占位卡入图鉴，后续取得合规图再替换。
3. 数据与展示解耦：真图 `ES_CARDS_G5/ES_CARDS_G4` 只放 ready 条目；占位、低清均不进真图计数。
4. 本次边界：只交付图鉴数据、合并端口、清单与规范；不覆盖主站权威 `index.html`、不修改 `versions/` 与既有 `assets/`。

## 2. 角色与组合归属（红线）

| role | 中文名 | 日文名 | 所属组合 | 禁止事项 |
|---|---|---|---|---|
| mao | 衣更真绪 | 衣更まほろ / 衣更真緒 | Trickstar | 不得标 MaM；`151832` 是千秋卡，不得挂真绪 |
| jun | 涟纯 | 漣 ジュン | Eden | 多人同框主体卡默认不收 |
| himeru | HiMERU | HiMERU | Crazy:B | 归属以仓库 `buildIdolGroups()`/`ES_ROLE_NAMES` 为准 |
| kanata | 深海奏汰 | 深海 奏汰 | 流星隊 | **不得挂 UNDEAD**（旧图鉴曾错标） |

- 归属以主工程 `buildIdolGroups()`（按主组合曲推导，每偶像只归一个主组合）与 `ES_ROLE_NAMES` 为准；旧 `ENCY.unit` 错误多，禁止沿用。
- 队长位：仓库无 leader 记录，界面统一留“待核实”，未核实前不写死人名。

## 3. 目录结构与文件职责

```
cards-workbench/
├─ sample/
│  ├─ cards_sample.html          # 本地预览页（组合页/角色页/详情/放大）
│  ├─ cards_g5.js                # ES_CARDS_G5：五星真图 24
│  ├─ cards_g4.js                # ES_CARDS_G4：四星真图 40
│  ├─ cards_g5_placeholders.js  # ES_G5_PLACEHOLDERS：23 条空占位（不计数）
│  └─ img/g5、img/g4             # 真图二进制（46 / 80 个文件）
├─ book/                         # 推送仓库的隔离快照（数据+文档+清单）
├─ data/
│  ├─ g5_master_full.tsv          # 五星全集台账（art=pair/single/none）
│  ├─ deploy_manifest.tsv         # 真图条目→图片文件清单（missing=0）
│  ├─ lowres_remediation.md       # 低清预览分级规范与替换流程
│  └─ inventory_master.tsv       # 主台账（只读参考）
├─ scripts/                      # 可复跑采集/导出/构建脚本（见第 12 节）
└─ INTEGRATION.md / HANDOVER.md  # 合并端口简版 / 本详细交接文档
```

## 4. 数据模型与字段契约

### 4.1 真图条目（`ES_CARDS_G5` / `ES_CARDS_G4`）

| 字段 | 取值 / 说明 |
|---|---|
| `id` | `g5_<wikiId>` 或 `g4_<wikiId>`，稳定主键 |
| `role` | `mao` / `jun` / `himeru` / `kanata` |
| `star` | 5 或 4；不写 Da/Vo/Pf 三围、中心/Live 技能、完凸数值 |
| `type` | 四色：`Sparkle` / `Brilliant` / `Flash` / `Glitter`（仅颜色属性，不写数值） |
| `jp` | 日文卡名（官方页面原文，必录） |
| `en` | 英文卡名（缺失留空，不臆造） |
| `cn` | 中文；非官方译名标注“待国服官方译名校准” |
| `status` | `ready`；单侧标准图另加 `side:"single"` |
| `img` / `imgBloomed` | 开花图（默认显示）；`imgBefore` 为未开花图 |
| `srcType` | `scout`（卡池）/ `event`（活动）/ `""`（无法归类不臆造） |
| `srcCat` | `feature` / `memorial` / `newsong` / `tour` / `point` / `""` |
| `srcName` | 来源卡池或活动完整名称 |
| `srcDate` | 追加日期（YYYY年MM月DD日） |
| `link` | 权威单卡页 `https://gamerch.com/ensemble-star-music/<wikiId>` |
| `note` | 口径备注（译名口径、归属说明、单侧/待核标注） |

### 4.2 三档展示状态

| 状态 | 用途 | 视觉标记 | 进 st5/st4 真图计数 |
|---|---|---|---|
| `ready` | 标准真图 / 已确认单侧标准图 | 正常卡面；单侧挂橙色“单侧·缺对侧” | 是 |
| `lowres` | 低清预览（第三方低清/低清截图），预留 | 规划黄底角标“低清·待替换”，建议单独分区 | 否 |
| `placeholder` | 无任何可用图 | 虚线空框 + 灰“待补图”标签 + 卡名/日期/来源 | 否 |

- `lowres` 规划字段：`{id, role, star, lowRes, srcUrl, size, note:"低清·待替换"}`；未逐张核验前不自动入库。

## 5. 前端视图与交互

1. **组合页（一级）**：按组合成块，块内按“已采集优先、星级高、档期新”排序显示成员最新卡；队长核实后置顶并加金色徽标（当前均为待核实）。
2. **角色页（二级）**：顶部角色信息 + `5★ n` / `4★ n`；五星区、四星区分开渲染；真图卡带“未开花/开花”切换（`switchForm`）；占位卡单列“待补图五星（空卡面占位·不拿低清顶替）”。
3. **详情弹窗**：左侧主图 + 缩略，右侧信息表（四色、来源卡池/活动、日期、MV 标记位、卡名）；横版 CG 规划为详情下方补充位。
4. **放大**：`openZoom`/`data-zoom` 沿用主站机制。
5. **统计口径**：页面 `st5`、`st4` 只统计 `ready` 真图；`lowres`、`placeholder` 一律不计。

## 6. 图片采集与判定规范

### 6.1 标准真图（ready）
- 首选成对 `640×800` 竖版标准卡面：未开花 `<wikiId>_h1`、开花 `<wikiId>_h2`。
- 下载方式：`curl.exe -L -sS --max-time 25 --connect-timeout 8 -A "Mozilla/5.0" <url> -o <file>`；避免挂起的 `Invoke-WebRequest`。
- 入库前核对：①本人；②朝向正确（两朝向不挂反、不镜像）；③非多人同框；④尺寸/比例达标；⑤签名与五星身份一致。

### 6.2 明确不收（方案 1 质量优先口径）
- 320×400 缩略、800×370 横版横幅、去框透明立绘、639/643 近似宽且未确认朝向图、多人同框卡、跨 wikiId 字节重复/疑似错挂图、AI 超分图。
- 历史已识别搁置候选：`922320`、`957786`（多人同框）；`795010`（643×800、画面倒置嫌疑）；`871820`（639×800、剔除错挂 h2）；`820694`（643×800、多人）；`920499`（单侧 640 但朝向未定）。若改为“覆盖优先”口径，需逐张勾选并打标注，不得直接并入真图。

### 6.3 低清预览（lowres，规范已定义、未批量挂载）
- 入库前逐张核验本人与朝向；挂“低清·待替换”角标；不进真图计数；统一替换时按 id 用标准图替换并移除标记。
- 横版活动 CG 不进入竖卡网格，规划放在详情下方；第三方立绘/截图需确认无侵权争议且本人正确。

## 7. 来源分类与 MV 标注规则

### 7.1 来源类型 `srcType` / `srcCat`
- `scout`：卡池。`srcCat` 可取 `feature`（个人服装/特色 scout）、`memorial`（周年/纪念 scout）等。
- `event`：活动。`srcCat` 可取 `newsong`（组合新曲活动）、`point`（点数/剧情活动）、`tour`（巡回活动）等。
- 归类拿不准留空 `""`，先抓原文 `srcName`/`srcDate`，再由人工确认。

### 7.2 MV 衣装经验规律（供初判，不作为最终结论）
| 来源类型 | 是否通常有 MV 衣装 |
|---|---|
| 个人服装普通 scout（feature 类） | 多数有 |
| 周年 / 纪念 scout（memorial 类） | 一般无 |
| 肝卡 / 点数活动（point 类） | 一般无 |
| 组合新曲活动（newsong 类） | 多数有 |

- **最终 MV 标记以权威 MV 衣装一覧（官方 `174520`）核对为准**；界面先留位，不凭立绘外观猜测标 yes/no；拿不准列入人工确认清单。

## 8. 已知缺口与候选处置

- 23 张五星无标准图：名单在 `data/g5_master_full.tsv`（`art=none`）；当前以 `placeholder` 呈现，保证名单完整。
- 6 张搁置候选见第 6.2 节；是否放宽口径由用户/负责人逐张拍板。
- 33 条缺 `srcCat` 与非 yes 的 MV 条目：待人工标注或用 `174520` 批量初判后复核。

## 9. 合并到主工程 `index.html` 的详细步骤（负责人视角）

1. **备份**主站根 `index.html` 与 `versions/<当前版本>/index.html`，先在本地副本操作。
2. **备份与基线**：集成前重新获取线上权威单文件，避免基于旧版合并；不覆盖权威文件、不写 token、不直接推送远端（受控环境除外）。
3. **导航**：沿用现有“图鉴”入口标签；在该视图容器内替换旧 `renderEnc` 卡面区为新图鉴视图；保留服装页、账号页、歌曲时间线等其他模块。
4. **注入顺序**：
   - 注入图鉴 CSS（`.card/.pic/.rbadge/.status-tag`、真图/单侧/占位/低清状态样式）；
   - 注入数据 JS：`ES_CARDS_G5`、`ES_CARDS_G4`、`ES_G5_PLACEHOLDERS`（`lowres` 视需要再注入）；
   - 合并 `ES_CARDS = [...ES_CARDS_G5, ...ES_CARDS_G4]`；
   - 注入渲染函数：组合页、角色页、详情、切换、放大。
5. **图片路径**：`sample/img/g5` → `assets/cards/g5`；`sample/img/g4` → `assets/cards/g4`；把数据内相对前缀统一替换为部署前缀。
6. **合并后验证（必跑）**：
   - 真图条目 missing=0（对照 `data/deploy_manifest.tsv`）；
   - 归属断言：奏汰=流星隊、真绪=Trickstar、涟纯=Eden、HiMERU=Crazy:B；
   - 计数：真图 5★24 / 4★40；占位 23 不进统计；
   - 单侧 2 张带“单侧·缺对侧”；占位/低清无图片请求或不被计为真图；
   - 三语卡名不缺失（缺中文补意译并标注待校准）。
7. **发布**：验证通过后再按主站既有发布流程上线；`book/` 不替代主站页面。

## 10. 部署与图片路径映射

| 本地来源 | 主站建议目录 | 命名规则 |
|---|---|---|
| `sample/img/g5/*.png\|jpg` | `assets/cards/g5/` | 未开花 `<id>_h1`、开花 `<id>_h2` |
| `sample/img/g4/*.png\|jpg` | `assets/cards/g4/` | 同上 |

- 图片只在合并阶段拷贝；`book/` 快照不含二进制图片，以清单 `manifest/deploy_manifest.tsv` 为准。

## 11. 更新与同步流程

### 11.1 本地更新闭环
1. 新增/替换真图 → 更新 `cards_g5.js` / `cards_g4.js`；
2. 重跑 `scripts/export_bundle.py` 复核真图 missing=0；
3. 重建本地 `book/`：`python scripts/build_book_snapshot.py`；
4. 推送（受控终端、密钥不入仓）：
   - `$env:GH_TOKEN="<token>"`（会话级临时变量，执行后移除）；
   - `python scripts/push_book.py --apply`；默认不加 `--apply` 为 dry-run，只列文件不写远端。
5. 主站集成（#6）与线上发布（#7）另行执行，不在 `book/` 推送范围内。

### 11.2 同步边界
- `book/` 是数据与说明的“合并端口/交接快照”，不是线上主站视图；主站页面更新需先完成集成。
- 未来若配置 CI/受控部署，可把 `book/` 内容与图片清单作为发布输入；密钥由 CI 密钥管理保存，不进入仓库。

## 12. 脚本清单（重跑前先 Read 现状）

| 脚本 | 用途 |
|---|---|
| `scripts/analyze_g5_full.py` | 统计五星全集与 pair/single/none 分布 |
| `scripts/build_placeholders_js.py` | 生成 `cards_g5_placeholders.js`（23 条占位） |
| `scripts/export_bundle.py` | 生成部署清单并核对真图文件落盘 |
| `scripts/build_book_snapshot.py` | 组装本地 `book/` 隔离快照 |
| `scripts/push_book.py` | 可选推送：默认 dry-run；`--apply` 才写远端，只遍历 `book/` |
| `scripts/scan_lowres_size.py` | 按宽高比分类候选图（分析用，不直接入库） |
| `scripts/map_lowres_candidates.py` | 按 wikiId 归集本地缓存候选（分析用） |

- 废弃勿重跑：`g5_cardsite_scan.py`（被停）、`fetch_card_page_art.py`（慢且废弃）。

## 13. 验收检查清单

- [ ] 真图 `st5=24`、`st4=40`；`lowres/placeholder` 不计数
- [ ] 23 条占位卡渲染：空框 + 5★角标 + “待补图” + 卡名 + 来源/日期
- [ ] 单侧 2 张带“单侧·缺对侧”角标，且不渲染切换按钮
- [ ] 归属断言四人正确，无奏汰=UNDEAD、无千秋挂真绪
- [ ] `data/deploy_manifest.tsv` missing=0
- [ ] 数据 JS 通过 `node --check`
- [ ] 来源字段：`srcType/srcName/srcDate` 非空比例符合预期；缺 `srcCat` 列入清单
- [ ] 未把横版横幅、去框立绘、多人同框、AI 超分并入真图
- [ ] 主站 `index.html`、`versions/`、既有 `assets/` 未被本次 `book/` 推送修改

## 14. 待办与开放决策

1. **#6 集成主站**：把图鉴视图并入主工程并替换旧 `renderEnc`；需主站源码副本与集成验证。
2. **#7 本地验证、文档更新与部署**：集成完成后执行。
3. **#14 自选五个偶像并出分角色四/五星清单**：未启动；启动前先核实权威角色页 wikiId。
4. **#15 多图源补齐五星成对卡面**：官方严格成对新增为 0；继续补图受“本人/朝向正确、不低清顶替、不 AI 超分”约束。
5. 候选口径：6 张多人/近似宽候选是否在“覆盖优先”下逐张勾选入库，待决策。
6. MV 标注：33 条缺 `srcCat` 与 MV 不确定条目，待权威一覧核对或人工确认。
7. 导航入口：沿用“图鉴”替换卡面区，还是新增独立“卡面”入口，待决策。

## 15. 权威来源 URL（备查）

- 角色页：mao `108105`、jun `112473`、himeru `118127`、kanata `109256`（前缀 `https://gamerch.com/ensemble-star-music/`）
- 五星汇总 `131711`；四星汇总 `131709`；MV 衣装一覧 `174520`
- 单卡：`https://gamerch.com/ensemble-star-music/<cardId>`
- CDN：`https://cdn.gamerch.com/contents/wiki/1007/entry/<hash>.png|.jpg`；`resize/<base64>` 需 UTF-8 解码 JSON 取原图 key

## 16. 变更记录

- v0.7 首批真图入库；v0.8 占位卡网格化；v0.9 明确三档状态与合并端口口径。
- 本次 `book/` 推送：新增数据 3 文件、合并说明、部署/全集清单、低补规范；未修改主站既有文件。
