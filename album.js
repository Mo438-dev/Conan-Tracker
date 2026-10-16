/* Album: character cards + Black Organization cards that unlock from the shared watched list.
   A card unlocks when the list entry containing its reveal episode is watched
   (or, if that episode isn't in the list, the next entry after it). */
(function(){
const CARDS=[
 // g:'c' characters, g:'o' Black Organization. f = face key in faces2.js, u = unlock episode, s/su = secret line and its episode
 {k:"conan",g:"c",f:"conan",n:"كونان إدوغاوا",en:"Conan Edogawa",u:1,d:"المحقق الصغير بنظارة وببيونة"},
 {k:"shinichi",g:"c",f:"shinichi",n:"شينتشي كودو",en:"Shinichi Kudo",u:1,d:"محقق الثانوية المشهور… قبل ما يصغر"},
 {k:"ran",g:"c",f:"ran",n:"ران موري",en:"Ran Mouri",u:1,d:"صديقة طفولة شينتشي وبطلة كاراتيه"},
 {k:"kogoro",g:"c",f:"kogoro",n:"كوغورو موري",en:"Kogoro Mouri",u:1,d:"أبو ران، المحقق النايم"},
 {k:"agasa",g:"c",f:"agasa",n:"البروفيسور أغاسا",en:"Hiroshi Agasa",u:1,d:"جار شينتشي ومخترع أدوات كونان"},
 {k:"megure",g:"c",f:"megure",n:"المفتش ميغوري",en:"Juzo Megure",u:1,d:"رئيس قسم التحقيقات بقبعته اللي ما تنشال"},
 {k:"ayumi",g:"c",f:"ayumi",n:"أيومي يوشيدا",en:"Ayumi Yoshida",u:1,d:"من فريق المتحرين الصغار"},
 {k:"genta",g:"c",f:"genta",n:"غينتا كوجيما",en:"Genta Kojima",u:1,d:"قائد المتحرين الصغار… وعاشق الأونيغيري"},
 {k:"mitsuhiko",g:"c",f:"mitsuhiko",n:"ميتسوهيكو تسوبورايا",en:"Mitsuhiko Tsuburaya",u:1,d:"عقل المتحرين الصغار"},
 {k:"culprit",g:"c",f:"culprit",n:"الجاني",en:"The Culprit",u:1,d:"الظل الأسود اللي يطلع بكل قضية"},
 {k:"sonoko",g:"c",f:"sonoko",n:"سونوكو سوزوكي",en:"Sonoko Suzuki",u:6,d:"صديقة ران المقرّبة، بنت عائلة سوزوكي"},
 {k:"eri",g:"c",f:"eri",n:"إيري كيساكي",en:"Eri Kisaki",u:32,d:"أم ران، المحامية اللي ما تخسر قضية"},
 {k:"yusaku",g:"c",f:"yusaku",n:"يوساكو كودو",en:"Yusaku Kudo",u:43,d:"أبو شينتشي، كاتب روايات بوليسية عالمي"},
 {k:"yukiko",g:"c",f:"yukiko",n:"يوكيكو كودو",en:"Yukiko Kudo",u:43,d:"أم شينتشي، ممثلة سابقة وأستاذة تنكّر"},
 {k:"heiji",g:"c",f:"heiji",n:"هيجي هاتوري",en:"Heiji Hattori",u:48,d:"محقق الغرب من أوساكا"},
 {k:"takagi",g:"c",f:"takagi",n:"واتارو تاكاغي",en:"Wataru Takagi",u:66,d:"المحقق الطيب اللي قلبه مع ساتو"},
 {k:"nakamori",g:"c",f:"nakamori",n:"المفتش ناكاموري",en:"Ginzo Nakamori",u:76,d:"مطارد كايتو كيد اللي ما يستسلم"},
 {k:"kid",g:"c",f:"kid",n:"كايتو كيد",en:"Kaitou Kid",u:76,d:"اللص الشبح بالقبعة والمونوكل"},
 {k:"kobayashi",g:"c",f:"kobayashi",n:"سوميكو كوباياشي",en:"Sumiko Kobayashi",u:112,d:"معلمة كونان بالمدرسة"},
 {k:"kazuha",g:"c",f:"kazuha",n:"كازوها توياما",en:"Kazuha Toyama",u:118,d:"صديقة طفولة هيجي"},
 {k:"haibara",g:"c",f:"haibara",n:"آي هايبارا",en:"Ai Haibara",u:129,d:"طالبة جديدة بالفصل… جاية من المنظمة"},
 {k:"sato",g:"c",f:"sato",n:"ميواكو ساتو",en:"Miwako Sato",u:130,d:"محققة شجاعة، نجمة قسم الشرطة"},
 {k:"chiba",g:"c",f:"chiba",n:"كازونوبو تشيبا",en:"Kazunobu Chiba",u:138,d:"محقق بالشرطة يحب الأكل"},
 {k:"shiratori",g:"c",f:"shiratori",n:"نينزابورو شيراتوري",en:"Ninzaburo Shiratori",u:146,d:"المفتش الغني، منافس تاكاغي"},
 {k:"yumi",g:"c",f:"yumi",n:"يومي مياموتو",en:"Yumi Miyamoto",u:146,d:"شرطية مرور وصديقة ساتو"},
 {k:"makoto",g:"c",f:"makoto",n:"ماكوتو كيوغوكو",en:"Makoto Kyogoku",u:153,d:"بطل الكاراتيه اللي ما ينهزم، حبيب سونوكو"},
 {k:"jodie",g:"c",f:"jodie",n:"جودي ستارلينغ",en:"Jodie Starling",u:226,d:"معلمة إنجليزي مرحة",s:"عميلة FBI تطارد فيرموث",su:345},
 {k:"akai",g:"c",f:"akai",n:"شويتشي أكاي",en:"Shuichi Akai",u:230,d:"رجل غامض بنظرة حادة",s:"عميل FBI، وأخطر عدو للمنظمة",su:345},
 {k:"james",g:"c",f:"james",n:"جيمس بلاك",en:"James Black",u:258,d:"رجل إنجليزي هادي",s:"رئيس فريق الـFBI في اليابان",su:345},
 {k:"matsuda",g:"c",f:"matsuda",n:"جينبي ماتسودا",en:"Jinpei Matsuda",u:301,d:"خبير تفكيك متفجرات بالشرطة"},
 {k:"hagiwara",g:"c",f:"hagiwara",n:"كينجي هاغيوارا",en:"Kenji Hagiwara",u:304,d:"خبير متفجرات وصديق ماتسودا"},
 {k:"camel",g:"c",f:"camel",n:"أندريه كاميل",en:"Andre Camel",u:497,d:"عميل FBI ضخم وسوّاق محترف"},
 {k:"subaru",g:"c",f:"subaru",n:"سوبارو أوكيا",en:"Subaru Okiya",u:509,d:"طالب دراسات عليا ساكن ببيت شينتشي",s:"هو نفسه شويتشي أكاي متنكّر",su:783},
 {k:"kansuke",g:"c",f:"kansuke",n:"كانسوكي ياماتو",en:"Kansuke Yamato",u:516,d:"مفتش شرطة ناغانو بعين وحدة"},
 {k:"yui",g:"c",f:"yui",n:"يوي أويهارا",en:"Yui Uehara",u:516,d:"مساعدة ياماتو بشرطة ناغانو"},
 {k:"komei",g:"c",f:"komei",n:"تاكاآكي موروفوشي",en:"Taka'aki Morofushi",u:558,d:"كومي، العبقري الهادي بشرطة ناغانو"},
 {k:"naeko",g:"c",f:"naeko",n:"نايكو ميكي",en:"Naeko Miike",u:624,d:"شرطية مرور، حب تشيبا الأول"},
 {k:"sera",g:"c",f:"sera",n:"ماسومي سيرا",en:"Masumi Sera",u:646,d:"محققة ثانوية بأسلوب صبياني",s:"أخت شويتشي أكاي الصغيرة",su:701},
 {k:"amuro",g:"c",f:"amuro",n:"تورو أمورو",en:"Toru Amuro",u:667,d:"محقق ونادل بكافيه بوارو",s:"عضو بالمنظمة باسم بوربون",su:701},
 {k:"date",g:"c",f:"date",n:"واتارو داتي",en:"Wataru Date",u:681,d:"محقق بالشرطة وأستاذ تاكاغي"},
 {k:"haneda",g:"c",f:"haneda",n:"شوكيتشي هانيدا",en:"Shukichi Haneda",u:731,d:"بطل الشوغي العبقري"},
 {k:"mary",g:"c",f:"mary",n:"ماري سيرا",en:"Mary Sera",u:754,d:"البنت الغامضة اللي ساكنة مع سيرا"},
 {k:"rumi",g:"c",f:"rumi",n:"رومي واكاسا",en:"Rumi Wakasa",u:889,d:"المعلمة الجديدة الغامضة"},
 {k:"kazami",g:"c",f:"kazami",n:"يويا كازامي",en:"Yuya Kazami",u:925,d:"مساعد فورويا بالأمن العام"},
 {k:"momiji",g:"c",f:"momiji",n:"موميجي أوكا",en:"Momiji Ooka",u:1024,d:"محققة من كيوتو، منافسة كازوها على هيجي"},
 {k:"muga",g:"c",f:"muga",n:"إيوري موغا",en:"Iori Muga",u:1024,d:"خادم موميجي المخلص"},

 {k:"gin",g:"o",f:"gin",n:"جين",en:"Gin",u:1,d:"القاتل البارد اللي سقى شينتشي السم"},
 {k:"vodka",g:"o",f:"vodka",n:"فودكا",en:"Vodka",u:1,d:"ظل جين الدائم"},
 {k:"tequila",g:"o",f:"tequila",n:"تيكيلا",en:"Tequila",u:54,d:"عضو ضخم جاي يستلم بيانات"},
 {k:"akemi",g:"o",f:"akemi",n:"أكيمي ميانو",en:"Akemi Miyano",u:128,d:"عضوة بلا اسم حركي، نفّذت سرقة المليار ين",s:"أخت شيري الكبيرة",su:129},
 {k:"sherry",g:"o",f:"haibara",n:"شيري",en:"Sherry",u:129,d:"صانعة السم APTX 4869… هي آي هايبارا"},
 {k:"pisco",g:"o",f:"pisco",n:"بيسكو",en:"Pisco",u:176,d:"عضو قديم بواجهة رجل أعمال"},
 {k:"vermouth",g:"o",f:"vermouth",n:"فيرموث",en:"Vermouth",u:176,d:"سيدة الأسرار والتنكّر",s:"هي الممثلة شارون فينيارد، وبنفس الوقت كريس",su:345},
 {k:"calvados",g:"o",f:"calvados",n:"كالفادوس",en:"Calvados",u:345,d:"قنّاص مخلص لفيرموث"},
 {k:"chianti",g:"o",f:"chianti",n:"كيانتي",en:"Chianti",u:425,d:"قنّاصة بوشم فراشة"},
 {k:"korn",g:"o",f:"korn",n:"كورن",en:"Korn",u:425,d:"قنّاص هادي، شريك كيانتي"},
 {k:"kir",g:"o",f:"rena",n:"كير",en:"Kir",u:425,d:"مذيعة الأخبار رينا ميزوناشي",s:"عميلة CIA مزروعة: هيدمي هوندو",su:500},
 {k:"rye",g:"o",f:"akai",n:"راي",en:"Rye",u:500,d:"الاسم الحركي لشويتشي أكاي لما اخترق المنظمة"},
 {k:"bourbon",g:"o",f:"amuro",n:"بوربون",en:"Bourbon",u:701,d:"تورو أمورو، المحقق اللي يشتغل بالكافيه",s:"شرطي أمن عام متخفّي: ري فورويا (زيرو)",su:783},
 {k:"scotch",g:"o",f:"hiromitsu",n:"سكوتش",en:"Scotch",u:783,d:"عضو سابق انكشف إنه جاسوس",s:"هيروميتسو موروفوشي، صديق طفولة فورويا",su:983},
 {k:"boss",g:"o",f:"boss",n:"الزعيم",en:"The Boss",u:942,d:"رأس المنظمة: رينيا كاراسوما"},
 {k:"rum",g:"o",f:"rum",n:"رم",en:"Rum",u:1079,d:"الرجل الثاني بالمنظمة: كانينوري واكيتا"}
];
const COL={conan:["#4f86d9","#1f4590"],shinichi:["#3d5a94","#16264d"],ran:["#ee88a6","#b03a62"],yusaku:["#4c9a9e","#1d5357"],yukiko:["#f09a86","#b9503f"],kogoro:["#8299b3","#3f546c"],culprit:["#7a1f2c","#1a080b"],haibara:["#c9566b","#7a1f33"],agasa:["#f0a058","#b85a1c"],heiji:["#7f9a4a","#3e5320"],kazuha:["#f06a52","#b02a1f"],eri:["#9a7cc9","#4f3387"],matsuda:["#5a5e66","#1f2126"],akai:["#3c5a48","#0f1d15"],sera:["#4fc0bd","#17716e"],subaru:["#c9ad7e","#7d6440"],rena:["#b04a86","#5c1844"],sonoko:["#f1c552","#b3861a"],
 megure:["#b08354","#6b4523"],ayumi:["#f39bb4","#c2507a"],genta:["#e0614f","#9c2f22"],mitsuhiko:["#6fb58a","#2f7048"],takagi:["#6a7fa8","#2f3f63"],kid:["#8fa9d6","#3e5b93"],kobayashi:["#d9718f","#93324f"],sato:["#a46cc4","#5d2c7d"],chiba:["#9aa65a","#5b6524"],shiratori:["#c9a24a","#86651a"],yumi:["#3f6fb5","#1b3a70"],makoto:["#d08a3e","#8a4f12"],jodie:["#e3b84f","#9e7615"],james:["#7d8a99","#3d4652"],hagiwara:["#5b7c8f","#253c4a"],camel:["#6f8f5a","#33502a"],kansuke:["#8a6a4a","#4a331c"],yui:["#b5739c","#6e3359"],komei:["#3f7f7a","#164543"],naeko:["#4d86c9","#1f4f8a"],amuro:["#d9a441","#8f6312"],date:["#55806a","#22463a"],haneda:["#8c7aa8","#4a3a68"],mary:["#d6c070","#8f7a26"],rumi:["#5e9f7f","#24604a"],kazami:["#6f8a6f","#33493a"],momiji:["#e08d5a","#a04e1f"],nakamori:["#7c8c9e","#3a4757"],muga:["#5a5a7a","#25253f"]};
const GLASS='<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12h40L32 34z"/><path d="M32 34v18M22 52h20"/><path d="M18 18h28" opacity=".5"/><circle cx="41" cy="9" r="4"/></svg>';
const LOCK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/></svg>';

function range(d){const p=d.id.slice(1).split("-").map(Number);return [p[0],p[1]||p[0]]}
function entryFor(ep){return DATA.find(d=>{const[a,b]=range(d);return ep>=a&&ep<=b})||DATA.find(d=>range(d)[0]>ep)||null}
function isOpen(ep){const e=entryFor(ep);return !!(e&&watched[e.id])}
function epLabel(ep){const e=entryFor(ep);return e?e.id:"قريباً"}
function keys(){const o=[];for(const c of CARDS){if(isOpen(c.u)){o.push(c.k);if(c.s&&isOpen(c.su))o.push(c.k+":s")}}return o}
function getSeen(){try{return JSON.parse(localStorage.getItem("album-seen")||"null")}catch(e){return null}}
function setSeen(a){try{localStorage.setItem("album-seen",JSON.stringify(a))}catch(e){}}
function faceSVG(f,mode){const F=(window.FACES2||{})[f];if(!F)return "";
  if(f==="boss"&&mode!=="sil")return '<svg viewBox="0 0 300 300"><path fill="#e9c46a" fill-rule="evenodd" d="'+F[0]+'"/></svg>';
  if(mode==="sil")return '<svg viewBox="0 0 300 300"><path fill="currentColor" fill-rule="evenodd" d="'+F[0]+'"/></svg>';
  return '<svg viewBox="0 0 300 300"><path fill="#fff" fill-rule="evenodd" d="'+F[0]+'"/><path fill="#15161e" fill-rule="evenodd" d="'+F[1]+'"/></svg>'}

const css=`
#albumBtn{position:relative}
#albumBtn .bd{position:absolute;top:5px;inset-inline-end:5px;width:9px;height:9px;border-radius:50%;background:#ff5a5f;box-shadow:0 0 0 2px var(--bar);display:none}
#albumBtn.has .bd{display:block}
#album{position:fixed;inset:0;z-index:30;background:var(--bg);overflow-y:auto;-webkit-overflow-scrolling:touch;transform:translateY(100%);transition:transform .38s cubic-bezier(.2,.9,.25,1);visibility:hidden}
#album.open{transform:none;visibility:visible}
#album .ah{position:sticky;top:0;z-index:2;background:var(--bar);color:#fff;padding:calc(env(safe-area-inset-top,0px) + 10px) 16px 12px;display:grid;gap:10px}
#album .ah .r{display:flex;align-items:center;gap:10px}
#album .ah b{font-family:var(--f-head);font-size:1.6rem;line-height:1;flex:1}
#album .ah .cnt{font-family:var(--f-num);font-weight:600}
#album .seg2{display:grid;grid-template-columns:1fr 1fr;background:rgba(255,255,255,.14);border-radius:10px;padding:3px}
#album .seg2 button{font:inherit;font-size:.9rem;font-weight:600;color:#fff;background:none;border:0;border-radius:8px;padding:7px 4px;cursor:pointer}
#album .seg2 button[aria-pressed="true"]{background:#fff;color:var(--bar)}
#album .grid{max-width:860px;margin:0 auto;padding:16px 16px calc(40px + env(safe-area-inset-bottom,0px));display:grid;grid-template-columns:repeat(auto-fill,minmax(104px,1fr));gap:10px}
.acard{position:relative;aspect-ratio:3/4.1;border-radius:14px;border:0;padding:8px 6px 9px;display:flex;flex-direction:column;align-items:center;justify-content:space-between;gap:4px;cursor:pointer;font:inherit;color:#fff;text-align:center;overflow:hidden;
  background:linear-gradient(160deg,var(--c0),var(--c1));box-shadow:0 2px 8px rgba(0,0,0,.12);animation:cardin .35s both}
.acard .fc{width:82%;aspect-ratio:1;display:grid;place-items:center}
.acard .fc svg{width:100%;height:100%}
.acard .nm{font-weight:700;font-size:.84rem;line-height:1.25}
.acard .ep{font-family:var(--f-num);font-size:.68rem;opacity:.85;direction:ltr}
.acard.org{--c0:#2a2c36;--c1:#0b0c10;border:1px solid #c9a24a66}
.acard.org .nm{font-family:var(--f-head);font-size:1.25rem;color:#e9c46a;line-height:1}
.acard.org .fc.gl{width:56%;color:#e9c46a}
.acard.org .en{font-size:.66rem;opacity:.7;direction:ltr}
.acard.lock{background:var(--surface);color:var(--muted);border:1.5px dashed var(--line);box-shadow:none}
.acard.lock .fc{color:color-mix(in oklab,var(--fg) 13%,transparent)}
.acard.lock .q{font-family:var(--f-head);font-size:2.6rem;line-height:1;color:color-mix(in oklab,var(--fg) 22%,transparent);margin:auto}
.acard.lock .nm,.acard.org.lock .nm{font-family:var(--f-num);font-size:.84rem;letter-spacing:.1em;color:inherit}
.acard,#acardBig .bcard{text-shadow:0 1px 3px rgba(0,0,0,.35)}
.acard.lock{text-shadow:none}
#acardBig .sx.on{text-shadow:none}#acardBig .nx{font-size:.78rem;opacity:.75;margin-top:4px}
.acard .sec{position:absolute;top:6px;inset-inline-start:6px;width:20px;height:20px;border-radius:6px;background:rgba(0,0,0,.35);display:grid;place-items:center}
.acard .sec svg{width:12px;height:12px}
.acard .sec.on{background:#e9c46a;color:#1b1b1b}
.acard .nw{position:absolute;top:6px;inset-inline-end:6px;background:#ff5a5f;color:#fff;font-size:.62rem;font-weight:700;border-radius:5px;padding:1px 5px}
@keyframes cardin{from{transform:translateY(8px) scale(.96);opacity:0}}
#acardBig{position:fixed;inset:0;z-index:35;display:grid;place-items:center;background:rgba(10,12,18,.55);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);padding:24px;animation:fadein .25s both}
#acardBig .bcard{width:min(300px,86vw);border-radius:22px;padding:22px 18px 20px;color:#fff;text-align:center;background:linear-gradient(160deg,var(--c0),var(--c1));box-shadow:0 30px 70px rgba(0,0,0,.45);display:grid;gap:8px;justify-items:center;animation:bigin .45s cubic-bezier(.2,.9,.3,1.25) both}
#acardBig .bcard.org{--c0:#2a2c36;--c1:#0b0c10;border:1px solid #c9a24a88}
#acardBig .fc{width:62%;aspect-ratio:1}
#acardBig .fc svg{width:100%;height:100%}
#acardBig .fc.gl{width:40%;color:#e9c46a}
#acardBig h3{margin:0;font-family:var(--f-head);font-size:2rem;line-height:1.1}
#acardBig .org h3{color:#e9c46a}
#acardBig .bcard .ep.hd{font-size:.9rem;opacity:1}
#acardBig .en{direction:ltr;opacity:.75;font-size:.85rem}
#acardBig p{margin:0;font-size:.95rem;line-height:1.6}
#acardBig .sx{margin-top:4px;padding:8px 12px;border-radius:12px;background:rgba(0,0,0,.28);font-size:.88rem;display:flex;gap:8px;align-items:center;justify-content:center}
#acardBig .sx.on{background:#e9c46a;color:#1b1b1b;font-weight:600}
#acardBig .sx svg{width:15px;height:15px;flex:none}
#acardBig .ep{font-size:.8rem;opacity:.85}
#acardBig .ep span,#acardBig .sx b{font-family:var(--f-num);direction:ltr;unicode-bidi:isolate}
@keyframes bigin{from{transform:scale(.6) rotate(-6deg);opacity:0}}
@keyframes fadein{from{opacity:0}}
@media (prefers-reduced-motion:reduce){#album{transition:none}.acard,#acardBig,#acardBig .bcard{animation:none}}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

// app bar button
const btn=document.createElement("button");btn.className="refresh";btn.id="albumBtn";btn.setAttribute("aria-label","الألبوم");btn.title="الألبوم";
btn.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><rect x="7.5" y="3.5" width="12" height="16" rx="2.5"/><path d="M4.5 7.5v10a3 3 0 0 0 3 3h8"/></svg><i class="bd"></i>';
const sbtn=document.getElementById("searchBtn");sbtn.parentNode.insertBefore(btn,sbtn);

const sheet=document.createElement("div");sheet.id="album";sheet.dir="rtl";sheet.setAttribute("aria-hidden","true");
sheet.innerHTML='<div class="ah"><div class="r"><b>الألبوم</b><span class="cnt" id="acnt" dir="ltr"></span><button class="refresh" id="aclose" aria-label="إغلاق"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div><div class="seg2"><button data-g="c">الشخصيات</button><button data-g="o">المنظمة السوداء</button></div></div><div class="grid" id="agrid"></div>';
document.body.appendChild(sheet);
let tab="c", fresh=new Set(), drawn="";
function drawGrid(){
  const g=document.getElementById("agrid"), list=CARDS.filter(c=>c.g===tab);
  sheet.querySelectorAll(".seg2 button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.g===tab));
  const open=list.filter(c=>isOpen(c.u)).length;
  document.getElementById("acnt").textContent=open+" / "+list.length;
  drawn=keys().join();
  g.innerHTML="";
  list.forEach((c,i)=>{
    const o=isOpen(c.u), b=document.createElement("button");
    b.className="acard"+(c.g==="o"?" org":"")+(o?"":" lock"); b.style.animationDelay=Math.min(i*25,400)+"ms";
    if(o&&c.g==="c"){const cc=COL[c.f]||["#4676c4","#223e78"];b.style.setProperty("--c0",cc[0]);b.style.setProperty("--c1",cc[1])}
    if(o){
      const fc=c.f?'<div class="fc">'+faceSVG(c.f)+'</div>':'<div class="fc gl">'+GLASS+'</div>';
      const sec=c.s?'<span class="sec'+(isOpen(c.su)?' on':'')+'">'+(isOpen(c.su)?'✦':LOCK)+'</span>':"";
      const nw=(fresh.has(c.k)||fresh.has(c.k+":s"))?'<span class="nw">جديد</span>':"";
      b.innerHTML=sec+nw+fc+'<div class="nm">'+c.n+'</div>'+(c.g==="o"?'<div class="en">'+c.en+'</div>':'<div class="ep">E'+c.u+'</div>');
      b.onclick=()=>showBig(c);
    }else{
      const fc=(c.g==="c"&&c.f)?'<div class="fc">'+faceSVG(c.f,"sil")+'</div>':'<div class="q">؟</div>';
      b.innerHTML=fc+'<div class="nm">؟؟؟</div><div class="ep">'+epLabel(c.u)+'</div>';
      b.setAttribute("aria-label","كرت مقفل، ينفتح مع "+epLabel(c.u));
      b.onclick=()=>toast("ينفتح لما تشاهدون "+epLabel(c.u));
    }
    g.appendChild(b);
  });
}
function showBig(c){
  const w=document.createElement("div");w.id="acardBig";w.dir="rtl";
  const cc=COL[c.f]||["#4676c4","#223e78"];
  const fc=c.f?'<div class="fc">'+faceSVG(c.f)+'</div>':'<div class="fc gl">'+GLASS+'</div>';
  let sx="";
  if(c.s) sx=isOpen(c.su)?'<div class="sx on">✦ '+c.s+'</div>':'<div class="sx">'+LOCK+'<span>فيه سر ينكشف مع <b dir="ltr">'+epLabel(c.su)+'</b></span></div>';
  w.innerHTML='<div class="bcard'+(c.g==="o"?" org":"")+'" style="--c0:'+cc[0]+';--c1:'+cc[1]+'">'+fc+'<h3>'+c.n+'</h3><div class="en">'+c.en+'</div><p>'+c.d+'</p>'+sx+'<div class="ep">'+(c.g==="o"?"انكشف في ":"أول ظهور ")+'<span>E'+c.u+'</span></div></div>';
  w.onclick=()=>w.remove(); document.body.appendChild(w);
}
function openAlbum(){
  const seen=new Set(getSeen()||[]); fresh=new Set(keys().filter(k=>!seen.has(k)));
  setSeen(keys()); badge();
  drawGrid(); sheet.classList.add("open"); sheet.setAttribute("aria-hidden","false"); sheet.scrollTop=0;
  try{history.pushState({album:1},"")}catch(e){}
}
function closeAlbum(){sheet.classList.remove("open");sheet.setAttribute("aria-hidden","true");document.getElementById("acardBig")?.remove()}
btn.onclick=openAlbum;
document.getElementById("aclose").onclick=()=>{closeAlbum();try{if(history.state&&history.state.album)history.back()}catch(e){}};
addEventListener("popstate",()=>{if(sheet.classList.contains("open"))closeAlbum()});
sheet.querySelectorAll(".seg2 button").forEach(b=>b.onclick=()=>{tab=b.dataset.g;drawGrid()});
function badge(){
  let seen=getSeen(); if(seen===null){seen=keys();setSeen(seen)} // first run: don't flag everything as new
  const s=new Set(seen); btn.classList.toggle("has",keys().some(k=>!s.has(k)));
  if(sheet.classList.contains("open")&&keys().join()!==drawn) drawGrid();
}
// celebrate a card unlocked by your own tap
// queue: cards first (one by one), then arc / finale celebration. tap to advance, or auto after a few seconds
const CQ=[]; let cqBusy=false;
function cqNext(){ if(cqBusy) return; const t=CQ.shift(); if(!t) return; cqBusy=true; let fin=false; t(()=>{ if(fin) return; fin=true; cqBusy=false; setTimeout(cqNext,250); }); }
function unlockPop(c,isSecret,done){
  done=done||function(){};
  const cc=c.g==="o"?["#2a2c36","#0b0c10"]:(COL[c.f]||["#4676c4","#223e78"]);
  confetti(c.g==="o"?["#e9c46a","#ffffff","#2a2c36"]:[cc[0],"#ffd34d","#ffffff"],140);
  const old=document.getElementById("acardBig"); if(old) old.remove();
  const w=document.createElement("div");w.id="acardBig";w.dir="rtl";
  const fc=c.f?'<div class="fc">'+faceSVG(c.f)+'</div>':'<div class="fc gl">'+GLASS+'</div>';
  const more=CQ.some(t=>t.card)?'<div class="nx">اضغط للتالي ←</div>':'';
  w.innerHTML='<div class="bcard'+(c.g==="o"?" org":"")+'" style="--c0:'+cc[0]+';--c1:'+cc[1]+'"><div class="ep hd">'+(isSecret?"🔓 انكشف سر!":"🃏 كرت جديد انفتح")+'</div>'+fc+'<h3>'+c.n+'</h3><div class="en">'+c.en+'</div>'+(isSecret?'<div class="sx on">✦ '+c.s+'</div>':'<p>'+c.d+'</p>')+more+'</div>';
  let gone=false; const close=()=>{ if(gone) return; gone=true; clearTimeout(tm); w.remove(); done(); };
  w.onclick=close; document.body.appendChild(w);
  const tm=setTimeout(close,3000);
}
const _celebrateArcs=celebrateArcs; let arcHold=null;
celebrateArcs=function(d){ if(arcHold){ arcHold.push(d); return; } _celebrateArcs(d); };
const _toggle=toggle;
toggle=function(id){
  const before=new Set(keys()); arcHold=[];
  try{ _toggle(id); } finally { var arcs=arcHold; arcHold=null; }
  const nowK=keys().filter(k=>!before.has(k));
  // only celebrate cards whose debut/reveal is this very episode (not one that happened in an earlier episode we skip)
  const exact=ep=>DATA.some(d=>{const[a,b]=range(d);return ep>=a&&ep<=b});
  for(const k of nowK){ const c=CARDS.find(x=>x.k===k.split(":")[0]); if(!c) continue; const sec=k.endsWith(":s");
    if(!exact(sec?c.su:c.u)) continue; const t=done=>unlockPop(c,sec,done); t.card=true; CQ.push(t); }
  for(const d of arcs){ CQ.push(done=>{ _celebrateArcs(d); const el=document.querySelector(".cheer"); if(!el) return done(); el.addEventListener("click",done); setTimeout(done,3700); }); }
  if(CQ.length) setTimeout(cqNext,CQ.some(t=>t.card)?650:0);
  badge();
};
const _render=render;
render=function(){_render();badge()};
window.ALBUM={CARDS,entryFor,keys,unlockPop,showBig,openAlbum};
badge();
})();
