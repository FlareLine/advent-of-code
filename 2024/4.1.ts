import * as fs from 'fs';
import * as path from 'path';

const input = fs.readFileSync(path.join(__dirname, '4.input')).toString();

const countMerryWords = (arr: string[]): number => {
  return arr.reduce((sum, row, rowI) => {
    let count = 0;
    let i = 0;
    let indexes: number[] = [];
    i = row.indexOf('XMAS', 0);
    while (i !== -1) {
      count++;
      indexes.push(i);
      i = row.indexOf('XMAS', i + 1);
    }
    i = row.indexOf('SAMX', 0);
    while (i !== -1) {
      count++;
      indexes.push(i);
      i = row.indexOf('SAMX', i + 1);
    }
    return sum + count;
  }, 0);
}

const transpose = (arr: string[][]): string[][] => arr[0].map((_, x) => arr.map(([...row]) => row[x]));

const diagonalizeNorthEast = (arr: string[][]): string[][] => {
  let diagonalRows: string[][] = [];
  for (let y = 0; y < arr.length; y++) {
    let newRow: string[] = [];
    let tempY = y;
    for (let x = 0; x <= y; x++) {
      newRow.push(arr[tempY][x]);
      tempY--;
    }
    diagonalRows.push(newRow);
  }
  for (let y = arr.length - 1; y >= 0; y--) {
    let newRow: string[] = [];
    let tempY = arr.length - 1;
    for (let x = arr.length - y; x < arr.length; x++) {
      newRow.push(arr[tempY][x]);
      tempY--;
    }
    diagonalRows.push(newRow);
  }

  return diagonalRows;
}

const diagonalizeSouthEast = (arr: string[][]): string[][] => {
  let diagonalRows: string[][] = [];
  for (let y = arr.length - 1; y >= 0; y--) {
    let newRow: string[] = [];
    let tempY = y;
    for (let x = 0; x <= arr.length - 1 - y; x++) {
      newRow.push(arr[tempY][x]);
      tempY++;
    }
    diagonalRows.push(newRow);
  }
  for (let y = 0; y < arr.length; y++) {
    let newRow: string[] = [];
    let tempY = 0;
    for (let x = y + 1; x < arr.length; x++) {
      newRow.push(arr[tempY][x]);
      tempY++;
    }
    diagonalRows.push(newRow);
  }
  return diagonalRows;
}

let xmasCount = 0;

const letters = input.split('\r\n').map(line => line.split(''));

const transposedLetters = transpose(letters);

const normalRows = letters.map(l => l.join(''));
const transposedRows = transposedLetters.map(l => l.join(''));
const northEastRows = diagonalizeNorthEast(letters).map(l => l.join(''));
const southEastRows = diagonalizeSouthEast(letters).map(l => l.join(''));

fs.writeFileSync('out.txt', southEastRows.join('\n'));

xmasCount = countMerryWords(normalRows) + countMerryWords(transposedRows) + countMerryWords(northEastRows) + countMerryWords(southEastRows);
console.log(countMerryWords(normalRows));
console.log(countMerryWords(transposedRows));
console.log(countMerryWords(northEastRows));
console.log(countMerryWords(southEastRows));
console.log(xmasCount);
