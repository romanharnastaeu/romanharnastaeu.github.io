(function () {
  'use strict';

  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const themeLabel = themeButton?.querySelector('.theme-label');
  const darkMedia = window.matchMedia('(prefers-color-scheme: dark)');

  function effectiveTheme() {
    return root.dataset.theme || (darkMedia.matches ? 'dark' : 'light');
  }

  function updateThemeControl() {
    if (!themeButton) return;
    const current = effectiveTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    themeButton.setAttribute('aria-label', `Switch to ${next} theme`);
    if (themeLabel) themeLabel.textContent = current === 'dark' ? 'Dark' : 'Light';
  }

  themeButton?.addEventListener('click', function () {
    const next = effectiveTheme() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem('portfolio-theme', next);
    } catch (_) {}
    updateThemeControl();
  });

  darkMedia.addEventListener?.('change', function () {
    if (!root.dataset.theme) updateThemeControl();
  });

  updateThemeControl();

  const navShell = document.querySelector('.nav-shell');
  const navToggle = document.querySelector('.nav-toggle');
  const navLabel = navToggle?.querySelector('.sr-only');
  const primaryNav = document.querySelector('.primary-nav');

  function setNavigation(open) {
    if (!navShell || !navToggle) return;
    navShell.dataset.navOpen = String(open);
    navToggle.setAttribute('aria-expanded', String(open));
    if (navLabel) navLabel.textContent = open ? 'Close navigation' : 'Open navigation';
  }

  navToggle?.addEventListener('click', function () {
    setNavigation(navToggle.getAttribute('aria-expanded') !== 'true');
  });

  primaryNav?.addEventListener('click', function (event) {
    if (event.target.closest('a')) setNavigation(false);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && navToggle?.getAttribute('aria-expanded') === 'true') {
      setNavigation(false);
      navToggle.focus();
    }
  });

  document.addEventListener('click', function (event) {
    if (navShell && !navShell.contains(event.target)) setNavigation(false);
  });

  window.matchMedia('(min-width: 58.01rem)').addEventListener?.('change', function (event) {
    if (event.matches) setNavigation(false);
  });

  const year = document.getElementById('current-year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
