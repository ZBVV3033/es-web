# es-web 项目交接文档（PROJECT NOTES）

> 本文件是 **es-web 网页版资料库** 的完整工作交接文档。换任何 AI 软件 / 开新对话时，先读本文件即可恢复全部工作环境与信息。
> 每次改动工程后，**同步更新本文件**。

---

## 0. 一句话说明

「偶像梦幻祭（Ensemble Stars!）国服歌曲资料库」网页版。单文件 HTML 工程（代码全在一个 `.html` 内），部署在 GitHub Pages。

---

## 1. 项目核心信息

| 项目 | 值 |
|---|---|
| 线上主地址 | https://zbvv3033.github.io/es-web/ |
| 版本归档地址 | https://zbvv3033.github.io/es-web/versions/v2.9.22/ |
| GitHub 仓库 | https://github.com/ZBVV3033/es-web （公开仓库） |
| 当前版本 | **v2.9.22**（文件 546562 bytes，根 index.html 与 versions/v2.9.22/ 内容一致） |
| 歌曲总数 | 336 首（window.ES_SONGS 数组） |

---

## 2. 工程文件与环境

- **权威源文件（本地 Windows）**：`D:\1w\1\es-web-latest.html`（546562 bytes，与线上一致）
- **云主机工作目录**：`/home/user/Doubao/chats/38448183619118338/es-web-latest.html`（同一文件）
- **GitHub 仓库克隆**：`/home/user/Doubao/chats/38448183619118338/_repo/`（根 index.html = 线上主版本）
- **工程结构**：单文件 HTML = HTML 框架 + `<style>` 样式区 + 8 段 `<script>` 功能代码 + 中部 `window.ES_SONGS` 数据数组
- **封面图**：GitHub 仓库 `assets/covers/cover_000.jpg ~ cover_257.jpg`（258 张），HTML 内仅存相对路径

### 关键代码位置（在 es-web-latest.html 内）
- `window.ES_SONGS = [` —— 歌曲数据数组（偏移约 237626）
- `renderSongList` —— 歌曲列表渲染函数（偏移约 381860）
- `.song-card` —— 歌曲卡片样式（偏移约 14868）
- `.song-detail-tag` —— 卡片标签样式（`.game` 绿底 / `.nomv` 灰底 / `.cn` 紫底）
- `libVer` —— 版本号变量

---

## 3. 数据结构（ES_SONGS 字段）

每首歌是一个 JSON 对象：

```json
{
  "n": "RED GARDEN",                 // 原曲名（日文/英文，匹配用键）
  "u": "fine",                       // 组合名
  "i": ["天祥院英智","日日树涉",...], // 参与成员（全名）
  "t": "unit",                       // 类型：unit / all（全员曲）
  "mv": "game",                      // MV 类型：game / 其他
  "img": "assets/covers/cover_000.jpg", // 封面相对路径
  "rel": "2026-05-12",               // 发布日
  "lyr": "作词", "cmp": "作曲", "arr": "编曲",
  "src": "https://ensemble-stars.jp/discography/", // 来源
  "cn": "红心花庭",                  // 国服译名
  "pos": "2-4/3-4"                   // 站位（已录入 52 首）
}
```

> 注意：**匹配歌曲时长/信息用 `n`（原曲名）最稳**——网页 `cn` 与时长表译名有出入（例：网页 cn「无尽的交响曲」vs 时长表「永不终结的交响曲」；「神圣天使的颂歌」vs「纯白天使的颂歌」）。

---

## 4. 已实现功能清单

- 歌曲列表（336 首）+ 封面 + 组合 + 成员 + 国服译名
- 搜索框（搜歌名/成员/组合）
- 站位显示与站位搜索框（`#libPosSearch`，52 首国服站位）
- 歌曲详情弹层（点封面放大、作词/作曲/编曲/来源链接）
- 类型标签（游戏内/2D 等）、版本号显示
- 移动端适配、Electron 暗色反制

---

## 5. 当前进行中任务

### 5.1 歌曲时长 + 左上角颜色标签（进行中，用户已要求"先做两个看看"）

**需求**：每首歌加「时长」；歌曲卡片左上角加「颜色底块标签」（绿/黄/蓝/红四色）；搜索结果显示时长与颜色。

**用户锁定口径（勿再改）**：
- ✅ 时长正常写（如 2:25），**不做**时长区间筛选、**不**按区间分色
- ✅ 颜色 = 左上角颜色底块标签，仿照参考图样式，标记这首歌是什么颜色
- ✅ 只给**有时长数据**的歌加（不编造），无数据不加
- ✅ 先做两首给用户看效果，确认后再批量
- ✅ 搜索的地方也显示时长/颜色

**时长数据来源**：4 张歌曲信息大表截图（fine / 流星隊 / ALKALOID / Trickstar 四组合，含「歌曲时长」列），已通过 OCR 提取，**完整数据见本文第 7 节**。

**颜色参考图**（用户上传 4 张）：
- 绿 = 翻唱曲封面（图上白字 "COVER SONG SERIES"）
- 黄 = 四位白金/浅色制服角色演出图（黄/金装饰）
- 蓝 = 四位浅色制服角色 + 暖黄背景飞鸟图（蓝色边框装饰块）
- 红 = 《暴风雨之夜 The Tempest Night》曲目信息界面（559x173 横图）

### 5.2 线上聊天室（暂停中）

- Supabase 项目已建：项目 ID **`dbrymqvafntpmtkhudez`**（Ireland 区，免费额度约 5 万次/月 API）
- 未拿到：anon/public key（用户手机端找不到，最后要项目 ID 自己拼 URL）
- 未写任何代码、未部署
- 曾推荐 LeanCloud → 国内版已停服，故换 Supabase

---

## 6. 用户协作偏好（重要，必须遵守）

- **回复语言**：中文；**手机端禁止表格输出**（看不清）
- **风格**：简单直接、步骤清晰、拒绝弯弯绕绕、不要 AI 味套话
- **数据**：必须准确不编造、标来源；缺失就明说，不补造
- **交付**：要可直接打开的文件/链接（完整成品，不是教程/代码片段）
- **昵称 → 全名映射**（已确认无歧义）：敬人→莲巳敬人、红郎→鬼龙红郎、飒马→神崎飒马、宗→斋宫宗、璘音→天城燐音、桃李→姬宫桃李、风早巽本人
- **工作方式**：先做示例确认效果，再批量推进；改动工程后要同步更新本文档

---

## 7. 已提取的歌曲时长数据（完整，勿丢失）

> 来源：用户提供的 4 张时长大表截图（QQ 图片 OCR 提取）。匹配键 = **原曲名（n）**。

### ALKALOID（17 首）
Kiss of Life 2:06 ｜ 翼モラトリアム 2:29 ｜ Living on the edge 2:00 ｜ Distorted Heart 2:17 ｜ You're Speculation 2:12 ｜ Artistic Partisan 2:29 ｜ Believe 4 leaves 2:40 ｜ Hysteric Humanoid 2:30 ｜ VERMILION 2:51 ｜ 夜に駆ける 2:27 ｜ UNDYING HOLY LOVE 2:40 ｜ Black Out See Saw 2:27 ｜ フラジール 2:09 ｜ SAKE OF LOVE 3:02 ｜ SunnyTrip Summer 2:57 ｜ Across the universe 2:44 ｜ コトノハカンタービレ 2:17

### 流星隊（18 首）
天下無敵☆メテオレンジャー 2:29 ｜ アンリミテッド☆パワー！！！！ 2:10 ｜ GROWING STARRY DAYS 2:04 ｜ SUPER NOVA REVOLU5TAR 2:17 ｜ 彗星HALATION 2:15 ｜ 流星花火 1:59 ｜ メテオ・スクランブル☆流星隊！ 2:28 ｜ 熱血☆流星忍法帖 2:29 ｜ 青春Emergency 2:32 ｜ ハム太郎とっとこうた 2:12 ｜ Colors Arise 2:29 ｜ RELAX PARADISE 2:42 ｜ 僕らのステラ 2:36 ｜ NEW DAYBREAK 2:53 ｜ WILDLAND SURVIVOR 2:20 ｜ Heart Beat 2:36 ｜ 夢ノ咲流星隊歌 2:43 ｜ OVERFLOW LIGHT UP!!!!!! 2:45

### Trickstar（21 首）
ONLY YOUR STARS! 2:19 ｜ Rebellion Star (ALBUM Mix) 2:18 ｜ Infinite Star 2:27 ｜ BIGBANG REFLECTION!! 2:17 ｜ キセキ 2:26 ｜ HEART→BEATER!!!! 2:21 ｜ BREAKTHROUGH! 2:21 ｜ 1st SING-ALONG☆ 2:10 ｜ Crossing×Heart 2:35 ｜ Finder Girl 2:31 ｜ CHERRY HAPPY STREAM (ALBUM Mix) 2:18 ｜ Daydream×Reality 2:24 ｜ (RE)PLAY 2:22 ｜ Welcome to the Trickstar Night☆ 2:10 ｜ Romantic Xday! 2:38 ｜ 幸せの歌 2:35 ｜ ワガママなハレーション 2:40（⚠️ 与库内 ワチャガナドゥ？ 是**不同歌**，勿错配）｜ Unstoppable Love! 2:34 ｜ CELEBRATE!! 2:38 ｜ Season of Seasons 2:24 ｜ Unbalanced triangle 2:47

### fine（19 首）
終わらないシンフォニア 2:29 ｜ Holy Angel's Carol 2:20 ｜ The Tempest Night 2:25 ｜ 羽ばたきのフォルティシモ 2:22 ｜ 恋はプリマヴェーラ！ 2:18 ｜ Neo Sanctuary 2:22 ｜ Crossing×Heart 2:35（两表重复）｜ 始まりのファンタジア 2:26 ｜ Feathers of Ark 2:42 ｜ Miracle Dream Traveler 1:58 ｜ Ghostic Treat House 2:41 ｜ スターライトパレード 2:25 ｜ Dreaming Ocean 2:37 ｜ Angelic Grace 2:47 ｜ Never-ending Stage!!!! 2:28 ｜ Fairy Tale Library 2:39 ｜ RAINBOW CIRCUS 2:13 ｜ Musica Vita! -ムジカ・ヴィータ- 2:30 ｜ RED GARDEN 2:47

---

## 8. 部署流程

1. 改完本地 `es-web-latest.html` → 校验（与线上对比字节数/内容）
2. 更新 GitHub 仓库根 `index.html` + `versions/<新版本>/index.html`（v2.9.22 起有版本归档习惯）
3. 用 GitHub **contents API** 上传（PUT），token 从对话/本地私密保存处取，**禁止写入公开仓库**（本仓库是公开的）
4. 注意：raw.githubusercontent.com 在用户电脑 SSL 连不上，须用 `api.github.com` 或 aka doubaocdn

---

## 9. 参考资料与来源

- 站位来源：小红书号 **5311066953**（已录入 52 首）
- 歌曲来源：https://ensemble-stars.jp/discography/
- 时长大表：用户 QQ 上传的 4 张截图（路径：`D:\Backup\Documents\Tencent Files\137805953\nt_qq\nt_data\Pic\2026-10\Ori\` 下 bcdb1163…（ALKALOID）/ 623bd75d…（流星隊）/ 254c4090…（Trickstar）/ 0a9a76f9…（fine））
- 颜色参考图（本地临时目录）：QQ_1793442974506.png（绿）/ 1793443837526.png（黄）/ 1793443841008.png（蓝）/ 1793443961799.png（红）
