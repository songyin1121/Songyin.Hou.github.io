(() => {
  // Establish the compact header layout before the first paint.
  document.documentElement.dataset.enhanced = '';
  document.addEventListener('DOMContentLoaded', initNavigation);

function initNavigation() {
  const root = document.documentElement;
  const nav = document.querySelector('#site-nav');
  const toggle = document.querySelector('#menu-toggle');
  const progress = document.querySelector('#progress');
  const header = document.querySelector('.site-header');
  const links = [...nav.querySelectorAll('a')];
  const sections = links.map(link => document.querySelector(link.hash));
  const compact = matchMedia('(max-width: 56rem)');

  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    nav.toggleAttribute('data-open', open);
  }

  toggle.hidden = false;
  toggle.addEventListener('click', () => setMenu(!nav.hasAttribute('data-open')));
  compact.addEventListener('change', () => {
    const restoreFocus = compact.matches && nav.contains(document.activeElement);
    setMenu(false);
    if (restoreFocus) toggle.focus();
  });
  nav.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link || !compact.matches || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    setMenu(false);
    // Focus the destination after removing the mobile link from the tab order.
    const target = document.querySelector(link.hash);
    target.tabIndex = -1;
    target.focus({ preventScroll: true });
  });
  header.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || !nav.hasAttribute('data-open')) return;
    setMenu(false);
    toggle.focus();
  });

  let scheduled = false;
  let active;
  function syncScroll() {
    scheduled = false;
    const end = root.scrollHeight - root.clientHeight;
    const distance = scrollY;
    const limit = header.offsetHeight + 110;
    const index = distance > 0 && distance >= end - 2
      ? links.length - 1
      : sections.findLastIndex(section => section.getBoundingClientRect().top <= limit);
    const next = links[Math.max(index, 0)];
    if (next !== active) {
      (active ?? nav.querySelector('[aria-current]'))?.removeAttribute('aria-current');
      next.setAttribute('aria-current', 'location');
      active = next;
    }
    progress.style.transform = `scaleX(${end > 0 ? Math.min(1, Math.max(0, distance / end)) : 0})`;
  }

  function requestSync() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(syncScroll);
  }

  root.dataset.navigationReady = '';
  addEventListener('scroll', requestSync, { passive: true });
  addEventListener('resize', requestSync);
  new ResizeObserver(requestSync).observe(document.body);
  requestSync();
}
})();
