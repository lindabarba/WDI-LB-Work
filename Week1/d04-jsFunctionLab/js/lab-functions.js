//1.
function maxOfTwoNumbers(x, y) {
  if (x >= y) {
    return x;
  } else {
    return y;
  }
}

console.log(maxOfTwoNumbers(3, 9));

//2. - WORKS
var maxOfThree = function(x, y, z) {
  if ((x > y) && (x > z)) {
    return x;
  } else if ((y > x) && (y > z)) {
    return y;
  } else {
    return z;
  }
};

console.log(maxOfThree(1, 2, 3));

//3. - returns false no matter what
function isCharAVowel(char) {
  if (char.toLowerCase === 'a' || char.toLowerCase === 'e' || char.toLowerCase === 'i' || char.toLowerCase === 'o' || char.toLowerCase === 'u') {
    return true;
  } else if (char.toLowerCase === 'y') {
    return "sometimes";
  } else {
    return false;
  }
}

console.log(isCharAVowel("a"))

//4.
var myArray = [];
var sumArray = function([myArray]) {
  for (var i = 0; i < myArray.length; i++) {
    //num = (sumArray[i])
    //sum = num + ???
  }
};

console.log(sumArray[1, 2, 3]);

//5.
function multiplyArray([myArray]) {
  for (var i = 0; i < myArray.length; i++) {
    //num = (multiplyArray[i])
    //mul = num * ???
  }
}

console.log(multiplyArray[1, 2, 3]);

//6. - DOESN'T WORK
var numArgs = function([newArray]) {
  var alsoArgs = newArray.length;
  return alsoArgs;
};

console.log(numArgs(1, 2, 3, 4, 5));

//7. - DOESN'T WORK
myString = "rockstar";
function reverseString() {
  myString.reverseString;
}

console.log(reverseString(myString));

//8.
var longestWordLength = function() {
  //takes an array
}

//9.












