const CSVNumberDay = require("../days/day").CSVNumberDay;
const vlog = require("../util/vlog");

class Computer extends CSVNumberDay {


  constructor() {
    super();

    this.operationsMap = {};

    this.addOperation(1, {
      opCode: 1,
      operands: ['a', 'b', 'mem'],
      description: 'add',
      operation: (a, b) => a + b,
      move: (current) => current + 4,
    });

    this.addOperation(2, {
      opCode: 2,
      operands: ['a', 'b', 'mem'],
      description: 'multiply',
      operation: (a, b) => a * b,
      move: (current) => current + 4,
    });

    this.addOperation(3, {
      opCode: 3,
      operands: ['mem'],
      description: 'input',
      operation: () => this.input(),
      move: (current) => current + 2,
    });
    this.addOperation(4, {
      opCode: 4,
      operands: ['a'],
      description: 'output',
      operation: (a) => this.output(a),
      move: (current) => current + 2,
    });

    this.addOperation(99, {
      opCode: 99,
      operands: [],
      description: 'End',
      end: true
    });
  }

  input() {
    vlog('Input')
    return -1;
  }


  /**
   * performs output
   *
   * @param {*} val
   * @returns
   * @memberof Computer
   */
  output(val) {
    vlog('Output', val)
  }

  /**
   * Adds an operation to the possible operations of this computer
   *
   * @param {number} opCode
   * @param { {opCode:number, operands:string[], description?:string, operation: function, end?:boolean, move?:function}} operation
   * @memberof Computer
   */
  addOperation(opCode, operation) {
    this.operationsMap[opCode] = operation;
  }


  /**
   * Does the operation at the given index
   *
   * @param {number[]} instructions
   * @param {number} opNumber
   * @returns true if done, otherwise new operation index for next operation
   * @memberof Computer
   */
  doOperation(instructions, opIndex) {
    if (instructions.length <= opIndex) {
      throw new Error(`Cannot do operation at ${opIndex} - not enough instructions`);
    }
    const instruction = instructions[opIndex];
    const opCode = instruction % 100;
    vlog(`Operation ${opCode} at ${opIndex}`);

    if (this.operationsMap[opCode]) {
      return this.runOperation(instructions, opIndex, this.operationsMap[opCode]);
    }
    throw new Error(`Unknown operation ${opCode} at ${opIndex}`);
  }

  assertSize(memory, opIndex, aIndex, bIndex, memIndex, operationCount) {
    if (memory.length <= (opIndex + operationCount)) {
      throw new Error(`Cannot do operation at ${opIndex}`);

    }
    if (aIndex != null && memory.length <= aIndex) {
      throw new Error(`Cannot get first operand at ${aIndex}`);
    } if (bIndex != null && memory.length <= bIndex) {
      throw new Error(`Cannot get second operand at ${bIndex}`);
    } if (memIndex != null && memory.length <= memIndex) {
      throw new Error(`Cannot store at ${memIndex}`);
    }
  }

  /**
   * opParamMode === 0 -- position mode: parameter refers to position of operand
   * opParamMode === 1 -- intermediate mode: parameter refers to value of operand
   *
   * @param {number} opIndex
   * @param {number[]} opParamModes
   * @memberof Computer
   */
  assertOpParams(opIndex, opParamModes) {
    const allValidParamModes = opParamModes.filter(p => p === 1 || p === 0).length === opParamModes.length;
    if (!allValidParamModes) {
      throw new Error(`Invalid operation param modes at ${opIndex}`, opParamModes);
    }
  }

  /**
   *
   *
   * @param {string} type // "a", "b" or "mem"
   * @param {number[]} opParamMode
   * @param {{opCode:number, operands:string[], description?:string, operation: function, end?:boolean, move?:function}} operation
   * @param {number[]} memory
   * @param {number} opIndex

  * @memberof Computer
   */
  getIndex(type, opParamModes, operation, memory, opIndex) {
    const opPlace = operation.operands.findIndex(x => x === type);
    let index = null

    if (opPlace !== -1) {
      index = opParamModes[opPlace] === 0 ? memory[opIndex + opPlace + 1] : opIndex + opPlace + 1;
    }
    vlog('Getting index of', type, 'from', opParamModes, operation.operands, `gives`, index);
    return index;
  }

  /**
   *
   *
   * @param {number[]} memory
   * @param {number} opIndex
   * @param {{opCode:number, operands:string[], description?:string, operation: function, end?:boolean}} operation
   * @returns true if program should halt, new pointer location to see next operation
   * @memberof Computer
   */
  runOperation(memory, opIndex, operation) {
    const instruction = memory[opIndex];

    const opParamModes = [0, 0, 0]
    opParamModes[0] = Math.floor(instruction / 100) % 10;
    opParamModes[1] = Math.floor(instruction / 1000) % 10;
    opParamModes[2] = Math.floor(instruction / 10000) % 10;
    this.assertOpParams(opIndex, opParamModes);

    // If param mode is "intermediate", no need to look up another value in the store
    const aIndex = this.getIndex("a", opParamModes, operation, memory, opIndex);
    const bIndex = this.getIndex("b", opParamModes, operation, memory, opIndex);
    const memIndex = this.getIndex("mem", opParamModes, operation, memory, opIndex);
    this.assertSize(memory, opIndex, aIndex, bIndex, memIndex);
    const operands = [];
    if (aIndex != null) {
      operands.push(memory[aIndex])
    }
    if (bIndex != null) {
      operands.push(memory[bIndex])
    }
    vlog(`Running operation ${operation.opCode} '${operation.description}' at ${opIndex} with`, operands, memIndex !== null ? `storing to index ${memIndex}` : "");
    if (operation.end) {
      return true;
    }

    const result = operation.operation.apply(null, operands)
    if (memIndex != null) {
      vlog(`Storing result ${result} at ${memIndex}`);
      memory[memIndex] = result;
    }
    const newMemoryPointer = operation.move(opIndex, ...operands);
    vlog(`Next opIndex ${newMemoryPointer}`);
    return newMemoryPointer;
  }

  getArgs() {
    return this.getOptionAsIntArray([]);
  }

  setArgsInCode(instructions, index) {
    index = index || 1;
    const newInstructions = [...instructions];
    const args = this.getArgs();
    if (args && args.length > 0) {
      args.forEach((arg, idx) => {
        newInstructions[index + idx] = arg;
      });
    }
    return newInstructions;
  }

  runProgram(instructions) {
    let halt = false;
    let opIndex = 0;
    while (!halt) {
      const result = this.doOperation(instructions, opIndex);
      if (result === true) {
        halt = true;
      }
      else {
        opIndex = result;
      }
    }
    vlog('End memory', instructions);
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


module.exports = Computer;