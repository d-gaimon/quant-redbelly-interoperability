// Progressive enhancement only: the page is complete without this file.
(function () {
  "use strict";

  var doc = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (sel, el) { return (el || document).querySelector(sel); };
  var $$ = function (sel, el) { return Array.prototype.slice.call((el || document).querySelectorAll(sel)); };
  var data = {};
  try { data = JSON.parse($("#ledger-data").textContent); } catch (e) {}

  if ("IntersectionObserver" in window && !reduce) doc.classList.add("anim");

  // Theme
  $(".theme-toggle").addEventListener("click", function () {
    var next = doc.dataset.theme === "light" ? "dark" : "light";
    doc.dataset.theme = next;
    var meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", next === "light" ? "#EDF1F4" : "#0c1317");
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // Mobile menu
  var nav = $("#topnav");
  var menu = $(".menu-toggle");
  function setMenu(open) {
    nav.classList.toggle("open", open);
    menu.setAttribute("aria-expanded", String(open));
  }
  menu.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });

  // Scroll progress
  var bar = $(".progress span");
  var ticking = false;
  function progress() {
    var max = doc.scrollHeight - window.innerHeight;
    bar.style.setProperty("--p", max > 0 ? Math.min(1, window.scrollY / max) : 0);
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(progress); }
  }, { passive: true });
  progress();

  // Word-by-word headings
  $$("[data-split]").forEach(function (el) {
    var i = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var parts = child.textContent.split(/(\s+)/);
          var frag = document.createDocumentFragment();
          parts.forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            var w = document.createElement("span");
            w.className = "w";
            var inner = document.createElement("span");
            inner.style.setProperty("--i", i++);
            inner.textContent = part;
            w.appendChild(inner);
            frag.appendChild(w);
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1 && !child.classList.contains("h-num")) {
          walk(child);
        }
      });
    })(el);
  });

  // Decode effect for the one-line verdict, in the brand's mono face
  function decode(el) {
    var target = el.getAttribute("data-decode");
    var glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/+=";
    var frame = 0;
    var total = 26;
    (function step() {
      var out = "";
      for (var k = 0; k < target.length; k++) {
        var settle = (k / target.length) * total;
        out += frame >= settle || target[k] === " " ? target[k] : glyphs[(Math.random() * glyphs.length) | 0];
      }
      el.textContent = out;
      if (frame++ < total) setTimeout(step, 38);
      else el.textContent = target;
    })();
  }

  // Reveal on scroll
  var revealables = ".panel, .panel-label, .table-wrap, .dg, .stat, .post, .src, .dl, .jr-stop, .rt-col, .dp-card";
  if (doc.classList.contains("anim")) {
    $$(revealables).forEach(function (el, n) {
      el.classList.add("reveal");
      el.style.setProperty("--d", n % 4);
    });
    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.classList.add("in");
        if (el.classList.contains("stat")) count(el);
        seen.unobserve(el);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    $$(revealables + ", .report h2, [data-split]").forEach(function (el) {
      if (!el.classList.contains("headline")) seen.observe(el);
    });
    var hero = $(".headline");
    var go = function () {
      hero.classList.add("in");
      setTimeout(function () { decode($(".decode")); }, 650);
    };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(go); else go();
  }

  // Count-up numbers
  function count(card) {
    var el = $(".stat-n", card);
    var end = parseInt(el.getAttribute("data-count"), 10);
    if (!end) return;
    var start = performance.now();
    (function tick(now) {
      var t = Math.min(1, (now - start) / 900);
      el.textContent = Math.round(end * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(tick);
    })(start);
  }

  // Active section in the contents list and top bar
  var links = $$(".toc a, .topnav a");
  var sections = $$(".report section[id], .band[id]");
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        links.forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + id); });
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  // Lens: highlight one kind of finding
  $$(".lens button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var lens = btn.getAttribute("data-lens");
      document.body.setAttribute("data-lens", lens);
      $$(".lens button").forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
    });
  });

  // Source drawer
  var drawer = $("#drawer");
  var scrim = $(".scrim");
  var lastFocus = null;
  function openSource(id) {
    var s = data[id];
    if (!s) return false;
    $("#drawer-id").textContent = s.id + " / " + s.groupName;
    $("#drawer-title").textContent = s.title;
    $("#drawer-meta").textContent = s.publisher + " / " + s.date;
    $("#drawer-supports").textContent = s.supports;
    var ex = $("#drawer-excerpts");
    ex.innerHTML = "";
    s.excerpts.forEach(function (x) { var li = document.createElement("li"); li.textContent = "“" + x + "”"; ex.appendChild(li); });
    if (s.absent) { var li = document.createElement("li"); li.textContent = "Not present: “" + s.absent.join("”, “") + "”"; ex.appendChild(li); }
    var cited = $("#drawer-cited");
    cited.innerHTML = "";
    s.citedIn.forEach(function (c) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#" + c.id; a.textContent = c.title;
      a.addEventListener("click", closeSource);
      li.appendChild(a); cited.appendChild(li);
    });
    if (!s.citedIn.length) cited.innerHTML = "<li>Community summary</li>";
    $("#drawer-open").href = s.url;
    lastFocus = document.activeElement;
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    scrim.hidden = false;
    $(".drawer-close").focus();
    return true;
  }
  function closeSource() {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    scrim.hidden = true;
    if (lastFocus) lastFocus.focus();
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a.cite");
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    if (openSource(a.getAttribute("data-src"))) e.preventDefault();
  });
  $(".drawer-close").addEventListener("click", closeSource);
  scrim.addEventListener("click", closeSource);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { if (drawer.classList.contains("open")) closeSource(); setMenu(false); }
  });

  // Copy thread posts
  function copy(text, btn) {
    var done = function () {
      var old = btn.textContent;
      btn.textContent = "Copied";
      setTimeout(function () { btn.textContent = old; }, 1400);
    };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, function () {});
    else {
      var ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); done(); } catch (e) {}
      document.body.removeChild(ta);
    }
  }
  $$(".post-copy").forEach(function (btn) {
    btn.addEventListener("click", function () { copy(btn.closest(".post").getAttribute("data-text"), btn); });
  });
  var all = $("[data-copy-thread]");
  if (all) all.addEventListener("click", function () {
    copy($$(".post").map(function (p) { return p.getAttribute("data-text"); }).join("\n\n"), all);
  });

  // Source filters
  $$(".src-filter button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var g = btn.getAttribute("data-group");
      $$(".src-filter button").forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
      $$(".src").forEach(function (card) { card.hidden = g !== "all" && card.getAttribute("data-group") !== g; });
    });
  });
})();
