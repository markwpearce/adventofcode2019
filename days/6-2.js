const Puzzle6_1 = require("./6-1").puzzle;
const vlog = require("../util/vlog");

const COM = require('./6-1').COM;
const YOU = "YOU";
const SANTA = "SAN";

class Puzzle6_2 extends Puzzle6_1 {


  getPathToPlanet(orbit, planet) {
    if (orbit.directOrbit && orbit.directOrbit.orbiter === planet) {
      return [orbit.directOrbit.orbiter];
    }
    for (let i = 0; i < orbit.orbits.length; i++) {
      const path = this.getPathToPlanet(orbit.orbits[i], planet);
      if (path) {
        return [orbit.directOrbit.orbiter, ...path];
      }
    }
    return undefined;
  }


  run(lines) {
    const sortedOrbits = { directOrbit: { orbiter: COM }, orbits: this.getSortedOrbits(lines) };

    const pathToYou = this.getPathToPlanet(sortedOrbits, YOU);
    const pathToSanta = this.getPathToPlanet(sortedOrbits, SANTA);
    vlog(YOU, pathToYou);
    vlog(SANTA, pathToSanta);
    // length of transfer is the number of jumps of unique planets on each of these paths
    const uniqueToYou = pathToYou.filter(planet => !pathToSanta.includes(planet));
    const uniqueToSanta = pathToSanta.filter(planet => !pathToYou.includes(planet));
    return uniqueToYou.length - 1 + uniqueToSanta.length - 1;
  }

}


module.exports = { puzzle: Puzzle6_2 }