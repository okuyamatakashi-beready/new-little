'use strict';

// Hero scaling
function scaleHero() {
  var frame = document.querySelector('.hero__frame');
  if (!frame) return;
  if (window.innerWidth <= 768) {
    frame.style.transform = '';
    frame.parentElement.style.height = '';
    return;
  }
  var parentWidth = frame.parentElement.clientWidth;
  var scale = parentWidth / 1920;
  frame.style.transform = 'scale(' + scale + ')';
  frame.parentElement.style.height = (1534 * scale) + 'px';
}
scaleHero();
window.addEventListener('resize', scaleHero);

var courseSwiper = new Swiper('.course-detail__swiper', {
  loop: true,
  speed: 600,
  navigation: {
    prevEl: '.course-detail__nav--prev',
    nextEl: '.course-detail__nav--next',
  },
  pagination: {
    el: '.course-detail__pagination',
    clickable: true,
  },
});

// Scroll animation
const fadeObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.js-fade-in, .js-fade-in-left, .js-fade-in-right').forEach(function (el) {
  fadeObserver.observe(el);
});

// Accordion
const accordionTriggers = document.querySelectorAll('.js-accordion-trigger');
accordionTriggers.forEach(function (trigger) {
  trigger.addEventListener('click', function () {
    const body = this.nextElementSibling;
    if (this.classList.contains('is-open')) {
      this.classList.remove('is-open');
      body.style.height = '0';
      body.classList.remove('is-open');
    } else {
      this.classList.add('is-open');
      body.style.height = body.scrollHeight + 'px';
      body.classList.add('is-open');
    }
  });
});

// QA Accordion
document.querySelectorAll('.js-qa-trigger').forEach(function (trigger) {
  trigger.addEventListener('click', function () {
    var answer = this.nextElementSibling;
    if (this.classList.contains('is-open')) {
      this.classList.remove('is-open');
      answer.style.maxHeight = '0';
      answer.classList.remove('is-open');
    } else {
      this.classList.add('is-open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
      answer.classList.add('is-open');
    }
  });
});

// Global Nav (hamburger menu)
(function () {
  var hamburger = document.getElementById('js-hamburger');
  var overlay = document.getElementById('js-gnav-overlay');
  var closeBtn = document.getElementById('js-gnav-close');
  var closeBottom = document.getElementById('js-gnav-close-bottom');
  if (!hamburger || !overlay) return;

  function toggleNav() {
    var isOpen = overlay.classList.toggle('is-open');
    hamburger.classList.toggle('is-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeNav() {
    overlay.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleNav);
  if (closeBtn) closeBtn.addEventListener('click', closeNav);
  if (closeBottom) closeBottom.addEventListener('click', closeNav);

  var links = overlay.querySelectorAll('.gnav-overlay__link');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', closeNav);
  }
})();
