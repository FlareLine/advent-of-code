import * as fs from 'fs';
import * as path from 'path';

const input = fs.readFileSync(path.join(__dirname, '2.input')).toString();
const reports = input.split('\n').map(r => r.split(' ').map(n => parseInt(n, 10)));

const safeReports = reports.map((report) => {
  const increasing = report[0] > report[1];

  for (let i = 0; i < report.length - 1; i++) {
    let levelDiff = report[i] - report[i + 1];
    if (levelDiff == 0) {
      return false;
    }
    if (increasing) {
        if (levelDiff < 1 || levelDiff > 3) {
        return false;
      }
    } else {
        if (levelDiff < -3 || levelDiff > -1) {
        return false;
      }
    }
  }

  return true;
}).filter(r => r).length;

console.log('Safe reports: %d', safeReports)