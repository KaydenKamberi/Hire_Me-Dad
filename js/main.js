/* main.js — progressive enhancement only.
 *
 * The page is fully usable with this file blocked, failed, or disabled:
 * every phone number is a real <a href="tel:"> in the HTML, and the sticky
 * bottom call bar is CSS-only. Nothing here is load-bearing.
 *
 * Spec §4 allows this file exactly four jobs. Two of them (form validation
 * and the submit success state) belong to the form, which is built at CP5.
 * Smooth-scrolling has no in-page anchor to act on yet besides the skip
 * link, which should jump instantly. So at CP3 there is one job:
 *
 *   1. Reveal the sticky top bar once the hero scrolls out of view.
 */
(function () {
  'use strict';

  var hero = document.getElementById('hero');
  var topbar = document.querySelector('.topbar');

  // No IntersectionObserver, no hero, no topbar — leave the bar hidden. The
  // hero's own Call button and the CSS-only bottom bar still do the work.
  if (!hero || !topbar || !('IntersectionObserver' in window)) return;

  new IntersectionObserver(function (entries) {
    topbar.hidden = entries[0].isIntersecting;
  }).observe(hero);
})();
