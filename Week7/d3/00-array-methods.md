<img src="https://i.imgur.com/oY0P1r0.png" width="200">

# Walk-Thru of Array Iterator Methods

## Intro
JavaScript Arrays have lots of built in methods.

This walk-thru summarizes popular _iterator_ methods, that is, methods that iterate over an array's elements, invoking a callback function for each iteration (one element at a time).

## Method Summary

| Method | Purpose | Returns | Callback Should | Callback's Args |
| --- | --- | :-: | --- | --- |
| `forEach(cb)` | General purpose |`undefined` | Do whatever you want | `(elem, idx, array)` | 
| `map(cb)` | Create new array from source array | new array | Modify each element as desired and return it | `(elem, idx, array)` | 
| `reduce(cb, initAcc)` | Reduce the array to a single value/object | final value of `acc` | Return the new value for `acc` | `(acc, elem, idx, array)` | 
| `filter(cb)` | Filter source array | new array | Return truthy if `elem` is to be included | `(elem, idx, array)` | 
| `find(cb)` | Find an element | the first `elem` found | Return truthy if `elem` is what you're looking for | `(elem, idx, array)` |
| `findIndex(cb)` | Find a certain element's **index** | the index of the first `elem` found | Return truthy if `elem` is what you're looking for | `(elem, idx, array)` |
| `some(cb)` | Check if array has something | `true` or `false` | Return truthy if `elem` is what you're checking for | `(elem, idx, array)` |
| `every(cb)` | Check if every `elem` passes condition | `true` or `false` | Return truthy if `elem` is what you're checking for | `(elem, idx, array)` |

## Code Examples

#### `forEach`

```js
users.forEach(user => {
	inviteUser(user);
});

// calls the inviteUser function for every user
```

#### `map`

```js
var nums = [1, 2, 3];
var squared = nums.map(num => num * num);

// squared is [1, 4, 9]
```

#### `reduce`

```js
var nums = [25, 6, 100, 3];
var sum = nums.reduce((acc, num) => {
	return acc + num;
}, 0);

// sum equals 134
```

```js
var votes = ['Yes', 'No', 'No', 'Yes', 'Yes'];
var tally = votes.reduce((acc, vote) => {
	acc[vote] = acc[vote] ? acc[vote] + 1 : 1;
	return acc;
}, {});

// tally is {"No": 2, "Yes": 3}
```

#### `filter`

```js
var nums = [100, 2, 5, 42, 99];
var evens = nums.filter(num => !(num % 2));

// evens is [100, 2, 42]
```

#### `find`

```js
var cars = [
	{color: 'red', make: 'BMW', year: 2001},
	{color: 'white', make: 'Toyota', year: 2013},
	{color: 'blue', make: 'Ford', year: 2014},
	{color: 'white', make: 'Tesla', year: 2016}
];

var firstWhiteCar = cars.find(car => car.color === 'white');
// firstWhiteCar is {color: 'white', make: 'Toyota', year: 2013}

var missingCar = cars.find(car => car.color === 'black');
// missingCar = undefined
```

#### `findIndex`

```js
var cars = [
	{color: 'red', make: 'BMW', year: 2001},
	{color: 'white', make: 'Toyota', year: 2013},
	{color: 'blue', make: 'Ford', year: 2014},
	{color: 'white', make: 'Tesla', year: 2016}
];

var firstWhiteCarIdx = cars.findIndex(car => car.color === 'white');
// firstWhiteCarIdx equals 1

var missingCarIdx = cars.findIndex(car => car.color === 'black');
// missingCarIdx = -1
```

#### `some`

```js
var cars = [
	{color: 'red', make: 'BMW', year: 2001},
	{color: 'white', make: 'Toyota', year: 2013},
	{color: 'blue', make: 'Ford', year: 2014},
	{color: 'white', make: 'Tesla', year: 2016}
];

var hasFord = cars.some(car => car.make === 'Ford');
// has is true
```

#### `every`

```js
var cars = [
	{color: 'red', make: 'BMW', year: 2001},
	{color: 'white', make: 'Toyota', year: 2013},
	{color: 'blue', make: 'Ford', year: 2014},
	{color: 'white', make: 'Tesla', year: 2016}
];
var everyCarIsWhite = cars.every(car => car.color === 'white');

// everyCarIsWhite is false
```

## Reference

[Array Reference on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)