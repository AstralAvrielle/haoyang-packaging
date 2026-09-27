const C = window.HAOYANG_CONFIG || {};

/* =========================================================
   COMMON TRANSLATIONS
========================================================= */

const common = {
  zh: {
    brand: '皓洋包装厂',
    home: '首页',
    about: '关于我们',
    factory: '工厂实力',
    custom: '定制包装',
    cases: '案例展示',
    contact: '询价联系',
    cta: '获取定制报价',
    footer: '精品礼盒与定制包装',
    wa: 'WhatsApp 咨询'
  },

  en: {
    brand: 'Haoyang Packaging',
    home: 'Home',
    about: 'About Us',
    factory: 'Factory',
    custom: 'Custom Packaging',
    cases: 'Portfolio',
    contact: 'Contact',
    cta: 'Request a Quote',
    footer: 'Premium Gift Boxes & Custom Packaging',
    wa: 'WhatsApp Inquiry'
  }
};


/* =========================================================
   LANGUAGE
========================================================= */

let lang = localStorage.getItem('haoyang-lang') || 'zh';

if (!['zh', 'en'].includes(lang)) {
  lang = 'zh';
}


/* =========================================================
   COMMON CONTENT
========================================================= */

function applyCommon() {
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

  const t = common[lang];


  /* Common navigation / buttons */

  document.querySelectorAll('[data-common]').forEach(el => {
    const key = el.dataset.common;

    if (t[key]) {
      el.textContent = t[key];
    }
  });


  /* Language switch button */

  const langButton = document.getElementById('langToggle');

  if (langButton) {
    langButton.textContent = lang === 'zh' ? 'EN' : '中文';

    langButton.setAttribute(
      'aria-label',
      lang === 'zh'
        ? 'Switch to English'
        : '切换为中文'
    );
  }


  /* Address */

  document.querySelectorAll('[data-address]').forEach(el => {
    const address = lang === 'zh'
      ? C.addressZh
      : C.addressEn;

    if (address) {
      el.textContent = address;
    }
  });


  /* Email */

  document.querySelectorAll('[data-email]').forEach(el => {
    if (!C.email) return;

    el.textContent = C.email;

    if (el.tagName === 'A') {
      el.href = 'mailto:' + C.email;
    }
  });


  /* Phone */

  document.querySelectorAll('[data-phone]').forEach(el => {
    if (!C.phone) return;

    el.textContent = C.phone;

    if (el.tagName === 'A') {
      el.href = 'tel:' + C.phone;
    }
  });


  /* WeChat */

  document.querySelectorAll('[data-wechat]').forEach(el => {
    if (C.wechat) {
      el.textContent = C.wechat;
    }
  });


  /* WhatsApp */

  document.querySelectorAll('[data-whatsapp]').forEach(el => {

    const whatsappReady =
      C.whatsapp &&
      !C.whatsapp.startsWith('YOUR_');

    if (whatsappReady) {

      const message =
        lang === 'zh'
          ? '您好，我想咨询定制包装项目。'
          : 'Hello, I would like to inquire about a custom packaging project.';

      el.href =
        'https://wa.me/' +
        C.whatsapp +
        '?text=' +
        encodeURIComponent(message);

    } else {

      el.href = '#contact';

    }

    el.setAttribute(
      'aria-label',
      lang === 'zh'
        ? '通过 WhatsApp 咨询'
        : 'Contact us on WhatsApp'
    );
  });
}


/* =========================================================
   PAGE TRANSLATIONS

   使用方式：

   data-zh="中文"
   data-en="English"

========================================================= */

function applyPageTranslations() {

  document
    .querySelectorAll('[data-zh][data-en]')
    .forEach(el => {

      const value = el.getAttribute(
        lang === 'zh'
          ? 'data-zh'
          : 'data-en'
      );

      if (value === null) return;


      /*
       * META 标签不能使用 innerHTML，
       * 所以更新 content 属性
       */

      if (el.tagName === 'META') {

        el.setAttribute('content', value);

      } else {

        /*
         * 使用 innerHTML
         * 是为了支持 <br> 换行
         */

        el.innerHTML = value;

      }

    });


  /* Image ALT translations */

  document
    .querySelectorAll('[data-alt-zh][data-alt-en]')
    .forEach(el => {

      const alt =
        lang === 'zh'
          ? el.getAttribute('data-alt-zh')
          : el.getAttribute('data-alt-en');

      if (alt !== null) {
        el.setAttribute('alt', alt);
      }

    });
}


/* =========================================================
   LANGUAGE SWITCH
========================================================= */

function switchLang() {

  lang = lang === 'zh'
    ? 'en'
    : 'zh';

  localStorage.setItem(
    'haoyang-lang',
    lang
  );

  applyCommon();

  applyPageTranslations();


  /*
   * 给其他页面脚本使用
   */

  document.dispatchEvent(
    new CustomEvent(
      'haoyang-language',
      {
        detail: {
          lang
        }
      }
    )
  );
}


/* =========================================================
   PAGE INITIALIZATION
========================================================= */

document.addEventListener(
  'DOMContentLoaded',
  () => {

    /* Apply language */

    applyCommon();

    applyPageTranslations();


    /* Language toggle */

    document
      .getElementById('langToggle')
      ?.addEventListener(
        'click',
        switchLang
      );


    /* =====================================================
       NAV SCROLL EFFECT
    ===================================================== */

    const nav =
      document.querySelector('.nav');

    const onScroll = () => {

      nav?.classList.toggle(
        'scrolled',
        window.scrollY > 12
      );

    };

    onScroll();

    window.addEventListener(
      'scroll',
      onScroll,
      {
        passive: true
      }
    );


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const page =
      (
        location.pathname
          .split('/')
          .pop() ||
        'index.html'
      ).toLowerCase();

    document
      .querySelectorAll('.nav-links a')
      .forEach(a => {

        const href =
          (
            a.getAttribute('href') || ''
          )
            .split('#')[0]
            .toLowerCase();

        if (
          (
            page === 'index.html' &&
            href === 'index.html'
          ) ||
          href === page
        ) {

          a.classList.add('active');

        }

      });


    /* =====================================================
       REVEAL ANIMATION
    ===================================================== */

    if ('IntersectionObserver' in window) {

      const io =
        new IntersectionObserver(
          entries => {

            entries.forEach(entry => {

              if (
                entry.isIntersecting
              ) {

                entry
                  .target
                  .classList
                  .add('in');

                io.unobserve(
                  entry.target
                );

              }

            });

          },
          {
            threshold: 0.12,
            rootMargin:
              '0px 0px -5%'
          }
        );


      document
        .querySelectorAll('.reveal')
        .forEach(
          (el, index) => {

            el.style.transitionDelay =
              (index % 4) *
                70 +
              'ms';

            io.observe(el);

          }
        );

    } else {

      document
        .querySelectorAll('.reveal')
        .forEach(el => {

          el.classList.add('in');

        });

    }


    /* =====================================================
       CARD TILT
    ===================================================== */

    document
      .querySelectorAll('.tilt')
      .forEach(card => {

        card.addEventListener(
          'pointermove',
          e => {

            const rect =
              card.getBoundingClientRect();

            const x =
              (
                e.clientX -
                rect.left
              ) /
                rect.width -
              0.5;

            const y =
              (
                e.clientY -
                rect.top
              ) /
                rect.height -
              0.5;

            card.style.transform =
              `perspective(900px)
               rotateY(${x * 5}deg)
               rotateX(${-y * 5}deg)
               translateY(-5px)`;

          }
        );


        card.addEventListener(
          'pointerleave',
          () => {

            card.style.transform = '';

          }
        );

      });


    /* =====================================================
       IMAGE MODAL
    ===================================================== */

    const modal =
      document.getElementById(
        'modal'
      );

    const modalImage =
      document.getElementById(
        'modalImg'
      );


    document
      .querySelectorAll(
        '.shot img'
      )
      .forEach(img => {

        img.addEventListener(
          'click',
          () => {

            if (
              modal &&
              modalImage
            ) {

              modalImage.src =
                img.src;

              modal.classList.add(
                'open'
              );

            }

          }
        );

      });


    document
      .querySelector('.close')
      ?.addEventListener(
        'click',
        () => {

          modal?.classList.remove(
            'open'
          );

        }
      );


    modal?.addEventListener(
      'click',
      e => {

        if (
          e.target === modal
        ) {

          modal.classList.remove(
            'open'
          );

        }

      }
    );


    /* =====================================================
       QUOTE FORM
    ===================================================== */

    const form =
      document.getElementById(
        'quoteForm'
      );

    if (form) {

      if (
        C.email &&
        !C.email.startsWith(
          'YOUR_'
        )
      ) {

        form.action =
          'https://formsubmit.co/' +
          C.email;

      }


      form.addEventListener(
        'submit',
        e => {

          if (
            !C.email ||
            C.email.startsWith(
              'YOUR_'
            )
          ) {

            e.preventDefault();

            alert(
              lang === 'zh'
                ? '请先在 site-config.js 中填写真实收件邮箱，再部署网站。'
                : 'Please add your receiving email in site-config.js before deploying the website.'
            );

          }

        }
      );

    }


    /* =====================================================
       CURSOR GLOW
    ===================================================== */

    if (
      matchMedia(
        '(pointer:fine)'
      ).matches &&
      !matchMedia(
        '(prefers-reduced-motion:reduce)'
      ).matches
    ) {

      const glow =
        document.createElement(
          'div'
        );

      glow.className =
        'cursor-glow';

      document.body.appendChild(
        glow
      );


      window.addEventListener(
        'pointermove',
        e => {

          glow.style.left =
            e.clientX + 'px';

          glow.style.top =
            e.clientY + 'px';

          glow.style.opacity =
            '1';

        },
        {
          passive: true
        }
      );


      document
        .documentElement
        .addEventListener(
          'mouseleave',
          () => {

            glow.style.opacity =
              '0';

          }
        );

    }

  }
);
