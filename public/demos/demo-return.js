(function () {
  if (document.getElementById("shian-demo-return")) return;

  var labels = {
    en: { portfolio: "Portfolio", home: "Home" },
    zh: { portfolio: "\u8fd4\u56de\u4f5c\u54c1\u96c6", home: "\u8fd4\u56de\u9996\u9875" },
    ja: { portfolio: "\u30dd\u30fc\u30c8\u30d5\u30a9\u30ea\u30aa\u3078", home: "\u30db\u30fc\u30e0\u3078" },
    ko: { portfolio: "\ud3ec\ud2b8\ud3f4\ub9ac\uc624\ub85c", home: "\ud648\uc73c\ub85c" }
  };

  var lang = "en";
  try {
    lang = localStorage.getItem("shian-locale") || document.documentElement.lang || "en";
  } catch (e) {
    lang = document.documentElement.lang || "en";
  }
  lang = String(lang).slice(0, 2);
  var t = labels[lang] || labels.en;

  var style = document.createElement("style");
  style.textContent = [
    "#shian-demo-return{position:fixed;left:14px;top:14px;z-index:99999;display:flex;gap:8px;align-items:center;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}",
    "#shian-demo-return a{display:inline-flex;align-items:center;justify-content:center;min-height:36px;padding:0 12px;border-radius:999px;border:1px solid rgba(255,255,255,.16);background:rgba(10,12,18,.72);color:#fff;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:.01em;box-shadow:0 12px 32px rgba(0,0,0,.24);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}",
    "#shian-demo-return a:hover{border-color:rgba(74,158,255,.65);background:rgba(74,158,255,.20)}",
    "@media(max-width:640px){#shian-demo-return{left:10px;top:10px;gap:6px}#shian-demo-return a{min-height:34px;padding:0 10px;font-size:11px}}"
  ].join("");
  document.head.appendChild(style);

  var wrap = document.createElement("div");
  wrap.id = "shian-demo-return";
  wrap.setAttribute("aria-label", "Demo navigation");
  wrap.innerHTML =
    '<a href="/case-studies" aria-label="' + t.portfolio + '">← ' + t.portfolio + '</a>' +
    '<a href="/" aria-label="' + t.home + '">' + t.home + '</a>';
  document.body.appendChild(wrap);
})();
