module.exports = function log(...messages) {
  if (program.verbose) {
    console.log(...messages);
  }
}