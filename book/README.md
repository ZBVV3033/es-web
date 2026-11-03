# es-web 卡面图鉴 · book 独立快照

> 定位：供负责人合并的**隔离成果快照**。本目录只承载图鉴数据、合并端口说明与缺口清单，
> **不修改根 `index.html`、`versions/` 与既有 `assets/`**；是否并入线上主站见 `integration/INTEGRATION.md`。

## 1. 当前覆盖口径（本地实测）

- 真图：5★ 24 条（22 张成对 640×800 + 2 张单侧标准图）；4★ 40 条（成对 640×800）。
- 五星全集 47：成对 22 + 单侧 2 + **待补图占位 23**（mao 6 / jun 7 / himeru 4 / kanata 6）。
- 角色：mao 衣更真绪(Trickstar)、jun 涟纯(Eden)、himeru HiMERU(Crazy:B)、kanata 深海奏汰(流星隊)。
- 归属红线：奏汰＝流星隊（不得挂 UNDEAD）；多人同框 / 近似宽 / 朝向未定卡默认不进真图。

## 2. 目录

```
book/
├─ README.md                         # 本说明
├─ data/
│  ├─ cards_g5.js                    # 五星真图数组 ES_CARDS_G5（24）
│  ├─ cards_g4.js                    # 四星真图数组 ES_CARDS_G4（40）
│  └─ cards_g5_placeholders.js       # 23 条无标准图五星占位（空卡面 + 元数据，不计数）
├─ integration/
│  └─ INTEGRATION.md                  # 合并端口：字段契约、注入点、验证断言、同步约定
├─ manifest/
│  ├─ deploy_manifest.tsv             # 真图条目→图片文件清单（missing=0）
│  └─ g5_master_full.tsv             # 四人五星全集台账（art=pair/single/none）
└─ lowres/
   └─ lowres_remediation.md           # 低清预览分级规范、逐张核验清单、统一替换流程
```

详细交接文档：`docs/HANDOVER.md`（字段契约、前端视图、采集规范、来源/MV 规则、合并步骤、验收清单、待办与开放决策）。

## 3. 合并到主工程的要点（摘要，详见 integration/）

1. 导航沿用「图鉴」视图；替换旧 `renderEnc` 卡面区，保留服装页、账号页等既有模块。
2. 注入顺序：CSS → 数据 JS（`ES_CARDS_G5` / `ES_CARDS_G4` / 占位数组）→ 渲染函数。
3. 图片部署映射：`sample/img/g5/` → `assets/cards/g5/`；`sample/img/g4/` → `assets/cards/g4/`；
   命名约定：未开花 `<wikiId>_h1.<ext>`、开花（默认显示）`<wikiId>_h2.<ext>`。
4. 真图 `st5/st4` 只统计 `ready`；低清预览（`lowres`）与空占位（`placeholder`）均不进真图计数。

## 4. 缺口与后续

- 23 张五星无标准图：名单见 `manifest/g5_master_full.tsv`（art=none）；现阶段以空占位保证名单完整。
- 低清图口径：用户允许第三方低清与横版 CG；横版 CG 只建议放详情下方，不进竖卡网格；
  每张低清预览入库前必须核验人物本人、朝向正确、非多人同框，详见 `lowres/lowres_remediation.md`。
- 补图优先级：标准成对真图 ＞ 已确认单侧标准图 ＞ 带「低清·待替换」标记的低清预览 ＞ 空占位。

## 5. 安全与提交

- 令牌（GitHub token）**不写入本目录任何文件、不写入提交信息、不入库**；推送时由受控终端环境变量注入。
- 本快照不含图片二进制；图片按 `manifest/deploy_manifest.tsv` 在合并阶段拷贝到部署目录。
