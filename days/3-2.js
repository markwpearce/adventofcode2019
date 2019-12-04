
const manhattanDistance = require('../util/manhattanDistance');
const Puzzle3_1 = require('./3-1').puzzle;
const vlog = require("../util/vlog");

class Puzzle3_2 extends Puzzle3_1 {

  findIntersections(segments1, segments2) {
    const intersections = [];
    let w1Total = 0, w2Total = 0;
    segments1.forEach(seg1 => {
      w2Total = 0;
      segments2.forEach(seg2 => {
        const intersection = this.checkForIntersection(seg1, seg2)
        if (intersection && intersection.type === 'intersecting') {
          const distance = w1Total + w2Total + manhattanDistance(seg1[0], intersection.point) + manhattanDistance(seg2[0], intersection.point)
          intersections.push({ ...intersection.point, distance });
        }
        w2Total += seg2[1].distance;

      });
      w1Total += seg1[1].distance;

    })
    return intersections;
  }

  mapPointToDistanceToOrigin(point) {
    const pointWithDistance = point;
    vlog(pointWithDistance);
    return pointWithDistance;
  }

}

module.exports = { puzzle: Puzzle3_2 };