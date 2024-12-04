import * as fs from 'fs';
import * as path from 'path';

const input = fs.readFileSync(path.join(__dirname, '4.input')).toString();
const rows = input.split('\r\n').map(line => line.split(''));

let count = 0;

for (let y = 1; y < rows.length - 1; y++) {
  const row = rows[y];
  for (let x = 1; x < row.length - 1; x++) {
    const letter = row[x];
    if (letter == 'A') {
      const topLeft = rows[y - 1][x - 1];
      const topRight = rows[y - 1][x + 1];
      const bottomLeft = rows[y + 1][x - 1];
      const bottomRight = rows[y + 1][x + 1];

      const letters = [topLeft, topRight, bottomLeft, bottomRight];

      const ems = letters.filter(l => l == 'M').length;
      const esses = letters.filter(l => l == 'S').length;

      if (ems == 2 && esses == 2 && topLeft !== bottomRight && bottomLeft !== topRight) {
        count++;
      }
    }
  }
}

console.log(count);