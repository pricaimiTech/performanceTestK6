/**
 * https://github.com/benc-uk/k6-reporter/blob/main/tests/grpc.js
 */
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import http from 'k6/http';
import { check, sleep } from 'k6';


export let options = {
    stages: [
        { duration: '3s', target: 20 }
    ],
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(90) < 400', 'p(95) < 800', 'p(99.9) < 2000'] // 90% of requests must finish within 400ms, 95% within 800, and 99.9% within 2s.
    },
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