const readline = require("readline");
const fs = require("fs");
const vlog = require("./util/vlog");

program = require('commander');

program
  .option('-i, --input [filename]', 'Set input filename')
  .option('-p, --puzzle [puzzlename]', 'choose what puzzle to load (e.g. 1-1, or 13-2)')
  .option('-v, --verbose', 'Verbose mode on')
  .option('-a, --argument [arg]', 'Extra argument specific to Puzzle')
  .option('-t, --timing', 'Display execution time')
  .parse(process.argv);

if (!program.input && !program.argument) {
  console.error("Input file or argument is required");
  process.exit();
}

if (!program.puzzle) {
  console.error("Puzzle number is required");
  process.exit();
}

if (program.input) {
  vlog(`Using input file ${program.input}`);
}
if (program.argument) {
  vlog(`Using argument ${program.argument}`);
}

let currentLineNumber = 0;

const lines = [];
const puzzle = new (require("./days/" + program.puzzle).puzzle)();

function startTiming() {
  return process.hrtime()
}
function endTiming(hrStart) {
  const hrEnd = process.hrtime(hrStart);
  const seconds = hrEnd[0];
  const ms = Math.round(hrEnd[1] / 10000) / 100;
  if (program.verbose || program.timing) {
    console.log(`Execution Time: ${seconds}s ${ms}ms`);
  }

}



function parseInput(line) {
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
}

function runPuzzle() {
  let result;
  const startTime = startTiming();
  try {
    result = puzzle.run(lines);
  } catch (e) {
    endTiming(startTime);
    console.log(`Error running puzzle solution: ${e}`);
    process.exit();
  }
  endTiming(startTime);

  vlog("Result:");
  console.log(result);
}

if (program.input) {
  const rl = readline.createInterface({
    input: fs.createReadStream(program.input)
  });

  rl.on("line", line => parseInput(line));

  rl.on("close", () => runPuzzle());
}
else {
  runPuzzle();
}

