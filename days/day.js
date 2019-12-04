class Day {

  getOption(defaultVal, mapFunc) {
    let option = defaultVal;
    mapFunc = mapFunc || function (x) { return x };
    try {
      option = program.argument ? mapFunc(program.argument) : defaultVal;
    } catch (e) {

    }
    return option;
  }

  getOptionAsInt(defaultVal) {
    return this.getOption(defaultVal, (x) => parseInt(x, 10));
  }

  /**
   * E.g. input looks like "123-236", will return [123, 256]
   *
   * @param {*} defaultVal
   * @returns
   * @memberof Day
   */
  getOptionAsIntRange(defaultVal) {
    return this.getOption(defaultVal, (x) =>
      x.split('-').map(num => parseInt(num, 10)).slice(0, 2)
    );
  }

  parseLine(line) {
    return line;
  }

  run(linesArray) {
    throw new Error('No puzzle run() function defined')
  }

}

class NumberDay extends Day {
  parseLine(line) {
    return parseInt(line, 10);
  }
}


class LetterDay extends Day {
  parseLine(line) {
    return line.split("");
  }
}

class CSVDay extends Day {
  parseLine(line) {
    return line.split(',');
  }
}

class CSVNumberDay extends Day {
  parseLine(line) {
    return line.split(',').map(numString => parseInt(numString, 10));
  }
}

class NoInputDay extends Day {
  parseLine(_line) {
    throw new Error('This puzzle does not require input parsing')
  }
}

module.exports = { Day, NumberDay, LetterDay, CSVDay, CSVNumberDay, NoInputDay };