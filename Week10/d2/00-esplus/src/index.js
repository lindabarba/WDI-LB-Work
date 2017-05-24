// ----------------------------------------------

// Spread Operators

/*

    With JavaScript spread syntax we can combine arrays more easily.

*/

let parts = ["shoulders", "knees"];
let lyrics = ["header", ...parts, "and", "toes"];

console.log(lyrics);

let sports = ["soccer", "basketball"];
let moreSports = [...sports];

console.log(moreSports);

/*

  We can do the same but with objects.

*/

let firstObj = {a: 0, b: 1}
let secondObj = {...firstObj, c: 2, d: 3};

console.log(secondObj);

let filled = {hoo: "ha", foo: "bar"};
let empty = {...filled};

console.log(empty);

// ----------------------------------------------

// Array andd Object Destructuring

/*

  Object and array destructring is convenient way of extracting multiple values from data stored in
  objects and arrays.

*/

const obj = {first: "LeBron", last: "James"};
const {first, last} = obj;

console.log(`I dislike ${first} ${last}`);

const [x,y] = ["a", "b"];

console.log(x);
console.log(y);

const object = { alpha: 'Jane', beta: 'Doe' };
const { alpha: f, beta: l } = object;

console.log(f);
console.log(l);

// ----------------------------------------------

// ES6 Classes

class Human {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getNameAndAge() {
    return `This human is ${this.age} years-old and has the name of ${this.name}`
  }

};

class Jon extends Human {
  constructor(name, age, jellyBeanCount) {
    super(name, age);
    this.jellyBeanCount = jellyBeanCount;
  }

  howManyBeansCanYouEat() {
    return `${this.name} can eat ${this.jellyBeanCount}`;
  }
}

let jon = new Jon("Jon", 23, 46);
console.log(jon.getNameAndAge());
console.log(jon.howManyBeansCanYouEat());

// ----------------------------------------------

// map and filter Function

// Let's create a map function that lists through data and turns data into HTML strings

let data = ["Jon", "Jim", "Pierre"];

let mapped = data.map(name => `<div className="name">${name}</div>`);

console.log(mapped);

// Let's filter out all even numbers from nums

let nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

let odds = nums.filter(num => num % 2 !== 0);

console.log(odds);
