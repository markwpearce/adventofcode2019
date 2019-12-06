const Computer = require("../util/computer");

class Puzzle2_1 extends Computer {

  run(lines) {
    return lines.map((instructions, line) => {
      instructions = this.setArgsInCode(instructions, 1);
      vlog(`Instructions: ${instructions}`);
      const result = this.runProgram(instructions);
      vlog(`program ${line} result = ${result}`)
      return result;
    })
  }
}


module.exports = { puzzle: Puzzle2_1 };