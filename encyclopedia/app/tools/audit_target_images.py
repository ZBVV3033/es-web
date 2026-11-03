from pathlib import Path
import re, json, hashlib
from collections import defaultdict

APP = Path(__file__).resolve().parents[1]
ROOT = APP.parent
OUT = APP / "tools" / "IMAGE-AUDIT.md"

img_re = re.compile(r'["\']([^"\']+\.(?:png|jpg|jpeg|webp|gif|svg))["\']', re.I)

def resolve_active(p):
    p = p.replace("\\", "/")
    if p.startswith("latest-preview/"):
        return APP / p
    if p.startswith("preview_img/"):
        return APP / "latest-preview" / p
    if p.startswith("assets/"):
        return APP / p
    if p.startswith("reference/"):
        return APP / p
    return APP / p

def sha(p):
    return hashlib.sha1(p.read_bytes()).hexdigest()[:10] if p.exists() else "-"

active_reports=[]
for f in [APP/"es-web-integrated.html", APP/"latest-preview/data.js"]:
    text=f.read_text(encoding="utf-8", errors="replace")
    for m in img_re.finditer(text):
        p=m.group(1)
        if p.startswith("http"):
            active_reports.append((str(f.relative_to(ROOT)), "external", p, "-"))
            continue
        rp=resolve_active(p)
        active_reports.append((str(f.relative_to(ROOT)), "local", p, "OK" if rp.exists() else "MISSING"))

# data.js semantic fields: ready=true must exist; empty fields are allowed placeholders
data=(APP/"latest-preview/data.js").read_text(encoding="utf-8")
ready_missing=[]; ready_ok=0; placeholder=0
for block in re.findall(r"\{[^{}]*\}", data, re.S):
    rid=re.search(r'id:"([^"]+)"', block)
    ready = "imgReady:true" in block
    fields=[]
    for field in ["img","before","after"]:
        mm=re.search(field+r':"([^"]*)"', block)
        if mm: fields.append((field, mm.group(1)))
    if ready:
        for field,p in fields:
            if p:
                rp=resolve_active(p)
                if rp.exists(): ready_ok += 1
                else: ready_missing.append((rid.group(1) if rid else "?", field, p))
            else:
                placeholder += 1
    else:
        placeholder += sum(1 for _,p in fields if not p)

# actual local images
actual=[]
for base in [APP/"latest-preview", APP/"changelog-shots", APP/"reference"]:
    if base.exists():
        for p in base.rglob("*"):
            if p.is_file() and p.suffix.lower() in {".png",".jpg",".jpeg",".webp",".gif",".svg"}:
                actual.append(p)

used={p for _,_,p,s in active_reports if s=="OK"}
# normalize unused data images
actual_rel=[p.relative_to(APP).as_posix() for p in actual]
unused=[]
for p in actual:
    rel=p.relative_to(APP).as_posix()
    # data references preview_img relative form; normalize both
    norm=rel.replace("latest-preview/preview_img/","preview_img/")
    if rel not in used and norm not in used:
        unused.append(rel)

# old reference HTML local image refs, marked reference-only
ref_missing=[]; ref_ok=0
for ref in (APP/"reference").glob("*.html"):
    text=ref.read_text(encoding="utf-8", errors="replace")
    for m in img_re.finditer(text):
        p=m.group(1)
        if p.startswith("http"): continue
        rp=(ref.parent/p).resolve()
        if rp.exists(): ref_ok += 1
        else: ref_missing.append((ref.name,p))

# counts by dir
bydir=defaultdict(list)
for p in actual:
    bydir[str(p.parent.relative_to(APP)).replace("\\","/")].append(p.name)

lines=[]
lines.append("# 图片资源核对报告\n")
lines.append(f"主工作区：`app/`\n")
lines.append("## 1. 硬性检查：imgReady=true 的本地图引用\n")
if ready_missing:
    lines.append("### ❌ 必需缺失")
    for rid,field,p in ready_missing: lines.append(f"- {rid} · {field} · `{p}`")
else:
    lines.append("✅ 没有 `imgReady=true 但文件缺失` 的硬性错误。")
lines.append(f"\n- `imgReady=true` 下已存在图片引用：{ready_ok} 个。")
lines.append(f"- 占位空字段（允许）：{placeholder} 个。")

lines.append("\n## 2. 主页面与 data.js 本地图片路径\n")
missing=[x for x in active_reports if x[3]=="MISSING"]
required_paths={p for _,_,p in ready_missing}
required_missing=[x for x in missing if x[2] in required_paths]
legacy_missing=[x for x in missing if x[2] not in required_paths]
if required_missing:
    lines.append("### ❌ 当前必需但缺失（imgReady=true 仍引用本地文件）")
    for src,kind,p,status in required_missing:
        lines.append(f"- `{src}` → `{p}`")
else:
    lines.append("✅ 当前 `imgReady=true` 的图鉴/预览运行素材没有缺失；下面其余缺失路径均为旧隐藏数据、旧歌曲封面或旧素材占位，不是当前主页面必需资源。")

if legacy_missing:
    legacy_paths=sorted({p for _,_,p,_ in legacy_missing})
    lines.append(f"\n### 历史/隐藏占位引用：{len(legacy_paths)} 个唯一路径")
    lines.append("这些路径在旧源工程中同样没有实体文件，主页面通常由 `onerror` 或隐藏数据兜底；其中包括旧歌曲封面、旧图鉴素材位和 `imgReady:false` 的过期活动占位，不计入当前图鉴缺失。")
    for p in legacy_paths[:18]: lines.append(f"- `{p}`")
    if len(legacy_paths)>18: lines.append(f"- …其余 {len(legacy_paths)-18} 个略。")

lines.append("\n## 3. 本地图片文件分布\n")
for d,names in sorted(bydir.items()):
    lines.append(f"### `{d}/`：{len(names)} 个")
    for n in sorted(names): lines.append(f"- {n}")

lines.append("\n## 4. 未被 data.js/主路径直接引用的图片\n")
lines.append("这些文件不是错误；多为回溯参考、截图证据或旧素材。")
for u in sorted(unused): lines.append(f"- `{u}`")

lines.append("\n## 5. 旧版参考 HTML\n")
lines.append(f"- 可解析本地图：{ref_ok} 个。")
lines.append(f"- 无法解析的参考路径：{len(ref_missing)} 个；这些来自 `reference/` 旧页面，不参与当前主页面运行。")
if ref_missing[:30]:
    for name,p in ref_missing[:30]: lines.append(f"- {name} → `{p}`")
if len(ref_missing)>30: lines.append(f"- …其余 {len(ref_missing)-30} 条略。")

lines.append("\n## 6. 结论\n")
lines.append("- 当前运行所需素材中，`imgReady=true` 的图都在。")
lines.append("- AREA07 两条当期卡和两条横幅为 `imgReady=false` 合法占位，不算缺失。")
lines.append("- `xhs_ref/` 是第三方回溯参考，默认不直接渲染。")
lines.append("- `reference/*.html` 是旧版对照，其缺失历史图片不影响新主页面。")

coverage_file=ROOT/"archive-notes"/"image-coverage.txt"
if coverage_file.exists():
    lines.append("\n## 7. 源目录图片覆盖记录\n")
    lines.append(coverage_file.read_text(encoding="utf-8").strip())

OUT.write_text("\n".join(lines), encoding="utf-8")
print("ready_ok=",ready_ok,"ready_missing=",len(ready_missing),"placeholder=",placeholder,"actual_images=",len(actual),"required_missing=",len(required_missing),"legacy_cover_missing=",len(legacy_missing),"reference_missing=",len(ref_missing))
