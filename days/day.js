class Day {

  getOption(defaultVal, mapFunc) {
    let option = defaultVal;
    mapFunc = mapFunc || function(x) { return x };
    try {
      option = program.argument ? mapFunc(program.argument) : defaultVal;
    } catch (e) {

    }
    return option;
  }

  getOptionAsNumber(defaultVal) {
    return this.getOption(defaultVal, (x) => parseInt(x, 10));
  }

  parseLine(line) {
    return line;
  }

  run(linesArray) {
    return undefined;
  }

}

class NumberDay {
  parseLine(line) {
    return parseInt(line, 10);
  }
}


class LetterDay {
  parseLine(line) {
    return line.split("");
  }
}

module.exports = { Day, NumberDay, LetterDay };