module.exports = function countChar(char, testStr) {
  let result = 0;
  for (let i = 0; i < testStr.length; i++) {
    if (testStr[i] === char) {
      result++;
    }
  }
  return result;
}