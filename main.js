const C=window.HAOYANG_CONFIG||{};
const common={
 zh:{brand:'皓洋包装厂',home:'首页',about:'关于我们',factory:'工厂实力',custom:'定制包装',cases:'案例',contact:'询价联系',cta:'获取包装方案',footer:'精品礼盒与定制包装',wa:'WhatsApp 咨询'},
 en:{brand:'Haoyang Packaging',home:'Home',about:'About Us',factory:'Factory',custom:'Custom Packaging',cases:'Portfolio',contact:'Contact',cta:'Get a Quote',footer:'Premium Gift Boxes & Custom Packaging',wa:'WhatsApp'}
};
let lang=localStorage.getItem('haoyang-lang')||'zh';
function applyCommon(){
 document.documentElement.lang=lang==='zh'?'zh-CN':'en';const t=common[lang];
 document.querySelectorAll('[data-common]').forEach(el=>{const k=el.dataset.common;if(t[k])el.innerHTML=t[k]});
 const b=document.getElementById('langToggle');if(b)b.textContent=lang==='zh'?'EN':'中文';
 document.querySelectorAll('[data-address]').forEach(el=>el.textContent=lang==='zh'?C.addressZh:C.addressEn);
 document.querySelectorAll('[data-email]').forEach(el=>{el.textContent=C.email;el.href='mailto:'+C.email});
 document.querySelectorAll('[data-phone]').forEach(el=>{el.textContent=C.phone;el.href='tel:'+C.phone});
 document.querySelectorAll('[data-wechat]').forEach(el=>el.textContent=C.wechat);
 document.querySelectorAll('[data-whatsapp]').forEach(el=>{el.href=C.whatsapp&&!C.whatsapp.startsWith('YOUR_')?'https://wa.me/'+C.whatsapp+'?text='+encodeURIComponent(lang==='zh'?'您好，我想咨询定制包装。':'Hello, I would like to inquire about custom packaging.'):'#contact';});
}
function switchLang(){lang=lang==='zh'?'en':'zh';localStorage.setItem('haoyang-lang',lang);applyCommon();document.dispatchEvent(new CustomEvent('haoyang-language',{detail:{lang}}));}

document.addEventListener('DOMContentLoaded',()=>{
 applyCommon();
 document.getElementById('langToggle')?.addEventListener('click',switchLang);
 const nav=document.querySelector('.nav');
 const onScroll=()=>nav?.classList.toggle('scrolled',window.scrollY>12);onScroll();window.addEventListener('scroll',onScroll,{passive:true});
 const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();document.querySelectorAll('.nav-links a').forEach(a=>{const href=(a.getAttribute('href')||'').split('#')[0].toLowerCase();if((page==='index.html'&&href==='index.html')||href===page)a.classList.add('active')});
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -5%'});
 document.querySelectorAll('.reveal').forEach((e,i)=>{e.style.transitionDelay=(i%4)*70+'ms';io.observe(e)});
 document.querySelectorAll('.tilt').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateY(${x*5}deg) rotateX(${-y*5}deg) translateY(-5px)`});card.addEventListener('pointerleave',()=>card.style.transform='')});
 const modal=document.getElementById('modal'),mi=document.getElementById('modalImg');document.querySelectorAll('.shot img').forEach(img=>img.addEventListener('click',()=>{if(modal&&mi){mi.src=img.src;modal.classList.add('open')}}));document.querySelector('.close')?.addEventListener('click',()=>modal?.classList.remove('open'));modal?.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open')});
 const form=document.getElementById('quoteForm');if(form){if(C.email&&!C.email.startsWith('YOUR_'))form.action='https://formsubmit.co/'+C.email;form.addEventListener('submit',e=>{if(!C.email||C.email.startsWith('YOUR_')){e.preventDefault();alert(lang==='zh'?'请先在 site-config.js 中填写真实收件邮箱，再部署网站。':'Please add your real receiving email in site-config.js before deployment.')}})}
 if(matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches){const glow=document.createElement('div');glow.className='cursor-glow';document.body.appendChild(glow);window.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';glow.style.opacity='1'},{passive:true});document.documentElement.addEventListener('mouseleave',()=>glow.style.opacity='0')}
});
