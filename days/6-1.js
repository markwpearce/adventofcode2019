const Day = require("./day").Day;
const vlog = require("../util/vlog");

const COM = "COM";

class Puzzle6_1 extends Day {


  /**
   *
   *
   * @param {string} line
   * @returns {orbitee, orbiter}
   * @memberof Puzzle6_1
   */
  parseOrbit(line) {
    const [orbitee, orbiter] = line.split(')');
    return { orbitee, orbiter }
  }


  /**
   * Split into direct orbits/potential indirect
   *
   * @param {{orbitee:string, orbiter:string}[]} orbits
   * @param {string} planet
   * @returns {{orbitee:string, orbiter:string}[]}
   * @memberof Puzzle6_1
   */
  findOrbits(orbits, planet) {
    const directOrbits = [];
    const potentialIndirectOrbits = [];
    orbits.forEach(orbit => orbit.orbitee === planet ? directOrbits.push(orbit) : potentialIndirectOrbits.push(orbit));

    const result = { directOrbits, potentialIndirectOrbits };
    return result;
  }

  traverseOrbit(sortedOrbit, depth, callBack = () => { }) {
    callBack(sortedOrbit, depth)
    sortedOrbit.orbits.forEach(orbit => {
      this.traverseOrbit(orbit, depth + 1, callBack)
    })
  }


  /**
   *
   *
   * @param {{orbitee:string, orbiter:string}[]} orbits
   * @param {string} planet
   * @memberof Puzzle6_1
   */
  sortOrbits(orbits, planet) {
    const { directOrbits, potentialIndirectOrbits } = this.findOrbits(orbits, planet);
    const sortedOrbits = directOrbits.map(directOrbit => {
      const innerResult = { directOrbit, orbits: this.sortOrbits(potentialIndirectOrbits, directOrbit.orbiter) };
      return innerResult;
    });
    return sortedOrbits;
  }

  getSortedOrbits(lines) {
    return this.sortOrbits(lines.map(line => this.parseOrbit(line)), COM);
  }


  /**
   *
   *
   * @param {string[]} lines
   * @memberof Puzzle6_1
   */
  run(lines) {
    const sortedOrbits = this.getSortedOrbits(lines);
    let totalOrbits = 0;
    sortedOrbits.forEach(orbit => this.traverseOrbit(orbit, 0, (orbit, depth) => {
      vlog("  ".repeat(depth), orbit.directOrbit);
      totalOrbits += depth + 1
    }));
    return totalOrbits;
  }

}

module.exports = { puzzle: Puzzle6_1, COM };