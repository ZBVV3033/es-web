/* ============================================================
 * 分国服 / 日服 最新五星预览 · 小样数据（v3：2026-11-02 纠错版）
 * 口径：mode=cn/jp；group=current 当期进行中 / recent30d 近30天 / archive 往期或废弃锚点（不渲染）。
 * 页面只渲染 current 与 recent30d；archive 仅留档，不出现在网格与横幅区。
 * imgReady=false 渲染占位，不插 <img>，避免离线裂图/挂错人；图核验下载后再置 true。
 * lowQuality=true：第三方/低清图，UI 挂“待官方替换”角标，后续统一换官方高清。
 * 红线：金/红框+五颗亮星才是★5；绿框★4/蓝框★3/多人同框不入网格；CN/JP 不混；旧年旧作不冒充当期。
 * ============================================================ */

const PREVIEW_CARDS = [
  // ===================== 国服 CN（官方微博核实，2026-11-02） =====================
  { id:"cn-s5-jun", mode:"cn", group:"current", star:5, char:"涟纯", card:"【觉醒的试炼】",
    sourceType:"event", sourceName:"试炼！追寻属于自己的Golden Dream（演唱会活动）", dateISO:"2026-10-31",
    type:"", tag:"箱活", img:"preview_img/cards/cn-s5-jun.jpg", before:"preview_img/cards/cn-s5-jun.jpg", after:"", imgReady:true, lowQuality:true,
    startISO:"2026-10-31T12:00:00+08:00", endISO:"2026-11-08T22:00:00+08:00",
    sourceUrl:"https://www.xiaohongshu.com/explore/6ae32c5b0000000015000668",
    note:"官方事实：本期活动唯一★5【觉醒的试炼】涟纯，同池★4巴日和、★3乱凪砂/七种茨，10-31 12:00~11-08 22:00；花前取官号小红书首图640×512五亮星本人（含水印，待官方高清）；花后（开花/觉醒版）暂缺官方成对图，先占位，按中日近似对照与 yuou 线索后续补齐" },
  { id:"cn-s5-natsume", mode:"cn", group:"current", star:5, char:"逆先夏目", card:"【一起悠然度过的夏天】",
    sourceType:"scout", sourceName:"招募！夏至夜风（限定卡池）", dateISO:"2026-10-30",
    type:"", tag:"卡池", img:"preview_img/cards/cn-s5-natsume.jpg", before:"preview_img/cards/cn-s5-natsume.jpg", after:"", imgReady:true, lowQuality:true,
    startISO:"2026-10-30T12:00:00+08:00", endISO:"2026-11-13T12:00:00+08:00",
    sourceUrl:"https://www.xiaohongshu.com/explore/6ae0829c000000002b01ef84",
    note:"官方事实：本期卡池唯一★5【一起悠然度过的夏天】逆先夏目，同池★4鬼龙红郎等，10-30 12:00~11-13 12:00；花前取官号小红书首图640×512五亮星本人（含水印，待官方高清）；花后（开花/觉醒版）暂缺官方成对图，先占位，按中日近似对照与 yuou 线索后续补齐" },

  // ===================== 日服 JP（Music；仅放经原文核年份为2026当期、且目视五星星框者） =====================
  { id:"jp-stage-nagisa", mode:"jp", group:"current", star:5, char:"乱凪砂", card:"［追いかける熱］乱凪砂",
    sourceType:"scout", sourceName:"Bright me up!!スカウト Stage：凪砂（10-25 15:00~11-10 15:00）", dateISO:"2026-10-25",
    type:"", tag:"卡池", img:"preview_img/cards/jp-stage-nagisa.png", before:"preview_img/cards/jp-stage-nagisa.png", after:"preview_img/cards/jp-stage-nagisa-after.png", imgReady:true, lowQuality:true,
    startISO:"2026-10-25T15:00:00+09:00", endISO:"2026-11-10T15:00:00+09:00",
    sourceUrl:"https://gamerch.com/ensemble-star-music/1026378",
    note:"单卡1026378目视五红星框凪砂本人；花前=才能開花前640×800，花后=才能開花後（wiki仅320×400低清缩略、带©水印，不放大冒充高清）；第三方wiki成对图均挂“待官方替换”；yuou（小红书个衣3/卡面异色整理）作后续高清替换线索" },
  { id:"jp-area07-midori", mode:"jp", group:"current", star:5, char:"高峯翠", card:"AREA07 流星隊側イベント報酬 ★5（2wink VS 流星隊 EVENT）",
    sourceType:"event", sourceName:"World Tour 篇 AREA07「2wink VS 流星隊」MEGASPHERE MATCH（EVENT / 対曲 GET THE WIN）", dateISO:"2026-10-31",
    type:"", tag:"活动", img:"", before:"", after:"", imgReady:false,
    startISO:"2026-10-31T15:00:00+09:00",
    sourceUrl:"https://ensemble-stars.jp/mainstory_world_tour/",
    note:"EVENT 活动奖励 ★5 高峯翠（流星隊）；官方特设站 Music 2026-10-31~11-08（Basic 10-31~11-09）、対曲 GET THE WIN；同奖 ★4葵ひなた、★3守沢千秋/深海奏汰；预告为横版群像（多人同框不入网格），标准竖版花前/花后稳定图未取得前双槽占位，不用截图/别家卡顶替" },
  { id:"jp-area07-yuta", mode:"jp", group:"current", star:5, char:"葵裕太（葵ゆうた）", card:"AREA07 同時開催 SCOUT ★5（2wink VS 流星隊 募集）",
    sourceType:"scout", sourceName:"World Tour 篇 AREA07 同時開催 SCOUT（10-30~11-14，pickup ★5 葵ゆうた）", dateISO:"2026-10-30",
    type:"", tag:"卡池", img:"", before:"", after:"", imgReady:false,
    startISO:"2026-10-30T15:00:00+09:00", endISO:"2026-11-14T15:00:00+09:00",
    sourceUrl:"https://ensemble-stars.jp/mainstory_world_tour/",
    note:"官方特设站 SCOUT INFORMATION 2026-10-30~11-14；预告核实招募 ★5 葵ゆうた（葵裕太/AO YUTA）、★4南雲鉄虎、★3仙石忍；招募起止日期为官方，时刻沿用日服招募常规15:00口径、待官方公告时点校准；预告为横版群像，竖版花前/花后稳定图未取得前双槽占位" },

  // ---------- archive：废弃/往期锚点，页面不渲染，仅留档纠错 ----------
  { id:"jp-old-tsukasa-2020", mode:"jp", group:"archive", star:5, char:"朱樱司", card:"［王に至るため］朱樱司（2020旧复刻池，非当期）",
    sourceType:"scout", sourceName:"フィーチャースカウト 司編（旧池193443，2020-10-25~11-10，复刻至2023）", dateISO:"2020-10-25",
    type:"", img:"preview_img/cards/jp-fv-tsukasa.png", imgReady:true, lowQuality:true,
    sourceUrl:"https://gamerch.com/ensemble-star-music/193443",
    note:"纠错留档：193443原文开催2020-10-25 15:00~11-10 15:00、复刻2021/22/23，唯一☆5即此司旧卡（单卡193430）；目视本人/五星框属实但年代为2020，非2026当期，默认隐藏、不进当期网格" },
  { id:"jp-old-wata-2020", mode:"jp", group:"archive", star:5, char:"日日树涉", card:"［瞳に映る姿］（2020旧复刻池，非当期）",
    sourceType:"scout", sourceName:"フィーチャースカウト 渉編（旧池199178，2020-11-10~11-25）", dateISO:"2020-11-10",
    type:"", img:"", imgReady:false,
    sourceUrl:"https://gamerch.com/ensemble-star-music/199178",
    note:"纠错留档：199178为2020旧复刻池，其★5=［瞳に映る姿］涉、★4=零、★3=みか/こはく；不是2026当期，禁止冒充当期★5；2026当期涉相关池需重新定位后再入current" },
  { id:"jp-old-halloween-event", mode:"jp", group:"archive", star:5, char:"（旧作!活动，非Music）", card:"開演 ダークナイトハロウィン（旧作!ライブイベント）",
    sourceType:"event", sourceName:"em1 help events/12（旧作“!”，非Music当期）", dateISO:"2026-10-31",
    type:"", img:"", imgReady:false,
    sourceUrl:"https://em1.ensemble-stars.jp/app_help/events/12/index.html",
    note:"纠错留档：该help为旧作“!”活动，前半大神晃牙/朔间凛月、后半朔间零/葵ひなた，含★3~★5但不列卡名；与Music当期不同体系，不入Music当期★5网格" },
  { id:"cn-archive-1", mode:"cn", group:"archive", star:5, char:"神崎飒马", card:"锦簇花路", sourceType:"scout",
    sourceName:"Bright me up!!招募 Stage：飒马", dateISO:"2026-10-12", type:"", img:"", imgReady:false,
    sourceUrl:"https://www.taptap.cn/app/183321/topic?type=official", note:"往期，已结束，不进当期/近30天网格" },
  { id:"cn-archive-2", mode:"cn", group:"archive", star:5, char:"游木真", card:"星星的谋略", sourceType:"scout",
    sourceName:"招募！好战骑士与奇策之星", dateISO:"2026-10-16", type:"", img:"", imgReady:false,
    sourceUrl:"", note:"往期，不渲染" },
  { id:"jp-archive-1", mode:"jp", group:"archive", star:5, char:"衣更真绪", card:"Ambassador／食道乐 ★5", sourceType:"scout",
    sourceName:"招募！Ambassador／食道乐（10-14~10-30，已结束）", dateISO:"2026-10-14", type:"", img:"", imgReady:false,
    sourceUrl:"", note:"往期，不渲染" }
];

/* 官方/第三方宣传横幅（卡池 banner / 活动横版 CG）；统一本地 preview_img/banner 引用。
 * group=archive 的横幅不渲染；imgReady=false 用占位；lowQuality=true 挂“待官方替换”角标。 */
const PREVIEW_BANNERS = [
  { id:"bn-cn-1", mode:"cn", group:"current", title:"试炼！追寻属于自己的Golden Dream（活动★5 涟纯，10-31 12:00~11-08 22:00）", dateISO:"2026-10-31",
    kind:"event", tag:"箱活", startISO:"2026-10-31T12:00:00+08:00", endISO:"2026-11-08T22:00:00+08:00", img:"preview_img/banner/bn-cn-1.jpg", imgReady:true, lowQuality:true,
    sourceUrl:"https://www.xiaohongshu.com/explore/6ae32c5b0000000015000668",
    note:"官号小红书活动主视觉640×360横版，四人本期活动阵容+档期+标题；低清/平台水印，待官方高清横幅替换；事实档期来自官方微博" },
  { id:"bn-cn-2", mode:"cn", group:"current", title:"招募！夏至夜风 · 活动期间故事全话免费公开（★5 逆先夏目，10-30 12:00~11-13 12:00）", dateISO:"2026-10-30",
    kind:"scout", tag:"卡池", startISO:"2026-10-30T12:00:00+08:00", endISO:"2026-11-13T12:00:00+08:00", img:"preview_img/banner/bn-cn-2.jpg", imgReady:true, lowQuality:true,
    sourceUrl:"https://www.xiaohongshu.com/explore/6ae32b8d00000000030228ae",
    note:"官号『招募！夏至夜风现已开启！』横版公告横幅640×335：活动期间招募活动故事免费公开+阅读故事入口+开放时间条；夏目本人右侧；低清/平台水印，待官方高清原图替换" },
  { id:"bn-cn-night", mode:"cn", group:"current", title:"特别通告·夜色狂想～共赴心跳盛宴～（活动★5 巴日和【以爱共饮夜色】，10-24 12:00～11-04 22:00，进行中）", dateISO:"2026-10-24",
    kind:"event", tag:"特别通告", startISO:"2026-10-24T12:00:00+08:00", endISO:"2026-11-04T22:00:00+08:00", img:"preview_img/banner/bn-cn-night.jpg", imgReady:true, lowQuality:true,
    sourceUrl:"https://www.taptap.cn/app/183321/topic?page=42",
    note:"国服官方公告：活动 2026-10-24 12:00~11-04 22:00，可获活动★5【以爱共饮夜色】巴日和（吸血鬼该隐·鬼屋一日NPC），活动结束后卡片后续追加至回忆硬币商店；基准日 2026-11-03 仍在进行，故归当期宣传图区（非往期）；主视觉取官号长图顶部640×636（巴日和本人+标题），低清待官方高清；无标准单人竖版花前/花前不进★5网格，避免多人/半身图顶替" },
  { id:"bn-jp-nagisa-stage", mode:"jp", group:"current", title:"Bright me up!!スカウト Stage：凪砂（主角 乱凪砂）", dateISO:"2026-10-25",
    kind:"scout", tag:"卡池", startISO:"2026-10-25T15:00:00+09:00", endISO:"2026-11-10T15:00:00+09:00", img:"preview_img/banner/jp-stage-nagisa.jpg", imgReady:true, lowQuality:true,
    sourceUrl:"https://gamerch.com/ensemble-star-music/1027003",
    note:"当期2026池（10-25 15:00~11-10 15:00，已核年份）；wiki横幅612×269，主角凪砂与标题目视确认；第三方低清待官方高清替换；对应★5凪砂已在网格" },
  { id:"bn-jp-area07-event", mode:"jp", group:"current", title:"AREA07 MEGASPHERE MATCH｜2wink VS 流星隊（EVENT 活动★5 高峯翠，Music 10-31~11-08，対曲 GET THE WIN）", dateISO:"2026-10-31",
    kind:"event", tag:"活动", startISO:"2026-10-31T15:00:00+09:00", img:"", imgReady:false,
    sourceUrl:"https://ensemble-stars.jp/mainstory_world_tour/",
    note:"官方特设站 AREA07 in Australia 2wink VS 流星隊；EVENT 活动奖励★5高峯翠（流星隊）；预告为横版群像、非单人横幅，官方横版宣传图未取到前以占位块显示，不使用用户截图入库" },
  { id:"bn-jp-area07-scout", mode:"jp", group:"current", title:"AREA07 同時開催 SCOUT｜2wink VS 流星隊（招募★5 葵ゆうた，10-30~11-14）", dateISO:"2026-10-30",
    kind:"scout", tag:"卡池", startISO:"2026-10-30T15:00:00+09:00", endISO:"2026-11-14T15:00:00+09:00", img:"", imgReady:false,
    sourceUrl:"https://ensemble-stars.jp/mainstory_world_tour/",
    note:"官方 SCOUT INFORMATION 10-30~11-14，pickup★5葵ゆうた、★4南雲鉄虎、★3仙石忍；预告横版群像不作正式横幅，官方宣传图未取到前占位，不使用用户截图入库" },
  { id:"bn-jp-mao-ambassador", mode:"jp", group:"recent30d", title:"スカウト！Ambassador／ショクドウラク（近30天招募 ☆5 衣更真緒）", dateISO:"2026-10-14",
    kind:"scout", tag:"卡池", startISO:"2026-10-14T15:00:00+09:00", endISO:"2026-10-30T15:00:00+09:00", img:"preview_img/banner/jp-music-mao-ambassador.jpg", imgReady:true, lowQuality:true,
    sourceUrl:"https://gamerch.com/ensemble-star-music/1026196",
    note:"Music招募2026-10-14 15:00~10-30 15:00唯一☆5真绪［食への探求］；wiki横幅608×267、本人+招募标题目视确认；第三方低清待官方替换；往期近30天、非当期进行中，不混入当期区" },
  // ---------- archive 横幅：废弃/旧锚点，不渲染 ----------
  { id:"bn-jp-wata", mode:"jp", group:"archive", title:"[旧]フィーチャースカウト 渉編 2020旧复刻池横幅", dateISO:"2020-11-10",
    kind:"scout", img:"preview_img/banner/jp-scout-wata.jpg", imgReady:true, lowQuality:true,
    sourceUrl:"https://gamerch.com/ensemble-star-music/199178",
    note:"纠错留档：旧复刻池横幅，非2026当期，默认隐藏" },
  { id:"bn-jp-tsukasa", mode:"jp", group:"archive", title:"[旧]フィーチャースカウト 司編（2020-10-25~11-10，复刻至2023）", dateISO:"2020-10-25",
    kind:"scout", img:"preview_img/banner/jp-scout-tsukasa.jpg", imgReady:true, lowQuality:true,
    sourceUrl:"https://gamerch.com/ensemble-star-music/193443",
    note:"纠错留档：原文开催2020-10-25~11-10、复刻2021/22/23，唯一☆5=［王に至るため］司旧卡；横幅主角/标题虽目视属实，但年代为2020，非2026当期，默认隐藏" },
  { id:"bn-jp-box-halloween", mode:"jp", group:"archive", title:"[旧]スカウト！ハロウィンBOX（2020-10-30~11-14，复刻至2023）", dateISO:"2020-10-30",
    kind:"scout", img:"preview_img/banner/jp-scout-halloween-box.jpg", imgReady:true, lowQuality:true,
    sourceUrl:"https://gamerch.com/ensemble-star-music/194659",
    note:"纠错留档：原文开催2020年10月30日15:00~11月14日15:00，复刻2021/2022/2023；唯一☆5=［甘くないスイーツ］葵ひなた旧卡；非2026当期，默认隐藏、不进网格" },
  { id:"bn-jp-e-halloween", mode:"jp", group:"archive", title:"[旧]開演 ダークナイトハロウィン（旧作!活动）", dateISO:"2026-10-31",
    kind:"event", img:"preview_img/banner/bn-jp-e-halloween.jpg", imgReady:false,
    sourceUrl:"https://em1.ensemble-stars.jp/app_help/events/12/index.html",
    note:"纠错留档：旧作活动横幅位，非Music当期，默认隐藏；不拿过期/错体系图顶替" }
];

const PREVIEW_META = {
  title:"最新五星预览 · 国服 / 日服",
  rule:"当期进行中全部 ★5 ＋ 近30天追加 ★5；按日期最新倒序；宣传图下载本地引用；待核条目不挂图、不猜人；旧年旧作锚点归档不渲染。",
  fallbackNote:"v7（2026-11-04）：JP 当期★5＝凪砂［追いかける熱］（10-25~11-10）＋AREA07 EVENT ★5高峯翠（10-31~11-08）＋AREA07 SCOUT ★5葵ゆうた（10-30~11-14）＋Raika［SWEET LIE］（10-15~10-24）＋真绪［食への探求］（10-14~10-30）＋Basic司［自信を武器に］（10-10）；后两者预告仅为横版群像、竖版花前/花后卡面与官方横幅先占位待补；CN：涟纯Golden Dream活动★5、夏目夏至夜风卡池★5卡面与横幅已用官号小红书首图就位（lowQuality待官方高清）；另：国服『特别通告·夜色狂想～共赴心跳盛宴～』10-24 12:00~11-04 22:00（官方公告，基准日11-04进行中）★5巴日和横幅归当期宣传图区并带剩余倒计时；9月留档：スカウト！鬼火★5昴流［橙色の赤鬼］（08-30~09-14，旧作!体系，已过近30天窗口）。"
};

/* ============================================================
 * 旧「图鉴」模块（enc）最近30天 CN/JP ★5 优先填充清单
 * 老格式：每条对应一个角色按钮；cards 沿用 enc-item（图位+卡名+星级+来源）。
 * img 为空 => 前端渲染“待补官方卡面”占位框+文字，不裂图、不拿旧图/同人顶替。
 * recent:true 表示置顶优先；旧手工图鉴条目仍由主站 ENCY 提供、排在其后。
 * 红线：Basic/Music 体系在 info 中标明；未目视标准卡面者不渲染五星框图；
 *       2020 旧复刻池（司193443/BOX194659/涉199178）禁止出现在此清单。
 * ============================================================ */
const ENC_RECENT = [
  // ---------- 日服 JP（2026 已核年份；Basic/Music 分别标注） ----------
  { id:"en-jp-nagisa-20261025", server:"JP", dateISO:"2026-10-25", name:"乱凪砂", jp:"乱凪砂", unit:"JP · 2026-10-25",
    info:"Music 当期 Bright me up!!スカウト Stage：凪砂 ★5［追いかける熱］（10-25 15:00~11-10 15:00，已核2026；卡面就位、低清待官方替换）",
    cards:[
      { name:"［追いかける熱］乱凪砂（Music ★5）", star:"★★★★★",
        img:"latest-preview/preview_img/cards/jp-stage-nagisa.png",
        src:"Gamerch 单卡1026378（第三方低清，待官方高清替换）",
        link:"https://gamerch.com/ensemble-star-music/1026378",
        note:"五红星框+本人目视确认；同池★4円果望見、★3遊木真，不得混入★5" }
    ], outfits:[] },
  { id:"en-jp-tsukasa-20261010", server:"JP", dateISO:"2026-10-10", name:"朱樱司", jp:"朱桜司", unit:"JP · 2026-10-10",
    info:"Basic Bright me up!!スカウト Stage：司 ☆5［自信を武器に］（2026-10-10 追加，已核年份；与归档2020旧司卡193430不是同一张；wiki五亮星觉醒竖版就位、低清待官方替换）",
    cards:[
      { name:"［自信を武器に］朱桜司（Basic ☆5 觉醒）", star:"★★★★★",
        img:"latest-preview/preview_img/cards/jp-basic-tsukasa-20261010.jpg",
        src:"Gamerch Basic 1021078（2026-10-10 追加，レアリティ☆5 Lv60；第三方低清觉醒竖版，待官方高清替换）",
        link:"https://gamerch.com/ensemble-star-basic/1021078",
        note:"五亮星框+朱樱司本人目视确认；Basic 体系；禁止与 archive 的2020旧司卡193430混用" }
    ], outfits:[] },
  { id:"en-jp-mao-20261014", server:"JP", dateISO:"2026-10-14", name:"衣更真绪", jp:"衣更真緒", unit:"JP · 2026-10-14",
    info:"Basic スカウト！Ambassador／ショクドウラク ☆5［食への探求］（2026-10-14 追加，已核年份；wiki五亮星觉醒竖版就位、低清待官方替换）",
    cards:[
      { name:"［食への探求］衣更真緒（Basic ☆5 觉醒）", star:"★★★★★",
        img:"latest-preview/preview_img/cards/jp-basic-mao-20261014.jpg",
        src:"Gamerch Basic 1021904（2026-10-14 追加，レアリティ☆5 Lv60；第三方低清觉醒竖版，待官方高清替换）",
        link:"https://gamerch.com/ensemble-star-basic/1021904",
        note:"五亮星框+衣更真绪本人目视确认；Basic 体系" }
    ], outfits:[] },
  { id:"en-jp-raika-20261015", server:"JP", dateISO:"2026-10-15", name:"Raika", jp:"ライカ", unit:"JP · 2026-10-15",
    info:"Basic 活动『悪夢★暗闇とらいむLIEト』☆5［SWEET LIE］（10-15 15:00~10-24 22:00，已核2026；占位待补图）",
    cards:[
      { name:"［SWEET LIE］ライカ（Basic 活动 ☆5）", star:"★★★★★", img:"",
        src:"Gamerch Basic 1022639（追加日2026-10-15）",
        link:"https://gamerch.com/ensemble-star-basic/1022639",
        note:"Special for Princess!；Basic 活动卡；待补标准卡面" }
    ], outfits:[] },

  // ---------- 国服 CN（官方微博/官方记录核实名称档期；卡面待补，占位不猜图） ----------
  { id:"en-cn-jun-20261031", server:"CN", dateISO:"2026-10-31", name:"涟纯", jp:"漣ジュン", unit:"CN · 2026-10-31",
    info:"国服活动『试炼！追寻属于自己的Golden Dream』唯一★5【觉醒的试炼】涟纯（活动10-31 12:00~11-08 22:00；名称档期官方微博核实，卡面待补）",
    cards:[
      { name:"【觉醒的试炼】涟纯（活动 ★5）", star:"★★★★★", img:"",
        src:"国服官方微博 5359324940993658",
        link:"https://m.weibo.cn/detail/5359324940993658",
        note:"同池★4巴日和、★3乱凪砂；待补官方标准卡面" }
    ], outfits:[] },
  { id:"en-cn-natsume-20261030", server:"CN", dateISO:"2026-10-30", name:"逆先夏目", jp:"逆先夏目", unit:"CN · 2026-10-30",
    info:"国服限定卡池『招募！夏至夜风』★5【一起悠然度过的夏天】逆先夏目（卡池10-30 12:00~11-13 12:00；名称档期官方微博核实，卡面待补）",
    cards:[
      { name:"【一起悠然度过的夏天】逆先夏目（卡池 ★5）", star:"★★★★★", img:"",
        src:"国服官方微博 5358962552604799",
        link:"https://m.weibo.cn/detail/5358962552604799",
        note:"同池★4鬼龙红郎等；待补官方标准卡面" }
    ], outfits:[] },
  { id:"en-cn-leo-20261017", server:"CN", dateISO:"2026-10-17", name:"月永雷欧", jp:"月永レオ", unit:"CN · 2026-10-17",
    info:"国服巡演活动 世界巡演篇 Knights VS Trickstar ★5《骑士的本心》（既有时间线记录；卡面待核待补）",
    cards:[
      { name:"骑士的本心 · 月永雷欧（巡演活动 ★5）", star:"★★★★★", img:"",
        src:"官方微博 5353887864718344",
        link:"https://m.weibo.cn/detail/5353887864718344",
        note:"时间线记录条目；待核标准卡面与星级框" }
    ], outfits:[] },
  { id:"en-cn-makoto-20261016", server:"CN", dateISO:"2026-10-16", name:"游木真", jp:"遊木真", unit:"CN · 2026-10-16",
    info:"国服卡池『招募！好战骑士与奇策之星』★5《星星的谋略》（既有时间线记录；卡面待核待补）",
    cards:[
      { name:"星星的谋略 · 游木真（卡池 ★5）", star:"★★★★★", img:"",
        src:"TapTap 官方话题",
        link:"https://www.taptap.cn/app/183321/topic?group_label_id=470880",
        note:"时间线记录条目；待核标准卡面与星级框" }
    ], outfits:[] },
  { id:"en-cn-souma-20261012", server:"CN", dateISO:"2026-10-12", name:"神崎飒马", jp:"神崎颯馬", unit:"CN · 2026-10-12",
    info:"国服 Bright me up!!招募 Stage：飒马 ★5《锦簇花路》（近30天窗口内已结束往期；仅作最近月填充，卡面待补）",
    cards:[
      { name:"锦簇花路 · 神崎飒马（Stage ★5）", star:"★★★★★", img:"",
        src:"TapTap 官方话题",
        link:"https://www.taptap.cn/app/183321/topic?page=112",
        note:"2026-10-12 往期；待补标准卡面" }
    ], outfits:[] },
  { id:"en-jp-midori-20261031", server:"JP", dateISO:"2026-10-31", name:"高峯翠", jp:"高峯翠", unit:"JP · 2026-10-31",
    info:"Music World Tour 篇 AREA07「2wink VS 流星隊」EVENT 活动奖励 ★5 高峯翠（10-31 15:00~11-08 22:00，已核2026；预告为横版群像，竖版花前/花后卡面待补）",
    cards:[
      { name:"AREA07 流星隊側 EVENT報酬 ★5 高峯翠（Music ★5）", star:"★★★★★", img:"",
        src:"官方特设站",
        link:"https://ensemble-stars.jp/mainstory_world_tour/",
        note:"活动奖励 ★5；同奖 ★4葵ひなた、★3守沢千秋/深海奏汰；预告为横版群像不入网格，标准竖版花前/花后待补" }
    ], outfits:[] },
  { id:"en-jp-yuta-20261030", server:"JP", dateISO:"2026-10-30", name:"葵裕太", jp:"葵ゆうた", unit:"JP · 2026-10-30",
    info:"Music AREA07 同時開催 SCOUT ★5 葵ゆうた（10-30 15:00~11-14 15:00，已核2026；同池★4南雲鉄虎、★3仙石忍；卡面待补）",
    cards:[
      { name:"AREA07 SCOUT ★5 葵ゆうた（Music ★5）", star:"★★★★★", img:"",
        src:"官方特设站",
        link:"https://ensemble-stars.jp/mainstory_world_tour/",
        note:"招募 pickup ★5；同池★4南雲鉄虎、★3仙石忍；预告横版群像，标准竖版花前/花后待补" }
    ], outfits:[] },
  { id:"en-jp-subaru-20260830", server:"JP", dateISO:"2026-08-30", name:"明星昴流", jp:"明星スバル", unit:"JP · 2026-08-30",
    info:"旧作! スカウト！鬼火 ★5［橙色の赤鬼］明星 スバル（08-30 15:00~09-14 15:00，已过近30天窗口，仅作9月活动留档）",
    cards:[
      { name:"［橙色の赤鬼］明星 スバル（旧作! ★5）", star:"★★★★★", img:"",
        src:"旧作! Help 官方",
        link:"https://em1.ensemble-stars.jp/app_help/gachas/122/index.html",
        note:"旧作! 体系；2026-09-14 结束；近30天外留档，不入当期网格" }
    ], outfits:[] }
];
