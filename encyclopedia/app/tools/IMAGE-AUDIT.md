# 图片资源核对报告

主工作区：`app/`

## 1. 硬性检查：imgReady=true 的本地图引用

✅ 没有 `imgReady=true 但文件缺失` 的硬性错误。

- `imgReady=true` 下已存在图片引用：16 个。
- 占位空字段（允许）：21 个。

## 2. 主页面与 data.js 本地图片路径

✅ 当前 `imgReady=true` 的图鉴/预览运行素材没有缺失；下面其余缺失路径均为旧隐藏数据、旧歌曲封面或旧素材占位，不是当前主页面必需资源。

### 历史/隐藏占位引用：295 个唯一路径
这些路径在旧源工程中同样没有实体文件，主页面通常由 `onerror` 或隐藏数据兜底；其中包括旧歌曲封面、旧图鉴素材位和 `imgReady:false` 的过期活动占位，不计入当前图鉴缺失。
- `assets/acc/hiyori-ba01.jpg`
- `assets/acc/hiyori-ba02.jpg`
- `assets/acc/hiyori-ba03.jpg`
- `assets/acc/hiyori-ba04.jpg`
- `assets/acc/hiyori-ba05.jpg`
- `assets/acc/hiyori-ba06.jpg`
- `assets/acc/hiyori-ba07.jpg`
- `assets/acc/hiyori-ba08.jpg`
- `assets/acc/hiyori-ba09.jpg`
- `assets/acc/hiyori-ba10.jpg`
- `assets/acc/hiyori-ba11.jpg`
- `assets/acc/hiyori-ba12.jpg`
- `assets/acc/hiyori-ba13.jpg`
- `assets/acc/hiyori-ba14.jpg`
- `assets/acc/hiyori-ba15.jpg`
- `assets/acc/hiyori-ba16.jpg`
- `assets/acc/hiyori-page1.jpg`
- `assets/acc/kanata-01.jpg`
- …其余 277 个略。

## 3. 本地图片文件分布

### `changelog-shots/v2.9.31/`：15 个
- banner-countdown-cn.png
- enc-bloom-detail-toggle.png
- enc-bloom-grid-toggle.png
- enc-card-detail.png
- enc-index-nav-collapse.png
- enc-main.png
- enc-role-grid.png
- enc-units.png
- layout-detail-two-col.png
- layout-rows-star-cospro.png
- layout-units-two-col.png
- recent-cn.png
- recent-dedup-cn.png
- recent-dedup-jp.png
- recent-jp.png
### `latest-preview/preview_img/banner/`：8 个
- bn-cn-1.jpg
- bn-cn-2.jpg
- bn-cn-night.jpg
- jp-music-mao-ambassador.jpg
- jp-scout-halloween-box.jpg
- jp-scout-tsukasa.jpg
- jp-scout-wata.jpg
- jp-stage-nagisa.jpg
### `latest-preview/preview_img/cards/`：7 个
- cn-s5-jun.jpg
- cn-s5-natsume.jpg
- jp-basic-mao-20261014.jpg
- jp-basic-tsukasa-20261010.jpg
- jp-fv-tsukasa.png
- jp-stage-nagisa-after.png
- jp-stage-nagisa.png
### `latest-preview/preview_img/xhs_ref/`：6 个
- xhs-anniv-scout.webp
- xhs-bonus-scout.webp
- xhs-cn-act.webp
- xhs-midmonth.webp
- xhs-minehi.webp
- xhs-yuta.webp

## 4. 未被 data.js/主路径直接引用的图片

这些文件不是错误；多为回溯参考、截图证据或旧素材。
- `latest-preview/preview_img/xhs_ref/xhs-anniv-scout.webp`
- `latest-preview/preview_img/xhs_ref/xhs-bonus-scout.webp`
- `latest-preview/preview_img/xhs_ref/xhs-cn-act.webp`
- `latest-preview/preview_img/xhs_ref/xhs-midmonth.webp`
- `latest-preview/preview_img/xhs_ref/xhs-minehi.webp`
- `latest-preview/preview_img/xhs_ref/xhs-yuta.webp`

## 5. 旧版参考 HTML

- 可解析本地图：0 个。
- 无法解析的参考路径：733 个；这些来自 `reference/` 旧页面，不参与当前主页面运行。
- root_index.html → `assets/covers/cover_000.jpg`
- root_index.html → `assets/covers/cover_001.jpg`
- root_index.html → `assets/covers/cover_002.jpg`
- root_index.html → `assets/covers/cover_003.jpg`
- root_index.html → `assets/covers/cover_004.jpg`
- root_index.html → `assets/covers/cover_005.jpg`
- root_index.html → `assets/covers/cover_006.jpg`
- root_index.html → `assets/covers/cover_007.jpg`
- root_index.html → `assets/covers/cover_008.jpg`
- root_index.html → `assets/covers/cover_009.jpg`
- root_index.html → `assets/covers/cover_010.jpg`
- root_index.html → `assets/covers/cover_011.jpg`
- root_index.html → `assets/covers/cover_012.jpg`
- root_index.html → `assets/covers/cover_013.jpg`
- root_index.html → `assets/covers/cover_014.jpg`
- root_index.html → `assets/covers/cover_015.jpg`
- root_index.html → `assets/covers/cover_016.jpg`
- root_index.html → `assets/covers/cover_017.jpg`
- root_index.html → `assets/covers/cover_018.jpg`
- root_index.html → `assets/covers/cover_019.jpg`
- root_index.html → `assets/covers/cover_020.jpg`
- root_index.html → `assets/covers/cover_021.jpg`
- root_index.html → `assets/covers/cover_011.jpg`
- root_index.html → `assets/covers/cover_023.jpg`
- root_index.html → `assets/covers/cover_024.jpg`
- root_index.html → `assets/covers/cover_025.jpg`
- root_index.html → `assets/covers/cover_026.jpg`
- root_index.html → `assets/covers/cover_027.jpg`
- root_index.html → `assets/covers/cover_028.jpg`
- root_index.html → `assets/covers/cover_029.jpg`
- …其余 703 条略。

## 6. 结论

- 当前运行所需素材中，`imgReady=true` 的图都在。
- AREA07 两条当期卡和两条横幅为 `imgReady=false` 合法占位，不算缺失。
- `xhs_ref/` 是第三方回溯参考，默认不直接渲染。
- `reference/*.html` 是旧版对照，其缺失历史图片不影响新主页面。

## 7. 源目录图片覆盖记录

source_images=162 target_images=152 unique_missing=0