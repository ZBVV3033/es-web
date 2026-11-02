# 低清预览补图 · 状态规范与执行流程

> 背景：用户口径放宽为“低清图也可上，但必须做好标记，后续统一替换”。
> 硬约束不变：**人物必须是本人、朝向正确、不挂错组合；低清图不得计入真图统计；不得用 AI 超分顶替标准卡面。**

## 1. 三级卡面状态（前端与数据统一口径）

| 状态 | 含义 | 视觉标记 | 是否进真图计数 |
|---|---|---|---|
| `ready` | 标准真图（成对 640×800，或已确认的单侧标准图） | 正常卡面；单侧挂橙色“单侧·缺对侧” | 是（st5/st4） |
| `lowres` | 低清预览（官方缩略/第三方低清，仅占位预览） | 黄底角标“低清·待替换”，建议单独分区展示 | **否** |
| `placeholder` | 无任何可用图 | 虚线空框 + “待补图”灰标签 + 卡名/日期/来源 | **否** |

- 真图 `ES_CARDS` 只放 `ready`；`lowres` 与 `placeholder` 均为补充展示，不污染 `st5/st4`。
- `lowres` 数据建议字段：`{id, role, star, lowRes, srcUrl, size, note:"低清·待替换"}`。

## 2. 为什么不做“自动批量挂低清”（实证）

- 本地 checks 缓存按文件名归集后，23 个缺图 id 都有竖版比例候选（`data/lowres_by_size.tsv`），但来源目录混杂、历史上被剔除原因不一。
- 自动按“目录优先级 + 文件大小”选图后抽查：`806570`、`871815` 被选到同一张 **82875 字节、文件名 `_5.png`** 的重复图，画面人物为**乱凪砂（Nagisa Ran）**，既非真绪也非目标卡，证明文件名匹配无法保证人物/朝向正确。
- 结论：**低清图不能靠文件名或尺寸自动入库**；必须逐张人工核验后，以 `lowres` 状态挂载。

## 3. 推荐采集通道（最稳优先）

1. **首选：官方单卡页缩略/原图**
   - URL：`https://gamerch.com/ensemble-star-music/<cardId>`
   - 静态 HTML 中 `data-original="https://cdn.gamerch.com/contents/wiki/1007/entry/<hash>.png"` 为原图；`resize/<base64>` 为各尺寸缩略。
   - 采集脚本只负责“下载候选 + 记录来源/尺寸”，**不做最终入库判定**。
2. 次选：第三方卡面截图（如 es2 中文 wiki 详情页 normal/evolution）；覆盖早期卡、近期五星覆盖低，需逐张核验。
3. **不进入竖卡网格**：横版活动 CG（800×370 类）、去框立绘、多人同框、近似宽且朝向未定图；如需要可仅放详情备注。

## 4. 每张低清预览入库前的核验清单（逐项打勾）

- [ ] 人物 = 目标角色（对照角色中文名/日文名，防乱凪砂类错挂）
- [ ] 朝向正确（未开花/开花不挂反、不镜像）
- [ ] 单人为主；多人同框不收
- [ ] 记录来源 URL、原始尺寸、文件大小
- [ ] 前端以 `lowres` 状态渲染，挂“低清·待替换”角标
- [ ] 不写入 `ES_CARDS`、不进 st5/st4
- [ ] 写入 `data/lowres_replace_todo.tsv`，便于后续统一替换

## 5. 统一替换流程

1. 一旦取得合规标准成对图：先按 `ready` 标准入库（`cards_g5.js`/`cards_g4.js`）。
2. 删除对应 `lowres` 条目与 `sample/img/lowres/` 下文件。
3. 更新 `data/lowres_replace_todo.tsv` 状态为 `replaced`，保留旧来源备注。
4. 重跑 `scripts/export_bundle.py`，确认真图条目 missing=0。

## 6. 替换清单表（建议结构）

`data/lowres_replace_todo.tsv` 列：
`cardId | role | currentSource | currentSize | targetStandardSource | verifiedBy | status(pending/lowres/replaced) | note`

## 7. 当前缺口（23 张五星无标准图）

- mao 6、jun 7、himeru 4、kanata 6；名单见 `data/g5_master_full.tsv`（art=none）。
- 现阶段图鉴对这些卡先以空占位呈现，保证“名单完整、不缺漏”；待口径确认与逐张核验后再补 `lowres` 预览。
