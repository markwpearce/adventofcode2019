const NoInputDay = require("./day").NoInputDay;
const vlog = require("../util/vlog");

class Puzzle4_1 extends NoInputDay {


  testPassword(passwordNum) {
    const password = passwordNum.toString();
    let i = password.length - 1;
    let ok = true;
    let foundSameDigits = false;
    while (i > 0) {
      foundSameDigits = foundSameDigits || password[i] === password[i - 1];
      if (password[i] < password[i - 1]) {
        ok = false;
        break;
      }
      i--;
    }
    ok = ok && foundSameDigits;
    vlog(`testing`, passwordNum, ok);
    return ok;

  }

  bruteForcePasswords(start, end) {
    let current = start;
    let numPasswords = 0;
    while (current <= end) {
      if (this.testPassword(current)) {
        numPasswords++;
      }
      current++;
    }
    return numPasswords;
  }



  run() {
    const range = this.getOptionAsIntRange();
    vlog('password range', range);
    const numPasswords = this.bruteForcePasswords(range[0], range[1]);
    return numPasswords;
  }
}

module.exports = { puzzle: Puzzle4_1 }