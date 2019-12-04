
const Puzzle4_1 = require('./4-1').puzzle;
const vlog = require("../util/vlog");
const countChar = require('../util/countChar')

class Puzzle4_2 extends Puzzle4_1 {

  testPassword(passwordNum) {
    const password = passwordNum.toString();
    let i = password.length - 1;
    let ok = true;
    let foundSameDigits = false;
    while (i > 0) {
      if (password[i] === password[i - 1]) {
        if (countChar(password[i], password) === 2) {
          foundSameDigits = true;
        }
      }
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

}

module.exports = { puzzle: Puzzle4_2 };