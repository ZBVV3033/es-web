# build_cards.ps1
# 由 data/g5_focus.tsv 生成 sample/cards_g5.js（ES_CARDS_G5）。数据与界面解耦，换机复跑用。
# 规则：jp 取［］内日文卡名；role 由假名映射到小样 ROLE_META.key；srcType=scout/event；
#       img=花后 h2（主展示，兼容小样），并额外输出 imgBefore=h1、imgBloomed=h2 供后续花前/花后双图 UI。
# 用法：pwsh scripts/build_cards.ps1
[CmdletBinding()]
param([string]$Workbench = (Join-Path $PSScriptRoot ".."))

$data  = Join-Path $Workbench "data\g5_focus.tsv"
$out   = Join-Path $Workbench "sample\cards_g5.js"
$imgDir= Join-Path $Workbench "sample\img\g5"
if (-not (Test-Path -LiteralPath $data)) { "NO $data"; exit 1 }
if (-not (Test-Path -LiteralPath $imgDir)) { New-Item -ItemType Directory -Path $imgDir -Force | Out-Null }

# 假名 -> 小样角色 key；扩展组合时在此追加，未映射者跳过（防止挂错组合）
$roleMap = @{
  "ひめる"="himeru"; "さざなみ じゅん"="jun";
  "しんかい かなた"="kanata"; "いさら まお"="mao"
}
function JsStr([string]$s) {
  if ($null -eq $s) { return '""' }
  $s = $s -replace '\\', '\\' -replace '"', '\"' -replace "`r", ' ' -replace "`n", ' '
  '"' + $s.Trim() + '"'
}

$blocks = New-Object System.Collections.Generic.List[string]
$ready = 0; $missing = 0
foreach ($ln in [IO.File]::ReadAllLines($data, [Text.Encoding]::UTF8)) {
  if ([string]::IsNullOrWhiteSpace($ln)) { continue }
  $f = $ln -split "`t"
  if ($f.Count -lt 7) { continue }
  $id=$f[0]; $raw=$f[1]; $roleJp=$f[2]; $h1=$f[3]; $h2=$f[4]; $date=$f[5]; $src=$f[6]
  if (-not $roleMap.ContainsKey($roleJp)) { continue }
  $role=$roleMap[$roleJp]
  $jp = if ($raw -match '［(.+?)］') { $Matches[1] } else { $raw.Trim() }
  $srcType = if ($src -match 'スカウト|フィーチャー|Focus|フォーカス') { 'scout' } else { 'event' }
  $after = "img/g5/$id`_h2.png"; $before = "img/g5/$id`_h1.png"
  $isReady = Test-Path -LiteralPath (Join-Path $imgDir "$id`_h2.png")
  $status = if ($isReady) { 'ready' } else { 'missing' }
  if ($isReady) { $ready++ } else { $missing++ }
  $b = @(
    "  {",
    "    ""id"": ""g5_$id"",",
    "    ""role"": $(JsStr $role),",
    "    ""star"": 5,",
    "    ""en"": """",",
    "    ""jp"": $(JsStr $jp),",
    "    ""cn"": """",",
    "    ""status"": ""$status"",",
    "    ""img"": $(JsStr $after),",
    "    ""imgBefore"": $(JsStr $before),",
    "    ""imgBloomed"": $(JsStr $after),",
    "    ""srcType"": ""$srcType"",",
    "    ""srcName"": $(JsStr $src),",
    "    ""srcDate"": $(JsStr $date),",
    "    ""link"": $(JsStr "https://gamerch.com/ensemble-star-music/$id"),",
    "    ""note"": ""花后h2主展示；花前h1待UI切换；中/英文名待补；归属以主工程buildIdolGroups为准""",
    "  }"
  )
  $blocks.Add(($b -join "`n"))
}
$body = "const ES_CARDS_G5 = [`n" + ($blocks -join ",`n") + "`n];`n"
[IO.File]::WriteAllText($out, $body, (New-Object Text.UTF8Encoding($false)))
"BUILT records=$($blocks.Count) ready=$ready missing=$missing -> sample/cards_g5.js"
