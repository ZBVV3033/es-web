# app 可运行主工作区

`app/` 是以后主要更新目录。页面通过相对路径加载：

```html
<script src="latest-preview/data.js"></script>
```

因此不要把 `es-web-integrated.html` 单独挪出 `app/`，也不要把 `latest-preview/` 拆到别处。

## 文件说明

| 路径 | 作用 |
|---|---|
| `es-web-integrated.html` | 主页面，包含图鉴总览、角色网格、单卡详情、活动预览、近期记录、日志存档。 |
| `_chk.js` | 检查内联 JS 块语法和 `data.js` 语法。 |
| `latest-preview/data.js` | `PREVIEW_CARDS`、`PREVIEW_BANNERS`、`ENC_RECENT`。 |
| `latest-preview/preview_img/cards/` | 当期与留档卡面。 |
| `latest-preview/preview_img/banner/` | 顶部活动宣传横幅。 |
| `latest-preview/preview_img/xhs_ref/` | 第三方回溯参考图，默认不作为正式卡面。 |
| `changelog-shots/v2.9.31/` | UI 截图、代码台账、验证证据。 |
| `versions/` | 每次改动前的可回退快照。 |
| `reference/` | 旧版 HTML 参考，不参与当前运行入口。 |
| `tools/` | 素材审计等辅助脚本。 |

## 本地校验

在 `app/` 执行：

```powershell
node _chk.js
node --check latest-preview/data.js
```
