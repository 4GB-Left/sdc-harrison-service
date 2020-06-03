import http from 'k6/http';
import { sleep } from 'k6';
import { Rate } from 'k6/metrics';

const status200 = new Rate('Failed Requests (< 2%)');
const fastRequests = new Rate('Requests under 500ms');
const slowRequests = new Rate('Slow Requests (< 30%)');
const tooSlowRequests = new Rate('Unreasonably Slow Requests (< 5%)');

export let options = {
  discardResponseBodies: true,
  stages: [
    {duration: '30s', target: 10},
    {duration: '30s', target: 50},
    {duration: '30s', target: 100}, //1min
    {duration: '30s', target: 150}, //1min30s
    {duration: '30s', target: 200}, //2min
    {duration: '30s', target: 250}, //2min30s
    {duration: '30s', target: 300}, //3min
    {duration: '30s', target: 350}, //3min30s
    {duration: '30s', target: 400}, //4min -- expected degredation begin
    {duration: '30s', target: 450}, //4min30s
    {duration: '30s', target: 500}, //5min
    {duration: '30s', target: 550}, //5min30s
    {duration: '30s', target: 600}, //6min -- avg time exceeds 250ms
    {duration: '30s', target: 650}, //6min30s
    {duration: '30s', target: 700}, //7min -- avg time exceeds 500ms
    {duration: '30s', target: 750}, //7min30s
    {duration: '30s', target: 800}, //8min
    {duration: '30s', target: 850}, //8min30s
    {duration: '30s', target: 900}, //9min
    {duration: '30s', target: 950}, //9min30s
    {duration: '1m', target: 1000}, //10min
  ],
  thresholds: {
    'Failed Requests (not status 200)': ['rate<0.02'],
    'Slow Requests (duration > 1000ms)': ['rate < 0.3'],
    'Unreasonably Slow Requests (duration > 2000ms)': ['rate < 0.05']
  }
};

export default function() {
  let randomNumber = Math.floor(Math.random()* 5000099)

  let res = http.get(`http://localhost/api/product/${randomNumber}`);

  status200.add(res.status !== 200);
  fastRequests.add(res.timings.duration < 500);
  slowRequests.add(res.timings.duration > 1000 && res.timings.duration < 2000);
  tooSlowRequests.add(res.timings.duration > 2000);

  sleep(1);
}




    // {duration: '15s', target: 10},
    // {duration: '15s', target: 100},
    // {duration: '30s', target: 200},
    // {duration: '1m', target: 300}, // time under 2k ms
    // // {duration: '1m', target: 325}, //99%
    // {duration: '2m', target: 350},
    // {duration: '1m', target: 375}, //98%
    // {duration: '2m', target: 400}, //96% | 99% err (2records)
    // {duration: '2m', target: 450},
    // // {duration: '2m', target: 500}, //
    // {duration: '2m', target: 500}, //