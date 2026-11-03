from pathlib import Path
import re, json, urllib.parse
from collections import defaultdict

root = Path(__file__).resolve().parent
data = (root / "latest-preview/data.js").read_text(encoding="utf-8")
src = (root / "latest-preview/SOURCES.md").read_text(encoding="utf-8")

# Split rough JS object blocks for arrays
def blocks(name):
    m = re.search(r"const\s+" + name + r"\s*=\s*\[(.*?)\n\];", data, re.S)
    if not m: return []
    body = m.group(1)
    out=[]
    for b in re.findall(r"\{[^{}]*\}", body, re.S):
        obj={}
        for k in ["id","mode","group","kind","tag","char","title","card","sourceType","sourceName","sourceUrl","note"]:
            mm=re.search(k+r':"([^"]*)"', b, re.S)
            if mm: obj[k]=mm.group(1)
        for k in ["img","before","after"]:
            mm=re.search(k+r':"([^"]*)"', b, re.S)
            if mm: obj[k]=mm.group(1)
        obj["imgReady"] = "imgReady:true" in b
        obj["lowQuality"] = "lowQuality:true" in b
        out.append(obj)
    return out

cards=blocks("PREVIEW_CARDS")
banners=blocks("PREVIEW_BANNERS")

def resolve(p):
    if not p: return None
    if p.startswith("latest-preview/"):
        return root / p
    if p.startswith("preview_img/"):
        return root/"latest-preview"/p
    if p.startswith("assets/"):
        return root/p
    return root/"latest-preview"/p

refs=[]; errors=[]; warnings=[]
for kind, arr in [("card",cards),("banner",banners)]:
    for e in arr:
        for f in ["img","before","after"]:
            p=e.get(f)
            if not p: continue
            rp=resolve(p)
            refs.append({"kind":kind,"id":e.get("id"),"field":f,"path":p,"exists":rp.exists(),"ready":e.get("imgReady"),"group":e.get("group")})
            if e.get("imgReady") and not rp.exists():
                errors.append(f"[{kind}] {e.get('id')} {f} 标记 imgReady=true，但文件缺失：{p}")
            if e.get("imgReady") and rp.exists():
                pass
        if e.get("imgReady") and e.get("img") and not resolve(e["img"]).exists():
            errors.append(f"[{kind}] {e.get('id')} 主图缺失：{e['img']}")

# ENC_RECENT block
m=re.search(r"const\s+ENC_RECENT\s*=\s*\[(.*?)\n\];", data, re.S)
enc=[]
if m:
    for b in re.findall(r"\{[^{}]*\}", m.group(1), re.S):
        obj={}
        for k in ["id","server","name","unit","sourceUrl"]:
            mm=re.search(k+r':"([^"]*)"',b,re.S)
            if mm: obj[k]=mm.group(1)
        # first card img only
        mm=re.search(r'img:"([^"]+)"',b)
        if mm: obj["img"]=mm.group(1)
        enc.append(obj)
for e in enc:
    p=e.get("img")
    if p:
        rp=resolve(p)
        refs.append({"kind":"encRecent","id":e.get("id"),"field":"card.img","path":p,"exists":rp.exists(),"ready":True,"group":"recent"})
        if not rp.exists():
            warnings.append(f"[encRecent] {e.get('id')} 卡片图占位/缺失（允许）：{p}")

# Actual local images
actual=[]
for p in (root/"latest-preview/preview_img").rglob("*"):
    if p.is_file():
        actual.append(p.relative_to(root).as_posix())
used={r["path"] for r in refs if r["path"]}
# ENC recent path uses latest-preview/ prefix; normalize compare
normal_used=set()
for p in used:
    normal_used.add(p.replace("latest-preview/preview_img/","preview_img/"))
unused=[p for p in actual if p.replace("latest-preview/preview_img/","preview_img/") not in normal_used]

# URLs
urls=sorted(set(re.findall(r"https?://[^\s\"')>]+", data+"\n"+src)))
bydomain=defaultdict(list)
for u in urls:
    d=urllib.parse.urlparse(u).netloc.lower()
    bydomain[d].append(u)

# counts
current_cards=[c for c in cards if c.get("group")=="current"]
current_banners=[b for b in banners if b.get("group")=="current"]
ready_cards=[c for c in current_cards if c.get("imgReady")]
ready_banners=[b for b in current_banners if b.get("imgReady")]

lines=[]
lines.append("# 仓库数据与素材核对清单（2026-11-03）\n")
lines.append("> 本文件只做审计与归档，不修改业务数据；带 `data.js` 的字段判断以当前本地文件为准。\n")
lines.append("## 1. 当前最新数据概览\n")
lines.append(f"- PREVIEW_CARDS：总计 {len(cards)} 条；current {len(current_cards)} 条，其中 imgReady=true {len(ready_cards)} 条；archive {len([c for c in cards if c.get('group')=='archive'])} 条。")
lines.append(f"- PREVIEW_BANNERS：总计 {len(banners)} 条；current {len(current_banners)} 条，其中 imgReady=true {len(ready_banners)} 条；recent30d {len([b for b in banners if b.get('group')=='recent30d'])} 条；archive {len([b for b in banners if b.get('group')=='archive'])} 条。")
lines.append(f"- ENC_RECENT：{len(enc)} 条；其中本地图存在 {sum(1 for r in refs if r['kind']=='encRecent' and r['exists'])} 条，占位/缺失 {sum(1 for r in refs if r['kind']=='encRecent' and not r['exists'])} 条。")
lines.append(f"- 本地 preview_img 文件：{len(actual)} 个；data.js 直接引用 {len(used)} 个；未直接引用素材 {len(unused)} 个（含 xhs_ref 回溯图与占位素材）。\n")

lines.append("## 2. 当期数据逐条核对\n")
lines.append("### 当期卡 PREVIEW_CARDS")
lines.append("| id | group | mode/char | tag/source | imgReady | before | after |")
lines.append("|---|---|---|---|---|---|---|")
for c in current_cards:
    before="✅" if c.get("before") and resolve(c["before"]).exists() else ("空" if not c.get("before") else "❌缺")
    after="✅" if c.get("after") and resolve(c["after"]).exists() else ("空" if not c.get("after") else "❌缺")
    lines.append(f"| {c.get('id')} | {c.get('group')} | {c.get('mode')} / {c.get('char')} | {c.get('tag')} / {c.get('sourceName','')} | {c.get('imgReady')} | {before} | {after} |")
lines.append("\n### 当期横幅 PREVIEW_BANNERS")
lines.append("| id | kind/tag | imgReady | 文件状态 | sourceUrl |")
lines.append("|---|---|---|---|---|")
for b in current_banners:
    ok="✅" if b.get("img") and resolve(b["img"]).exists() else ("占位" if not b.get("img") else "❌缺")
    lines.append(f"| {b.get('id')} | {b.get('kind')}/{b.get('tag')} | {b.get('imgReady')} | {ok} | {b.get('sourceUrl','')} |")

lines.append("\n## 3. 引用素材状态\n")
if errors:
    lines.append("### ❌ 必须修复")
    lines += [f"- {e}" for e in errors]
else:
    lines.append("### ✅ 无 `imgReady=true 但文件缺失` 的硬性错误。")
lines.append("\n### 允许的占位（imgReady=false / 无图）")
for b in [b for b in banners if b.get("group")=="current" and not b.get("imgReady")]:
    lines.append(f"- {b.get('id')}：{b.get('title','')}")
for c in [c for c in current_cards if not c.get("imgReady")]:
    lines.append(f"- {c.get('id')}：{c.get('char')} / {c.get('card')}")
lines.append("\n### 未直接被 data.js 引用的本地素材（需保留回溯，不代表错误）")
for p in unused:
    lines.append(f"- {p}")

lines.append("\n## 4. 已获取网站来源清单（按域名）\n")
for d, us in sorted(bydomain.items()):
    lines.append(f"### {d}（{len(us)} 条）")
    for u in us:
        lines.append(f"- {u}")

lines.append("\n## 5. 已知待补缺口（不要猜图）\n")
lines.append("- CN：涟纯、逆先夏目花后/觉醒成对官方图未取得；当前 `after` 为空或低清水印图待替换。")
lines.append("- JP AREA07：高峯翠 EVENT、葵裕太 SCOUT 的单人竖版花前/花后与官方横幅未取得；当前为双槽/横幅占位。")
lines.append("- 旧 2020 复刻池条目均为 archive，页面不渲染；素材仅纠错留档。")
lines.append("- 小红书 300031/404 无法稳定打开详情；已下载首图仅作低清过渡，后续应换官方高清。")

lines.append("\n## 6. 本次建议随仓库携带的关键内容\n")
for p in ["es-web-integrated.html","latest-preview/data.js","latest-preview/SOURCES.md","latest-preview/preview_img/","changelog-shots/v2.9.31/","versions/","NEXT-TODO-换电脑接续.md","root_index.html","v2943_index.html"]:
    lines.append(f"- `{p}`")

(root/"REPO-AUDIT-20261103.md").write_text("\n".join(lines), encoding="utf-8")
print("errors=",len(errors),"warnings=",len(warnings),"actual=",len(actual),"used=",len(used),"domains=",len(bydomain))
for e in errors: print("ERROR",e)
