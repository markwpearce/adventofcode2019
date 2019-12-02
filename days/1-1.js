const NumberDay = require("./day").NumberDay;


class Puzzle1_1 extends NumberDay {
  run(numbers) {
    return numbers.reduce((total, val) => { return total + val; }, 0);
  }
}


module.exports = { puzzle: Puzzle1_1 };