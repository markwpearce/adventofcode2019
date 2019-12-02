const Puzzle1_1 = require("./1-1").puzzle;
const vlog = require("../util/vlog");

class Puzzle1_2 extends Puzzle1_1 {

  totalFuelForModule(moduleMass) {
    const fuelForModule = this.fuelRequired(moduleMass);
    const fuelForFuel = [];
    let fuelForLastFuel = this.fuelRequired(fuelForModule);
    while (fuelForLastFuel > 0) {
      fuelForFuel.push(fuelForLastFuel);
      fuelForLastFuel = this.fuelRequired(fuelForLastFuel);
    };
    const totalFuelForModule = fuelForModule + fuelForFuel.reduce((total, current) => total + current, 0);
    vlog('Fuel for module', moduleMass, '-', totalFuelForModule);
    return totalFuelForModule;
  }

  run(numbers) {
    const totalFuelAllModules = numbers.reduce((total, moduleMass) => {
      return total + this.totalFuelForModule(moduleMass);
    }, 0);

    return totalFuelAllModules;
  }
}

module.exports = { puzzle: Puzzle1_2 };