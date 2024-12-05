import * as fs from 'fs';
import * as path from 'path';

const input = fs.readFileSync(path.join(__dirname, '5.input')).toString().split('\n\n');

const rulesLines = input[0];
const updateLines = input[1];

const rules = rulesLines.split('\n').reduce((map, t) => {
  const [a, b] = t.split('|').map(Number);
  map.set(a, (map.get(a) || new Set()).add(b));
  return map;
}, new Map<number, Set<number>>());

const updates = updateLines.split('\n').map(line => line.split(',').map(Number));

const incorrectPages = updates.filter(update => !update.every((page, i) => update.length - 1 == i || rules.get(page)?.has(update[i + 1])));

const sumOfMiddleOfFixedPages = incorrectPages.map(page => page.sort((a, b) => {
  if (rules.get(a)?.has(b)) return -1;
  if (rules.get(b)?.has(a)) return 1;
  return 0;
})).map(update => update[Math.floor(update.length / 2)]).reduce((a, c) => a + c, 0);

console.log('Middle sum of fixed pages: %d', sumOfMiddleOfFixedPages);