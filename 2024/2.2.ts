import * as fs from 'fs';
import * as path from 'path';

const input = fs.readFileSync(path.join(__dirname, '2.input')).toString();
const reports = input.split('\n').map(r => r.split(' ').map(n => parseInt(n, 10)));

const isReportSafe = (report: number[]): [boolean, number | null] => {
  let increasing = report[0] > report[1];

  for (let i = 0; i < report.length - 1; i++) {
    let levelDiff = report[i] - report[i + 1];
    if (increasing) {
      if (levelDiff < 1 || levelDiff > 3) {
        return [false, i];
      }
    } else {
      if (levelDiff < -3 || levelDiff > -1) {
        return [false, i];
      }
    }
  }

  return [true, null];
}

const safeReports = reports.map((report) => {
  const [isSafe, firstIndex] = isReportSafe(report);

  if (!isSafe && firstIndex != null) {
    const removeFirst = report.filter((n, i) => i != 0);
    const removeFirstOfPair = report.filter((n, i) => i != firstIndex);
    const removeSecondOfPair = report.filter((n, i) => i != (firstIndex + 1));
    // console.log('Original report: %s - testing %s, %s and %s', report.toString(), removeFirst, removeFirstOfPair, removeSecondOfPair);

    const [removeFirstReportSafe, failedRemoveFirstIndex] = isReportSafe(removeFirst);
    const [removeFirstOfPairReportSafe, failedRemoveFirstOfPairIndex] = isReportSafe(removeFirstOfPair);
    const [removeSecondOfPairReportSafe, failedRemoveSecondOfPairIndex] = isReportSafe(removeSecondOfPair);

    const safeWithRemoval = removeFirstReportSafe || removeFirstOfPairReportSafe || removeSecondOfPairReportSafe;

    if (safeWithRemoval) {
      return true;
    } else {
      return false;
    }
  }

  // console.log('Report %s safe without removal', report.toString());

  return true;
}).filter(r => r).length;

console.log('Safe reports: %d', safeReports)