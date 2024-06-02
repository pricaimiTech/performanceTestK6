k6 run --out json=report/jsonOutput/load-test.json __test__/api-test/load-test.js
k6 run --out json=report/jsonOutput/performance-scenario-test.json __test__/api-test/performance-scenario-test.js
k6 run --out json=report/jsonOutput/performance-test.json __test__/api-test/performance-test.js
k6 run --out json=report/jsonOutput/load-api-browser-test.json __test__/e2e/load-api-browser-test.js 
k6 run --out json=report/jsonOutput/browser-testxK6.json __test__/web-test/browser-testxK6.js