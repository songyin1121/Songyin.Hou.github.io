export function initResearch() {
  const controls = document.querySelector('#filters');
  const buttons = [...controls.querySelectorAll('button')];
  const grid = document.querySelector('.research-grid');
  const cards = [...grid.querySelectorAll('[data-category]')];
  const status = document.querySelector('#filter-status');
  const dialog = document.querySelector('#research-dialog');

  function applyFilter(category) {
    const selected = buttons.find(button => button.dataset.filter === category) ?? buttons[0];
    const showAll = selected.dataset.filter === 'all';
    for (const button of buttons) button.setAttribute('aria-pressed', String(button === selected));
    for (const card of cards) card.hidden = !showAll && card.dataset.category !== selected.dataset.filter;
    grid.toggleAttribute('data-filtered', !showAll);
    const count = cards.filter(card => !card.hidden).length;
    status.textContent = `${count} research ${count === 1 ? 'project' : 'projects'} shown.`;
  }

  function readFilter() {
    applyFilter(new URL(location.href).searchParams.get('topic'));
  }

  controls.hidden = false;
  for (const button of buttons) {
    button.addEventListener('click', () => {
      const url = new URL(location.href);
      const topic = button.dataset.filter;
      if (topic === 'all') url.searchParams.delete('topic');
      else url.searchParams.set('topic', topic);
      history.replaceState(history.state, '', url);
      applyFilter(topic);
    });
  }
  addEventListener('popstate', readFilter);
  readFilter();

  if (typeof dialog.showModal !== 'function') return;
  let opener;
  for (const card of cards) {
    const details = card.querySelector('.research-details');
    const summary = details.querySelector('summary');
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'detail-trigger';
    trigger.innerHTML = summary.innerHTML;
    trigger.setAttribute('aria-haspopup', 'dialog');
    details.before(trigger);
    details.hidden = true;

    trigger.addEventListener('click', () => {
      opener = trigger;
      document.querySelector('#dialog-label').textContent = card.querySelector('.label').textContent;
      document.querySelector('#dialog-title').textContent = card.querySelector('h3').textContent;
      document.querySelector('#dialog-subtitle').textContent = card.querySelector('.project-title').textContent;
      document.querySelector('#dialog-meta').textContent = card.querySelector('.meta').innerText.replace('\n', ' · ');
      document.querySelector('#dialog-body').replaceChildren(details.querySelector('.detail-copy').cloneNode(true));
      dialog.showModal();
    });
  }

  dialog.addEventListener('close', () => opener?.focus());
}
