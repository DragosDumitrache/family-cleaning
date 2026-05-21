// Shared bilingual toggle. Adds data-ro/data-en text swap + placeholder swap.
(function () {
  function apply(lang) {
    document.documentElement.lang = lang;
    try { localStorage.setItem('fc-lang', lang); } catch (e) {}
    document.querySelectorAll('[data-ro]').forEach(function (el) {
      el.textContent = lang === 'ro' ? el.getAttribute('data-ro') : el.getAttribute('data-en');
    });
    document.querySelectorAll('[data-ro-html]').forEach(function (el) {
      el.innerHTML = lang === 'ro' ? el.getAttribute('data-ro-html') : el.getAttribute('data-en-html');
    });
    document.querySelectorAll('[data-ph-ro]').forEach(function (el) {
      el.placeholder = lang === 'ro' ? el.getAttribute('data-ph-ro') : el.getAttribute('data-ph-en');
    });
    document.querySelectorAll('[data-lang-toggle]').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-lang-toggle') === lang);
      btn.setAttribute('aria-pressed', btn.getAttribute('data-lang-toggle') === lang ? 'true' : 'false');
    });
  }
  window.setLang = apply;
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-lang-toggle]');
    if (t) { e.preventDefault(); apply(t.getAttribute('data-lang-toggle')); }
  });
  var initial = 'ro';
  try { initial = localStorage.getItem('fc-lang') || 'ro'; } catch (e) {}
  // Apply when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { apply(initial); });
  } else {
    apply(initial);
  }
})();
