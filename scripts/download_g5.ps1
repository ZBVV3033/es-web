# download_g5.ps1
# 按 data/g5_focus.tsv 下载卡面原图到 sample/img/g5
# 默认同时下载 h1=花前(未开花) 与 h2=花后(开花满破)；图直链为 cdn.gamerch.com/contents/wiki/1007/entry/<hash>.png
# 用法：pwsh scripts/download_g5.ps1            # 双版都下
#       pwsh scripts/download_g5.ps1 -Versions h2  # 只下花后
# 纪律：下载后记录真实宽高；星级以图内金星数为准（页面归类可能混入非五星，须逐张核对署名与星数）。
[CmdletBinding()]
param(
  [string]$Workbench = (Join-Path $PSScriptRoot ".."),
  [string]$Tsv = "data\g5_focus.tsv",
  [string]$ImgDir = "sample\img\g5",
  [string[]]$Versions = @("h1", "h2")
)
Add-Type -AssemblyName System.Drawing
$Data = Join-Path $Workbench $Tsv
$Img  = Join-Path $Workbench $ImgDir
$Chk  = Join-Path $Workbench "checks"
New-Item -ItemType Directory -Path $Img -Force | Out-Null
if (-not (Test-Path -LiteralPath $Chk)) { New-Item -ItemType Directory -Path $Chk -Force | Out-Null }

$lines = [IO.File]::ReadAllLines($Data, [Text.Encoding]::UTF8)
$log = New-Object System.Collections.Generic.List[string]
$ok = 0; $fail = 0
foreach ($ln in $lines) {
  if ([string]::IsNullOrWhiteSpace($ln)) { continue }
  $f = $ln -split "`t"
  $id = $f[0]; $role = $f[2]; $h1 = $f[3]; $h2 = $f[4]
  foreach ($v in $Versions) {
    $hash = if ($v -eq "h1") { $h1 } else { $h2 }
    if (-not $hash) { continue }
    $url = "https://cdn.gamerch.com/contents/wiki/1007/entry/$hash.png"
    $p = Join-Path $Img ("{0}_{1}.png" -f $id, $v)
    try {
      Invoke-WebRequest -Uri $url -OutFile $p -UserAgent "Mozilla/5.0" -TimeoutSec 30 -ErrorAction Stop
      $im = [Drawing.Image]::FromFile($p); $w = $im.Width; $h = $im.Height; $im.Dispose()
      $bytes = (Get-Item -LiteralPath $p).Length
      $log.Add("$id`t$role`t$v`t$hash`t${w}x${h}`t$bytes"); $ok++
    } catch {
      $log.Add("$id`t$role`tFAIL`t$hash`t`t`t" + ($_.Exception.Message -split "`n")[0]); $fail++
    }
  }
}
$log.Insert(0, "OK=$ok FAIL=$fail")
[IO.File]::WriteAllLines((Join-Path $Chk "g5_dl.log"), $log, (New-Object Text.UTF8Encoding($false)))
"DONE ok=$ok fail=$fail"
