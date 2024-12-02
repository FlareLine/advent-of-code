import * as fs from 'fs';
import * as path from 'path';

const delimiter = '   ';
const input = fs.readFileSync(path.join(__dirname, '1.input')).toString();

let list1: number[] = [];
let list2: number[] = [];

const lines = input.split('\n');

for (const line of lines) {
  const parts = line.split(delimiter);
  list1.push(parseInt(parts[0]));
  list2.push(parseInt(parts[1]));
}

let total: number = 0;
let map2 = list2.reduce((acc, n) => acc.set(n, (acc.get(n) || 0) + 1), new Map());

list1.map(n => {
  total += n * map2.get(n) || 0;
});

console.log(total);