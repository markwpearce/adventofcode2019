const Computer = require("../util/computer");
const vlog = require("../util/vlog");

class Puzzle5_1 extends Computer {

  constructor() {
    super();
    this.outputs = [];
  }


  input() {
    super.input();
    return this.getOptionAsInt(1);
  }

  output(val) {
    super.output(val);
    this.outputs.push(val)
  }


  run(lines) {
    return lines.map((instructions, line) => {
      this.outputs = [];
      vlog(`Instructions: ${instructions}`);
      this.runProgram(instructions);
      vlog(`program ${line} result = ${this.outputs}`)
      return this.outputs;
    })
  }

}


module.exports = { puzzle: Puzzle5_1 };