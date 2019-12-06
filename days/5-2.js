const Puzzle5_1 = require("./5-1").puzzle;

class Puzzle5_2 extends Puzzle5_1 {

  constructor() {
    super();

    this.addOperation(5, {
      opCode: 5,
      description: 'jump-if-true',
      operands: ['a', 'b'],
      operation: () => { },
      move: (current, a, b) => a !== 0 ? b : current + 3
    });
    this.addOperation(6, {
      opCode: 6,
      description: 'jump-if-false',
      operands: ['a', 'b'],
      operation: () => { },
      move: (current, a, b) => a === 0 ? b : current + 3
    });

    this.addOperation(7, {
      opCode: 7,
      description: 'less-than',
      operands: ['a', 'b', 'mem'],
      operation: (a, b) => a < b ? 1 : 0,
      move: (current) => current + 4
    });

    this.addOperation(8, {
      opCode: 8,
      description: 'equals',
      operands: ['a', 'b', 'mem'],
      operation: (a, b) => a === b ? 1 : 0,
      move: (current) => current + 4
    });
  }

  input() {
    super.input();
    return this.getOptionAsInt(5);
  }

}


module.exports = { puzzle: Puzzle5_2 };