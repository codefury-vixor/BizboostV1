const TOOLS = [
  { id: "caption", icon: "✍️", name: "Caption" },
  { id: "desc", icon: "📦", name: "Description" },
  { id: "wa", icon: "💬", name: "WhatsApp Ad" },
  { id: "tags", icon: "#️⃣", name: "Hashtags" },
  { id: "bname", icon: "🏷️", name: "Business Name" },
  { id: "slogan", icon: "💡", name: "Slogan" },
  { id: "fest", icon: "🎉", name: "Festival Campaign" },
  { id: "sale", icon: "🔥", name: "Sale Announcement" },
  { id: "title", icon: "🔖", name: "Product Title" },
  { id: "cta", icon: "👉", name: "Call-to-Action" }
];
const LANGS = { en: "English", hi: "हिन्दी", gu: "ગુજરાતી" };
const FESTS = ["Diwali", "Navratri", "Holi", "Raksha Bandhan", "Eid", "Christmas", "Ganesh Chaturthi", "Wedding Season", "New Year"];
const PLAIN = ["tags", "bname", "slogan", "title", "cta"];
const OPEN = {
  en: { friendly: ["Hey! ", "Hello! "], pro: [""], festive: ["🎉 ", "✨ "] },
  hi: { friendly: ["नमस्ते! ", "हैलो! "], pro: [""], festive: ["🎉 ", "✨ "] },
  gu: { friendly: ["નમસ્તે! ", "હેલો! "], pro: [""], festive: ["🎉 ", "✨ "] }
};
const CLOSE = {
  en: { friendly: ["Message us now 😊", "Come say hi! 💬"], pro: ["Contact us for details.", "Order today."], festive: ["Celebrate with us! 🪔", "Make it special! 🎊"] },
  hi: { friendly: ["अभी मैसेज करें 😊", "आज ही बात करें 💬"], pro: ["अधिक जानकारी के लिए संपर्क करें।", "आज ही ऑर्डर करें।"], festive: ["हमारे साथ जश्न मनाएँ! 🪔", "इसे खास बनाएँ! 🎊"] },
  gu: { friendly: ["હમણાં જ મેસેજ કરો 😊", "આજે જ વાત કરો 💬"], pro: ["વધુ માહિતી માટે સંપર્ક કરો.", "આજે જ ઓર્ડર કરો."], festive: ["અમારી સાથે ઉજવણી કરો! 🪔", "તેને ખાસ બનાવો! 🎊"] }
};
const DEF = {
  c: { en: "collection", hi: "कलेक्शन", gu: "કલેક્શન" },
  a: { en: "everyone", hi: "आप सभी", gu: "બધા" }
};
const BODY = {
  caption: {
    en: ["{p} is here! Perfect {c} for {a}.", "Meet {p}: your new favourite {c}, made for {a}."],
    hi: ["{p} आ गया है! {a} के लिए बेहतरीन {c}।", "मिलिए {p} से: {a} के लिए आपका नया पसंदीदा {c}।"],
    gu: ["{p} આવી ગયું છે! {a} માટે શ્રેષ્ઠ {c}.", "મળો {p} ને: {a} માટે તમારું નવું મનપસંદ {c}."]
  },
  desc: {
    en: ["{p} is a stylish {c} designed for {a}. Comfortable, easy to use and good value for money."],
    hi: ["{p} {a} के लिए बना स्टाइलिश {c} है। आरामदायक, इस्तेमाल में आसान और पैसे की पूरी कीमत।"],
    gu: ["{p} {a} માટે બનેલું સ્ટાઇલિશ {c} છે. આરામદાયક, વાપરવામાં સરળ અને પૈસા વસૂલ."]
  },
  wa: {
    en: ["New arrival: {p} ({c}) for {a}. Limited stock! Reply to this message to order."],
    hi: ["नया स्टॉक: {p} ({c}), {a} के लिए। सीमित स्टॉक! ऑर्डर के लिए इस मैसेज का जवाब दें।"],
    gu: ["નવો સ્ટોક: {p} ({c}), {a} માટે. મર્યાદિત સ્ટોક! ઓર્ડર માટે આ મેસેજનો જવાબ આપો."]
  },
  sale: {
    en: ["SALE! {p} at special prices for {a}. Offer valid for a limited time only."],
    hi: ["सेल! {a} के लिए {p} पर खास ऑफर। ऑफर सीमित समय के लिए है।"],
    gu: ["સેલ! {a} માટે {p} પર ખાસ ઓફર. ઓફર મર્યાદિત સમય માટે છે."]
  },
  fest: {
    en: ["Happy {f}! Celebrate with our {p} ({c}) for {a}. Special festive offers inside."],
    hi: ["{f} की हार्दिक शुभकामनाएँ! {a} के लिए हमारे {p} ({c}) के साथ त्योहार मनाएँ। खास फेस्टिव ऑफर।"],
    gu: ["{f} ની શુભકામનાઓ! {a} માટે અમારા {p} ({c}) સાથે તહેવાર ઉજવો. ખાસ ફેસ્ટિવ ઓફર."]
  },
  title: {
    en: ["{p} | Best {c} for {a}", "{p} - Premium {c} for {a}"],
    hi: ["{p} | {a} के लिए बेस्ट {c}", "{p} - {a} के लिए प्रीमियम {c}"],
    gu: ["{p} | {a} માટે બેસ્ટ {c}", "{p} - {a} માટે પ્રીમિયમ {c}"]
  },
  slogan: {
    en: ["{p}: Made for you.", "{p}: Quality you can trust."],
    hi: ["{p}: आपके लिए, सिर्फ़ आपके लिए।", "{p}: भरोसे की पहचान।"],
    gu: ["{p}: તમારા માટે, ફક્ત તમારા માટે.", "{p}: ભરોસાની ઓળખ."]
  },
  cta: {
    en: ["Order now!", "DM us to order", "Message us on WhatsApp today"],
    hi: ["अभी ऑर्डर करें!", "ऑर्डर के लिए मैसेज करें", "आज ही WhatsApp पर बात करें"],
    gu: ["હમણાં ઓર્ડર કરો!", "ઓર્ડર માટે મેસેજ કરો", "આજે જ WhatsApp પર વાત કરો"]
  }
};

// ----- Settings -----
const SKEY = "bizboost_settings";
let settings = { lang: "en", theme: "auto" };
try {
  const s = JSON.parse(localStorage.getItem(SKEY));
  if (s && LANGS[s.lang]) settings.lang = s.lang;
  if (s && ["auto", "light", "dark"].includes(s.theme)) settings.theme = s.theme;
} catch (e) {}
function applyTheme() {
  if (settings.theme === "auto") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = settings.theme;
}
function saveSettings() {
  try { localStorage.setItem(SKEY, JSON.stringify(settings)); } catch (e) {}
}
applyTheme();

// ----- Screens -----
const toolBox = document.createElement("div");
toolBox.id = "tool"; toolBox.className = "hidden";
const setBox = document.createElement("div");
setBox.id = "settings"; setBox.className = "hidden";
document.body.appendChild(toolBox);
document.body.appendChild(setBox);
screens.push("tool", "settings");

// ----- Home cards -----
document.querySelectorAll('.card[data-go="soon"]').forEach(function (c) { c.remove(); });
const gridEl = document.getElementById("grid");
function addCard(icon, name, key, fn) {
  const d = document.createElement("div");
  d.className = "card";
  d.dataset.name = key;
  const s = document.createElement("span");
  s.textContent = icon;
  d.appendChild(s);
  d.appendChild(document.createTextNode(name));
  d.addEventListener("click", function () { soon.classList.add("hidden"); fn(); });
  gridEl.insertBefore(d, gridEl.firstChild ? null : null);
}
TOOLS.forEach(function (t) {
  addCard(t.icon, t.name, t.name.toLowerCase(), function () { openTool(t); });
});
addCard("⚙️", "Settings", "settings theme language", openSettings);

// ----- Generator -----
function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
function makeTags(p, c) {
  const clean = function (s) { return s.replace(/[^\p{L}\p{M}\p{N}]+/gu, ""); };
  const base = [clean(p), clean(c)].filter(Boolean).map(function (x) { return "#" + x; });
  const all = base.concat(["#SmallBusiness", "#ShopLocal", "#MadeInIndia", "#NewArrival", "#OnlineShopping", "#SupportLocal"]);
  return Array.from(new Set(all)).join(" ");
}
function makeNames(p) {
  const w = ["Hub", "Mart", "Studio", "Point", "World", "Corner", "Bazaar"];
  return w.sort(function () { return Math.random() - 0.5; }).slice(0, 5)
    .map(function (x) { return p + " " + x; }).join("\n");
}
function makeText(t, v) {
  if (t.id === "tags") return makeTags(v.p, v.c);
  if (t.id === "bname") return makeNames(v.p);
  const c = v.c || DEF.c[v.l];
  const a = v.a || DEF.a[v.l];
  let s = pick(BODY[t.id][v.l]);
  s = s.split("{p}").join(v.p).split("{c}").join(c).split("{a}").join(a).split("{f}").join(v.f);
  if (PLAIN.includes(t.id)) return s;
  return pick(OPEN[v.l][v.tone]) + s + "\n\n" + pick(CLOSE[v.l][v.tone]);
}

function openTool(t) {
  let opts = Object.keys(LANGS).map(function (k) {
    return '<option value="' + k + '"' + (k === settings.lang ? " selected" : "") + ">" + LANGS[k] + "</option>";
  }).join("");
  const fest = t.id === "fest"
    ? '<label>Festival</label><select id="fF">' + FESTS.map(function (f) { return "<option>" + f + "</option>"; }).join("") + "</select>"
    : "";
  toolBox.innerHTML =
    '<button class="back" id="toolBack">← Back</button><h2 id="toolTitle"></h2>' +
    '<label>Product / item name *</label><input id="fP" maxlength="80">' +
    '<label>Category</label><input id="fC" maxlength="60" placeholder="e.g. saree, jewellery">' +
    '<label>Target audience</label><input id="fA" maxlength="60" placeholder="e.g. college girls">' +
    fest +
    '<label>Language</label><select id="fL">' + opts + "</select>" +
    '<label>Tone</label><select id="fT"><option value="friendly">Friendly</option><option value="pro">Professional</option><option value="festive">Festive</option></select>' +
    '<button class="btn" id="fGo">Generate</button><div id="fOut" class="result hidden"></div>';
  document.getElementById("toolTitle").textContent = t.icon + " " + t.name;
  document.getElementById("toolBack").addEventListener("click", function () { showScreen("home"); });
  let last = "";
  function run() {
    const out = document.getElementById("fOut");
    const p = document.getElementById("fP").value.trim();
    out.classList.remove("hidden");
    out.innerHTML = "";
    if (!p) { out.textContent = "Pehle product ka naam daalo."; return; }
    const v = {
      p: p,
      c: document.getElementById("fC").value.trim(),
      a: document.getElementById("fA").value.trim(),
      l: document.getElementById("fL").value,
      tone: document.getElementById("fT").value,
      f: t.id === "fest" ? document.getElementById("fF").value : ""
    };
    let text = makeText(t, v);
    for (let i = 0; i < 8 && text === last; i++) text = makeText(t, v);
    last = text;
    const small = document.createElement("small");
    small.textContent = "Template output (AI nahi). Apne hisaab se edit karo.";
    const pre = document.createElement("pre");
    pre.textContent = text;
    const act = document.createElement("div");
    act.className = "actions";
    act.appendChild(makeBtn("Copy", function () { copyText(text); }));
    act.appendChild(makeBtn("Regenerate", run));
    act.appendChild(makeBtn("Save", function () {
      items.unshift({ id: Date.now().toString(), text: text });
      if (persist()) toast("Saved ✅");
    }));
    act.appendChild(makeBtn("Share", function () { shareText(text); }));
    out.appendChild(small);
    out.appendChild(pre);
    out.appendChild(act);
  }
  document.getElementById("fGo").addEventListener("click", run);
  showScreen("tool");
}

function openSettings() {
  setBox.innerHTML =
    '<button class="back" id="setBack">← Back</button><h2>⚙️ Settings</h2>' +
    '<label>Default language</label><select id="sL">' +
    Object.keys(LANGS).map(function (k) {
      return '<option value="' + k + '"' + (k === settings.lang ? " selected" : "") + ">" + LANGS[k] + "</option>";
    }).join("") + "</select>" +
    '<label>Theme</label><select id="sT">' +
    ["auto", "light", "dark"].map(function (k) {
      return '<option value="' + k + '"' + (k === settings.theme ? " selected" : "") + ">" + k + "</option>";
    }).join("") + "</select>" +
    '<p class="muted">BizBoost AI v0.1<br>Data sirf aapke phone me save hota hai.<br>Privacy policy aur Terms Play Store se pehle jodenge.</p>';
  document.getElementById("setBack").addEventListener("click", function () { showScreen("home"); });
  document.getElementById("sL").addEventListener("change", function (e) {
    if (LANGS[e.target.value]) { settings.lang = e.target.value; saveSettings(); toast("Language set ✅"); }
  });
  document.getElementById("sT").addEventListener("change", function (e) {
    settings.theme = e.target.value; saveSettings(); applyTheme();
  });
  showScreen("settings");
}
