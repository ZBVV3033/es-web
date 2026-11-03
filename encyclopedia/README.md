# 偶像梦幻祭图鉴工作区

## 1. 当前入口

- 主页面：`app/es-web-integrated.html`
- 数据文件：`app/latest-preview/data.js`
- 图片素材：`app/latest-preview/preview_img/`
- 更新截图与代码台账：`app/changelog-shots/v2.9.31/`
- 本地历史快照：`app/versions/`

以后继续开发，默认在 `app/` 内更新，保持当前相对路径，避免页面找不到 `latest-preview/data.js` 和素材。

## 2. 目录用途

```text
D:\资料\图鉴\
├─ README.md                 # 本说明，先读这里
├─ app\                      # 可运行主工作区，后续更新主要在这里
│  ├─ es-web-integrated.html # 主页面：图鉴、活动预览、近期记录、日志
│  ├─ _chk.js                # 本地语法校验脚本
│  ├─ latest-preview\        # 当期数据、来源台账、卡面/横幅素材
│  ├─ changelog-shots\       # UI 截图、代码台账、版本证据
│  ├─ versions\              # 可回退本地版本快照
│  ├─ reference\             # 旧版 root_index.html、v2943_index.html，只对照不改主文件
│  └─ tools\                 # 审计/辅助脚本
├─ docs\                     # 待办、审计、来源说明、重做计划
├─ samples\                  # 早期采集管线和静态样例，不属于当期运行主程序
└─ archive-notes\            # 以后存放阶段性归档说明；空目录先保留
```

## 3. 当前版本与状态

- 运行版本：`v2.9.31`
- 最近校验：`blocks= 9 bad= 0 dataExit= 0`；`node --check latest-preview/data.js` 通过。
- 当期卡：5 条，其中 3 条本地有图；AREA07 两条为合法占位。
- 当期横幅：6 条，其中 4 条本地有图；AREA07 两条横幅为合法占位。
- `ENC_RECENT`：9 条，近期记录保留 CN/JP 分服；当期重复项在渲染层去重，底层记录不删除。

## 4. 以后更新规则

1. **主页面逻辑**：改 `app/es-web-integrated.html`。
2. **活动/近期数据**：改 `app/latest-preview/data.js`；改前先复制到 `app/versions/` 并写 `notes.md`。
3. **卡面和横幅素材**：放进 `app/latest-preview/preview_img/cards/` 或 `banner/`；`xhs_ref/` 只作回溯，不直接当期渲染。
4. **截图和代码台账**：放入 `app/changelog-shots/v2.9.31/`，关键改动追加 `code-archive.md`。
5. **历史版本**：每次小样前新建 `app/versions/<版本号>-<YYYYMMDD>-<用途>/`，复制受影响文件并写说明。
6. **待办需求**：先记录到 `docs/待办接续清单.md`，确认后再写代码；避免一次性全改。
7. **旧版参考**：只参考 `app/reference/root_index.html` 的结构，不直接覆盖主页面。

## 5. 数据红线

- 缺可靠花后图时，开花按钮保持禁用或占位，不用旧卡、群像预告、聊天截图或低清放大图冒充。
- 队长、属性未核实时写“待核实”，不臆断。
- CN/JP 分服，不混排。
- `archive` 旧池只作纠错留档，不冒充当期。
- 第三方低清图保留“待官方替换”标记，不伪造高清。

## 6. 校验命令

在 `app\` 目录执行：

```powershell
node _chk.js
node --check latest-preview/data.js
```

## 7. 待办优先级（详见 docs/待办接续清单.md）

1. 活动预览统一卡片格式；点击活动展开详情，显示活动内卡片。
2. 收藏模式开关：平时不显示收藏按钮，打开后可收藏组合与角色。
3. 补老版角色页下方“卡面清单 / 3D · MV 服装清单”和游戏内来源分类。
4. 四个事务所使用官方全称：STARMAKER PRODUCTION、COSMIC PRODUCTION、Rhythm Link、NEW DIMENSION。
5. 处理图鉴可见日语；说明性文字收进折叠设置区。
6. 预览卡面补开花切换；缺花后图继续占位。

## 8. 来源参考

- 官方四事务所：
  - https://ensemble-stars.jp/units/
  - https://ensemblestars.com/explore/units/
  - https://support.ensemble-stars.jp/music/cat_5/1236/
- 本地来源台账：`app/latest-preview/SOURCES.md`；备份副本：`docs/来源台账-SOURCES.md`。

> 说明：本目录是从旧工作区整理出的可运行副本；旧目录暂未删除，确认新目录运行正常后，再决定是否清理旧文件。
