const BASE_URL = process.env.DEMO_INTERACTION_BASE_URL || "http://127.0.0.1:3015";

const demoPages = [
  "admin-panel",
  "ai-chatbot",
  "ai-image-gen",
  "cross-platform",
  "education-platform",
  "iot-dashboard",
  "landing-page",
  "miniprogram",
  "project-management",
  "real-estate",
  "saas-dashboard",
  "speed-coding",
];

async function importPlaywright() {
  try {
    return await import("playwright");
  } catch (error) {
    throw new Error(
      "Playwright is required for demo interaction audits. Install it with `npm install -D playwright`.\n" +
        error.message,
    );
  }
}

async function layout(page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    const scrollWidth = Math.max(doc.scrollWidth, document.body.scrollWidth);
    return {
      clientWidth: doc.clientWidth,
      scrollWidth,
      overflow: scrollWidth > doc.clientWidth + 1,
    };
  });
}

async function settle(page, delay = 300) {
  await page.waitForTimeout(delay);
  await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
}

async function clickSelector(page, selector, label, options = {}) {
  const locator = page.locator(selector).first();
  await locator.waitFor({ state: "visible", timeout: options.timeout || 3_000 });
  if (options.scroll !== false) {
    await locator.scrollIntoViewIfNeeded({ timeout: options.timeout || 3_000 });
  }
  await locator.click({ timeout: options.timeout || 3_000 });
  await settle(page, options.delay || 300);
  return { label, layout: await layout(page) };
}

async function fillSelector(page, selector, value, label, options = {}) {
  const locator = page.locator(selector).first();
  await locator.waitFor({ state: "visible", timeout: options.timeout || 3_000 });
  await locator.fill(value, { timeout: options.timeout || 3_000 });
  await settle(page, options.delay || 250);
  return { label, layout: await layout(page) };
}

async function assertReturnControl(page) {
  await clickSelector(page, "#shian-demo-return .demo-return-toggle", "return:open");
  const openState = await page.evaluate(() => {
    const wrap = document.querySelector("#shian-demo-return");
    return {
      open: wrap?.classList.contains("open") || false,
      visibleLinks: [...document.querySelectorAll("#shian-demo-return a")].filter(
        (link) => link.offsetWidth || link.offsetHeight,
      ).length,
    };
  });

  await clickSelector(page, "#shian-demo-return .demo-return-toggle", "return:close");
  const closedState = await page.evaluate(() => {
    const wrap = document.querySelector("#shian-demo-return");
    return {
      open: wrap?.classList.contains("open") || false,
      visibleLinks: [...document.querySelectorAll("#shian-demo-return a")].filter(
        (link) => link.offsetWidth || link.offsetHeight,
      ).length,
    };
  });

  if (!openState.open || openState.visibleLinks < 2 || closedState.open || closedState.visibleLinks !== 0) {
    throw new Error(`Return control state invalid: ${JSON.stringify({ openState, closedState })}`);
  }

  return { label: "return-control", layout: await layout(page), openState, closedState };
}

async function runHomeMobileFlow(browser) {
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
  });
  const consoleErrors = [];
  const pageErrors = [];
  const actions = [];

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  try {
    await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 45_000 });
    await settle(page, 800);
    actions.push({ label: "home:initial", layout: await layout(page) });

    await page.getByRole("link", { name: /view portfolio|查看作品集/i }).first().click({ timeout: 5_000 });
    await page.waitForURL(/\/case-studies/, { waitUntil: "domcontentloaded", timeout: 8_000 });
    await settle(page);
    actions.push({ label: "home:view-portfolio", layout: await layout(page) });

    await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 45_000 });
    await page.getByRole("link", { name: /send project inquiry|提交项目咨询/i }).first().click({ timeout: 5_000 });
    await page.waitForURL(/\/contact/, { waitUntil: "domcontentloaded", timeout: 8_000 });
    await settle(page);
    actions.push({ label: "home:hero-inquiry", layout: await layout(page) });

    await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 45_000 });
    await page.getByRole("button", { name: /menu/i }).click({ timeout: 5_000 });
    await settle(page);
    actions.push({ label: "home:mobile-menu-open", layout: await layout(page) });
    await page.getByRole("link", { name: /contact|联系/i }).last().click({ timeout: 5_000 });
    await page.waitForURL(/\/contact/, { waitUntil: "domcontentloaded", timeout: 8_000 });
    await settle(page);
    actions.push({ label: "home:mobile-menu-contact", layout: await layout(page) });

    await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 45_000 });
    const demoLink = page.locator('a[href^="/demos/"], a[href*="/demos/"]').first();
    await demoLink.scrollIntoViewIfNeeded({ timeout: 5_000 });
    await demoLink.click({ timeout: 5_000 });
    await page.waitForURL(/\/demos\/.+(?:\.html)?/, { waitUntil: "domcontentloaded", timeout: 8_000 });
    await settle(page, 800);
    actions.push({ label: "home:first-demo-link", layout: await layout(page) });

    const result = {
      demoName: "home-mobile",
      actions,
      finalLayout: await layout(page),
      consoleErrors,
      pageErrors,
    };
    assertNoInteractionProblems(result);
    return result;
  } finally {
    await page.close();
  }
}

async function smokeClickVisibleControls(page, count = 5) {
  const actions = [];
  const clicked = new Set();

  for (let step = 0; step < count; step++) {
    const candidate = await page.evaluate((clickedKeys) => {
      const clicked = new Set(clickedKeys);
      const selectors = [
        "button:not(.demo-return-toggle)",
        '[role="button"]',
        ".nav-item",
        ".tab",
        ".tab-btn",
        ".nav-tab",
        ".cat-tab",
        ".filter-btn",
        ".course-card",
        ".property-card",
        ".quick-action",
      ];

      for (const el of document.querySelectorAll(selectors.join(","))) {
        if (el.closest("#shian-demo-return")) continue;
        const rect = el.getBoundingClientRect();
        const style = getComputedStyle(el);
        if (
          rect.width < 18 ||
          rect.height < 14 ||
          rect.top < 0 ||
          rect.left < 0 ||
          rect.bottom > innerHeight ||
          rect.right > innerWidth ||
          style.display === "none" ||
          style.visibility === "hidden" ||
          style.pointerEvents === "none"
        ) {
          continue;
        }

        const top = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
        if (!(top === el || el.contains(top) || top?.contains(el))) continue;

        const text = (el.innerText || el.getAttribute("aria-label") || el.title || el.id || el.className || el.tagName)
          .trim()
          .replace(/\s+/g, " ")
          .slice(0, 70);
        const key = `${text}:${Math.round(rect.left)},${Math.round(rect.top)}`;
        if (clicked.has(key)) continue;

        el.setAttribute("data-interaction-audit-click", "1");
        return { key, text };
      }

      return null;
    }, [...clicked]);

    if (!candidate) break;

    clicked.add(candidate.key);
    await page.click('[data-interaction-audit-click="1"]', { timeout: 3_000 });
    await page.evaluate(() => {
      document.querySelectorAll("[data-interaction-audit-click]").forEach((el) => {
        el.removeAttribute("data-interaction-audit-click");
      });
    });
    await settle(page, 250);
    actions.push({ label: `smoke:${candidate.text}`, layout: await layout(page) });
  }

  return actions;
}

async function runTargetedFlow(page, demoName) {
  const actions = [];

  if (demoName === "admin-panel") {
    actions.push(await clickSelector(page, "#sidebarToggle", "admin:sidebar"));
    actions.push(await clickSelector(page, '.nav-item[data-page="Products"]', "admin:products"));
    actions.push(await fillSelector(page, "#productSearchInput", "bag", "admin:product-search"));
    actions.push(await clickSelector(page, "#addProductBtn", "admin:add-product"));
    actions.push(await clickSelector(page, "#productModalSave", "admin:invalid-save"));
    actions.push(await clickSelector(page, "#productModalClose", "admin:close-product-modal"));
    actions.push(await clickSelector(page, "#sidebarToggle", "admin:sidebar-reopen"));
    actions.push(await clickSelector(page, '.nav-item[data-page="Orders"]', "admin:orders"));
    actions.push(await clickSelector(page, "#sidebarToggle", "admin:sidebar-reopen-settings"));
    actions.push(await clickSelector(page, '.nav-item[data-page="Settings"]', "admin:settings"));
    actions.push(await clickSelector(page, "#saveSettings", "admin:save-settings"));
  }

  if (demoName === "miniprogram") {
    await page.click("#couponClose", { timeout: 3_000 }).catch(() => {});
    actions.push({ label: "miniprogram:close-coupon", layout: await layout(page) });
    const product = page.locator(".rec-card").first();
    await product.scrollIntoViewIfNeeded({ timeout: 3_000 });
    await product.click({ timeout: 3_000 });
    await settle(page);
    actions.push({ label: "miniprogram:open-product", layout: await layout(page) });
    actions.push(await clickSelector(page, "#addCartBtn", "miniprogram:add-cart-login-gate"));
    actions.push(await clickSelector(page, "#loginSubmit", "miniprogram:login"));
    actions.push(await clickSelector(page, "#addCartBtn", "miniprogram:add-cart"));
    actions.push(await clickSelector(page, "#detailBack", "miniprogram:back-detail"));
    actions.push(await clickSelector(page, '.tab-item[data-tab="cart"]', "miniprogram:cart"));
    actions.push(await clickSelector(page, '.qty-btn[data-act="plus"]', "miniprogram:quantity-plus"));
    actions.push(await clickSelector(page, '.tab-item[data-tab="home"]', "miniprogram:home"));
    actions.push(await clickSelector(page, "#chatFab", "miniprogram:chat-open"));
    actions.push(await fillSelector(page, "#chatInput", "hello", "miniprogram:chat-input"));
    actions.push(await clickSelector(page, "#chatSendBtn", "miniprogram:chat-send"));
  }

  if (demoName === "saas-dashboard") {
    actions.push(await clickSelector(page, "#loginBtn", "saas:login"));
    actions.push(await clickSelector(page, "#refreshDashBtn", "saas:refresh"));
    await page.waitForFunction(() => !document.querySelector("#spinnerOverlay")?.classList.contains("show"), {
      timeout: 5_000,
    });
    actions.push(await clickSelector(page, "#menuBtn", "saas:mobile-menu"));
    actions.push(await clickSelector(page, '.nav-item[data-section="Revenue"]', "saas:revenue"));
    actions.push(await clickSelector(page, "#menuBtn", "saas:mobile-menu-subscriptions"));
    actions.push(await clickSelector(page, '.nav-item[data-section="Subscriptions"]', "saas:subscriptions"));
    actions.push(await clickSelector(page, "#addPlanBtn", "saas:add-plan-modal"));
    actions.push(await clickSelector(page, "#modalClose", "saas:close-modal"));
    actions.push(await clickSelector(page, "#avatarBtn", "saas:avatar-menu"));
    actions.push(await clickSelector(page, '[data-action="settings"]', "saas:settings"));
    actions.push(await clickSelector(page, "#saveProfileBtn", "saas:save-profile"));
  }

  if (demoName === "speed-coding") {
    actions.push(await clickSelector(page, '.activity-icon[data-sidebar="search"]', "ide:search-panel"));
    actions.push(await fillSelector(page, "#sidebarSearchInput", "App", "ide:search-input"));
    actions.push(await clickSelector(page, '.activity-icon[data-sidebar="explorer"]', "ide:explorer"));
    actions.push(await clickSelector(page, "#newFileBtn", "ide:new-file"));
    await page.fill("#terminalInput", "help", { timeout: 3_000 });
    await page.press("#terminalInput", "Enter", { timeout: 3_000 });
    await settle(page);
    actions.push({ label: "ide:terminal-help", layout: await layout(page) });
    actions.push(await fillSelector(page, "#aiInput", "explain this", "ide:ai-input"));
    actions.push(await clickSelector(page, "#aiSendBtn", "ide:ai-send"));
    actions.push(await clickSelector(page, '.right-tab[data-panel="browser"]', "ide:preview-panel"));
    actions.push(await clickSelector(page, '.right-tab[data-panel="git"]', "ide:git-panel"));
  }

  return actions;
}

function assertNoInteractionProblems(result) {
  const overflowAction = result.actions.find((action) => action.layout?.overflow);
  if (overflowAction) {
    throw new Error(`${result.demoName} overflow after ${overflowAction.label}: ${JSON.stringify(overflowAction.layout)}`);
  }
  if (result.consoleErrors.length > 0 || result.pageErrors.length > 0) {
    throw new Error(
      `${result.demoName} runtime errors: ${JSON.stringify({
        consoleErrors: result.consoleErrors,
        pageErrors: result.pageErrors,
      })}`,
    );
  }
}

const { chromium } = await importPlaywright();
const browser = await chromium.launch({ headless: true });
const results = [];
const failures = [];

try {
  try {
    results.push(await runHomeMobileFlow(browser));
  } catch (error) {
    failures.push({
      demoName: "home-mobile",
      message: error.message,
      actions: [],
      consoleErrors: [],
      pageErrors: [],
      layout: null,
    });
  }

  for (const demoName of demoPages) {
    const page = await browser.newPage({
      viewport: { width: 360, height: 740 },
      deviceScaleFactor: 1,
      isMobile: true,
    });
    const consoleErrors = [];
    const pageErrors = [];

    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));
    page.on("dialog", (dialog) => dialog.accept().catch(() => {}));
    await page.addInitScript(() => {
      localStorage.setItem(
        "artifai_v4",
        JSON.stringify({
          user: { name: "Interaction Test", email: "test@example.com" },
          credits: 100,
          plan: "free",
          selectedDim: 0,
          selectedModel: "sdxl",
          selectedStyle: "none",
          history: [],
          favorites: [],
          presets: [],
          apiKeys: [],
          apiUsage: { calls: 0, images: 0, credits: 0 },
          creditDailyReset: new Date().toDateString(),
        }),
      );
    });

    const actions = [];
    try {
      await page.goto(new URL(`/demos/${demoName}.html`, BASE_URL).toString(), {
        waitUntil: "networkidle",
        timeout: 45_000,
      });
      await settle(page, 800);

      actions.push(await assertReturnControl(page));
      actions.push(...(await runTargetedFlow(page, demoName)));
      actions.push(...(await smokeClickVisibleControls(page, 5)));

      const result = {
        demoName,
        actions,
        finalLayout: await layout(page),
        consoleErrors,
        pageErrors,
      };
      assertNoInteractionProblems(result);
      results.push(result);
    } catch (error) {
      failures.push({
        demoName,
        message: error.message,
        actions,
        consoleErrors,
        pageErrors,
        layout: await layout(page).catch(() => null),
      });
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
}

if (failures.length > 0) {
  console.error("Demo interaction audit failed:");
  console.error(JSON.stringify(failures, null, 2));
  process.exit(1);
}

console.log(
  `Demo interaction audit passed for home mobile flow and ${demoPages.length} demo pages (${results.reduce(
    (total, result) => total + result.actions.length,
    0,
  )} interactions).`,
);
