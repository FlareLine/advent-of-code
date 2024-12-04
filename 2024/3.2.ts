import * as fs from 'fs';
import * as path from 'path';

const input = fs.readFileSync(path.join(__dirname, '3.input')).toString().replace('\n', '');

const total = input
  // index by do() calls
  .split('do()')
  // map each do()/don't() block to its contents
  .map(dowhat => dowhat.split('don\'t()')[0])
  // find the mul() calls in each block
  .map(block => block.split('mul(')
  // map each call to its parameters
    .map(s => s.split(')')[0].split(','))
    // filter to calls with two number params
    .filter(params => params.length == 2 && params.every(Number))
    // map to numbers and filter to numbers
    .map(params => params.map(param => parseInt(param, 10)))
    // multiply each pair
    .map(params => params[0] * params[1])
    // sum all multiplications in block
    .reduce((block, mul) => block + mul, 0))
  // sum all blocks to get total
  .reduce((total, block) => total + block, 0)

// print total
console.log(JSON.stringify(total));

