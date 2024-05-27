/**
 * https://github.com/benc-uk/k6-reporter/blob/main/tests/grpc.js
 */
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import http from 'k6/http';
import { check, sleep } from 'k6';

const TARGET_URL = __ENV.TEST_TARGET || 'https://test-api.k6.io/public/crocodiles/'
const RAMP_TIME = __ENV.RAMP_TIME || '1s'
const RUN_TIME = __ENV.RUN_TIME || '2s'
const USER_COUNT = __ENV.USER_COUNT || 10
const SLEEP = __ENV.SLEEP || 0.5

export let options = {
    stages: [
        { duration: RAMP_TIME, target: USER_COUNT },
        { duration: RUN_TIME, target: USER_COUNT },
      ],
      /**
       * To assess the login endpoint’s performance, your team may have defined service level objectives (SLOs). For example:
            99% of requests should be successful
            99% of requests should have a latency of 1000ms or less
       */
      thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(99)<1000'] // 99% of requests should be below 1s
      },
};

export default function () {
    let res = http.get(TARGET_URL);
    check(res, { 'status was 200': (r) => r.status == 200 });
    sleep(1);
}

export function handleSummary(data) {
    return {
      'summary.html': htmlReport(data, { debug: false }),
      stdout: textSummary(data, { indent: ' ', enableColors: true }),
    }
  }