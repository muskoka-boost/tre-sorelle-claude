(function () {
  'use strict';

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        toggle.focus();
      }
    });
  }

  // Header shadow on scroll
  var header = document.querySelector('.site-header');
  var onScroll = function () {
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Highlight today's hours
  var today = new Date().getDay();
  var row = document.querySelector('.hours tr[data-day="' + today + '"]');
  if (row) {
    row.classList.add('today');
    var th = row.querySelector('th');
    if (th) th.insertAdjacentHTML('beforeend', ' <span class="today-pill">Today</span>');
  }

  // Footer year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Demo form: never submits
  var form = document.getElementById('demo-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = form.querySelector('.demo-note');
      if (note) {
        note.textContent = 'Thanks! This is a demo form, so nothing was sent. Please call (705) 325-8507.';
        note.classList.add('flash');
      }
    });
  }

  // Reveal on scroll
  var reveal = document.querySelectorAll('.menu-card, .feature, .review, .g');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reveal.forEach(function (el) { el.classList.add('reveal'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -40px 0px' });
    reveal.forEach(function (el) { io.observe(el); });
  }
})();
