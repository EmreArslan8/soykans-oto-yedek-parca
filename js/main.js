(function () {
  'use strict';

  /* ---- Yıl ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Mobil menü ---- */
  var toggle = document.getElementById('nav-toggle');
  var nav = document.querySelector('.main-nav');
  var navLinks = document.querySelectorAll('.nav-link');

  function closeMenu() {
    if (!nav) return;
    nav.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* ---- Aktif link vurgusu (scroll spy) ---- */
  var sections = [];
  navLinks.forEach(function (link) {
    var id = link.getAttribute('href');
    if (id && id.charAt(0) === '#') {
      var sec = document.querySelector(id);
      if (sec) sections.push({ link: link, sec: sec });
    }
  });

  function onScroll() {
    var pos = window.scrollY + 120;
    var current = null;
    sections.forEach(function (item) {
      if (item.sec.offsetTop <= pos) current = item;
    });
    navLinks.forEach(function (l) { l.classList.remove('active'); });
    if (current) current.link.classList.add('active');

    var toTop = document.getElementById('to-top');
    if (toTop) toTop.hidden = window.scrollY < 500;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Modallar ---- */
  var modalTriggers = document.querySelectorAll('[data-modal]');
  var openModalEl = null;

  function openModal(id) {
    var modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    openModalEl = modal;
  }
  function closeModal() {
    if (!openModalEl) return;
    openModalEl.classList.remove('open');
    openModalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    openModalEl = null;
  }

  modalTriggers.forEach(function (btn) {
    btn.addEventListener('click', function () {
      openModal(btn.getAttribute('data-modal'));
    });
  });

  document.querySelectorAll('.modal').forEach(function (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal || e.target.classList.contains('modal-close')) {
        closeModal();
      }
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && openModalEl) closeModal();
  });

  /* ---- Çerez banner ---- */
  var COOKIE_KEY = 'cerez-onay';
  var banner = document.getElementById('cookie-banner');
  var accept = document.getElementById('cookie-accept');

  try {
    if (banner && localStorage.getItem(COOKIE_KEY) !== 'true') {
      banner.hidden = false;
    }
  } catch (err) {
    if (banner) banner.hidden = false;
  }

  if (accept && banner) {
    accept.addEventListener('click', function () {
      try { localStorage.setItem(COOKIE_KEY, 'true'); } catch (err) {}
      banner.hidden = true;
    });
  }

  /* ---- İletişim formu (mailto) ---- */
  var form = document.getElementById('contact-form');
  var note = document.getElementById('form-note');

  function setNote(msg, type) {
    if (!note) return;
    note.textContent = msg || '';
    note.className = 'form-note' + (type ? ' ' + type : '');
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var ad = form.ad.value.trim();
      var eposta = form.eposta.value.trim();
      var telefon = form.telefon.value.trim();
      var mesaj = form.mesaj.value.trim();

      [form.ad, form.eposta, form.mesaj].forEach(function (f) {
        f.classList.remove('invalid');
      });

      var missing = [];
      if (!ad) { missing.push(form.ad); }
      if (!eposta) { missing.push(form.eposta); }
      if (!mesaj) { missing.push(form.mesaj); }

      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(eposta);

      if (missing.length) {
        missing.forEach(function (f) { f.classList.add('invalid'); });
        setNote('Lütfen zorunlu alanları (Ad Soyad, E-posta, Mesaj) doldurun.', 'error');
        return;
      }
      if (!emailOk) {
        form.eposta.classList.add('invalid');
        setNote('Lütfen geçerli bir e-posta adresi girin.', 'error');
        return;
      }

      var subject = 'İletişim Formu - ' + ad;
      var body =
        'Ad Soyad: ' + ad + '\n' +
        'E-posta: ' + eposta + '\n' +
        'Telefon: ' + (telefon || '-') + '\n\n' +
        'Mesaj:\n' + mesaj;

      var mailto = 'mailto:info@soykans.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);

      setNote('E-posta uygulamanız açılıyor...', 'ok');
      window.location.href = mailto;
    });
  }
})();
