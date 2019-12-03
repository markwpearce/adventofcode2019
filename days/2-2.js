const Puzzle2_1 = require("./2-1").puzzle;
const vlog = require("../util/vlog");

class Puzzle2_2 extends Puzzle2_1 {

  resetArgs() {
    this.noun = 0;
    this.verb = 0;
  }


  getArgs() {
    const args = [this.noun, this.verb];
    vlog(`Using args ${args}`);
    return args;
  }

  incArgs() {
    this.verb++;
    if (this.verb > 99) {
      this.noun++;
      this.verb = 0;
    }
    if (this.noun > 99) {
      throw new Error("Tried all input");
    }
  }

  run(lines) {
    const target = program && program.argument && parseInt(program.argument, 10);
    if (!target) {
      throw new Error("Provide target as argument to program");
    }
    vlog(`Searching for ${target}`);
    this.resetArgs();
    return lines.map((instructions, line) => {
      vlog(`Instructions: ${instructions}`);
      while (true) {
        const result = this.runProgram(instructions);
        vlog(`program ${line} result = ${result}`)
        if (result === target) {
          vlog(`Found at ${this.getArgs()}`)
          return 100 * this.noun + this.verb;
        }
        this.incArgs();
      }

    })
  }
}


module.exports = { puzzle: Puzzle2_2 };