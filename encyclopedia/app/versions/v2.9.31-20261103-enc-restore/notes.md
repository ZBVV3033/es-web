# v2.9.31 / 2026-11-03 / 老版三层图鉴恢复快照

## 1. 快照用途

保存当前“角色图鉴恢复为老版三层视觉”的工作版本，供后续修改出错时整体回退：

1. 一级：组合块 + 成员最新卡缩略；
2. 二级：角色页五星 / 其他星级卡面网格；
3. 三级：单卡详情（左侧主图、未开花/开花双缩略、右侧信息行）。

## 2. 包含文件

| 快照路径 | 对应工作区路径 | 说明 |
|---|---|---|
| `root/es-web-integrated.html` | `es-web-integrated.html` | 主页面代码、样式、图鉴与活动预览逻辑、CHANGELOG。 |
| `root/_chk.js` | `_chk.js` | 脚本语法校验脚本。 |
| `data/data.js` | `latest-preview/data.js` | 当期横幅、`ENC_RECENT` 分服记录等数据。 |
| `data/SOURCES.md` | `latest-preview/SOURCES.md` | 来源台账。 |
| `data/README.md` | `latest-preview/README.md` | 数据目录说明。 |
| `logshots/v2.9.31/` | `changelog-shots/v2.9.31/` | 详细日志 UI、代码台账、截图。 |

未复制：`latest-preview/preview_img/` 内二进制图片素材。原因：体积较大且属于运行素材；代码快照中保留了引用路径，素材若缺失应保持占位规则，不猜图。

## 3. 本版已落地内容

- 图鉴改为 `units → role → card` 三层状态；隐藏旧左列选人列表。
- `encRoles()` 合并旧 `ENCY` 8 条与 `ENC_RECENT` 9 条；近期条目按 `server=JP/CN` 分组。
- `encUnitsHTML()` 渲染组合块、星级计数、队长待核实、成员缩略。
- `encRoleHTML()` 渲染五星 / 其他星级分区网格。
- `encCardHTML()` 渲染单卡详情、双缩略和信息行。
- 活动预览保留：横幅 `.pv-cd[data-end]` 倒计时角标；当期横幅与近40天 CN/JP 分服记录。
- 详细日志保留 `ui`、`code`、`shots` 三类存档。

## 4. 验证结果（快照时）

- `node _chk.js`：`blocks= 9 bad= 0 dataExit= 0`
- `node --check latest-preview/data.js`：通过
- 浏览器实测：图鉴组合块 8 组、成员块 17 个；角色页与单卡详情可进入；单卡详情 9 行信息、2 个缩略槽；活动预览横幅 3 个、倒计时节点 3 个、CN 近期记录 5 条；无 JS 语法级报错。

## 5. 已知限制 / 未核实项

- 缺官方稳定图的卡面显示“待补官方图”占位，不使用旧图、群像预告或聊天截图顶替。
- 队长统一显示“队长：待核实”，不臆断队长。
- 属性字段待官方/wiki 核实，当前仅显示待补口径。
- 旧历史组合标注如需纠正，应先查证官方来源并由用户确认后再改。

## 6. 回退方法

详见上级目录 `versions/README.md` 第 4–5 节。核心原则：先另存当前版本，再把本快照 `root/`、`data/`、`logshots/` 复制回对应位置，最后运行 `node _chk.js` 与 `node --check latest-preview/data.js`。
