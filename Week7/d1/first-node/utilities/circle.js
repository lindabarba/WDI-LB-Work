module.exports.area = function(radius) {
  return radius * radius * Math.PI;
}

module.exports.circumference = function(radius) {
  return 2 * Math.PI * radius;
}
