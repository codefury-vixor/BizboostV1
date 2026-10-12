(function () {
  function mk(tag, cls) {
    var d = document.createElement(tag);
    if (cls) d.className = cls;
    return d;
  }

  var DESC = {
    "Caption": "Social post ke liye catchy line",
    "Description": "Product ka accha vivaran",
    "Product Title": "Listing ke liye strong title",
    "Hashtags": "Reach badhane wale hashtags",
    "Call-to-Action": "Order dilane wali line",
    "Slogan": "Brand ki yaadgaar tagline",
    "Business Name": "Nayi dukaan ke naam ke idea",
    "WhatsApp Studio": "Arrival, offer, order, follow-up",
    "WhatsApp Ad": "Ek chhota promotional message",
    "Social Studio": "Instagram, Facebook, Reels",
    "Sale Announcement": "Sale ki ghoshna turant taiyar",
    "Festival Campaign": "Tyohaar ke messages aur captions",
    "Festival Calendar": "Date set karo, countdown dekho",
    "Calculators": "Profit, discount, markup, revenue",
    "Saved": "Aapke save kiye hue content",
    "Feedback": "Suggestion ya problem batao",
    "Privacy & Terms": "Aapka data kaise rehta hai",
    "Settings": "Language aur theme"
  };
  var PAL = {
    "caption": ["#FF7A18", "#FF3D77"],
    "description": ["#2DD4BF", "#A3E635"],
    "product title": ["#6366F1", "#22D3EE"],
    "hashtags": ["#0EA5E9", "#8B5CF6"],
    "call-to-action": ["#F43F5E", "#FB923C"],
    "slogan": ["#FFC933", "#FF8A00"],
    "business name": ["#A855F7", "#EC4899"],
    "whatsapp studio": ["#25D366", "#128C7E"],
    "whatsapp ad": ["#4ADE80", "#16A34A"],
    "social studio": ["#F58529", "#DD2A7B"],
    "sale announcement": ["#FF3B30", "#FF9500"],
    "festival campaign": ["#FF9933", "#B91C5C"],
    "festival calendar": ["#FACC15", "#EA580C"],
    "calculators": ["#2DD4BF", "#3B82F6"],
    "saved": ["#FBBF24", "#FB7185"],
    "settings": ["#94A3B8", "#64748B"],
    "feedback": ["#38BDF8", "#818CF8"],
    "privacy & terms": ["#A78BFA", "#6366F1"]
  };
  var DEF = ["#F5A623", "#FF5E8A"];
  var TABPAL = { home: DEF, create: ["#FF7A18", "#FF3D77"], promote: ["#25D366", "#0EA5A4"] };
  var CREATE = ["Caption", "Description", "Product Title", "Hashtags", "Call-to-Action", "Slogan", "Business Name"];
  var PROMO = ["WhatsApp Studio", "WhatsApp Ad", "Social Studio", "Sale Announcement", "Festival Campaign", "Festival Calendar"];
  var FEAT = [
    { n: "Caption", tag: "Social media", line: "Post ke liye catchy caption" },
    { n: "WhatsApp Studio", tag: "Messages", line: "Offer, order aur follow-up" },
    { n: "Festival Calendar", tag: "Tyohaar", line: "Sale se pehle taiyari karo" },
    { n: "Calculators", tag: "Hisaab", line: "Profit aur discount turant" }
  ];

  function setPal(p) {
    var r = document.documentElement.style;
    r.setProperty("--c1", p[0]);
    r.setProperty("--c2", p[1]);
  }
  function pal(name) { return PAL[(name || "").toLowerCase()] || DEF; }
  function setPalette(name) { setPal(pal(name)); }

  var SVG = function (p) {
    return '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' + p + "</svg>";
  };
  var ICONS = {
    home: SVG('<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>'),
    create: SVG('<path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/>'),
    promote: SVG('<path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18 6a8 8 0 0 1 0 12"/>'),
    calc: SVG('<rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M8.5 7.5h7"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01"/>'),
    saved: SVG('<path d="M6 3h12v18l-6-4-6 4z"/>'),
    settings: SVG('<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>')
  };

  var home = document.getElementById("home");
  var grid = document.getElementById("grid");
  var currentTab = "home";
  var lastPane = "home";

  // Purane hisse chhupao
  ["search", "empty", "soon"].forEach(function (id) {
    var x = document.getElementById(id);
    if (x) x.classList.add("hidden");
  });
  var oldHeader = home.querySelector("header");
  if (oldHeader) oldHeader.classList.add("hidden");
  grid.classList.add("hidden");

  // Aurora background
  var au = mk("div", "aurora");
  au.innerHTML = "<i></i><i></i>";
  document.body.insertBefore(au, document.body.firstChild);

  // Top bar
  var top = mk("div", "topbar");
  var logo = document.createElement("img");
  logo.alt = "";
  logo.width = 36;
  logo.height = 36;
  logo.src = "icon-192.png";
  logo.onerror = function () { logo.onerror = null; logo.src = "icon.svg"; };
  var nm = mk("b");
  nm.textContent = "BizBoost AI";
  var gear = mk("button", "gear");
  gear.type = "button";
  gear.setAttribute("aria-label", "Settings");
  gear.innerHTML = ICONS.settings;
  top.appendChild(logo);
  top.appendChild(nm);
  top.appendChild(gear);
  home.insertBefore(top, home.firstChild);

  // Cards
  var byName = {};
  var iconOf = {};
  Array.prototype.slice.call(grid.querySelectorAll(".card")).forEach(function (card) {
    var icon = card.querySelector("span");
    var name = card.textContent.replace(icon ? icon.textContent : "", "").trim();
    byName[name] = card;
    iconOf[name] = icon ? icon.textContent : "✨";
    var p = pal(name);
    card.style.setProperty("--k1", p[0]);
    card.style.setProperty("--k2", p[1]);
    Array.prototype.slice.call(card.childNodes).forEach(function (n) {
      if (n.nodeType === 3) card.removeChild(n);
    });
    var wrap = mk("div", "ct");
    var b = mk("b");
    b.textContent = name;
    var s = mk("small");
    s.textContent = DESC[name] || "";
    wrap.appendChild(b);
    wrap.appendChild(s);
    card.appendChild(wrap);
    card.setAttribute("role", "button");
    card.tabIndex = 0;
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); card.click(); }
    });
    card.addEventListener("click", function () {
      setPalette(name);
      if (navigator.vibrate) navigator.vibrate(8);
    }, true);
  });

  // Panes
  var panes = {};
  function makePane(key) {
    var d = mk("div", "pane");
    panes[key] = d;
    home.appendChild(d);
    return d;
  }
  var pHome = makePane("home");
  var pCreate = makePane("create");
  var pPromo = makePane("promote");
  function showPane(key) {
    lastPane = key;
    Object.keys(panes).forEach(function (k) {
      panes[k].classList.toggle("hidden", k !== key);
    });
    setPal(TABPAL[key] || DEF);
    window.scrollTo(0, 0);
  }

  var used = {};
  function fillPane(pane, title, sub, names) {
    var h = mk("div", "phead");
    h.innerHTML = "<h2></h2><p></p>";
    h.querySelector("h2").textContent = title;
    h.querySelector("p").textContent = sub;
    var list = mk("div", "plist");
    names.forEach(function (n, i) {
      if (byName[n]) {
        byName[n].style.setProperty("--i", i);
        list.appendChild(byName[n]);
        used[n] = 1;
      }
    });
    pane.appendChild(h);
    pane.appendChild(list);
  }
  fillPane(pCreate, "Create", "Aisa content jo bikta hai.", CREATE);
  fillPane(pPromo, "Promote", "Customers tak pahuncho.", PROMO);

  // Baaki cards (Calculators, Saved, Settings...) chhupe store me
  var store = mk("div", "hidden");
  document.body.appendChild(store);
  Object.keys(byName).forEach(function (n) {
    if (!used[n]) store.appendChild(byName[n]);
  });

  // ----- Home pane -----
  var hr = new Date().getHours();
  var hello = hr < 5 ? "🌙 Shubh ratri" : hr < 12 ? "☀️ Suprabhat" : hr < 17 ? "🌤️ Namaste" : hr < 21 ? "🌆 Shubh sandhya" : "🌙 Shubh ratri";
  var greet = mk("div", "greet");
  greet.innerHTML = '<span class="hello"></span><h1>Apni dukaan ko<br><em>boost karo.</em></h1><p>Content, messages aur hisaab, sab ek jagah.</p>';
  greet.querySelector(".hello").textContent = hello;
  pHome.appendChild(greet);

  var q = document.createElement("input");
  q.id = "q";
  q.type = "text";
  q.placeholder = "Tool dhundo...";
  q.setAttribute("autocomplete", "off");
  pHome.appendChild(q);

  var results = mk("div", "hidden");
  pHome.appendChild(results);
  var body = mk("div");
  pHome.appendChild(body);

  function lbl(text) {
    var d = mk("div", "lbl");
    d.textContent = text;
    return d;
  }

  // Featured carousel
  body.appendChild(lbl("Quick start"));
  var feat = mk("div", "feat");
  FEAT.forEach(function (f, i) {
    var card = byName[f.n];
    if (!card) return;
    var p = pal(f.n);
    var fc = mk("div", "fc");
    fc.setAttribute("role", "button");
    fc.tabIndex = 0;
    fc.style.setProperty("--k1", p[0]);
    fc.style.setProperty("--k2", p[1]);
    fc.style.setProperty("--i", i);
    fc.innerHTML = '<div class="big"></div><span class="tag"></span><h3></h3><p></p><span class="go">Kholo →</span>';
    fc.querySelector(".big").textContent = iconOf[f.n];
    fc.querySelector(".tag").textContent = f.tag;
    fc.querySelector("h3").textContent = f.n;
    fc.querySelector("p").textContent = f.line;
    fc.addEventListener("click", function () { card.click(); });
    fc.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); card.click(); }
    });
    feat.appendChild(fc);
  });
  body.appendChild(feat);

  // Festival countdown
  var festCard = mk("div", "fest");
  festCard.setAttribute("role", "button");
  festCard.tabIndex = 0;
  festCard.addEventListener("click", function () {
    if (byName["Festival Calendar"]) byName["Festival Calendar"].click();
  });
  function renderFest() {
    var best = null;
    try {
      var d = JSON.parse(localStorage.getItem("bizboost_fdates")) || {};
      var t = new Date();
      t.setHours(0, 0, 0, 0);
      Object.keys(d).forEach(function (k) {
        if (!d[k]) return;
        var dt = new Date(d[k] + "T00:00:00");
        if (isNaN(dt.getTime())) return;
        var n = Math.round((dt - t) / 86400000);
        if (n >= 0 && (!best || n < best.n)) best = { name: k, n: n };
      });
    } catch (e) {}
    if (best) {
      festCard.innerHTML = '<div class="fe">🪔</div><div><b></b><small>Campaign abhi taiyar karo</small></div><div class="num"></div>';
      festCard.querySelector("b").textContent = best.name;
      festCard.querySelector(".num").innerHTML = String(best.n) + "<span>" + (best.n === 0 ? "AAJ" : "DIN") + "</span>";
    } else {
      festCard.innerHTML = '<div class="fe">🗓️</div><div><b>Tyohaar ki date set karo</b><small>Countdown aur campaign ek jagah</small></div>';
    }
  }
  body.appendChild(festCard);

  // Recently used (extras.js ka box)
  if (typeof recentBox !== "undefined") body.appendChild(recentBox);

  // Explore tiles
  body.appendChild(lbl("Explore"));
  var duo = mk("div", "duo");
  [
    ["create", "✨", "Create", "Caption, hashtags, slogan", TABPAL.create],
    ["promote", "📣", "Promote", "WhatsApp aur social", TABPAL.promote]
  ].forEach(function (d) {
    var b = mk("button");
    b.type = "button";
    b.style.setProperty("--k1", d[4][0]);
    b.style.setProperty("--k2", d[4][1]);
    b.innerHTML = '<span class="e"></span><b></b><small></small>';
    b.querySelector(".e").textContent = d[1];
    b.querySelector("b").textContent = d[2];
    b.querySelector("small").textContent = d[3];
    b.addEventListener("click", function () { goTab(d[0]); });
    duo.appendChild(b);
  });
  body.appendChild(duo);

  // Search
  q.addEventListener("input", function () {
    var s = q.value.trim().toLowerCase();
    results.innerHTML = "";
    if (!s) {
      results.classList.add("hidden");
      body.classList.remove("hidden");
      return;
    }
    body.classList.add("hidden");
    results.classList.remove("hidden");
    var count = 0;
    Object.keys(byName).forEach(function (name) {
      var card = byName[name];
      if (name.toLowerCase().indexOf(s) === -1 && (card.dataset.name || "").indexOf(s) === -1) return;
      count++;
      var p = pal(name);
      var row = mk("button", "rrow");
      row.type = "button";
      row.style.setProperty("--k1", p[0]);
      row.style.setProperty("--k2", p[1]);
      var ic = mk("span", "ri");
      ic.textContent = iconOf[name];
      var tx = mk("span");
      var b = mk("b");
      b.textContent = name;
      var sm = mk("small");
      sm.textContent = DESC[name] || "";
      tx.appendChild(b);
      tx.appendChild(sm);
      row.appendChild(ic);
      row.appendChild(tx);
      row.addEventListener("click", function () { card.click(); });
      results.appendChild(row);
    });
    if (!count) {
      var m = mk("p", "muted");
      m.textContent = "Koi tool nahi mila.";
      results.appendChild(m);
    }
  });

  // Card animation delay
  Array.prototype.slice.call(home.querySelectorAll(".plist .card")).forEach(function (c, i) {
    c.style.setProperty("--i", Math.min(i, 10));
  });

  // Tool kholte hi rang
  var _ot = openTool;
  openTool = function (t) { setPalette(t.name); _ot(t); };

  // Settings (Feedback aur Privacy ke saath)
  function openSettingsPlus() {
    if (byName["Settings"]) byName["Settings"].click();
    var sb = document.getElementById("settings");
    if (!sb) return;
    sb.appendChild(lbl("Aur"));
    [["Feedback", "💬"], ["Privacy & Terms", "🔒"]].forEach(function (x) {
      var card = byName[x[0]];
      if (!card) return;
      var p = pal(x[0]);
      var row = mk("button", "rrow");
      row.type = "button";
      row.style.setProperty("--k1", p[0]);
      row.style.setProperty("--k2", p[1]);
      var ic = mk("span", "ri");
      ic.textContent = x[1];
      var tx = mk("span");
      var b = mk("b");
      b.textContent = x[0];
      var sm = mk("small");
      sm.textContent = DESC[x[0]] || "";
      tx.appendChild(b);
      tx.appendChild(sm);
      row.appendChild(ic);
      row.appendChild(tx);
      row.addEventListener("click", function () { card.click(); });
      sb.appendChild(row);
    });
  }
  gear.addEventListener("click", openSettingsPlus);

  // Floating dock
  var nav = mk("nav", "nav");
  function navBtn(key, label) {
    var b = mk("button");
    b.type = "button";
    b.dataset.key = key;
    b.innerHTML = '<span class="ic">' + ICONS[key] + '</span><span class="t">' + label + "</span>";
    b.addEventListener("click", function () { goTab(key); });
    nav.appendChild(b);
  }
  navBtn("home", "Home");
  navBtn("create", "Create");
  navBtn("promote", "Promote");
  navBtn("calc", "Hisaab");
  navBtn("saved", "Saved");
  document.body.appendChild(nav);

  function markNav() {
    nav.querySelectorAll("button").forEach(function (b) {
      b.classList.toggle("on", b.dataset.key === currentTab);
    });
  }
  function goTab(key) {
    if (key === "calc") {
      currentTab = "calc";
      if (byName["Calculators"]) byName["Calculators"].click();
      return;
    }
    if (key === "saved") {
      currentTab = "saved";
      if (byName["Saved"]) byName["Saved"].click();
      return;
    }
    currentTab = key;
    showPane(key);
    showScreen("home");
    markNav();
  }

  var _show = showScreen;
  showScreen = function (name) {
    if (name === "home") {
      if (currentTab === "calc" || currentTab === "saved") currentTab = lastPane;
      setPal(TABPAL[lastPane] || DEF);
      renderFest();
    } else if (name === "calc") {
      currentTab = "calc";
    } else if (name === "saved") {
      currentTab = "saved";
    }
    _show(name);
    markNav();
  };

  // Keyboard khule to dock chhupao
  document.addEventListener("focusin", function (e) {
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) nav.classList.add("hide");
  });
  document.addEventListener("focusout", function () { nav.classList.remove("hide"); });

  renderFest();
  showPane("home");
  markNav();
})();
