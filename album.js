/* Album: character cards + Black Organization cards that unlock from the shared watched list.
   A card unlocks when the list entry containing its reveal episode is watched
   (or, if that episode isn't in the list, the next entry after it). */
(function(){
const CARDS=[
 // g:'c' characters, g:'o' Black Organization. f = face number in faces.js, u = unlock episode, s/su = secret line and its episode
 {k:"conan",g:"c",f:1,n:"كونان إدوغاوا",en:"Conan Edogawa",u:1,d:"المحقق الصغير بنظارة وببيونة"},
 {k:"shinichi",g:"c",f:2,n:"شينتشي كودو",en:"Shinichi Kudo",u:1,d:"محقق الثانوية المشهور… قبل ما يصغر"},
 {k:"ran",g:"c",f:3,n:"ران موري",en:"Ran Mouri",u:1,d:"صديقة طفولة شينتشي وبطلة كاراتيه"},
 {k:"kogoro",g:"c",f:6,n:"كوغورو موري",en:"Kogoro Mouri",u:1,d:"أبو ران، المحقق النايم"},
 {k:"agasa",g:"c",f:9,n:"البروفيسور أغاسا",en:"Hiroshi Agasa",u:1,d:"جار شينتشي ومخترع أدوات كونان"},
 {k:"culprit",g:"c",f:7,n:"الجاني",en:"The Culprit",u:1,d:"الظل الأسود اللي يطلع بكل قضية"},
 {k:"sonoko",g:"c",f:29,n:"سونوكو سوزوكي",en:"Sonoko Suzuki",u:6,d:"صديقة ران المقرّبة، بنت عائلة سوزوكي"},
 {k:"eri",g:"c",f:15,n:"إيري كيساكي",en:"Eri Kisaki",u:32,d:"أم ران، المحامية اللي ما تخسر قضية"},
 {k:"yusaku",g:"c",f:4,n:"يوساكو كودو",en:"Yusaku Kudo",u:43,d:"أبو شينتشي، كاتب روايات بوليسية عالمي"},
 {k:"yukiko",g:"c",f:5,n:"يوكيكو كودو",en:"Yukiko Kudo",u:43,d:"أم شينتشي، ممثلة سابقة وأستاذة تنكّر"},
 {k:"heiji",g:"c",f:10,n:"هيجي هاتوري",en:"Heiji Hattori",u:48,d:"محقق الغرب من أوساكا"},
 {k:"kazuha",g:"c",f:11,n:"كازوها توياما",en:"Kazuha Toyama",u:118,d:"صديقة طفولة هيجي"},
 {k:"haibara",g:"c",f:8,n:"آي هايبارا",en:"Ai Haibara",u:129,d:"طالبة جديدة بالفصل… جاية من المنظمة"},
 {k:"akai",g:"c",f:23,n:"شويتشي أكاي",en:"Shuichi Akai",u:230,d:"رجل غامض بنظرة حادة",s:"عميل FBI، وأخطر عدو للمنظمة",su:345},
 {k:"matsuda",g:"c",f:20,n:"جينبي ماتسودا",en:"Jinpei Matsuda",u:301,d:"خبير تفكيك متفجرات بالشرطة"},
 {k:"subaru",g:"c",f:26,n:"سوبارو أوكيا",en:"Subaru Okiya",u:509,d:"طالب دراسات عليا ساكن ببيت شينتشي",s:"هو نفسه شويتشي أكاي متنكّر",su:783},
 {k:"sera",g:"c",f:25,n:"ماسومي سيرا",en:"Masumi Sera",u:646,d:"محققة ثانوية بأسلوب صبياني",s:"أخت شويتشي أكاي الصغيرة",su:701},

 {k:"gin",g:"o",n:"جن",en:"Gin",u:1,d:"القاتل البارد اللي سقى شينتشي السم"},
 {k:"vodka",g:"o",n:"فودكا",en:"Vodka",u:1,d:"ظل جن الدائم"},
 {k:"tequila",g:"o",n:"تيكيلا",en:"Tequila",u:54,d:"عضو ضخم جاي يستلم بيانات"},
 {k:"akemi",g:"o",n:"أكيمي ميانو",en:"Akemi Miyano",u:128,d:"عضوة بلا اسم حركي، نفّذت سرقة المليار ين",s:"أخت شيري الكبيرة",su:129},
 {k:"sherry",g:"o",f:8,n:"شيري",en:"Sherry",u:129,d:"صانعة السم APTX 4869… هي آي هايبارا"},
 {k:"pisco",g:"o",n:"بيسكو",en:"Pisco",u:176,d:"عضو قديم بواجهة رجل أعمال"},
 {k:"vermouth",g:"o",n:"فيرموث",en:"Vermouth",u:176,d:"سيدة الأسرار والتنكّر",s:"هي الممثلة شارون فينيارد، وبنفس الوقت كريس",su:345},
 {k:"calvados",g:"o",n:"كالفادوس",en:"Calvados",u:345,d:"قنّاص مخلص لفيرموث"},
 {k:"chianti",g:"o",n:"كيانتي",en:"Chianti",u:425,d:"قنّاصة بوشم فراشة"},
 {k:"korn",g:"o",n:"كورن",en:"Korn",u:425,d:"قنّاص هادي، شريك كيانتي"},
 {k:"kir",g:"o",f:28,n:"كير",en:"Kir",u:425,d:"مذيعة الأخبار رينا ميزوناشي",s:"عميلة CIA مزروعة: هيدمي هوندو",su:500},
 {k:"rye",g:"o",f:23,n:"راي",en:"Rye",u:500,d:"الاسم الحركي لشويتشي أكاي لما اخترق المنظمة"},
 {k:"bourbon",g:"o",n:"بوربون",en:"Bourbon",u:701,d:"تورو أمورو، المحقق اللي يشتغل بالكافيه",s:"شرطي أمن عام متخفّي: ري فورويا (زيرو)",su:783},
 {k:"scotch",g:"o",n:"سكوتش",en:"Scotch",u:783,d:"عضو سابق انكشف إنه جاسوس",s:"هيروميتسو موروفوشي، صديق طفولة فورويا",su:983},
 {k:"boss",g:"o",n:"الزعيم",en:"The Boss",u:942,d:"رأس المنظمة: رينيا كاراسوما"},
 {k:"rum",g:"o",n:"رم",en:"Rum",u:1079,d:"الرجل الثاني بالمنظمة: كانينوري واكيتا"}
];
const COL={1:["#4f86d9","#1f4590"],2:["#3d5a94","#16264d"],3:["#ee88a6","#b03a62"],4:["#4c9a9e","#1d5357"],5:["#f09a86","#b9503f"],6:["#8299b3","#3f546c"],7:["#7a1f2c","#1a080b"],8:["#c9566b","#7a1f33"],9:["#f0a058","#b85a1c"],10:["#7f9a4a","#3e5320"],11:["#f06a52","#b02a1f"],15:["#9a7cc9","#4f3387"],20:["#5a5e66","#1f2126"],23:["#3c5a48","#0f1d15"],25:["#4fc0bd","#17716e"],26:["#d8c39a","#8f7650"],28:["#b04a86","#5c1844"],29:["#f1c552","#b3861a"]};
const GLASS='<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12h40L32 34z"/><path d="M32 34v18M22 52h20"/><path d="M18 18h28" opacity=".5"/><circle cx="41" cy="9" r="4"/></svg>';
const LOCK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/></svg>';

function range(d){const p=d.id.slice(1).split("-").map(Number);return [p[0],p[1]||p[0]]}
function entryFor(ep){return DATA.find(d=>{const[a,b]=range(d);return ep>=a&&ep<=b})||DATA.find(d=>range(d)[0]>ep)||null}
function isOpen(ep){const e=entryFor(ep);return !!(e&&watched[e.id])}
function epLabel(ep){const e=entryFor(ep);return e?e.id:"قريباً"}
function keys(){const o=[];for(const c of CARDS){if(isOpen(c.u)){o.push(c.k);if(c.s&&isOpen(c.su))o.push(c.k+":s")}}return o}
function getSeen(){try{return JSON.parse(localStorage.getItem("album-seen")||"null")}catch(e){return null}}
function setSeen(a){try{localStorage.setItem("album-seen",JSON.stringify(a))}catch(e){}}
function faceSVG(f,mode){const F=(window.FACES||[])[f-1];if(!F)return "";
  if(mode==="sil")return '<svg viewBox="0 0 400 400"><path fill="currentColor" fill-rule="evenodd" d="'+F[0]+'"/></svg>';
  return '<svg viewBox="0 0 400 400"><path fill="#fff" fill-rule="evenodd" d="'+F[0]+'"/><path fill="#15161e" fill-rule="evenodd" d="'+F[0]+F[1]+'"/></svg>'}

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
#acardBig .sx.on{text-shadow:none}
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
    if(o&&c.f&&c.g==="c"){const cc=COL[c.f]||["#4676c4","#223e78"];b.style.setProperty("--c0",cc[0]);b.style.setProperty("--c1",cc[1])}
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
function unlockPop(c,isSecret){
  const cc=c.g==="o"?["#2a2c36","#0b0c10"]:(COL[c.f]||["#4676c4","#223e78"]);
  setTimeout(()=>{
    confetti(c.g==="o"?["#e9c46a","#ffffff","#2a2c36"]:[cc[0],"#ffd34d","#ffffff"],140);
    const w=document.createElement("div");w.id="acardBig";w.dir="rtl";
    const fc=c.f?'<div class="fc">'+faceSVG(c.f)+'</div>':'<div class="fc gl">'+GLASS+'</div>';
    w.innerHTML='<div class="bcard'+(c.g==="o"?" org":"")+'" style="--c0:'+cc[0]+';--c1:'+cc[1]+'"><div class="ep hd">'+(isSecret?"🔓 انكشف سر!":"🃏 كرت جديد انفتح")+'</div>'+fc+'<h3>'+c.n+'</h3><div class="en">'+c.en+'</div>'+(isSecret?'<div class="sx on">✦ '+c.s+'</div>':'<p>'+c.d+'</p>')+'</div>';
    w.onclick=()=>w.remove(); document.body.appendChild(w);
    setTimeout(()=>w.remove(),5200);
  },650);
}
const _toggle=toggle;
toggle=function(id){
  const before=new Set(keys()); _toggle(id);
  const nowK=keys().filter(k=>!before.has(k));
  if(nowK.length){
    const k=nowK[nowK.length-1], c=CARDS.find(x=>x.k===k.split(":")[0]);
    if(c) unlockPop(c,k.endsWith(":s"));
  }
  badge();
};
const _render=render;
render=function(){_render();badge()};
window.ALBUM={CARDS,entryFor,keys,unlockPop,showBig,openAlbum};
badge();
})();
