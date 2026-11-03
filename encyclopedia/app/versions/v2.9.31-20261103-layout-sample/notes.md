# v2.9.31 / 2026-11-03 / 布局小样快照

## 1. 用途

只记录一次小范围样式调整，不重构数据模型和活动功能：

1. 总览组合块采用两列紧凑布局；
2. 成员最新卡缩略压缩显示；
3. 单卡详情保持“左侧主图 + 双缩略 / 右侧信息行”的左右布局；
4. 窄于 560px 的屏幕才把详情折叠为上下排列。

## 2. 包含文件

- `root/es-web-integrated.html`：主页面当前代码。
- `root/_chk.js`：语法校验脚本。
- `data/data.js`：数据层快照。
- `data/SOURCES.md`：来源台账快照。
- `logshots/v2.9.31/`：本次布局小样截图、旧版证据截图和 `code-archive.md` 台账。

未复制 `preview_img/` 二进制素材；素材缺失时仍按“待补官方图”占位处理，不猜图。

## 3. 本次改动边界

- 新增/修改样式选择器：`.eg-units-view`、`.eg-units-view .eg-mem-grid`、`.eg-rep-top`、`.eg-detail` 折叠断点。
- `renderEnc()` 仅给总览视图加 `eg-units-view` 类；角色页和详情页仍使用普通 `eg-wrap`。
- 未修改 `bannerHTML()`、倒计时、CN/JP 过滤、`renderPreview()`、卡片来源数据。

## 4. 验证结果

- `node _chk.js`：`blocks= 9 bad= 0 dataExit= 0`
- `node --check latest-preview/data.js`：通过。
- 浏览器实测：总览 `.eg-units-view` 计算列为两列，组合块 8 个、成员块 17 个；详情计算列为 `320px 1fr`，信息行 9 行、缩略槽 2 个。

## 5. 回退方法

- 想退回本次小样前状态：使用 `versions/v2.9.31-20261103-before-layout-fix/`。
- 想退回老版三层图鉴稳定版：使用 `versions/v2.9.31-20261103-enc-restore/`。
- 回退前先另存当前工作区，避免覆盖未保存状态；回退后运行 `node _chk.js` 与 `node --check latest-preview/data.js`。
