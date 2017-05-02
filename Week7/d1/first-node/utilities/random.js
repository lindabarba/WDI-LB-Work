// module.exports = function(ranNo) {
//   for (var ranNo = 0; ranNo < 10; ranNo++) {
//     // console.log(ranNo.math.random(100,200)); - my bad code
//     return Math.floor(ranNo.math.random(100,200));
//   }
// }

// console.log(ranNo);
//  MY MISTAKE - forgot need two vars!

module.exports = function(min, max) {
  return Math.floor( Math.random() * (max-min +1) + min);
};
