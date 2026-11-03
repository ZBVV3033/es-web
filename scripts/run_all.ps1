# run_all.ps1 —— 一键复跑整条图鉴工作流（新机推荐入口）
# 1) parse_g5.ps1   解析五星页 -> data/*.tsv
# 2) download_g5.ps1 下载花前 h1 + 花后 h2 原图 -> sample/img/g5
# 3) build_cards.ps1 由 TSV 生成 sample/cards_g5.js
# 4) verify.ps1      语法/图存在/归属自检
# 用法：pwsh scripts/run_all.ps1
# 前置：PowerShell 7(pwsh)；可选 node（verify 用，缺则跳过语法检查）；网络可访问 gamerch.com 与 cdn.gamerch.com。
$ErrorActionPreference = "Continue"
$root = Join-Path $PSScriptRoot ".."
function Step($name, $script) {
  "===== $name ====="
  & (Join-Path $PSScriptRoot $script)
  if ($LASTEXITCODE -ne 0) { "!! $name 退出码 $LASTEXITCODE"; }
}
Step "解析五星一览" "parse_g5.ps1"
Step "下载卡面(花前+花后)" "download_g5.ps1"
Step "生成卡数据JS" "build_cards.ps1"
Step "自检" "verify.ps1"
"===== 完成：用浏览器打开 sample/cards_sample.html 查看两层图鉴小样 ====="
"注意：四星数据源、花前/花后双图UI、其余组合全成员、中/英卡名补全、主工程集成 仍为待办（见 README.md 第四节）。"
