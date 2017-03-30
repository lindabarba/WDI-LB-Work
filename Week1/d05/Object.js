/*
  1. Create an obj with the key of "cat"
     and the value of "dog"
*/

<<<<<<< HEAD
var obj = {"cat": "dog"};
=======
var obj = {"cat": "dog"}
>>>>>>> 05bae99cb400efe5865084ea983c5aa950d6848f

/*
  2. Create a property name boo on objy and give it the
     value of "moo"
*/

var objy = {}

objy.boo = "moo";

// Add code below
// e.g. obj.hello = "foo"


/*
<<<<<<< HEAD
  3. Add a hello property with a value
     of "hi"
=======
  3. Add a hello propery with a value
     of "hi" to the niceObject.
>>>>>>> 05bae99cb400efe5865084ea983c5aa950d6848f
*/

var niceObject = {};

niceObject.hello = "hi";

/*
   4. Add the operator that makes the variable
      tyf evaluate to true

*/

var a = {"a": "a"};

var eh = {"a": "a"};

// Change code below:

//var tyf = a > eh;
var tyf = !(a === eh);


/*
   6. Are arrays objects?

*/

var sampleArray = [1,2,3];
var arrayObject = typeof sampleArray;

// Update code below
var isObject = arrayObject === "object"

/*

  7. Dot vs bracket notation. What are zestyObject
     and spicyObject equal to?

*/

var zestyObject = {};
var spicyObject = {};

var bar = 2 + 2;

zestyObject.bar = "four"
spicyObject[bar] = "four"

//Replace "?" with correct values
//var q = zestyObject[4] === "?"
//var z = spicyObject[4] === "?"
var q = zestyObject[4] === "four"
var z = spicyObject[4] === "four"


/*
  8. Write a function named reverseProperties
     that switches all the keys and values in an
     object. For example
     reverseProperties({"a": "b"}) //=> {"b": "a"}
*/

function reverseProperties(obj) {
  //I had this line right
  var finalObj = {};
  for (var props in obj) {
    // almost right - brackets not dot notation, and then add all in one line
    // finalObj[props]
    finalObj[obj[props]] = props
  }
  return finalObj;
}
  //------Jon explanation:
  // iterate through object
  // var myObj = {"a": "b", "c": "d"}
  // for (var props in myObj) {
  // note: "props" represents key value
  //  myObj[props]
  // I had this line right



/*
  9. Write a function that returns an object
     where each key is a letter in an object with each
     property being the number of times that character occurs
     in the string. For example, getCharacterNumbers('aab')
     will return {"a": 2, "b": 1}. This functions takes a
     string type and returns an object.
*/

function getCharacterNumbers(str) {
  // Add code here
  var endObj = {};
  return;
}

/*

  10. Make the variables rt, gt, vt and kt evaluate to true.

*/

var fakeCarDealerData = {
  "dealerId": 34,
  "cars": ["Mazda", "Toyota", "Hyundai"],
  "employees": {
    "managers": [
      {
        "name": "Steve",
        "role": "Car Manager"
      },
      {
        "name": "Bill",
        "role": "Floor Manager"
      }
    ],
    "interns": [
      {
        "name": "Sheila",
        "role": "Tech Intern"
      },
      {
        "name": "Barb",
        "role": "Car Intern"
      }
    ]
  }
}

// Replace "?" with correct values
var rt = fakeCarDealerData.dealerId === 34
var vt = fakeCarDealerData.cars[2] === "Hyundai"
var gt = fakeCarDealerData.employees.managers[0].name === "Steve"
var kt = fakeCarDealerData.employees.interns.length === 2
