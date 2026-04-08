'use strict';

// Hero scaling
function scaleHero() {
  var frame = document.querySelector('.hero__frame');
  if (!frame) return;
  var parentWidth = frame.parentElement.clientWidth;
  var scale = parentWidth / 1920;
  frame.style.transform = 'scale(' + scale + ')';
  frame.parentElement.style.height = (1534 * scale) + 'px';
}
scaleHero();
window.addEventListener('resize', scaleHero);

const courseSwiper = new Swiper('.course-detail__swiper', {
  loop: true,
  speed: 600,
  navigation: {
    prevEl: '.course-detail__nav--prev',
    nextEl: '.course-detail__nav--next',
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
