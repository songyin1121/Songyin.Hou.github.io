import { siteConfig } from './config.js';
import { initResearch } from './research.js';

const highlights = siteConfig.publicAcademicHighlights;

for (const tile of document.querySelectorAll('[data-highlight]')) {
  const value = highlights?.[tile.dataset.highlight];
  if (!value) continue;
  tile.querySelector('dd').textContent = value;
  tile.hidden = false;
}

const email = siteConfig.email;
const github = siteConfig.github;
const cv = siteConfig.cv;
const validCv = typeof cv === 'string' && /^assets\/documents\/[\w.-]+\.pdf$/i.test(cv);
const links = {
  email: typeof email === 'string' && /^[\w.+-]+@student\.xjtlu\.edu\.cn$/i.test(email) ? `mailto:${email}` : null,
  github: typeof github === 'string' && /^https:\/\/github\.com\/[a-z\d][a-z\d-]{0,38}\/?$/i.test(github) ? github : null,
  cv: validCv ? cv : null,
  download: validCv ? cv : null
};

for (const link of document.querySelectorAll('[data-link]')) {
  const kind = link.dataset.link;
  if (!links[kind]) continue;
  link.href = links[kind];
  if (kind === 'download') link.download = '';
  link.hidden = false;
}

initResearch();
document.documentElement.dataset.siteReady = '';
