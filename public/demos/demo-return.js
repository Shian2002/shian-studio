(function () {
  if (document.getElementById("shian-demo-return")) return;

  var labels = {
    en: { menu: "Back", portfolio: "Portfolio", home: "Home" },
    zh: { menu: "\u8fd4\u56de", portfolio: "\u8fd4\u56de\u4f5c\u54c1\u96c6", home: "\u8fd4\u56de\u9996\u9875" },
    ja: { menu: "\u623b\u308b", portfolio: "\u30dd\u30fc\u30c8\u30d5\u30a9\u30ea\u30aa\u3078", home: "\u30db\u30fc\u30e0\u3078" },
    ko: { menu: "\ub4a4\ub85c", portfolio: "\ud3ec\ud2b8\ud3f4\ub9ac\uc624\ub85c", home: "\ud648\uc73c\ub85c" },
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
    "#shian-demo-return{position:fixed;left:14px;bottom:14px;z-index:99999;display:flex;gap:8px;align-items:center;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;pointer-events:none}",
    "#shian-demo-return a{display:inline-flex;align-items:center;justify-content:center;min-height:36px;padding:0 12px;border-radius:999px;border:1px solid rgba(255,255,255,.16);background:rgba(10,12,18,.72);color:#fff;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:.01em;box-shadow:0 12px 32px rgba(0,0,0,.24);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);pointer-events:auto}",
    "#shian-demo-return a:hover{border-color:rgba(74,158,255,.65);background:rgba(74,158,255,.20)}",
    "#shian-demo-return .demo-return-toggle{display:inline-flex;align-items:center;justify-content:center;min-height:34px;padding:0 12px;border-radius:999px;border:1px solid rgba(255,255,255,.18);background:rgba(10,12,18,.74);color:#fff;font-size:12px;font-weight:800;box-shadow:0 12px 32px rgba(0,0,0,.24);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);pointer-events:auto}",
    "#shian-demo-return .demo-return-links{display:none;gap:6px;align-items:center}",
    "#shian-demo-return.open .demo-return-links,#shian-demo-return:focus-within .demo-return-links{display:flex}",
    "@media(max-width:640px){#shian-demo-return{left:auto;right:-12px;bottom:calc(10px + env(safe-area-inset-bottom));top:auto;transform:none;flex-direction:column-reverse;align-items:flex-end;gap:6px;max-width:calc(100vw - 20px);transition:right .18s ease}#shian-demo-return.open,#shian-demo-return:focus-within{right:10px}#shian-demo-return .demo-return-toggle{width:36px;min-width:36px;height:34px;min-height:34px;padding:0 10px 0 0;font-size:0;border-radius:999px 0 0 999px}#shian-demo-return.open .demo-return-toggle,#shian-demo-return:focus-within .demo-return-toggle{padding:0;border-radius:50%}#shian-demo-return .demo-return-toggle::before{content:'\\2190';font-size:16px;line-height:1}#shian-demo-return a{min-height:32px;padding:0 10px;font-size:11px;white-space:nowrap}#shian-demo-return .demo-return-links{flex-direction:column;align-items:flex-end}}",
  ].join("");
  document.head.appendChild(style);

  var wrap = document.createElement("div");
  wrap.id = "shian-demo-return";
  wrap.setAttribute("aria-label", "Demo navigation");
  wrap.innerHTML =
    '<button type="button" class="demo-return-toggle" aria-expanded="false" aria-controls="shian-demo-return-links">' +
    t.menu +
    "</button>" +
    '<div class="demo-return-links" id="shian-demo-return-links">' +
    '<a href="/case-studies" aria-label="' +
    t.portfolio +
    '">&larr; ' +
    t.portfolio +
    "</a>" +
    '<a href="/" aria-label="' +
    t.home +
    '">' +
    t.home +
    "</a>" +
    "</div>";

  var toggle = wrap.querySelector(".demo-return-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = !wrap.classList.contains("open");
      wrap.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (!open) toggle.blur();
    });
  }

  document.body.appendChild(wrap);
})();
