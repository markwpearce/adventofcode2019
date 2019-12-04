const vlog = require("./vlog");

module.exports = function manhattanSpiral(point, func) {
  let shouldEnd = false;
  spiralNumber = 1;

  while (!shouldEnd) {
    let h = 0;
    let v = 0;
    let i = 0;
    while (i < spiralNumber && !shouldEnd) {
      h = spiralNumber - i;
      v = i;
      let end1 = func(point.x + h, point.y + v, spiralNumber);
      let end2 = func(point.x - h, point.y - v, spiralNumber);
      let end3 = func(point.x + v, point.y - h, spiralNumber);
      let end4 = func(point.x - v, point.y + h, spiralNumber);
      shouldEnd = end1 || end2 || end3 || end4;
      i++;
    }
    spiralNumber++;
  }
}