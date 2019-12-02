const readline = require("readline");
const fs = require("fs");
const vlog = require("./util/vlog");

program = require('commander');

program
  .option('-i, --input [filename]', 'Set input filename')
  .option('-p, --puzzle [puzzlename]', 'choose what puzzle to load (e.g. 1-1, or 13-2)')
  .option('-v, --verbose', 'Verbose mode on')
  .option('-a, --argument [arg]', 'Extra argument specific to Puzzle')
  .parse(process.argv);

if (!program.input) {
  console.error("Input file is required");
  process.exit();
}

if (!program.puzzle) {
  console.error("Puzzle number is required");
  process.exit();
}

vlog(`Using input file ${program.input}`);

const lines = [];
const puzzle = new(require("./days/" + program.puzzle).puzzle)();

const rl = readline.createInterface({
  input: fs.createReadStream(program.input)
});

let currentLineNumber = 0;
rl.on("line", function(line) {
  if (line.trim() === "") {
    // ignore whitespace lines
    return;
  }
  currentLineNumber++;
  try {
    const parsedLine = puzzle.parseLine(line);
    vlog(parsedLine);
    lines.push(parsedLine);
  } catch (e) {
    console.log(`Error parsing line ${currentLineNumber} (${line}): ${e}`);
    process.exit();
  }

});

rl.on("close", function() {
  let result;
  try {
    result = puzzle.run(lines);
  } catch (e) {
    console.log(`Error running puzzle solution: ${e}`);
    process.exit();
  }
  vlog("Result:");
  console.log(result);
});