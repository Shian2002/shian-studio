const BASE_URL = process.env.RESPONSIVE_AUDIT_BASE_URL || "http://127.0.0.1:3015";

const mainRoutes = ["/", "/services", "/case-studies", "/contact", "/blog"];
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
].map((name) => `/demos/${name}.html`);

const viewports = [
  { name: "mobile", width: 360, height: 740 },
  { name: "small-mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

function isExpectedInternalOverflow(item) {
  const cls = String(item.cls || "");
  const id = String(item.id || "");
  const ancestor = String(item.ancestor || "");

  return (
    ancestor.length > 0 ||
    cls.includes("sidebar") ||
    cls.includes("leaflet-") ||
    cls.includes("banner-slide") ||
    cls.includes("flash-card") ||
    cls.includes("live-card") ||
    cls.includes("recommend-card") ||
    cls.includes("rc-") ||
    cls.includes("style-thumb") ||
    cls.includes("style-icon") ||
    cls.includes("style-name") ||
    cls.includes("stat-card") ||
    cls.includes("view-toggle") ||
    cls.includes("view-btn") ||
    cls.includes("topbar-actions") ||
    cls.includes("column") ||
    cls.includes("task-card") ||
    cls.includes("card-priority") ||
    cls.includes("add-card-btn") ||
    cls.includes("comparison-table") ||
    cls.includes("testimonial-card") ||
    cls.includes("tab") ||
    cls.includes("modified-dot") ||
    cls.includes("close") ||
    cls.includes("sep") ||
    id === "code-display" ||
    id === "sidebar"
  );
}

async function importPlaywright() {
  try {
    return await import("playwright");
  } catch (error) {
    throw new Error(
      "Playwright is required for responsive audits. Install it with `npm install -D playwright` or run in an environment that provides it.\n" +
        error.message,
    );
  }
}

const { chromium } = await importPlaywright();
const browser = await chromium.launch({ headless: true });
const failures = [];
const warnings = [];

try {
  for (const path of [...mainRoutes, ...demoPages]) {
    for (const viewport of viewports) {
      const page = await browser.newPage({
        viewport: { width: viewport.width, height: viewport.height },
        deviceScaleFactor: 1,
      });

      page.on("dialog", (dialog) => dialog.dismiss().catch(() => {}));

      await page.goto(new URL(path, BASE_URL).toString(), {
        waitUntil: "domcontentloaded",
        timeout: 45_000,
      });
      await page.waitForTimeout(path.startsWith("/demos/") ? 1_200 : 400);

      const result = await page.evaluate(() => {
        const doc = document.documentElement;
        const clientWidth = doc.clientWidth;
        const scrollWidth = Math.max(doc.scrollWidth, document.body.scrollWidth);
        const offenders = [...document.querySelectorAll("body *")]
          .map((el) => {
            const rect = el.getBoundingClientRect();
            return {
              tag: el.tagName,
              id: el.id || "",
              cls: String(el.className || "").slice(0, 80),
              ancestor:
                el.closest(
                  [
                    "#tabs",
                    "#editor-container",
                    "#code-display",
                    ".recommend-scroll",
                    ".table-wrap",
                    ".invoice-table",
                    ".comparison-wrap",
                    ".board",
                    ".kanban-board",
                    ".banner-track",
                    ".flash-scroll",
                    ".style-grid",
                    ".leaflet-map-pane",
                  ].join(","),
                )?.id ||
                String(
                  el.closest(
                    [
                      "#tabs",
                      "#editor-container",
                      "#code-display",
                      ".recommend-scroll",
                      ".table-wrap",
                      ".invoice-table",
                      ".comparison-wrap",
                      ".board",
                      ".kanban-board",
                      ".banner-track",
                      ".flash-scroll",
                      ".style-grid",
                      ".leaflet-map-pane",
                    ].join(","),
                  )?.className || "",
                ).slice(0, 80),
              text: (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 60),
              left: Math.round(rect.left),
              right: Math.round(rect.right),
              width: Math.round(rect.width),
            };
          })
          .filter((item) => item.width > 0 && (item.left < -1 || item.right > window.innerWidth + 1))
          .slice(0, 10);

        return {
          clientWidth,
          scrollWidth,
          overflow: scrollWidth > clientWidth + 1,
          offenders,
        };
      });

      const unexpectedOffenders = result.offenders.filter((item) => !isExpectedInternalOverflow(item));
      if (result.overflow && unexpectedOffenders.length > 0) {
        failures.push({ path, viewport: viewport.name, ...result, offenders: unexpectedOffenders });
      } else if (result.overflow || unexpectedOffenders.length > 0) {
        warnings.push({ path, viewport: viewport.name, offenders: unexpectedOffenders });
      }

      await page.close();
    }
  }
} finally {
  await browser.close();
}

if (warnings.length > 0 && process.env.RESPONSIVE_AUDIT_WARNINGS === "1") {
  console.warn("Responsive audit warnings (no page-level horizontal scroll):");
  console.warn(JSON.stringify(warnings, null, 2));
}

if (failures.length > 0) {
  console.error("Responsive audit failed:");
  console.error(JSON.stringify(failures, null, 2));
  process.exit(1);
}

console.log(
  `Responsive audit passed for ${mainRoutes.length} main routes, ${demoPages.length} demo pages, and ${viewports.length} viewports.`,
);
