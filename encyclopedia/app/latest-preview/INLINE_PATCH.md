# 主站内联补丁（直接内联正式版 · 无 iframe）

> 用途：把「最新★5预览」作为主站顶部 `data-view="preview"` 视图内联进去。所有样式限定在 `#view-preview` 作用域、类名 `pv-` 前缀，避免污染主站现有 `.card/.grid/.banner/.tab/.badge` 等类名。
> 前置：`latest-preview/data.js`（三数组 `PREVIEW_CARDS/PREVIEW_BANNERS/PREVIEW_META`）随仓库提交；素材目录 `latest-preview/preview_img/` 一并提交。
> 粘贴锚点以 `MERGE_PORT.md §1` 实测行号为准（真实仓库以克隆后 index 为准，先按 `data-view` / `switchEsView` 文本定位）。

## 0. 改动清单（只增不改既有渲染主体）
1. 顶部标签组：在 `data-view="enc"` 按钮后新增一个 `data-view="preview"` 按钮。
2. `#view-enc` 容器后新增 `#view-preview` 容器（下方 §1 HTML）。
3. `<head>` 或 `#view-preview` 前插入 §2 CSS（作用域隔离）。
4. 主站脚本前引入数据：`<script src="latest-preview/data.js"></script>`。
5. 主站脚本内追加 §3 JS（IIFE，暴露 `window.renderPreview`）。
6. `switchEsView(view)` 两处注册（§4）：视图数组加 `"preview"`；钩子加 `if(view==="preview") renderPreview();`。
7. 移动端 `#mNav` 生成逻辑若枚举了视图，补 `preview` 项（克隆后核对 `updateMobileNav`）。

## 1. HTML（放在 `#view-enc` 之后、`#view-timeline` 之前）
```html
<div class="es-view" id="view-preview" hidden>
  <div id="pvRoot" class="pv-root">
    <div class="pv-mode-row" role="tablist">
      <button type="button" class="pv-mode active" data-pvmode="cn">国服 CN</button>
      <button type="button" class="pv-mode" data-pvmode="jp">日服 JP</button>
    </div>
    <div class="pv-rule" id="pvRule"></div>
    <div class="pv-stats" id="pvStats"></div>
    <div class="pv-sec"><h2>官方公告宣传图（横幅位）</h2><div class="pv-banners" id="pvBanners"></div></div>
    <div class="pv-sec"><h2 id="pvHCurrent">当期进行中 ★5</h2><div class="pv-grid" id="pvCurrent"></div></div>
    <div class="pv-sec"><h2 id="pvHRecent">近 30 天追加 ★5</h2><div class="pv-grid" id="pvRecent"></div></div>
    <div class="pv-foot" id="pvFoot"></div>
  </div>
</div>
```
顶部标签新增（放在 enc 图鉴按钮后）：
```html
<button type="button" class="es-tab" data-view="preview">最新预览</button>
```

## 2. CSS（全部 `#view-preview` 作用域，不影响主站其它视图）
```css
#view-preview .pv-root{padding:6px 2px 24px;color:var(--text,#2b2f3a)}
#view-preview .pv-mode-row{display:flex;gap:8px;margin:6px 0 10px;flex-wrap:wrap}
#view-preview .pv-mode{border:1px solid var(--line,#e3e6ec);background:#fff;color:inherit;border-radius:10px;padding:8px 16px;cursor:pointer;font-weight:600}
#view-preview .pv-mode.active{background:var(--acc,#3f6fb5);border-color:var(--acc,#3f6fb5);color:#fff}
#view-preview .pv-rule{color:var(--muted,#7a8194);font-size:12px;line-height:1.6;margin-bottom:8px}
#view-preview .pv-stats{display:flex;flex-wrap:wrap;gap:8px;margin:6px 0 14px}
#view-preview .pv-stats .pv-stat{background:#fff;border:1px solid var(--line,#e3e6ec);border-radius:10px;padding:6px 12px;font-size:12px}
#view-preview .pv-stats .pv-stat b{font-size:15px;color:var(--acc,#3f6fb5)}
#view-preview .pv-sec{margin-top:18px}
#view-preview .pv-sec h2{font-size:15px;margin:0 0 10px;padding-left:8px;border-left:3px solid var(--acc,#3f6fb5)}
#view-preview .pv-banners{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px}
#view-preview .pv-banner{background:#fff;border:1px solid var(--line,#e3e6ec);border-radius:12px;overflow:hidden}
#view-preview .pv-banner .pv-ph{height:120px;display:flex;align-items:center;justify-content:center;color:var(--muted,#7a8194);background:repeating-linear-gradient(45deg,#eef0f4,#eef0f4 10px,#f7f8fa 10px,#f7f8fa 20px);text-align:center;padding:10px;font-size:12px}
#view-preview .pv-banner img{width:100%;height:auto;display:block;object-fit:contain;background:#fff}
#view-preview .pv-banner .pv-body{padding:10px 12px}
#view-preview .pv-banner .pv-t{font-weight:600;font-size:13px}
#view-preview .pv-banner .pv-d{color:var(--muted,#7a8194);font-size:12px;margin-top:4px}
#view-preview .pv-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px}
#view-preview .pv-card{background:#fff;border:1px solid var(--line,#e3e6ec);border-radius:12px;overflow:hidden;display:flex;flex-direction:column}
#view-preview .pv-pic{position:relative;aspect-ratio:4/5;background:#e9edf3}
#view-preview .pv-pic img{width:100%;height:100%;object-fit:cover;display:block}
#view-preview .pv-pic .pv-empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--muted,#7a8194);gap:6px;text-align:center;padding:8px;font-size:12px}
#view-preview .pv-star{position:absolute;top:8px;left:8px;background:#f0a63a;color:#fff;font-weight:700;font-size:12px;border-radius:8px;padding:2px 8px;z-index:2}
#view-preview .pv-pending{position:absolute;bottom:8px;right:8px;background:rgba(201,106,58,.92);color:#fff;font-size:11px;border-radius:8px;padding:2px 8px;z-index:2}
#view-preview .pv-low{position:absolute;top:8px;right:8px;z-index:2;font-size:10px;color:#a16207;background:#fef3c7;border-radius:8px;padding:1px 6px;white-space:nowrap}
#view-preview .pv-banner .pv-low{position:static;display:inline-block;margin-left:6px}
#view-preview .pv-cbody{padding:10px 11px;display:flex;flex-direction:column;gap:5px;flex:1}
#view-preview .pv-char{font-weight:700;font-size:13px}
#view-preview .pv-cname{font-size:12px;color:#444;line-height:1.4}
#view-preview .pv-src{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
#view-preview .pv-badge{font-size:11px;border-radius:8px;padding:1px 8px;background:#eef2f8;color:var(--acc,#3f6fb5)}
#view-preview .pv-badge.event{background:#f3eef9;color:#7a55b8}
#view-preview .pv-date{color:var(--muted,#7a8194);font-size:12px}
#view-preview .pv-note{color:var(--muted,#7a8194);font-size:12px;line-height:1.5}
#view-preview .pv-link{font-size:12px;color:var(--acc,#3f6fb5);text-decoration:none;word-break:break-all}
#view-preview .pv-hint{color:var(--muted,#7a8194);font-size:13px;background:#fff;border:1px dashed var(--line,#e3e6ec);border-radius:10px;padding:12px}
#view-preview .pv-foot{margin-top:22px;color:var(--muted,#7a8194);font-size:12px;line-height:1.7;border-top:1px solid var(--line,#e3e6ec);padding-top:12px}
```

## 3. JS（IIFE；若主站已有 `esc`/`MODE` 等全局名，此处作用域隔离，不冲突；只暴露 `renderPreview`）
```html
<script src="latest-preview/data.js"></script>
<script>
(function () {
  var PV_ASSET = "latest-preview/"; // 主站根 index.html 引用素材的前缀；若迁入 assets/preview/ 则改成对应前缀
  var MODE = "cn";
  function pv$(id) { return document.getElementById(id); }
  function pvEsc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function pvLocalISO(d) { var y=d.getFullYear(), m=String(d.getMonth()+1).padStart(2,"0"), day=String(d.getDate()).padStart(2,"0"); return y+"-"+m+"-"+day; }
  function pvShift(iso,n){ var d=new Date(iso+"T00:00:00"); d.setDate(d.getDate()+n); return pvLocalISO(d); }
  var PV_TODAY = pvLocalISO(new Date());
  var PV_START = pvShift(PV_TODAY,-29); // 最近30个自然日（含今天）
  function cardsOf(m){ return (typeof PREVIEW_CARDS!=="undefined"?PREVIEW_CARDS:[]).filter(function(c){return c.mode===m;}).sort(function(a,b){return b.dateISO.localeCompare(a.dateISO);}); }
  function bannersOf(m){ return (typeof PREVIEW_BANNERS!=="undefined"?PREVIEW_BANNERS:[]).filter(function(b){return b.mode===m && (b.group||"current")!=="archive";}).sort(function(a,b){return b.dateISO.localeCompare(a.dateISO);}); }

  function cardPic(c){
    if(c.imgReady && c.img){
      var low = c.lowQuality ? '<span class="pv-low">待官方替换</span>' : "";
      return '<div class="pv-pic"><span class="pv-star">★5</span>'+low+
        '<img src="'+pvEsc(PV_ASSET+c.img)+'" alt="'+pvEsc(c.card)+'" onerror="this.parentNode.innerHTML=\'<div class=pv-empty>图片缺失/未就位</div>\'"></div>';
    }
    return '<div class="pv-pic"><span class="pv-star">★5</span><span class="pv-pending">待补官方图</span>'+
      '<div class="pv-empty"><span>暂无标准卡面</span><span>占位 · 不拿低清顶替</span></div></div>';
  }
  function cardHTML(c){
    var badge = c.sourceType==="event" ? '<span class="pv-badge event">活动</span>' : '<span class="pv-badge">卡池</span>';
    var link = c.sourceUrl ? '<a class="pv-link" href="'+pvEsc(c.sourceUrl)+'" target="_blank" rel="noopener">来源 ↗</a>' : '<span class="pv-date">来源待补官方链接</span>';
    return '<div class="pv-card">'+cardPic(c)+
      '<div class="pv-cbody"><div class="pv-char">'+pvEsc(c.char||"—")+'</div>'+
      '<div class="pv-cname">'+pvEsc(c.card||"（卡名待补）")+'</div>'+
      '<div class="pv-src">'+badge+'<span class="pv-date">'+pvEsc(c.dateISO)+'</span></div>'+
      '<div class="pv-cname">'+pvEsc(c.sourceName||"")+'</div>'+
      '<div class="pv-note">'+pvEsc(c.note||"")+'</div>'+link+'</div></div>';
  }
  function bannerHTML(b){
    var media = (b.imgReady && b.img)
      ? '<img src="'+pvEsc(PV_ASSET+b.img)+'" alt="'+pvEsc(b.title)+'" onerror="this.parentNode.innerHTML=\'<div class=pv-ph>宣传图缺失/未就位</div>\'">'
      : '<div class="pv-ph">宣传图待下载到本地（'+pvEsc(b.img||"preview_img/banner/")+'）</div>';
    var low = b.lowQuality ? '<span class="pv-low">wiki横幅·待官方替换</span>' : "";
    return '<div class="pv-banner">'+media+'<div class="pv-body"><div class="pv-t">'+pvEsc(b.title)+low+'</div>'+
      '<div class="pv-d">'+(b.kind==="event"?"活动":"卡池")+' · '+pvEsc(b.dateISO)+' · '+pvEsc(b.note||"")+'</div></div></div>';
  }
  function renderPreview(){
    if(!pv$("view-preview")) return;
    var all=cardsOf(MODE), meta=(typeof PREVIEW_META!=="undefined"?PREVIEW_META:{});
    var visible=all.filter(function(c){return c.group==="current"||c.group==="recent30d";});
    var cur=visible.filter(function(c){return c.group==="current";});
    var curIds={}; cur.forEach(function(c){curIds[c.id]=1;});
    var rec=visible.filter(function(c){return c.group==="recent30d" || (c.dateISO>=PV_START && c.dateISO<=PV_TODAY && !curIds[c.id]);});
    var pending=visible.filter(function(c){return !c.imgReady;}).length;
    var bn=bannersOf(MODE), bnReady=bn.filter(function(b){return b.imgReady;}).length;

    pv$("pvRule").textContent=(meta.rule||"")+" 基准日 "+PV_TODAY+"（含今天最近30天："+PV_START+" ～ "+PV_TODAY+"）。"+(meta.fallbackNote||"");
    pv$("pvStats").innerHTML=
      '<span class="pv-stat">基准日 <b>'+PV_TODAY+'</b></span>'+
      '<span class="pv-stat">近30天起 <b>'+PV_START+'</b></span>'+
      '<span class="pv-stat">当期 ★5 <b>'+cur.length+'</b></span>'+
      '<span class="pv-stat">近30天 ★5 <b>'+rec.length+'</b></span>'+
      '<span class="pv-stat">待补图 <b>'+pending+'</b></span>'+
      '<span class="pv-stat">宣传图就位 <b>'+bnReady+'/'+bn.length+'</b></span>';
    pv$("pvHCurrent").textContent="当期进行中 ★5（"+cur.length+"）";
    pv$("pvHRecent").textContent="近 30 天追加 ★5（"+rec.length+"）";
    pv$("pvCurrent").innerHTML=cur.length?cur.map(cardHTML).join(""):'<div class="pv-hint">当前模式暂无当期 ★5 数据（待官方公告采集）。</div>';
    pv$("pvRecent").innerHTML=rec.length?rec.map(cardHTML).join(""):'<div class="pv-hint">当前模式暂无近30天追加 ★5（进行中条目只在当期区显示一次）。</div>';
    pv$("pvBanners").innerHTML=bn.length?bn.map(bannerHTML).join(""):'<div class="pv-hint">暂无宣传图条目。</div>';
    pv$("pvFoot").textContent="口径：不按角色分组；只收 ★5；图缺失用占位不裂图、不挂错人；范围=当期进行中 + 最近30天追加；archive 不渲染。日常更新只改 latest-preview/data.js 与 preview_img/。";
  }
  document.addEventListener("click",function(e){
    var b=e.target.closest ? e.target.closest("[data-pvmode]") : null;
    if(!b || !pv$("view-preview")) return;
    MODE=b.dataset.pvmode;
    Array.prototype.forEach.call(document.querySelectorAll("#view-preview .pv-mode"),function(x){x.classList.toggle("active",x.dataset.pvmode===MODE);});
    renderPreview();
  });
  window.renderPreview=renderPreview;
})();
</script>
```

## 4. `switchEsView(view)` 注册（两处）
```js
// 原：["acc","mv","enc","timeline","jp","sched"].forEach(...)
["acc","mv","enc","preview","timeline","jp","sched"].forEach(function(v){
  var el = $("view-"+v); if(el) el.hidden = (v!==view);
});
// 钩子区追加一行：
if (view === "preview") renderPreview();
```

## 5. 数据与素材约定（并入后不得破坏）
- `group=archive` 卡片与横幅都不渲染；只渲染 `current` + `recent30d`。
- `imgReady=false` 不插 `<img>`；`lowQuality=true` 显示“待官方替换”。
- 素材前缀 `PV_ASSET`：第一版沿用 `latest-preview/`（即 `latest-preview/preview_img/...`）；若迁入 `assets/preview/`，同步改 `PV_ASSET` 与文件位置。
- 仅 `imgReady=true` 才拼素材路径；占位条目即使 `img` 字段写了文件名也不加载，避免裂图/挂错人。

## 6. 上线前验证
- [ ] 顶部「图鉴 ↔ 最新预览」可切换；切到 preview 才渲染（懒加载，不拖慢首屏）。
- [ ] CN/JP 内切换正常；计数：基准日/窗口、当期数、待补图、横幅就位比与 `data.js` 一致。
- [ ] JP 就位卡面（凪砂，1张）正常加载、带“待官方替换”角标；CN 两条为占位、不裂图；司/BOX 等2020旧池归档条目不出现。
- [ ] 横幅位 JP 就位1张（凪砂）、带角标；CN 两条占位；archive 横幅（司/BOX/涉/旧作活动）不出现。
- [ ] 既有 `acc/mv/enc/timeline/jp/sched` 视图与下方 `songs/wz/term/log` 无样式/逻辑回归。
- [ ] 移动端窄屏：标签换行、卡片网格 `minmax(180px,1fr)`、横幅 `minmax(300px,1fr)` 不破版。
