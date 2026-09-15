/* ====================================================================
   THE RITUAL — script.js
   ==================================================================== */
'use strict';

/* ──────────────────────────────────────────────────────────────────────
   DATA
   ─────────────────────────────────────────────────────────────────── */

const TRIBES = [
  {
    name: 'Dei Septenarius',
    slides: [
      'img/dei_septenarius_1.jpg',
      'img/dei_septenarius_2.jpg',
      'img/dei_septenarius_3.jpg',
      'img/dei_septenarius_4.jpg',
      'img/dei_septenarius_5.jpg',
    ],
  },
  {
    name: 'The Agmen of Ymir',
    slides: [
      'img/the_agmen_of_ymir_1.jpg',
      'img/the_agmen_of_ymir_2.jpg',
      'img/the_agmen_of_ymir_3.jpg',
      'img/the_agmen_of_ymir_4.jpg',
      'img/the_agmen_of_ymir_5.jpg',
      'img/the_agmen_of_ymir_6.jpg',
    ],
  },
  {
    name: 'The Odollam',
    slides: [
      'img/the_odollam_1.jpg',
      'img/the_odollam_2.jpg',
      'img/the_odollam_3.jpg',
      'img/the_odollam_4.jpg',
      'img/the_odollam_5.jpg',
      'img/the_odollam_6.jpg',
      'img/the_odollam_7.jpg',
      'img/the_odollam_8.jpg',
      'img/the_odollam_9.jpg',
      'img/the_odollam_10.jpg',
    ],
  },
  {
    name: 'The Sahraa ov Sahhar',
    slides: [
      'img/the_sahraa_ov_sahhar_1.jpg',
      'img/the_sahraa_ov_sahhar_2.jpg',
      'img/the_sahraa_ov_sahhar_3.jpg',
      'img/the_sahraa_ov_sahhar_4.jpg',
      'img/the_sahraa_ov_sahhar_5.jpg',
      'img/the_sahraa_ov_sahhar_6.jpg',
      'img/the_sahraa_ov_sahhar_7.jpg',
      'img/the_sahraa_ov_sahhar_8.jpg',
    ],
  },
  {
    name: 'The Alcazar of Orgone',
    slides: [
      'img/the_alcazar_of_orgone_1.jpg',
      'img/the_alcazar_of_orgone_3.jpg',
      'img/the_alcazar_of_orgone_4.jpg',
      'img/the_alcazar_of_orgone_5.jpg',
      'img/the_alcazar_of_orgone_6.jpg',
      'img/the_alcazar_of_orgone_7.jpg',
    ],
  },
  {
    name: 'The Panteon of Ammarik',
    slides: [
      'img/the_panteon_of_ammarik_1.jpg',
      'img/the_panteon_of_ammarik_2.jpg',
    ],
  },
  {
    name: 'Polaris, Elders',
    slides: [
      'img/polaris_elders_1.jpg',
      'img/polaris_elders_2.jpg',
      'img/polaris_elders_4.jpg',
      'img/polaris_elders_5.jpg',
    ],
  },
  {
    name: 'Gates ov Hell',
    slides: [
      'img/hell_1.jpg',
      'img/hell_3.jpg',
      'img/hell_4.jpg',
    ],
    hellMode: true,
  },
];

const ARTISTS = [
  {
    name: 'King ov Hell',
    role: 'Creator of The Ritual project',
    instagram: 'http://instagram.com/kingovhellofficial',
    text: `Composer & bassist from Bergen, Norway. Creator of the Ritual, both musically and conceptually. Former songwriter in some of the most influential BM bands, including Gorgoroth, God Seed, Ov Hell, Abbath and I.`,
  },
  {
    name: 'Mothmeister',
    role: 'Visual artist',
    instagram: 'https://www.instagram.com/mothmeister',
    text: `Visual artists from Antwerp, Belgium. Released two books: 'Weird......' with a 3rd book awaiting release in December 2026.`,
  },
  {
    name: 'Vincent Castiglia',
    role: 'Painter',
    instagram: 'https://www.instagram.com/vincent_castiglia_gallery',
    text: `Painter from New York City, US. Creates paintings exclusively in human blood. His work has been presented in numerous world-wide exhibitions & galleries, including the H.R. Giger Museum.`,
  },
  {
    name: 'Jolie Perez',
    role: 'Mask maker',
    instagram: 'https://www.instagram.com/jolievictoriaart',
    text: `Mask maker & sculptor from New York, US. Created characters and effects for prominent projects, including Abbath. Exhibited her artwork at the House of Wills Gallery, Cleveland.`,
  },
];

/* ──────────────────────────────────────────────────────────────────────
   UTILITY
   ─────────────────────────────────────────────────────────────────── */

function $(sel, ctx = document) { return ctx.querySelector(sel); }
function $$(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }

/* ──────────────────────────────────────────────────────────────────────
   HEADER
   ─────────────────────────────────────────────────────────────────── */

const header     = $('#header');
const menuToggle = $('#menuToggle');
const nav        = $('#nav');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  document.body.style.overflow = open ? 'hidden' : '';
});

$$('a', nav).forEach(a => {
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ──────────────────────────────────────────────────────────────────────
   HERO ARROW — scroll to next section on click
   ─────────────────────────────────────────────────────────────────── */

(function heroArrow() {
  const btn = $('#heroArrow');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const next = document.getElementById('video-section');
    if (!next) return;
    const top = next.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top, behavior: 'smooth' });
  });
})();

/* ──────────────────────────────────────────────────────────────────────
   VIDEO — manual play/pause button, pauses when scrolled out of view
   ─────────────────────────────────────────────────────────────────── */

(function videoControls() {
  const video  = $('#mainVideo');
  const btn    = $('#videoPlayBtn');
  if (!video || !btn) return;

  function updateBtn() {
    btn.classList.toggle('playing', !video.paused);
  }

  btn.addEventListener('click', () => {
    if (video.paused) {
      video.muted = false;
      video.play().catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    } else {
      video.pause();
    }
  });

  video.addEventListener('play',  updateBtn);
  video.addEventListener('pause', updateBtn);

  // Pause when section leaves viewport
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) video.pause();
    });
  }, { threshold: 0.1 });

  io.observe(video);
})();

/* ──────────────────────────────────────────────────────────────────────
   TRIBE LIGHTBOX
   ─────────────────────────────────────────────────────────────────── */

(function tribeLightbox() {
  const lightbox  = $('#lightbox');
  const backdrop  = $('#lightboxBackdrop');
  const closeBtn  = $('#lightboxClose');
  const prevBtn   = $('#lightboxPrev');
  const nextBtn   = $('#lightboxNext');
  const slidesEl  = $('#lightboxSlides');
  const titleEl   = $('#lightboxTitle');
  const textEl    = $('#lightboxText');
  const dotsEl    = $('#lightboxDots');

  let currentSlide = 0;
  let slides       = [];
  let dots         = [];

  function buildSlides(tribe) {
    slidesEl.innerHTML = '';
    dotsEl.innerHTML   = '';
    slides = [];
    dots   = [];

    tribe.slides.forEach((src, i) => {
      const div = document.createElement('div');
      div.className = 'lightbox-slide' + (i === 0 ? ' active' : '');
      const imgStyle = tribe.hellMode ? 'style="object-fit:contain;background:#000;"' : '';
      div.innerHTML = `<img src="${src}" alt="${tribe.name} – slide ${i + 1}" ${imgStyle}/><div class="lightbox-slide-gradient"></div>`;
      slidesEl.appendChild(div);
      slides.push(div);

      const dot = document.createElement('div');
      dot.className = 'lightbox-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(dot);
      dots.push(dot);
    });
  }

  function goTo(i) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (i + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function open(idx) {
    const tribe = TRIBES[idx];
    currentSlide = 0;
    buildSlides(tribe);
    titleEl.textContent = tribe.name;
    lightbox.classList.add('active');
    backdrop.classList.add('active');
    lightbox.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('active');
    backdrop.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  $$('.tribe-card').forEach(card => {
    card.addEventListener('click', () => open(+card.dataset.tribe));
  });

  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  prevBtn.addEventListener('click', () => goTo(currentSlide - 1));
  nextBtn.addEventListener('click', () => goTo(currentSlide + 1));

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')      close();
    if (e.key === 'ArrowLeft')   goTo(currentSlide - 1);
    if (e.key === 'ArrowRight')  goTo(currentSlide + 1);
  });

  // Touch swipe
  let touchX = 0;
  lightbox.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', e => {
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(currentSlide + (diff > 0 ? 1 : -1));
  });
})();

/* ──────────────────────────────────────────────────────────────────────
   ARTISTS
   ─────────────────────────────────────────────────────────────────── */

(function artistsSection() {
  const cards      = $$('.artist-card');
  const detail     = $('#artistDetail');
  const closeBtn   = $('#artistDetailClose');
  const nameEl     = $('#artistDetailName');
  const roleEl     = $('#artistDetailRole');
  const textEl     = $('#artistDetailText');
  let activeIdx    = null;

  function openArtist(idx) {
    activeIdx = idx;
    const a = ARTISTS[idx];

    nameEl.textContent = a.name;
    roleEl.textContent = a.role;
    textEl.textContent = a.text;

    const igLink = document.getElementById('artistInstagram');
    if (igLink) igLink.href = a.instagram;

    // wrap content in inner div for padding
    let inner = detail.querySelector('.artist-detail-inner');
    if (!inner) {
      inner = document.createElement('div');
      inner.className = 'artist-detail-inner';
      while (detail.firstChild) inner.appendChild(detail.firstChild);
      detail.appendChild(inner);
    }

    cards.forEach((c, i) => {
      c.classList.toggle('active',  i === idx);
      c.classList.toggle('dimmed',  i !== idx);
    });

    detail.classList.add('open');
  }

  function closeArtist() {
    activeIdx = null;
    cards.forEach(c => c.classList.remove('active', 'dimmed'));
    detail.classList.remove('open');
  }

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const idx = +card.dataset.artist;
      if (activeIdx === idx) {
        closeArtist();
      } else {
        openArtist(idx);
      }
    });
  });

  closeBtn.addEventListener('click', closeArtist);
})();

/* ──────────────────────────────────────────────────────────────────────
   SPARK BUTTONS (particle hover effect)
   ─────────────────────────────────────────────────────────────────── */

function initSparkButton(btn, canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!btn || !canvas) return;
  const ctx    = canvas.getContext('2d');
  let sparks   = [];
  let running  = false;
  let raf      = null;

  class Spark {
    constructor(x, y) {
      this.x     = x;
      this.y     = y;
      this.vx    = (Math.random() - 0.5) * 1.2;
      this.vy    = -(Math.random() * 1.4 + 0.3);
      this.r     = Math.random() * 1.2 + 0.3;
      this.alpha = 0.9;
      this.decay = Math.random() * 0.04 + 0.025;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle   = '#ffffff';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function loop() {
    canvas.width  = btn.offsetWidth;
    canvas.height = btn.offsetHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (running) sparks.push(new Spark(Math.random() * canvas.width, Math.random() * canvas.height));
    sparks = sparks.filter(s => s.alpha > 0);
    sparks.forEach(s => { s.update(); s.draw(); });

    if (sparks.length > 0 || running) {
      raf = requestAnimationFrame(loop);
    } else {
      raf = null;
    }
  }

  btn.addEventListener('mouseenter', () => {
    running = true;
    if (!raf) loop();
  });
  btn.addEventListener('mouseleave', () => { running = false; });
  btn.addEventListener('mousemove',  e => {
    if (!running) return;
    const rect = canvas.getBoundingClientRect();
    sparks.push(new Spark(e.clientX - rect.left, e.clientY - rect.top));
  });
}

initSparkButton($('#btnContact'),     'sparkContact');
initSparkButton($('#btnSend'),        'sparkSend');
initSparkButton($('#btnDiscordJoin'), 'sparkDiscordJoin');

/* ──────────────────────────────────────────────────────────────────────
   CONTACT FORM
   ─────────────────────────────────────────────────────────────────── */

(function contactForm() {
  const form    = $('#contactForm');
  const success = $('#formSuccess');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const btn = $('#btnSend', form);
    const lbl = $('span', btn);
    lbl.textContent = 'Sending…';
    btn.disabled = true;

    // Encode form data in the format Netlify expects
    const data = new URLSearchParams(new FormData(form)).toString();

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: data,
    })
      .then(() => {
        form.reset();
        lbl.textContent = 'Send';
        btn.disabled = false;
        success.classList.add('show');
        setTimeout(() => success.classList.remove('show'), 5000);
      })
      .catch(() => {
        lbl.textContent = 'Send';
        btn.disabled = false;
      });
  });
})();

/* ──────────────────────────────────────────────────────────────────────
   SCROLL REVEAL
   ─────────────────────────────────────────────────────────────────── */

(function scrollReveal() {
  const targets = $$([
    '.tribe-card',
    '.section-header',
    '.about-text',
    '.about-logo-wrap',
    '.contact-text',
    '.contact-form',
    '.artist-card',
    '.discord-image',
    '.discord-content',
  ].join(', '));

  targets.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const siblings = [...entry.target.parentElement.children];
      const delay    = siblings.indexOf(entry.target) * 0.065;
      entry.target.style.transitionDelay = delay + 's';
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  targets.forEach(el => io.observe(el));
})();

/* ──────────────────────────────────────────────────────────────────────
   SMOOTH ANCHOR SCROLL (offset for fixed header)
   ─────────────────────────────────────────────────────────────────── */

$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
