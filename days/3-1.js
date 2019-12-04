const { checkIntersection } = require('line-intersect');
const CSVDay = require("./day").CSVDay;
const vlog = require("../util/vlog");
const manhattanDistance = require('../util/manhattanDistance');

const ORIGIN = { x: 0, y: 0 };

class Puzzle3_1 extends CSVDay {

  moveWire(current, path) {
    const direction = path[0].toUpperCase();
    const distance = parseInt(path.substring(1), 10);
    switch (direction) {
      case 'U': {
        return { x: current.x, y: current.y + distance, distance };
      }
      case 'R': {
        return { x: current.x + distance, y: current.y, distance };
      }
      case 'L': {
        return { x: current.x - distance, y: current.y, distance };
      }
      case 'D': {
        return { x: current.x, y: current.y - distance, distance };
      }
    }
  }


  checkForIntersection(seg1, seg2) {
    return checkIntersection(seg1[0].x, seg1[0].y, seg1[1].x, seg1[1].y, seg2[0].x, seg2[0].y, seg2[1].x, seg2[1].y);
  }


  findIntersections(segments1, segments2) {
    const intersections = [];
    segments1.forEach(seg1 => {

      segments2.forEach(seg2 => {
        const intersection = this.checkForIntersection(seg1, seg2)
        if (intersection && intersection.type === 'intersecting') {
          intersections.push({ ...intersection.point });
        }
      });
    })
    return intersections;
  }


  getSegments(wire) {
    let curPoint = { ...ORIGIN };
    return wire.map(path => {
      const nextPoint = this.moveWire(curPoint, path);
      const segment = [curPoint, nextPoint];
      curPoint = { ...nextPoint };
      return segment;
    });
  }

  mapPointToDistanceToOrigin(point) {
    const pointWithDistance = { distance: manhattanDistance(point, ORIGIN), point };
    vlog(pointWithDistance);
    return pointWithDistance;
  }

  findSmallestDistanceToOrigin(intersections) {
    return intersections
      .filter(point => !(point.x === 0 && point.y === 0))
      .map(point => this.mapPointToDistanceToOrigin(point))
      .reduce((smallest, current) => {
        if (smallest && smallest.distance < current.distance) {
          return smallest;
        }
        return current;
      }, null);
  }

  run(lines) {
    const [wire1, wire2] = lines;
    const wire1Segments = this.getSegments(wire1);
    const wire2Segments = this.getSegments(wire2);
    vlog('wire 1 path', wire1Segments);
    vlog('wire 2 path', wire2Segments);
    const intersections = this.findIntersections(wire1Segments, wire2Segments);
    vlog('intersections', intersections);
    const closestInteraction = this.findSmallestDistanceToOrigin(intersections);
    vlog('closest interaction', closestInteraction);
    return closestInteraction.distance;
  }

}

module.exports = { puzzle: Puzzle3_1 };