# verify.ps1 —— 工作流自检：JS 语法、记录数、星级、图存在性；输出 checks/verify.log
# 用法：pwsh scripts/verify.ps1   （失败时退出码非 0，便于 CI/复跑判断）
[CmdletBinding()]
param([string]$Workbench = (Join-Path $PSScriptRoot ".."))
$js = Join-Path $Workbench "sample\cards_g5.js"
$imgDir = Join-Path $Workbench "sample\img\g5"
$log = New-Object System.Collections.Generic.List[string]
$fail = 0

$j = node --check $js 2>&1
$log.Add("NODE_CHECK_EXIT=$LASTEXITCODE")
if ($LASTEXITCODE -ne 0) { $log.Add(($j -join "`n")); $fail++ }

$txt = [IO.File]::ReadAllText($js, [Text.Encoding]::UTF8)
$ready = ([regex]::Matches($txt, '"status": "ready"')).Count
$star5 = ([regex]::Matches($txt, '"star": 5')).Count
$imgs  = [regex]::Matches($txt, '"img": "([^"]+)"') | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
$miss = @()
foreach ($r in $imgs) { if (-not (Test-Path -LiteralPath (Join-Path $Workbench ("sample\" + $r.Replace("/", "\"))))) { $miss += $r } }
$log.Add("READY=$ready STAR5=$star5 IMG_FIELDS=$($imgs.Count) IMG_MISSING=$($miss.Count)")
if ($miss.Count) { $miss | ForEach-Object { $log.Add("  MISSING $_") }; $fail++ }

# 归属红线抽查：奏汰必须在流星隊，不得出现在 UNDEAD（在小样 HTML 的 ROLE_META 中校验）
$html = Join-Path $Workbench "sample\cards_sample.html"
if (Test-Path -LiteralPath $html) {
  $h = [IO.File]::ReadAllText($html, [Text.Encoding]::UTF8)
  $kanata = [regex]::Match($h, 'key:"kanata"[^}]*').Value
  $onU = $kanata -match 'UNDEAD'; $onR = $kanata -match '流星隊'
  $log.Add("KANATA_UNDEAD=$onU KANATA_RYUSEITAI=$onR")
  if ($onU -or -not $onR) { $fail++ }
}
[IO.File]::WriteAllLines((Join-Path $Workbench "checks\verify.log"), $log, (New-Object Text.UTF8Encoding($false)))
$log
if ($fail -gt 0) { exit 1 }
