/**
 * https://github.com/benc-uk/k6-reporter/blob/main/tests/grpc.js
 */
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import { browser } from 'k6/experimental/browser';

const TARGET_URL = __ENV.TEST_TARGET || 'https://test.k6.io'


export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
  thresholds: {
    checks: ['rate==1.0'],
  },
};

export default async function () {
  const page = browser.newPage();

  try {
    await page.goto(`${TARGET_URL}/my_messages.php`);

    // Enter login credentials
    page.locator('input[name="login"]').type('admin');
    page.locator('input[name="password"]').type('123');

    page.screenshot({ path: `results/screenshots/screenshot${Date.now()}.png` });
    
    const submitButton = page.locator('input[type="submit"]');

    await Promise.all([page.waitForNavigation(), submitButton.click()]);

    check(page, {
      header: (p) => p.locator('h2').textContent() == 'Welcome, admin!',
    });
  } finally {
    page.close();
  }
}

export function handleSummary(data) {
  return {
    'summary.html': htmlReport(data, { debug: false }),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  }
}