/* main.js — progressive enhancement only.
 *
 * The page is fully usable with this file blocked, failed, or disabled:
 * every phone number is a real <a href="tel:"> in the HTML, and the sticky
 * bottom call bar is CSS-only. Nothing here is load-bearing.
 *
 * Spec §4 allows this file exactly four jobs. Smooth-scrolling still has no
 * in-page anchor to act on besides the skip link, which should jump
 * instantly. So there are three:
 *
 *   1. Reveal the sticky top bar once the hero scrolls out of view.
 *   2. Validate the estimate form inline. Never an alert().
 *   3. Swap the submit button to a sending state, then show the success
 *      message in place of the form.
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

/* --- 2 & 3. Estimate form -------------------------------------------------
 *
 * Nothing here sends anything. CP9 removes the submit interception and lets
 * the browser POST to Netlify; the validation below survives that change
 * untouched.
 */
(function () {
  'use strict';

  var form = document.getElementById('estimate');
  var done = document.getElementById('estimate-done');
  if (!form || !done) return;

  // The markup carries `required` so native validation still fires with this
  // file blocked or disabled. Now that it has loaded, hand validation over to
  // the inline errors below, which say something more useful than the
  // browser's bubble and don't vanish on scroll.
  form.setAttribute('novalidate', '');

  var fields = [
    { input: 'f-name',  error: 'e-name',
      test: function (v) { return v.trim() !== ''; },
      message: 'Please tell me your name.' },

    { input: 'f-phone', error: 'e-phone',
      // Deliberately loose: count the digits and accept any punctuation
      // around them. Rejecting a real customer's number because they wrote it
      // with dots costs a job; letting a typo through costs one callback.
      test: function (v) {
        var digits = v.replace(/\D/g, '');
        return digits.length >= 10 && digits.length <= 11;
      },
      message: 'Please add a phone number with the area code, so I can call you back.' },

    { input: 'f-need',  error: 'e-need',
      test: function (v) { return v.trim() !== ''; },
      message: 'Please tell me what you need done.' }
  ];

  fields.forEach(function (f) {
    f.el = document.getElementById(f.input);
    f.errEl = document.getElementById(f.error);
  });

  function setError(f, message) {
    if (message) {
      f.errEl.textContent = message;
      f.errEl.hidden = false;
      f.el.setAttribute('aria-invalid', 'true');
    } else {
      f.errEl.textContent = '';
      f.errEl.hidden = true;
      f.el.removeAttribute('aria-invalid');
    }
  }

  // Clear a field's error as soon as it becomes valid, so the page stops
  // telling someone off for something they have already fixed.
  fields.forEach(function (f) {
    f.el.addEventListener('input', function () {
      if (f.el.getAttribute('aria-invalid') && f.test(f.el.value)) setError(f, null);
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var firstInvalid = null;
    fields.forEach(function (f) {
      var ok = f.test(f.el.value);
      setError(f, ok ? null : f.message);
      if (!ok && !firstInvalid) firstInvalid = f;
    });

    if (firstInvalid) {
      // Focus rather than scroll: it moves the screen reader too, and the
      // field's aria-describedby error is read on arrival.
      firstInvalid.el.focus();
      return;
    }

    var button = form.querySelector('[type="submit"]');
    button.disabled = true;
    button.textContent = 'Sending…';

    // A bot that filled the hidden company field gets the success screen and
    // nothing else. At CP9 Netlify's netlify-honeypot takes this over.
    // The delay stands in for the network round trip CP9 introduces, so the
    // sending state is real enough to see. It is the only pretend thing here.
    window.setTimeout(function () {
      form.hidden = true;
      // The "or send a message" line goes with it — leaving it above a
      // success box invites someone to send a second one.
      var intro = document.getElementById('estimate-intro');
      if (intro) intro.hidden = true;
      done.hidden = false;
      done.focus();
    }, 600);
  });
})();
