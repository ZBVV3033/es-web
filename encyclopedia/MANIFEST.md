# 图鉴目录清单（MANIFEST）

生成时间：2026-11-03
目标根目录：`D:\资料\图鉴`

## 1. 总览

| 分区 | 文件数 | 用途 |
|---|---:|---|
| `app/` | 131 | 可运行主工作区；以后主要在这里更新。 |
| `docs/` | 5 | 待办、审计、来源台账、重做计划和目录说明。 |
| `samples/` | 115 | 早期采集管线与静态样例，只作参考。 |
| `archive-notes/` | 1 | 跨版本归档说明占位。 |
| 根目录 `README.md` | 1 | 总说明与更新规则。 |
| 合计 | 253 | 约 53.85 MB。 |

## 2. app 主工作区明细

| 路径 | 文件数 | 说明 |
|---|---:|---|
| `app/es-web-integrated.html` | 1 | 主入口页面。 |
| `app/_chk.js` | 1 | 本地语法校验脚本。 |
| `app/README.md` | 1 | 主工作区说明。 |
| `app/latest-preview/` | 28 | `data.js`、来源台账、预览素材和早期合并说明。 |
| `app/changelog-shots/v2.9.31/` | 16 | UI 截图、代码台账、验证证据。 |
| `app/versions/` | 80 | 8 个历史版本快照及索引说明。 |
| `app/reference/` | 2 | `root_index.html`、`v2943_index.html` 旧版参考。 |
| `app/tools/` | 2 | 审计和辅助脚本。 |

## 3. 关键文件

| 文件 | 作用 |
|---|---|
| `app/es-web-integrated.html` | 图鉴总览、角色网格、单卡详情、活动预览、近期记录、日志存档。 |
| `app/latest-preview/data.js` | `PREVIEW_CARDS`、`PREVIEW_BANNERS`、`ENC_RECENT`。 |
| `app/latest-preview/SOURCES.md` | 官方/第三方来源、档期、纠错排除和缺口说明。 |
| `app/changelog-shots/v2.9.31/code-archive.md` | 代码改动与截图台账。 |
| `docs/待办接续清单.md` | 尚未实现的功能需求和数据红线。 |
| `docs/数据素材审计.md` | 当前数据、图片引用和缺口审计。 |

## 4. 校验结果

在 `app/` 已执行：

```text
node _chk.js        -> blocks= 9 bad= 0 dataExit= 0
node --check latest-preview/data.js -> 通过
```

## 5. 以后更新位置

1. 页面功能：`app/es-web-integrated.html`
2. 当期数据：`app/latest-preview/data.js`
3. 卡面/横幅：`app/latest-preview/preview_img/cards/`、`banner/`
4. 截图台账：`app/changelog-shots/v2.9.31/`
5. 改前快照：`app/versions/<版本>-<日期>-<用途>/`
6. 待办记录：`docs/待办接续清单.md`

## 6. 边界说明

- 旧工作区 `C:\Users\Administrator\DoubaoWork\chats\2026-11-02\new-chat-4\` 未删除，仅作来源备份；后续确认 `D:\资料\图鉴\app` 运行稳定后再决定是否清理旧目录。
- `samples/` 不是运行依赖，当前页面不直接加载这里的早期样例。
- `archive-notes/` 以后用于跨版本总结；代码级回退快照仍放在 `app/versions/`。
