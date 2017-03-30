

/*
string -> string

input: 'abc'
output: 'cba'

*/

function reverseString(str) {
// to iterate through an array:
// for (var i=0; i<arr.length; i) {
// console.log(arr[i])
// to iterate through an array in reverse order:
// for (var i=arr.length-1; i >=0; i -= 1) {
//  console.log(arr[i])
function reverseString(str) {
  var emptyString = '';
  for (var i=str.length-1; i >= 0; i -=1) {
    emptyString += str[i];
  }
  return emptyString;
};


console.log(reverseString("abc"));
