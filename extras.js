const XDEF = {
  n: { en: "Customer", hi: "ग्राहक", gu: "ગ્રાહક" },
  b: { en: "our shop", hi: "हमारी दुकान", gu: "અમારી દુકાન" },
  p: { en: "our new collection", hi: "हमारा नया कलेक्शन", gu: "અમારું નવું કલેક્શન" },
  o: { en: "Special offer available.", hi: "खास ऑफर उपलब्ध है।", gu: "ખાસ ઓફર ઉપલબ્ધ છે." },
  f: { en: "festival", hi: "त्योहार", gu: "તહેવાર" }
};
const OFFER_TYPES = ["arrival", "promo", "disc", "insta", "fb", "launch", "short", "cal"];
const DAYLBL = { en: "Day", hi: "दिन", gu: "દિવસ" };

const WA_CFG = {
  wa: true, icon: "📲", name: "WhatsApp Studio",
  types: [
    { id: "arrival", label: "New arrival", tpl: {
      en: "Hello {n}! 🛍️ New arrival at {b}: {p}. {o} Reply to order!",
      hi: "नमस्ते {n}! 🛍️ {b} में नया स्टॉक आया है: {p}। {o} ऑर्डर के लिए जवाब दें!",
      gu: "નમસ્તે {n}! 🛍️ {b} માં નવો સ્ટોક આવ્યો છે: {p}. {o} ઓર્ડર માટે જવાબ આપો!" } },
    { id: "promo", label: "Product promotion", tpl: {
      en: "Hi {n}! {b} presents {p}. {o} Message us for details.",
      hi: "नमस्ते {n}! {b} लाया है {p}। {o} जानकारी के लिए मैसेज करें।",
      gu: "નમસ્તે {n}! {b} લાવ્યું છે {p}. {o} માહિતી માટે મેસેજ કરો." } },
    { id: "greet", label: "Festival greeting", tpl: {
      en: "Dear {n}, wishing you a very happy {f}! 🪔 Thank you for being with {b}. {o}",
      hi: "प्रिय {n}, आपको {f} की हार्दिक शुभकामनाएँ! 🪔 {b} के साथ जुड़े रहने के लिए धन्यवाद। {o}",
      gu: "પ્રિય {n}, તમને {f} ની હાર્દિક શુભકામનાઓ! 🪔 {b} સાથે જોડાયેલા રહેવા બદલ આભાર. {o}" } },
    { id: "disc", label: "Discount announcement", tpl: {
      en: "Hi {n}! 🔥 Discount at {b} on {p}. {o} Valid for a limited time.",
      hi: "नमस्ते {n}! 🔥 {b} में {p} पर डिस्काउंट। {o} सीमित समय के लिए।",
      gu: "નમસ્તે {n}! 🔥 {b} માં {p} પર ડિસ્કાઉન્ટ. {o} મર્યાદિત સમય માટે." } },
    { id: "follow", label: "Customer follow-up", tpl: {
      en: "Hi {n}, this is {b}. Did you like {p}? Let us know if you need any help. 😊",
      hi: "नमस्ते {n}, यह {b} की तरफ से संदेश है। क्या आपको {p} पसंद आया? कोई मदद चाहिए तो बताइए। 😊",
      gu: "નમસ્તે {n}, આ {b} તરફથી સંદેશ છે. શું તમને {p} ગમ્યું? કોઈ મદદ જોઈએ તો જણાવજો. 😊" } },
    { id: "order", label: "Order confirmation", tpl: {
      en: "Hi {n}, your order for {p} is confirmed ✅ Thank you for shopping with {b}. {o}",
      hi: "नमस्ते {n}, {p} के लिए आपका ऑर्डर कन्फर्म हो गया है ✅ {b} से खरीदारी करने के लिए धन्यवाद। {o}",
      gu: "નમસ્તે {n}, {p} માટે તમારો ઓર્ડર કન્ફર્મ થયો છે ✅ {b} પાસેથી ખરીદી કરવા બદલ આભાર. {o}" } }
  ]
};

const SOC_CFG = {
  wa: false, icon: "📣", name: "Social Studio",
  types: [
    { id: "insta", label: "Instagram caption", tpl: {
      en: "✨ {p} from {b}! {o} Tag someone who needs this. 💕",
      hi: "✨ {b} से {p}! {o} किसी ऐसे को टैग करें जिसे ये चाहिए। 💕",
      gu: "✨ {b} તરફથી {p}! {o} એવા કોઈને ટેગ કરો જેને આ જોઈએ. 💕" } },
    { id: "fb", label: "Facebook post", tpl: {
      en: "Big news from {b}! We now have {p}. {o} Visit us or message us to know more.",
      hi: "{b} की तरफ से खुशखबरी! अब हमारे पास {p} है। {o} और जानने के लिए आएँ या मैसेज करें।",
      gu: "{b} તરફથી ખુશખબર! હવે અમારી પાસે {p} છે. {o} વધુ જાણવા માટે આવો અથવા મેસેજ કરો." } },
    { id: "reel", label: "Reels hook", tpl: {
      en: "Wait for it... this is {p} 😍 Only at {b}!",
      hi: "आखिर तक देखिए... ये है {p} 😍 सिर्फ़ {b} में!",
      gu: "છેલ્લે સુધી જુઓ... આ છે {p} 😍 ફક્ત {b} માં!" } },
    { id: "launch", label: "Product launch", tpl: {
      en: "🚀 Launching today: {p} by {b}. {o} Be among the first to get it!",
      hi: "🚀 आज लॉन्च: {b} का {p}। {o} सबसे पहले पाने वालों में शामिल हों!",
      gu: "🚀 આજે લોન્ચ: {b} નું {p}. {o} સૌથી પહેલા મેળવનારમાં સામેલ થાઓ!" } },
    { id: "short", label: "YouTube Shorts description", tpl: {
      en: "{p} by {b} | Watch till the end! {o} #Shorts #SmallBusiness",
      hi: "{b} का {p} | आखिर तक देखें! {o} #Shorts #SmallBusiness",
      gu: "{b} નું {p} | છેલ્લે સુધી જુઓ! {o} #Shorts #SmallBusiness" } },
    { id: "idea", label: "Content ideas", tpl: {
      en: "1. Behind-the-scenes of packing {p}\n2. Customer review of {p}\n3. 3 ways to use {p}\n4. Unboxing video\n5. Quick Q&A about {p}",
      hi: "1. {p} पैक करने का पर्दे के पीछे का वीडियो\n2. {p} पर ग्राहक का रिव्यू\n3. {p} इस्तेमाल करने के 3 तरीके\n4. अनबॉक्सिंग वीडियो\n5. {p} के बारे में सवाल-जवाब",
      gu: "1. {p} પેક કરવાનો પડદા પાછળનો વીડિયો\n2. {p} પર ગ્રાહકનો રિવ્યૂ\n3. {p} વાપરવાની 3 રીત\n4. અનબોક્સિંગ વીડિયો\n5. {p} વિશે સવાલ-જવાબ" } },
    { id: "cal", label: "7-day content calendar", list: true, tpl: {
      en: ["Introduce {b}", "Photo post of {p}", "Customer review or testimonial", "Behind the scenes", "Offer post: {o}", "Reel or short video of {p}", "Poll or Q&A"],
      hi: ["{b} का परिचय", "{p} की फोटो पोस्ट", "ग्राहक रिव्यू", "पर्दे के पीछे की झलक", "ऑफर पोस्ट: {o}", "{p} की रील या छोटा वीडियो", "पोल या सवाल-जवाब"],
      gu: ["{b} નો પરિચય", "{p} નો ફોટો પોસ્ટ", "ગ્રાહક રિવ્યૂ", "પડદા પાછળની ઝલક", "ઓફર પોસ્ટ: {o}", "{p} ની રીલ અથવા ટૂંકો વીડિયો", "પોલ અથવા સવાલ-જવાબ"] } }
  ]
};

const FEST_TPL = {
  msg: { label: "Promotional message", en: "Happy {f} from {b}! 🪔 Wishing you joy and prosperity.",
    hi: "{b} की ओर से {f} की हार्दिक शुभकामनाएँ! 🪔 आपके जीवन में खुशियाँ और समृद्धि आए।",
    gu: "{b} તરફથી {f} ની હાર્દિક શુભકામનાઓ! 🪔 તમારા જીવનમાં ખુશીઓ અને સમૃદ્ધિ આવે." },
  cap: { label: "Caption", en: "Celebrate {f} in style with {b}! ✨ #{ft}",
    hi: "{b} के साथ {f} मनाएँ पूरे स्टाइल में! ✨ #{ft}",
    gu: "{b} સાથે {f} ઉજવો સ્ટાઇલમાં! ✨ #{ft}" },
  idea: { label: "Campaign idea", en: "Run a 3-day {f} countdown. Day 1: teaser post. Day 2: offer reveal. Day 3: last-chance reminder.",
    hi: "{f} से पहले 3 दिन का काउंटडाउन चलाएँ। दिन 1: टीज़र पोस्ट। दिन 2: ऑफर की घोषणा। दिन 3: आखिरी मौके की याद।",
    gu: "{f} પહેલાં 3 દિવસનું કાઉન્ટડાઉન ચલાવો. દિવસ 1: ટીઝર પોસ્ટ. દિવસ 2: ઓફરની જાહેરાત. દિવસ 3: છેલ્લી તકની યાદ." },
  sale: { label: "Sale announcement", en: "{f} SALE at {b}! 🎉 Special festive offers for a limited time. Visit or message us today.",
    hi: "{b} में {f} सेल! 🎉 सीमित समय के लिए खास फेस्टिवल ऑफर। आज ही आएँ या मैसेज करें।",
    gu: "{b} માં {f} સેલ! 🎉 મર્યાદિત સમય માટે ખાસ ફેસ્ટિવ ઓફર. આજે જ આવો અથવા મેસેજ કરો." }
};

// ----- helpers -----
function fillT(tpl, v, l, useDef) {
  return tpl.replace(/\{(\w+)\}/g, function (m, k) {
    if (v[k]) return v[k];
    if (k === "o") return useDef ? XDEF.o[l] : "";
    return XDEF[k] ? XDEF[k][l] : "";
  }).replace(/ {2,}/g, " ").replace(/ +\n/g, "\n").trim();
}
function langOpts() {
  return Object.keys(LANGS).map(function (k) {
    return '<option value="' + k + '"' + (k === settings.lang ? " selected" : "") + ">" + LANGS[k] + "</option>";
  }).join("");
}
function noteLine(parent, text) {
  const s = document.createElement("small");
  s.style.display = "block";
  s.style.color = "var(--muted)";
  s.style.marginTop = "12px";
  s.textContent = text;
  parent.appendChild(s);
}
function resultCard(text, parent, label) {
  const box = document.createElement("div");
  box.className = "note";
  if (label) {
    const h = document.createElement("small");
    h.style.display = "block";
    h.style.color = "var(--muted)";
    h.style.marginBottom = "6px";
    h.textContent = label;
    box.appendChild(h);
  }
  const p = document.createElement("p");
  p.textContent = text;
  box.appendChild(p);
  const a = document.createElement("div");
  a.className = "actions";
  a.appendChild(makeBtn("Copy", function () { copyText(text); }));
  a.appendChild(makeBtn("Save", function () {
    items.unshift({ id: Date.now().toString() + Math.random().toString(36).slice(2, 6), text: text });
    if (persist()) toast("Saved ✅");
  }));
  a.appendChild(makeBtn("Share", function () { shareText(text); }));
  box.appendChild(a);
  parent.appendChild(box);
}

const studioBox = document.createElement("div");
studioBox.id = "studio"; studioBox.className = "hidden";
const festBox = document.createElement("div");
festBox.id = "festcal"; festBox.className = "hidden";
document.body.appendChild(studioBox);
document.body.appendChild(festBox);
screens.push("studio", "festcal");

// ----- Studio screen (WhatsApp + Social) -----
function openStudio(cfg) {
  studioBox.innerHTML =
    '<button class="back" id="stBack">← Back</button><h2 id="stTitle"></h2>' +
    '<label>Type</label><select id="sType">' +
    cfg.types.map(function (t, i) { return '<option value="' + i + '">' + t.label + "</option>"; }).join("") + "</select>" +
    '<label>Business name</label><input id="sB" maxlength="60">' +
    '<label>Product / item</label><input id="sP" maxlength="80">' +
    '<label>Offer or price (optional)</label><input id="sO" maxlength="80" placeholder="e.g. 20% off till Sunday">' +
    (cfg.wa ? '<label>Customer name (optional)</label><input id="sN" maxlength="40"><label>Festival (for greetings)</label><input id="sF" maxlength="40">' : "") +
    '<label>Language</label><select id="sL">' + langOpts() + "</select>" +
    '<button class="btn" id="sGo">Generate</button><div id="sOut"></div>';
  document.getElementById("stTitle").textContent = cfg.icon + " " + cfg.name;
  document.getElementById("stBack").addEventListener("click", function () { showScreen("home"); });
  document.getElementById("sGo").addEventListener("click", function () {
    const t = cfg.types[Number(document.getElementById("sType").value)];
    const l = document.getElementById("sL").value;
    const v = {
      b: document.getElementById("sB").value.trim(),
      p: document.getElementById("sP").value.trim(),
      o: document.getElementById("sO").value.trim(),
      n: cfg.wa ? document.getElementById("sN").value.trim() : "",
      f: cfg.wa ? document.getElementById("sF").value.trim() : ""
    };
    let text;
    if (t.list) {
      text = t.tpl[l].map(function (s, i) {
        return DAYLBL[l] + " " + (i + 1) + ": " + fillT(s, v, l, true);
      }).join("\n");
    } else {
      text = fillT(t.tpl[l], v, l, OFFER_TYPES.includes(t.id));
    }
    const out = document.getElementById("sOut");
    out.innerHTML = "";
    noteLine(out, cfg.wa
      ? "Template output (AI nahi). Share dabane par aap khud chat chunoge. Sirf un logo ko bhejo jo aapse messages lena chahte hain."
      : "Template output (AI nahi). Apne hisaab se edit karo.");
    resultCard(text, out);
  });
  showScreen("studio");
}

// ----- Festival Calendar -----
const FDKEY = "bizboost_fdates";
function loadFD() {
  try { const d = JSON.parse(localStorage.getItem(FDKEY)); return d && typeof d === "object" ? d : {}; }
  catch (e) { return {}; }
}
function daysLeft(s) {
  if (!s) return null;
  const d = new Date(s + "T00:00:00");
  if (isNaN(d.getTime())) return null;
  const t = new Date(); t.setHours(0, 0, 0, 0);
  return Math.round((d - t) / 86400000);
}
function openFestCal() {
  festBox.innerHTML =
    '<button class="back" id="fcBack">← Back</button><h2>🗓️ Festival Calendar</h2>' +
    '<p class="muted" style="margin:0 0 12px">Festival ki date har saal badalti hai. Date khud daalo (official calendar se check karke).</p>' +
    '<label>Festival</label><select id="fcF">' + FESTS.map(function (f) { return "<option>" + f + "</option>"; }).join("") + "</select>" +
    '<label>Date (aap daalo)</label><input type="date" id="fcD">' +
    '<p id="fcLeft" class="muted" style="margin:0 0 16px"></p>' +
    '<label>Business name</label><input id="fcB" maxlength="60">' +
    '<label>Language</label><select id="fcL">' + langOpts() + "</select>" +
    '<button class="btn" id="fcGo">Generate</button><div id="fcOut"></div>';
  document.getElementById("fcBack").addEventListener("click", function () { showScreen("home"); });
  const sel = document.getElementById("fcF");
  const dateIn = document.getElementById("fcD");
  const left = document.getElementById("fcLeft");
  function refresh() {
    dateIn.value = loadFD()[sel.value] || "";
    update();
  }
  function update() {
    const n = daysLeft(dateIn.value);
    left.textContent = n === null ? "Date set nahi hai."
      : n > 0 ? n + " din baaki hain."
      : n === 0 ? "Festival aaj hai! 🎉"
      : "Ye date nikal chuki hai. Nayi date daalo.";
  }
  sel.addEventListener("change", refresh);
  dateIn.addEventListener("change", function () {
    const d = loadFD();
    d[sel.value] = dateIn.value;
    try { localStorage.setItem(FDKEY, JSON.stringify(d)); } catch (e) {}
    update();
  });
  document.getElementById("fcGo").addEventListener("click", function () {
    const l = document.getElementById("fcL").value;
    const f = sel.value;
    const v = { f: f, ft: f.replace(/\s+/g, ""), b: document.getElementById("fcB").value.trim() };
    const out = document.getElementById("fcOut");
    out.innerHTML = "";
    noteLine(out, "Template output (AI nahi). Apne hisaab se edit karo.");
    Object.keys(FEST_TPL).forEach(function (k) {
      resultCard(fillT(FEST_TPL[k][l], v, l, false), out, FEST_TPL[k].label);
    });
  });
  refresh();
  showScreen("festcal");
}

// ----- Cards -----
addCard("📲", "WhatsApp Studio", "whatsapp studio template order follow greeting", function () { openStudio(WA_CFG); });
addCard("📣", "Social Studio", "social instagram facebook reels youtube shorts calendar", function () { openStudio(SOC_CFG); });
addCard("🗓️", "Festival Calendar", "festival calendar diwali holi", openFestCal);

// ----- Recently used -----
const RKEY = "bizboost_recent";
function getRecent() {
  try {
    const r = JSON.parse(localStorage.getItem(RKEY));
    return Array.isArray(r) ? r.filter(function (id) { return TOOLS.some(function (t) { return t.id === id; }); }).slice(0, 4) : [];
  } catch (e) { return []; }
}
const recentBox = document.createElement("div");
recentBox.className = "hidden";
document.getElementById("home").insertBefore(recentBox, gridEl.previousElementSibling);
function renderRecent() {
  const r = getRecent();
  recentBox.innerHTML = "";
  recentBox.classList.toggle("hidden", r.length === 0);
  if (!r.length) return;
  const h = document.createElement("h2");
  h.textContent = "Recently used";
  recentBox.appendChild(h);
  const row = document.createElement("div");
  row.className = "tabs";
  r.forEach(function (id) {
    const t = TOOLS.find(function (x) { return x.id === id; });
    const b = makeBtn(t.icon + " " + t.name, function () { openTool(t); });
    b.className = "tab";
    row.appendChild(b);
  });
  recentBox.appendChild(row);
}
const _openTool = openTool;
openTool = function (t) {
  try {
    const r = [t.id].concat(getRecent().filter(function (id) { return id !== t.id; })).slice(0, 4);
    localStorage.setItem(RKEY, JSON.stringify(r));
  } catch (e) {}
  _openTool(t);
};
const _showScreen = showScreen;
showScreen = function (name) {
  _showScreen(name);
  if (name === "home") renderRecent();
};
renderRecent();
