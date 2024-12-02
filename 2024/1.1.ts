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

list1 = list1.sort();
list2 = list2.sort();

let total: number = 0;

list1.map((n, i) => {
  total += Math.abs(n - list2[i]);
});

console.log(total);