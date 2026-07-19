const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.site-nav a');

const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 30);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuButton.addEventListener('click', () => {
  const open = document.body.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(open));
});

navLinks.forEach((link) => link.addEventListener('click', () => {
  document.body.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const reviews = [...document.querySelectorAll('.review')];
const reviewCurrent = document.querySelector('[data-review-current]');
let activeReview = 0;

const showReview = (index) => {
  activeReview = (index + reviews.length) % reviews.length;
  reviews.forEach((review, i) => review.classList.toggle('is-active', i === activeReview));
  reviewCurrent.textContent = String(activeReview + 1).padStart(2, '0');
};

document.querySelector('[data-review-prev]').addEventListener('click', () => showReview(activeReview - 1));
document.querySelector('[data-review-next]').addEventListener('click', () => showReview(activeReview + 1));

const boothSelect = document.querySelector('[data-booth-select]');
document.querySelectorAll('[data-booth-link]').forEach((link) => {
  link.addEventListener('click', () => {
    boothSelect.value = link.dataset.boothLink;
  });
});

const form = document.querySelector('[data-quote-form]');
const toast = document.querySelector('[data-toast]');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const subject = `Photo booth inquiry — ${data.get('eventType') || 'upcoming event'}`;
  const body = [
    `Hi Elevated Photo Booths,`,
    ``,
    `I'd love to check availability for my event.`,
    ``,
    `Name: ${data.get('firstName')} ${data.get('lastName')}`,
    `Email: ${data.get('email')}`,
    `Date: ${data.get('date') || 'Not set yet'}`,
    `Event: ${data.get('eventType') || 'Not selected'}`,
    `Booth: ${data.get('booth') || "I'd like a recommendation"}`,
    ``,
    `Details: ${data.get('message') || 'No additional details yet.'}`,
  ].join('\n');

  toast.classList.add('is-visible');
  setTimeout(() => toast.classList.remove('is-visible'), 4500);
  window.location.href = `mailto:elevatedphotoboothsnc@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.querySelector('[data-year]').textContent = new Date().getFullYear();
