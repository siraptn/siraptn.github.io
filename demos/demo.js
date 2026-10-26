// Shared helpers for the proof-of-concept demos. No network calls: every
// "agent" step below replays a scripted run over sample data.
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var wait = function (ms) { return new Promise(function (r) { setTimeout(r, reduce ? 0 : ms); }); };

  // Print lines into an agent log one by one. Each line is [cls, text] or a string.
  async function log(el, lines, gap) {
    for (var i = 0; i < lines.length; i++) {
      var l = lines[i], p = document.createElement('p');
      if (typeof l === 'string') p.textContent = l;
      else { var s = document.createElement('span'); s.className = l[0]; s.textContent = l[1]; p.appendChild(s); if (l[2]) p.appendChild(document.createTextNode(' ' + l[2])); }
      el.appendChild(p);
      el.scrollTop = el.scrollHeight;
      await wait(30);
      p.classList.add('in');
      await wait(gap || 420);
    }
  }

  // Highlight step n (1-based) in an <ol class="steps">.
  function step(ol, n) {
    Array.prototype.forEach.call(ol.children, function (li, i) {
      li.classList.toggle('done', i < n - 1);
      li.classList.toggle('on', i === n - 1);
      if (i === n - 1) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
    });
  }

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  // Single-select group of .choice buttons.
  function choose(container, onPick) {
    container.addEventListener('click', function (e) {
      var b = e.target.closest('.choice'); if (!b) return;
      container.querySelectorAll('.choice').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      onPick(b.dataset.k, b);
    });
  }

  window.Demo = { wait: wait, log: log, step: step, esc: esc, choose: choose };
})();
