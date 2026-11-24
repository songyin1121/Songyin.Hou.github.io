(() => {
  const root = document.documentElement;
  const preference = matchMedia('(prefers-color-scheme: dark)');
  const key = 'songyin-portfolio-theme';
  let choice;
  try {
    const saved = localStorage.getItem(key);
    if (saved === 'light' || saved === 'dark') choice = saved;
  } catch {
    // A blocked storage API does not prevent this session from changing theme.
  }

  const current = () => choice ?? (preference.matches ? 'dark' : 'light');
  function apply() {
    const theme = current();
    root.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#1D242C' : '#F7F5F0';
    const toggle = document.querySelector('#theme-toggle');
    if (toggle) toggle.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
  }

  apply();
  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('#theme-toggle');
    apply();
    toggle.hidden = false;
    toggle.addEventListener('click', () => {
      choice = current() === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(key, choice); } catch { /* Session state still applies. */ }
      apply();
    });
    preference.addEventListener('change', apply);
  });
})();
