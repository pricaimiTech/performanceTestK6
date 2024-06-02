import { browser } from "k6/experimental/browser";
import { chromium } from "k6/experimental/browser";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import http from "k6/http";
import { check, sleep } from "k6";

const TARGET_URL = __ENV.TEST_TARGET || "https://test.k6.io";
const RAMP_TIME = __ENV.RAMP_TIME || "1s";
const RUN_TIME = __ENV.RUN_TIME || "2s";
const DOWN_TIME = __ENV.RAMP_TIME || "1s";
const USER_COUNT_RAMP = __ENV.USER_COUNT || 10;
const USER_COUNT_LOAD = __ENV.USER_COUNT || 20;
const USER_COUNT_DOWN = __ENV.USER_COUNT || 0;
const SLEEP = __ENV.SLEEP || 0.5;

export const options = {
  scenarios: {
    browser: {
      executor: "constant-vus",
      exec: "browserTest",
      vus: USER_COUNT_LOAD,
      duration: RUN_TIME,
      options: {
        browser: {
          type: "chromium",
        },
      },
    },
    news: {
      executor: "constant-vus",
      exec: "news",
      vus: USER_COUNT_LOAD,
      duration: RUN_TIME,
    },
  },
  thresholds: {
    browser_web_vital_lcp: ["p(90) < 1000"],
    "browser_web_vital_inp{url:https://test.k6.io/}": ["p(90) < 80"],
    "browser_web_vital_inp{url:https://test.k6.io/my_messages.php}": [
      "p(90) < 100",
    ],
  },
};

export async function browserTest() {
  const page = browser.newPage();

  try {
    await page.goto(`${TARGET_URL}/browser.php`);

    page.locator("#checkbox1").check();

    check(page, {
      "checkbox is checked":
        page.locator("#checkbox-info-display").textContent() ===
        "Thanks for checking the box",
    });
  } finally {
    page.close();
  }
}

export function news() {
  const res = http.get(`${TARGET_URL}/news.php`);

  check(res, {
    "status is 200": (r) => r.status === 200,
  });
}

export function handleSummary(data) {
  return {
    "report/html-report/e2e.html": htmlReport(data, { debug: false }),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
