// Old single-page links (e.g. /#publications, /#saga-pub) point at sections that now
// live on their own pages; send them to the right page.
(() => {
  const id = decodeURIComponent(location.hash.slice(1));
  if (!id || document.getElementById(id)) return;
  const pages = {
    research: 'research.html',
    publications: 'publications.html',
    talks: 'talks.html',
    press: 'talks.html#press',
    teaching: 'teaching.html',
    service: 'teaching.html#service',
    software: 'software.html',
    more: 'more.html',
    photos: 'more.html#photos',
  };
  const target = pages[id] || (id.endsWith('-pub') ? 'publications.html#' + id : null);
  if (target) location.replace(target);
})();

// Expandable lists: a .show-more button toggles the element named by aria-controls.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.show-more[aria-controls]').forEach((btn) => {
    const target = document.getElementById(btn.getAttribute('aria-controls'));
    if (!target) return;

    const sync = () => {
      const open = !target.hidden;
      btn.textContent = open ? 'Show Less' : 'Show More';
      btn.setAttribute('aria-expanded', String(open));
    };

    btn.addEventListener('click', () => {
      target.hidden = !target.hidden;
      sync();
    });
    sync();
  });
});

// Mobile menu: the header's .nav-toggle button opens and closes the page links.
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const toggle = header && header.querySelector('.nav-toggle');
  if (!toggle) return;

  const setOpen = (open) => {
    header.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  toggle.addEventListener('click', () => setOpen(!header.classList.contains('nav-open')));
  document.addEventListener('click', (e) => {
    if (header.classList.contains('nav-open') && !header.contains(e.target)) setOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && header.classList.contains('nav-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
});
