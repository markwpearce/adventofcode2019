const NumberDay = require("./day").NumberDay;
const vlog = require("../util/vlog");

class Puzzle1_1 extends NumberDay {

  fuelRequired(mass) {
    const fuel = Math.floor(mass / 3) - 2;
    vlog('Fuel for', mass, '-', fuel);
    return Math.max(fuel, 0);
  }

  run(numbers) {
    return numbers.reduce((total, val) => { return total + this.fuelRequired(val); }, 0);
  }
}


module.exports = { puzzle: Puzzle1_1 };