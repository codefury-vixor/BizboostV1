// Apni email yaha daalo (jaise "tumhari@gmail.com"). Khali chhodo to Feedback share menu se jayega.
const FEEDBACK_EMAIL = "";

const POLICY = [
  "Last updated: 11 October 2026",
  "BizBoost AI helps small businesses write marketing text and do simple price calculations.",
  "WHAT WE STORE: The text you save, your language and theme choice, and festival dates you enter are stored only on your own device, in your browser storage. We do not have accounts or logins.",
  "WHAT WE COLLECT: This version of the app does not send your data to any server. It does not use analytics, ads or tracking.",
  "SHARING: When you tap Share or Copy, the text goes to the app you choose (like WhatsApp). The app never sends messages by itself.",
  "DELETING DATA: Deleting a saved note removes it from your device. Clearing your browser or app data removes everything.",
  "CHANGES: If we add AI, ads or any online service later, this policy will be updated first and will explain what data is sent.",
  "CHILDREN: This app is meant for business owners and is not designed for young children.",
  "CONTACT: Use the Feedback option in the app."
].join("\n\n");

const TERMS = [
  "Use BizBoost AI at your own risk.",
  "The generated text comes from templates. Please check and edit it before you use it for your business.",
  "Do not use the app to send spam or unwanted messages, or to mislead customers.",
  "Calculator results are estimates. Please double-check important numbers.",
  "We may update the app or these terms from time to time."
].join("\n\n");

const legalBox = document.createElement("div");
legalBox.id = "legal"; legalBox.className = "hidden";
const fbBox = document.createElement("div");
fbBox.id = "feedback"; fbBox.className = "hidden";
document.body.appendChild(legalBox);
document.body.appendChild(fbBox);
screens.push("legal", "feedback");

function openLegal() {
  legalBox.innerHTML = '<button class="back" id="lgBack">← Back</button>' +
    "<h2>Privacy Policy</h2><pre id='lgP' class='result' style='white-space:pre-wrap;font-family:inherit'></pre>" +
    "<h2 style='margin-top:20px'>Terms of Use</h2><pre id='lgT' class='result' style='white-space:pre-wrap;font-family:inherit'></pre>";
  document.getElementById("lgP").textContent = POLICY;
  document.getElementById("lgT").textContent = TERMS;
  document.getElementById("lgBack").addEventListener("click", function () { showScreen("home"); });
  showScreen("legal");
}

function openFeedback() {
  fbBox.innerHTML = '<button class="back" id="fbBack">← Back</button><h2>💬 Feedback</h2>' +
    '<label>Apna suggestion ya problem likho</label>' +
    '<textarea id="fbText" maxlength="1000" rows="6"></textarea>' +
    '<button class="btn" id="fbSend">Send</button>' +
    '<p id="fbMsg" class="muted"></p>';
  document.getElementById("fbBack").addEventListener("click", function () { showScreen("home"); });
  document.getElementById("fbSend").addEventListener("click", function () {
    const text = document.getElementById("fbText").value.trim();
    const msg = document.getElementById("fbMsg");
    if (!text) { msg.textContent = "Pehle kuch likho."; return; }
    msg.textContent = "";
    if (FEEDBACK_EMAIL) {
      window.location.href = "mailto:" + FEEDBACK_EMAIL +
        "?subject=" + encodeURIComponent("BizBoost AI feedback") +
        "&body=" + encodeURIComponent(text);
    } else {
      shareText("BizBoost AI feedback:\n" + text);
    }
  });
  showScreen("feedback");
}

addCard("💬", "Feedback", "feedback suggestion problem", openFeedback);
addCard("🔒", "Privacy & Terms", "privacy policy terms about", openLegal);
