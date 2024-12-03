import * as fs from 'fs';
import * as path from 'path';

const input = fs.readFileSync(path.join(__dirname, '3.input')).toString().replace('\n','');

const total = input
  // index by mul() calls
  .split('mul(')
  // map each call to its parameters
  .map(s => s.split(')')[0].split(','))
  // filter to calls with two number params
  .filter(params => params.length == 2 && params.every(Number))
  // map to numbers and filter to numbers
  .map(params => params.map(param => parseInt(param, 10)))
  // multiply each pair
  .map(params => params[0] * params[1])
  // // sum all multiplications
  .reduce((acc, c) => acc + c, 0);
  
// print total
console.log(JSON.stringify(total));

