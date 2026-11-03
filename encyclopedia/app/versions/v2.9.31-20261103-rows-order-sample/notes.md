# v2.9.31 / 2026-11-03 / 总览整行顺序小样

## 用途

只调整图鉴总览排版：

1. 每个组合块恢复整行展示，不再使用两列网格；
2. 成员缩略横向紧凑排列；
3. 先展示 Star Production，再展示 CosPro；
4. 其他限定收录与近期 CN/JP 记录排在后面。

## 本次顺序

当前已有成员的展示顺序：

1. Star Production：Trickstar、流星隊
2. CosPro：Eden、Crazy:B、2wink
3. 其他 / 限定收录：Special for Princess!
4. 近期记录：日服 JP、国服 CN

## 包含文件

- `root/es-web-integrated.html`：主页面当前代码。
- `root/_chk.js`：校验脚本。
- `data/data.js`、`data/SOURCES.md`：数据层与来源台账。
- `logshots/v2.9.31/`：截图与代码台账。

## 改动边界

- 修改 `encGroupList()` 的 `prod` 分组与顺序。
- 修改 `encUnitsHTML()`：按可见组合渲染分组小标题。
- 修改 `.eg-units-view`：由两列网格改为 `block` 整行布局。
- 未修改活动预览、倒计时、CN/JP 过滤、单卡详情字段和数据层事实。

## 验证

- `node _chk.js`：`blocks= 9 bad= 0 dataExit= 0`
- `node --check latest-preview/data.js`：通过。
- 浏览器实测：组合顺序为 Trickstar、流星隊、Eden、Crazy:B、2wink、SPP、近期 JP、近期 CN；成员块 17 个；活动横幅 3 个、倒计时节点 3 个。

## 回退

- 退回本次之前：`versions/v2.9.31-20261103-before-layout-fix/` 或 `versions/v2.9.31-20261103-layout-sample/`。
- 回退后运行 `node _chk.js` 与 `node --check latest-preview/data.js`。
