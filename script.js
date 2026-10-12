const screens = ["home", "calc", "saved"];
function showScreen(name) {
  screens.forEach(function (s) {
    document.getElementById(s).classList.toggle("hidden", s !== name);
  });
  window.scrollTo(0, 0);
}

const soon = document.getElementById("soon");
const empty = document.getElementById("empty");

function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.remove("hidden");
  setTimeout(function () { t.classList.add("hidden"); }, 2000);
}

// Cards
document.querySelectorAll(".card").forEach(function (card) {
  card.addEventListener("click", function () {
    const go = card.dataset.go;
    if (go === "calc" || go === "saved") {
      soon.classList.add("hidden");
      showScreen(go);
      if (go === "saved") renderSaved();
    } else {
      soon.classList.remove("hidden");
    }
  });
});

document.querySelectorAll(".back").forEach(function (b) {
  b.addEventListener("click", function () { showScreen("home"); });
});

// Home search
document.getElementById("search").addEventListener("input", function (e) {
  const q = e.target.value.trim().toLowerCase();
  let shown = 0;
  document.querySelectorAll(".card").forEach(function (card) {
    const match = card.dataset.name.includes(q);
    card.classList.toggle("hidden", !match);
    if (match) shown++;
  });
  empty.classList.toggle("hidden", shown > 0);
  soon.classList.add("hidden");
});

// Calculator tabs
document.querySelectorAll(".tab").forEach(function (tab) {
  tab.addEventListener("click", function () {
    document.querySelectorAll(".tab").forEach(function (t) { t.classList.remove("active"); });
    document.querySelectorAll(".panel").forEach(function (p) { p.classList.add("hidden"); });
    tab.classList.add("active");
    document.getElementById("p-" + tab.dataset.tab).classList.remove("hidden");
  });
});

// Calculator helpers
function val(id) {
  const raw = document.getElementById(id).value.trim();
  return raw === "" ? NaN : Number(raw);
}
function opt(id) {
  const raw = document.getElementById(id).value.trim();
  return raw === "" ? 0 : Number(raw);
}
function inr(n) { return "₹" + n.toFixed(2); }
function show(id, html) {
  const r = document.getElementById(id);
  r.innerHTML = html;
  r.classList.remove("hidden");
}

document.getElementById("btn-profit").addEventListener("click", function () {
  const v = ["cost", "pack", "deliv", "other", "sell"].map(opt);
  if (v.some(function (x) { return isNaN(x) || x < 0; })) {
    return show("res-profit", "Sahi number daalo (negative nahi).");
  }
  const sell = v[4];
  if (sell <= 0) return show("res-profit", "Selling price 0 se zyada daalo.");
  const total = v[0] + v[1] + v[2] + v[3];
  const profit = sell - total;
  const margin = (profit / sell) * 100;
  const cls = profit >= 0 ? "good" : "bad";
  show("res-profit",
    "Total kharcha: " + inr(total) + "<br>" +
    "Profit per unit: <b class='" + cls + "'>" + inr(profit) + "</b><br>" +
    "Profit margin: <b class='" + cls + "'>" + margin.toFixed(1) + "%</b>");
});

document.getElementById("btn-disc").addEventListener("click", function () {
  const o = val("dOrig"), p = val("dPct");
  if (isNaN(o) || isNaN(p) || o <= 0 || p < 0 || p > 100) {
    return show("res-disc", "Original price 0 se zyada aur discount 0 se 100 ke beech daalo.");
  }
  const final = o * (1 - p / 100);
  show("res-disc",
    "Final price: <b class='good'>" + inr(final) + "</b><br>" +
    "Customer ki bachat: " + inr(o - final));
});

document.getElementById("btn-markup").addEventListener("click", function () {
  const c = val("mCost"), m = val("mPct");
  if (isNaN(c) || isNaN(m) || c <= 0 || m < 0) {
    return show("res-markup", "Cost 0 se zyada aur markup 0 ya usse zyada daalo.");
  }
  const price = c * (1 + m / 100);
  show("res-markup",
    "Suggested selling price: <b class='good'>" + inr(price) + "</b><br>" +
    "Profit per unit: " + inr(price - c));
});

document.getElementById("btn-rev").addEventListener("click", function () {
  const u = val("rUnits"), p = val("rPrice"), c = opt("rCost");
  if (isNaN(u) || isNaN(p) || isNaN(c) || u <= 0 || p <= 0 || c < 0) {
    return show("res-rev", "Units aur price 0 se zyada daalo, cost negative nahi hona chahiye.");
  }
  const revenue = u * p;
  const profit = revenue - u * c;
  const cls = profit >= 0 ? "good" : "bad";
  show("res-rev",
    "Total revenue: <b>" + inr(revenue) + "</b><br>" +
    "Estimated profit: <b class='" + cls + "'>" + inr(profit) + "</b>");
});

// ---------- Saved content ----------
const KEY = "bizboost_saved";
let items = [];
let editingId = null;

const savedList = document.getElementById("savedList");
const savedEmpty = document.getElementById("savedEmpty");
const savedSearch = document.getElementById("savedSearch");
const editor = document.getElementById("editor");
const noteText = document.getElementById("noteText");
const editorMsg = document.getElementById("editorMsg");

function loadItems() {
  try {
    const raw = localStorage.getItem(KEY);
    const data = raw ? JSON.parse(raw) : [];
    items = Array.isArray(data) ? data : [];
  } catch (e) {
    items = [];
  }
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
    return true;
  } catch (e) {
    toast("Save nahi ho paya. Storage full ho sakta hai.");
    return false;
  }
}

function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(function () { toast("Copy ho gaya ✅"); })
      .catch(function () { fallbackCopy(text); });
  } else {
    fallbackCopy(text);
  }
}
function fallbackCopy(text) {
  const t = document.createElement("textarea");
  t.value = text;
  document.body.appendChild(t);
  t.select();
  try {
    document.execCommand("copy");
    toast("Copy ho gaya ✅");
  } catch (e) {
    toast("Copy nahi ho paya");
  }
  document.body.removeChild(t);
}

function shareText(text) {
  if (navigator.share) {
    navigator.share({ text: text }).catch(function () {});
  } else {
    window.open("https://wa.me/?text=" + encodeURIComponent(text), "_blank");
  }
}

function makeBtn(label, fn) {
  const b = document.createElement("button");
  b.textContent = label;
  b.addEventListener("click", fn);
  return b;
}

function renderSaved() {
  const q = savedSearch.value.trim().toLowerCase();
  const list = items.filter(function (i) { return i.text.toLowerCase().includes(q); });
  savedList.innerHTML = "";
  savedEmpty.textContent = items.length === 0
    ? "Abhi kuch saved nahi hai. '+ New' dabao."
    : "Koi result nahi mila.";
  savedEmpty.classList.toggle("hidden", list.length > 0);

  list.forEach(function (item) {
    const box = document.createElement("div");
    box.className = "note";
    const p = document.createElement("p");
    p.textContent = item.text;
    const actions = document.createElement("div");
    actions.className = "actions";
    actions.appendChild(makeBtn("Copy", function () { copyText(item.text); }));
    actions.appendChild(makeBtn("Share", function () { shareText(item.text); }));
    actions.appendChild(makeBtn("Edit", function () { openEditor(item.id); }));
    actions.appendChild(makeBtn("Delete", function () {
      if (confirm("Ye note delete karna hai?")) {
        items = items.filter(function (i) { return i.id !== item.id; });
        persist();
        renderSaved();
      }
    }));
    box.appendChild(p);
    box.appendChild(actions);
    savedList.appendChild(box);
  });
}

function openEditor(id) {
  editingId = id || null;
  const found = items.find(function (i) { return i.id === id; });
  noteText.value = found ? found.text : "";
  editorMsg.textContent = "";
  editor.classList.remove("hidden");
  noteText.focus();
}
function closeEditor() {
  editor.classList.add("hidden");
  noteText.value = "";
  editingId = null;
}

document.getElementById("newNote").addEventListener("click", function () { openEditor(null); });
document.getElementById("cancelNote").addEventListener("click", closeEditor);
savedSearch.addEventListener("input", renderSaved);

document.getElementById("saveNote").addEventListener("click", function () {
  const text = noteText.value.trim();
  if (text === "") {
    editorMsg.textContent = "Pehle kuch likho.";
    return;
  }
  if (editingId) {
    const found = items.find(function (i) { return i.id === editingId; });
    if (found) found.text = text;
  } else {
    items.unshift({ id: Date.now().toString(), text: text });
  }
  if (persist()) {
    closeEditor();
    renderSaved();
    toast("Saved ✅");
  }
});

loadItems();
