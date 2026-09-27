const C=window.HAOYANG_CONFIG||{};

const common={
 zh:{
  brand:'皓洋包装厂',
  home:'首页',
  about:'关于我们',
  factory:'工厂实力',
  custom:'定制包装',
  cases:'案例',
  contact:'询价联系',
  cta:'获取包装方案',
  footer:'精品礼盒与定制包装',
  wa:'WhatsApp 咨询'
 },
 en:{
  brand:'Haoyang Packaging',
  home:'Home',
  about:'About Us',
  factory:'Factory',
  custom:'Custom Packaging',
  cases:'Portfolio',
  contact:'Contact',
  cta:'Get a Quote',
  footer:'Premium Gift Boxes & Custom Packaging',
  wa:'WhatsApp'
 }
};


/* =========================================================
   当前语言
========================================================= */

let lang=localStorage.getItem('haoyang-lang')||'zh';


/* =========================================================
   网站通用内容
   保持原来的逻辑不变
========================================================= */

function applyCommon(){

 document.documentElement.lang=lang==='zh'?'zh-CN':'en';

 const t=common[lang];


 document.querySelectorAll('[data-common]').forEach(el=>{

  const k=el.dataset.common;

  if(t[k]){
   el.innerHTML=t[k];
  }

 });


 const b=document.getElementById('langToggle');

 if(b){
  b.textContent=lang==='zh'?'EN':'中文';
 }


 document.querySelectorAll('[data-address]').forEach(el=>

  el.textContent=lang==='zh'
   ?C.addressZh
   :C.addressEn

 );


 document.querySelectorAll('[data-email]').forEach(el=>{

  el.textContent=C.email;

  el.href='mailto:'+C.email;

 });


 document.querySelectorAll('[data-phone]').forEach(el=>{

  el.textContent=C.phone;

  el.href='tel:'+C.phone;

 });


 document.querySelectorAll('[data-wechat]').forEach(el=>

  el.textContent=C.wechat

 );


 document.querySelectorAll('[data-whatsapp]').forEach(el=>{

  el.href=
   C.whatsapp&&!C.whatsapp.startsWith('YOUR_')
   ?
   'https://wa.me/'
   +C.whatsapp
   +'?text='
   +encodeURIComponent(
    lang==='zh'
    ?'您好，我想咨询定制包装。'
    :'Hello, I would like to inquire about custom packaging.'
   )
   :
   '#contact';

 });

}


/* =========================================================
   About 页面专用中英文切换

   只在 about.html 执行
   不影响 index / factory / custom-packaging
========================================================= */

function applyAbout(){

 const page=
  (location.pathname.split('/').pop()||'index.html')
  .toLowerCase();


 /* 不是 about 页面就直接退出 */

 if(page!=='about.html'){
  return;
 }


 /* 切换 About 页面中的 data-zh / data-en */

 document.querySelectorAll('[data-zh][data-en]').forEach(el=>{

  const text=
   lang==='zh'
   ?el.getAttribute('data-zh')
   :el.getAttribute('data-en');


  if(text!==null){

   el.innerHTML=text;

  }

 });

}


/* =========================================================
   切换语言
========================================================= */

function switchLang(){

 lang=lang==='zh'?'en':'zh';


 localStorage.setItem(
  'haoyang-lang',
  lang
 );


 /* 原来的通用切换 */

 applyCommon();


 /* 新增：
    只有 About 页面才会真正执行
 */

 applyAbout();


 /* 保留原来的语言事件 */

 document.dispatchEvent(

  new CustomEvent(

   'haoyang-language',

   {
    detail:{lang}
   }

  )

 );

}


/* =========================================================
   页面加载
========================================================= */

document.addEventListener('DOMContentLoaded',()=>{


 /* 原来的通用语言 */

 applyCommon();


 /* 新增 About 页面语言 */

 applyAbout();


 /* 原来的切换按钮 */

 document.getElementById('langToggle')
 ?.addEventListener(
  'click',
  switchLang
 );


 /* =======================================================
    NAV 滚动效果
    原代码保持不变
 ======================================================= */

 const nav=document.querySelector('.nav');


 const onScroll=()=>nav?.classList.toggle(

  'scrolled',

  window.scrollY>12

 );


 onScroll();


 window.addEventListener(

  'scroll',

  onScroll,

  {passive:true}

 );


 /* =======================================================
    当前导航高亮
    原代码保持不变
 ======================================================= */

 const page=

  (
   location.pathname.split('/').pop()
   ||
   'index.html'
  )
  .toLowerCase();


 document.querySelectorAll('.nav-links a').forEach(a=>{

  const href=

   (
    a.getAttribute('href')
    ||
    ''
   )
   .split('#')[0]
   .toLowerCase();


  if(

   (
    page==='index.html'
    &&
    href==='index.html'
   )

   ||

   href===page

  ){

   a.classList.add('active');

  }

 });


 /* =======================================================
    Reveal 动画
    原代码保持不变
 ======================================================= */

 const io=new IntersectionObserver(

  es=>es.forEach(e=>{

   if(e.isIntersecting){

    e.target.classList.add('in');

    io.unobserve(e.target);

   }

  }),

  {
   threshold:.12,
   rootMargin:'0px 0px -5%'
  }

 );


 document.querySelectorAll('.reveal').forEach((e,i)=>{

  e.style.transitionDelay=(i%4)*70+'ms';

  io.observe(e);

 });


 /* =======================================================
    Tilt
    原代码保持不变
 ======================================================= */

 document.querySelectorAll('.tilt').forEach(card=>{

  card.addEventListener('pointermove',e=>{

   const r=card.getBoundingClientRect(),

   x=(e.clientX-r.left)/r.width-.5,

   y=(e.clientY-r.top)/r.height-.5;


   card.style.transform=

    `perspective(900px)
     rotateY(${x*5}deg)
     rotateX(${-y*5}deg)
     translateY(-5px)`;

  });


  card.addEventListener('pointerleave',()=>{

   card.style.transform='';

  });

 });


 /* =======================================================
    图片 Modal
    原代码保持不变
 ======================================================= */

 const modal=document.getElementById('modal'),

 mi=document.getElementById('modalImg');


 document.querySelectorAll('.shot img').forEach(img=>

  img.addEventListener('click',()=>{

   if(modal&&mi){

    mi.src=img.src;

    modal.classList.add('open');

   }

  })

 );


 document.querySelector('.close')
 ?.addEventListener(
  'click',
  ()=>modal?.classList.remove('open')
 );


 modal?.addEventListener('click',e=>{

  if(e.target===modal){

   modal.classList.remove('open');

  }

 });


 /* =======================================================
    询价表单
    原代码保持不变
 ======================================================= */

 const form=document.getElementById('quoteForm');


 if(form){

  if(
   C.email
   &&
   !C.email.startsWith('YOUR_')
  ){

   form.action=
    'https://formsubmit.co/'
    +C.email;

  }


  form.addEventListener('submit',e=>{

   if(
    !C.email
    ||
    C.email.startsWith('YOUR_')
   ){

    e.preventDefault();


    alert(

     lang==='zh'

     ?

     '请先在 site-config.js 中填写真实收件邮箱，再部署网站。'

     :

     'Please add your real receiving email in site-config.js before deployment.'

    );

   }

  });

 }


 /* =======================================================
    Cursor Glow
    原代码保持不变
 ======================================================= */

 if(

  matchMedia('(pointer:fine)').matches

  &&

  !matchMedia('(prefers-reduced-motion:reduce)').matches

 ){

  const glow=document.createElement('div');


  glow.className='cursor-glow';


  document.body.appendChild(glow);


  window.addEventListener(

   'pointermove',

   e=>{

    glow.style.left=e.clientX+'px';

    glow.style.top=e.clientY+'px';

    glow.style.opacity='1';

   },

   {passive:true}

  );


  document.documentElement.addEventListener(

   'mouseleave',

   ()=>glow.style.opacity='0'

  );

 }

});
