import { media, projects } from './portfolio';

const header = document.querySelector('.header');
const nav = document.querySelector('#nav');

const links = [...nav.querySelectorAll('a')];
const sections = links.map(a => document.querySelector(a.hash));

let pending = false;

function updateNav() {
  header.classList.toggle('compact', scrollY > 36);

  let current = sections[0];

  sections.forEach(section => {
    if (
      section.getBoundingClientRect().top <=
      header.offsetHeight + 35
    ) {
      current = section;
    }
  });

  if (
    scrollY + innerHeight >=
    document.documentElement.scrollHeight - 4
  ) {
    current = sections[sections.length - 1];
  }

  links.forEach(a => {
    if (a.hash === `#${current.id}`) {
      a.setAttribute('aria-current', 'location');
    } else {
      a.removeAttribute('aria-current');
    }
  });

  pending = false;
}

window.addEventListener(
  'scroll',
  () => {
    if (!pending) {
      pending = true;
      requestAnimationFrame(updateNav);
    }
  },
  { passive: true }
);

window.addEventListener('resize', updateNav);

updateNav();

document.querySelector('#year').textContent =
  new Date().getFullYear();

function loadImage(container, path, alt) {
  if (!path) return;

  const image = new Image();
  image.alt = alt;
  image.loading = 'eager';

  image.onload = () => {
    container.querySelector('.placeholder').hidden = true;
    container.prepend(image);
  };

  image.src = path;
}

loadImage(
  document.querySelector('#portrait'),
  media.portrait,
  'Portrait of Jiahui Du'
);

if (media.background) {
  const style = document.createElement('style');
  const url = encodeURI(media.background).replace(/"/g, '%22');

  style.textContent = `.beyond { background-image: linear-gradient(rgba(16,35,46,.55),rgba(16,35,46,.65)), url("${url}"); }`;

  document.head.append(style);
}

if (media.resume) {
  document.querySelectorAll('[data-resume]').forEach(a => {
    a.href = media.resume;
    a.textContent = 'View resume ↗';
    a.removeAttribute('aria-disabled');
    a.target = '_blank';
    a.rel = 'noopener';
  });
}

if (media.video) {
  const video = document.querySelector('#showreel');

  video.src = media.video;

  if (media.poster) {
    video.poster = media.poster;
  }

  video.hidden = false;
  document.querySelector('#video-placeholder').hidden = true;

  video.addEventListener('error', () => {
    video.hidden = true;
    document.querySelector('#video-placeholder').hidden = false;
  });
}

const escape = text =>
  String(text).replace(
    /[&<>"']/g,
    c =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[c])
  );

const tagMarkup = tags =>
  tags
    .map(tag => `<span>${escape(tag)}</span>`)
    .join('');

const featured = projects.slice(0, 3);
const slides = document.querySelector('#slides');
const dots = document.querySelector('#dots');

featured.forEach((p, i) => {
  const slide = document.createElement('article');

  slide.className = 'slide';
  slide.setAttribute('role', 'group');
  slide.setAttribute('aria-roledescription', 'slide');
  slide.setAttribute(
    'aria-label',
    `${i + 1} of 3: ${p.title}`
  );

  slide.innerHTML = `
    <div class="project-visual visual-${p.id}">
      <div class="placeholder">
        <p class="small">${escape(p.category)}</p>
        <p class="monogram">${escape(p.mark)}</p>
        <p class="visual-caption">${escape(p.caption)}</p>
        <p class="visual-note">Project imagery coming soon</p>
      </div>
    </div>
    <div class="project-copy">
      <p class="eyebrow">SELECTED PROJECT / 0${i + 1}</p>
      <h3>${escape(p.title)}</h3>
      <p>${escape(p.summary)}</p>
      <div class="result">${escape(p.result)}</div>
      <div class="tags">${tagMarkup(p.tags)}</div>
      <button
        class="text-button"
        data-project="${p.id}"
        type="button"
      >
        Explore project ↗
      </button>
    </div>
  `;

  slides.append(slide);

  loadImage(
    slide.querySelector('.project-visual'),
    p.image,
    `${p.title} screenshot`
  );

  const dot = document.createElement('button');

  dot.type = 'button';
  dot.setAttribute(
    'aria-label',
    `Show project ${i + 1}: ${p.title}`
  );

  dot.addEventListener('click', () => showSlide(i));

  dots.append(dot);
});

let active = 0;

function showSlide(index) {
  active = (index + featured.length) % featured.length;

  [...slides.children].forEach((slide, i) => {
    slide.hidden = i !== active;
  });

  [...dots.children].forEach((dot, i) => {
    dot.setAttribute(
      'aria-pressed',
      String(i === active)
    );
  });

  document.querySelector('#slide-status').textContent =
    `0${active + 1} / 03 — ${featured[active].category}`;
}

showSlide(0);

document
  .querySelector('#previous')
  .addEventListener('click', () => showSlide(active - 1));

document
  .querySelector('#next')
  .addEventListener('click', () => showSlide(active + 1));

const carousel = document.querySelector('.carousel');

carousel.addEventListener('keydown', e => {
  if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
    e.preventDefault();

    showSlide(
      active + (e.key === 'ArrowRight' ? 1 : -1)
    );
  }
});

let touch;

carousel.addEventListener(
  'touchstart',
  e => {
    touch = [
      e.changedTouches[0].clientX,
      e.changedTouches[0].clientY
    ];
  },
  { passive: true }
);

carousel.addEventListener(
  'touchend',
  e => {
    if (!touch) return;

    const dx =
      e.changedTouches[0].clientX - touch[0];
    const dy =
      e.changedTouches[0].clientY - touch[1];

    if (
      Math.abs(dx) > 60 &&
      Math.abs(dx) > Math.abs(dy)
    ) {
      showSlide(
        active + (dx < 0 ? 1 : -1)
      );
    }

    touch = null;
  },
  { passive: true }
);

const dialog = document.querySelector('#details');

let trigger;

document
  .querySelectorAll('[data-project]')
  .forEach(button =>
    button.addEventListener('click', () => {
      const p = projects.find(
        project => project.id === button.dataset.project
      );

      trigger = button;

      document.querySelector('#dialog-content').innerHTML = `
        <p class="eyebrow">${escape(p.category)}</p>
        <h2 id="dialog-title">${escape(p.title)}</h2>
        <p>${escape(p.summary)}</p>
        <div class="tags">${tagMarkup(p.tags)}</div>
        ${p.details
          .map(
            ([title, text]) =>
              `<section><h3>${escape(title)}</h3><p>${escape(text)}</p></section>`
          )
          .join('')}
        <div class="dialog-links"></div>
      `;

      const output = dialog.querySelector('.dialog-links');

      [
        ['View source', p.repository],
        ['Live demo', p.demo]
      ].forEach(([label, url]) => {
        if (url) {
          const a = document.createElement('a');

          a.href = url;
          a.textContent = `${label} ↗`;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.className = 'button gold';

          output.append(a);
        }
      });

      if (!output.children.length) {
        output.textContent = 'Project links coming soon.';
      }

      dialog.showModal();
      document.body.classList.add('modal-open');
      dialog.scrollTop = 0;
    })
  );

dialog
  .querySelector('.close')
  .addEventListener('click', () => dialog.close());

dialog.addEventListener('click', e => {
  const r = dialog.getBoundingClientRect();

  if (
    e.target === dialog &&
    (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
  ) {
    dialog.close();
  }
});

dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  trigger?.focus();
});