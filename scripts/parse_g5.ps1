# parse_g5.ps1
# 从 gamerch Music 五星一览页解析「卡ID / 日文卡名 / 角色假名 / 花前h1 / 花后h2 / 日期 / 来源」
# 输出到 workbench/data：g5_all.tsv（全量）、g5_focus.tsv（首批重点角色）、g5_parse.log
# 用法：pwsh scripts/parse_g5.ps1
# 注意：gamerch 仅提供日服卡名/来源/图；角色组合归属一律以主工程 buildIdolGroups()/ES_ROLE_NAMES 为准。
[CmdletBinding()]
param(
  [string]$Url = "https://gamerch.com/ensemble-star-music/131711",
  [string]$Workbench = (Join-Path $PSScriptRoot "..")
)
$Data = Join-Path $Workbench "data"
if (-not (Test-Path -LiteralPath $Data)) { New-Item -ItemType Directory -Path $Data -Force | Out-Null }
$HtmlPath = Join-Path $Data "g131711.html"
if (-not (Test-Path -LiteralPath $HtmlPath)) {
  Invoke-WebRequest -Uri $Url -OutFile $HtmlPath -UserAgent "Mozilla/5.0" -TimeoutSec 60
}
$html = [IO.File]::ReadAllText($HtmlPath)

function Decode-Hash($seg) {
  try {
    $pad = $seg.PadRight($seg.Length + ((4 - $seg.Length % 4) % 4), '=')
    $j = [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($pad))
    return ([regex]::Match($j, 'entry\\/([A-Za-z0-9_\-]+)\.png')).Groups[1].Value
  } catch { return "" }
}

$blocks = [regex]::Matches($html, '<tr class="mu__table--row\d+">.*?</tr>', 'Singleline')
$rows = New-Object System.Collections.Generic.List[object]
foreach ($b in $blocks) {
  $s = $b.Value
  if ($s -notmatch 'Brilliant|Sparkle|Glitter|Flash') { continue }   # 仅取含属性数值的卡明细行，排除阵容头像块
  $id   = ([regex]::Match($s, 'ensemble-star-music/(\d+)')).Groups[1].Value
  $c3   = ([regex]::Match($s, 'mu__table--col3"[^>]*>(.*?)</td>', 'Singleline')).Groups[1].Value
  $card = ([regex]::Match($c3, '>([^<>]+)</a>')).Groups[1].Value.Trim()
  $role = ([regex]::Match($s, 'mu__table--col13"[^>]*>([^<]+)')).Groups[1].Value.Trim()
  $segs = [regex]::Matches($s, 'cdn\.gamerch\.com/resize/([A-Za-z0-9+/=]+)') | ForEach-Object { $_.Groups[1].Value }
  $hs = @()
  foreach ($sg in $segs) { $h = Decode-Hash $sg; if ($h -ne "" -and $hs -notcontains $h) { $hs += $h } }
  $date = ([regex]::Match($s, '(\d{4}年\d{1,2}月\d{1,2}日)')).Groups[1].Value
  $c14  = ([regex]::Match($s, 'mu__table--col14"[^>]*>(.*?)</td>', 'Singleline')).Groups[1].Value
  $src  = ([regex]::Match($c14, '>([^<>]+)</a>')).Groups[1].Value.Trim()
  if ($id -ne "" -and $card -ne "") {
    $rows.Add([pscustomobject]@{
      id=$id; card=$card; role=$role
      h1=$(if($hs.Count -ge 1){$hs[0]}else{""})   # 花前（未开花）
      h2=$(if($hs.Count -ge 2){$hs[1]}else{""})   # 花后（开花满破）
      date=$date; src=$src
    })
  }
}
function Write-Tsv($list, $path) {
  $lines = $list | ForEach-Object { ($_.id + "`t" + $_.card + "`t" + $_.role + "`t" + $_.h1 + "`t" + $_.h2 + "`t" + $_.date + "`t" + $_.src) }
  [IO.File]::WriteAllLines($path, $lines, (New-Object Text.UTF8Encoding($false)))
}
Write-Tsv $rows (Join-Path $Data "g5_all.tsv")

# 首批重点角色映射（假名 -> 小样 ROLE_META.key）；扩组合时在此追加，未映射者不入库以防挂错组合
$map = @{ "ひめる"="himeru"; "さざなみ じゅん"="jun"; "しんかい かなた"="kanata"; "いさら まお"="mao" }
$focus = $rows | Where-Object { $map.ContainsKey($_.role) }
Write-Tsv $focus (Join-Path $Data "g5_focus.tsv")

$log = @("TOTAL=$($rows.Count)", "FOCUS=$($focus.Count)")
[IO.File]::WriteAllLines((Join-Path $Data "g5_parse.log"), $log, (New-Object Text.UTF8Encoding($false)))
"WROTE total=$($rows.Count) focus=$($focus.Count)"
