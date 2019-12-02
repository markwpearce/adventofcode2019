module.exports = function padNum(n, size, char) {
  char = char || "0";
  size = size || 2;
  str = n.toString();
  while (str.length < size) {
    str = char + str;
  }
  return str;
}