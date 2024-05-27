import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 20 },
        { duration: '2m', target: 20 },
        { duration: '1m', target: 0 },
    ],
};

export default function () {
    let res = http.get('https://www.example.com');
    check(res, { 'status was 200': (r) => r.status == 200 });
    sleep(1);
}
