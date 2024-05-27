/**
 * https://github.com/benc-uk/k6-reporter/blob/main/tests/grpc.js
 */
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import http from 'k6/http';
import { check, sleep } from 'k6';


// const RAMP_TIME = __ENV.RAMP_TIME || '1s'
// const RUN_TIME = __ENV.RUN_TIME || '2s'
// const USER_COUNT = __ENV.USER_COUNT || 20
// const SLEEP = __ENV.SLEEP || 0.5

export let options = {
    vus: 10,
    duration: '30s',
};

export default function () {
    let res = http.get('https://test-api.k6.io/public/crocodiles/');
    check(res, { 'status was 200': (r) => r.status == 200 });
    sleep(1);
}

export function handleSummary(data) {
    return {
      'summary.html': htmlReport(data, { debug: false }),
      stdout: textSummary(data, { indent: ' ', enableColors: true }),
    }
  }