# 版本快照索引

每个子目录对应一次改动前/小样后的回退点；`root/` 为主页面代码，`data/` 为 `data.js`，`logshots/` 为截图和台账。

| 版本目录 | 说明 | notes.md |
|---|---|---|
| `v2.9.31-20261103-enc-restore/` | 老版三层图鉴恢复、活动预览和日志保留后的基础快照。 | 有 |
| `v2.9.31-20261103-layout-sample/` | 早期两列/布局小样，用于对照排版。 | 有 |
| `v2.9.31-20261103-rows-order-sample/` | 组合整行、Star/CosPro 顺序小样。 | 有 |
| `v2.9.31-20261103-before-layout-fix/` | 布局微调前基线。 | 有 |
| `v2.9.31-20261103-before-field-tweak/` | 字段口径调整前基线。 | 有 |
| `v2.9.31-20261103-before-index-bloom/` | 锚点、折叠、收藏、开花切换前基线。 | 已补 |
| `v2.9.31-20261103-index-collapse-bloom/` | 近期渲染去重、锚点、折叠、收藏置顶、开花切换小样。 | 有 |
| `v2.9.31-20261103-before-ui-translate/` | 翻译、说明区迁移、老版模块补全前基线。 | 已补 |

## 目录规范

```text
versions/
  <版本号>-<YYYYMMDD>-<简短用途>/
    root/        # es-web-integrated.html、_chk.js 等代码
    data/        # data.js、SOURCES.md 等文本数据
    logshots/    # 截图与代码台账
    notes.md     # 用途、文件清单、改动点、回退注意事项
```

## 新建快照规则

1. 改动前先建目录：`v<版本>-<YYYYMMDD>-<短用途>/`。
2. 至少复制 `root/es-web-integrated.html` 和 `data/data.js`。
3. 涉及截图时复制到 `logshots/`。
4. 必须写 `notes.md`，说明用途、包含文件、改动点、验证结果和回退注意事项。
5. 不在快照目录内直接继续开发；主工作区固定在 `../es-web-integrated.html` 与 `../latest-preview/data.js`。

## 回退步骤

1. 先把当前工作区另存为新快照，避免覆盖后无法找回。
2. 从目标快照复制 `root/`、`data/`、`logshots/` 到对应位置。
3. 在 `app/` 执行：

```powershell
node _chk.js
node --check latest-preview/data.js
```

4. 浏览器打开 `app/es-web-integrated.html`，必要时 Ctrl+F5 刷新缓存。

> `preview_img/` 内素材不逐份复制到所有小快照；回退代码后若素材缺失，以 `../latest-preview/preview_img/` 和 `../latest-preview/SOURCES.md` 为准，不用旧卡、群像预告或低清放大图顶替。
