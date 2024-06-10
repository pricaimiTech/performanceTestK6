/**
 * https://github.com/benc-uk/k6-reporter/blob/main/tests/grpc.js
 * Average-load test assess how your system performs under expected normal conditions.
 */
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import http from "k6/http";
import { check, sleep } from "k6";

const TARGET_URL =
  __ENV.TEST_TARGET || "https://test-api.k6.io/public/crocodiles/";
const RAMP_TIME = __ENV.RAMP_TIME || "1s";
const RUN_TIME = __ENV.RUN_TIME || "5s";
const DOWN_TIME = __ENV.DOWN_TIME || "1s";
const USER_COUNT_RAMP = __ENV.USER_COUNT_RAMP || 10;
const USER_COUNT_LOAD = __ENV.USER_COUNT_LOAD || 20;
const USER_COUNT_DOWN = __ENV.USER_COUNT_DOWN || 0;
const SLEEP = __ENV.SLEEP || 0.5;

export let options = {
  /**
   * To assess the login endpoint’s performance, your team may have defined service level objectives (SLOs). For example:
        99% of requests should be successful
        99% of requests should have a latency of 1000ms or less
    */
  thresholds: {
    http_req_failed: ["rate<0.01"], // http errors should be less than 1%
    http_req_duration: ["p(90) < 400", "p(95) < 800", "p(99.9) < 2000"], // 90% of requests must finish within 400ms, 95% within 800, and 99.9% within 2s.
  },
  // define scenarios
  scenarios: {
    // arbitrary name of scenario
    average_load: {
      executor: "ramping-vus",
      stages: [
        // ramp up to average load of 20 virtual users
        { duration: RAMP_TIME, target: USER_COUNT_RAMP },
        // maintain load
        { duration: RUN_TIME, target: USER_COUNT_LOAD },
        // ramp down to zero
        { duration: DOWN_TIME, target: USER_COUNT_DOWN },
      ],
    },
  },
};

export default function () {
  let res = http.get(TARGET_URL);
  check(res, { "status was 200": (r) => r.status == 200 });
  sleep(1);
}

export function handleSummary(data) {
  return {
    "results/html-report/averageLoad-scenario-test.html": htmlReport(data, {
      debug: false,
    }),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
