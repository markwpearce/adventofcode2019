const CSVNumberDay = require("./day").CSVNumberDay;
const vlog = require("../util/vlog");

class Puzzle2_1 extends CSVNumberDay {


  doOperation(instructions, opNumber) {
    const opIndex = opNumber * 4;
    if (instructions.length <= opIndex) {
      throw new Error(`Cannot do operation number ${opNumber} at ${opIndex} - not enough instructions`);
    }
    const operation = instructions[opIndex];

    switch (operation) {
      case 1: {
        vlog(`Operation ${opNumber} - adding`)
        this.runOperation(instructions, opIndex, (a, b) => a + b)
        break;
      }
      case 2: {
        vlog(`Operation ${opNumber} - multiplying`)
        this.runOperation(instructions, opIndex, (a, b) => a * b)
        break;
      }
      case 99: {
        vlog(`Operation ${opNumber} - end`)

        return true;
      }
      default: {
        throw new Error(`Unknown operation ${operation} at ${opIndex}`);
      }

    }
    return false;
  }

  assertSize(store, opIndex) {
    if (store.length <= (opIndex + 3)) {
      throw new Error(`Cannot do operation at ${opIndex}`);

    }
    const aIndex = store[opIndex + 1];
    const bIndex = store[opIndex + 2];
    const storeIndex = store[opIndex + 3];

    if (store.length <= aIndex) {
      throw new Error(`Cannot get first operand at ${aIndex}`);
    } if (store.length <= bIndex) {
      throw new Error(`Cannot get second operand at ${bIndex}`);
    } if (store.length <= storeIndex) {
      throw new Error(`Cannot store at ${storeIndex}`);
    }
  }

  runOperation(store, opIndex, operationFunc) {
    this.assertSize(store, opIndex);
    const aIndex = store[opIndex + 1];
    const bIndex = store[opIndex + 2];
    const storeIndex = store[opIndex + 3];
    const a = store[aIndex];
    const b = store[bIndex];
    vlog(`Running operation at ${opIndex} with ${a} and ${b}, storing to ${storeIndex}`)
    store[storeIndex] = operationFunc(a, b);
  }

  getArgs() {
    if (program && program.argument) {
      vlog(`Getting arguments from ${program.argument}`)
      return program.argument.split(',');
    }
    return false;
  }

  setArgsInCode(instructions) {
    const newInstructions = [...instructions];
    const args = this.getArgs();
    if (args) {
      newInstructions[1] = parseInt(args[0], 10);
      newInstructions[2] = parseInt(args[1], 10)
    }
    return newInstructions;
  }

  runProgram(instructions) {
    instructions = this.setArgsInCode(instructions);
    let halt = false;
    let opNum = 0;
    while (!halt) {
      halt = this.doOperation(instructions, opNum);
      opNum++;
    }
    return instructions[0];
  }

  run(lines) {
    return lines.map((instructions, line) => {
      vlog(`Instructions: ${instructions}`);
      const result = this.runProgram(instructions);
      vlog(`program ${line} result = ${result}`)
      return result;
    })
  }
}


module.exports = { puzzle: Puzzle2_1 };