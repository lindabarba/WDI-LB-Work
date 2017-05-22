# Advanced Mongoose

## Learning Objectives

* Define instance and static methods on Mongoose models
* Define virtual properties for a Mongoose model

## A Review of Mongoose

* There is a one-to-one relationship between Mongoose models and MongoDB collections
  - A collection will be named as the pluralized version of the model in all lower-case (e.g., a `User` model will create a `users` collection)
* **Instances of Mongoose models are documents**
* Newly instantiated Mongoose models are added as documents in a MongoDB collection

## Instance Methods

* **Instance methods** are methods on an instance of a Model class
* Since instances of a Mongoose model are *documents* this will be a method on a *single document*
* You create an instance method in Mongoose using the `methods` keyword on a schema

```js
<schema_name>.methods.<method_name> = function(callback) {
  //some Mongo query and then call the callback with the result of the Mongo Query
}
```

**Quiz**: Why do we need to pass a callback to our instance methods to get the result of a query?

### Example of Instance Methods in Mongoose

Here is an example of an instance method.

```javascript
var animalSchema = new Schema({ name: String, type: String });

// assign a function to the "methods" object of our animalSchema
animalSchema.methods.findSimilarTypes = function(cb) {
  return this.model('Animal').find({ type: this.type }, cb);
};
```

Now all of our Animal instances have a `findSimilarTypes` method available to them.

```javascript
var Animal = mongoose.model('Animal', animalSchema);
var dog = new Animal({ type: 'dog' });

dog.findSimilarTypes(function(err, dogs) {
  console.log(dogs); // logs out documents that are type: dog (woof woof)
});
```

#### Mongoose Method Reminder

* `find()` returns all documents that match a given query
* `findOne()` returns **ONLY** the first document that matches the query

### Static Methods

* A **static method** is a method on a Model class
* It is therefore a method on a collection
* You create an static method in Mongoose using the `statics` keyword

```js
<schema_name>.statics.<method_name> = function(callback) {
  //some Mongo query and then call the callback with the result of the Mongo Query
}
```

#### Example of a Static Method

Adding static methods to a Model is simple as well. Continuing with our `animalSchema`:

```javascript
// assign a function to the "statics" object of our animalSchema
animalSchema.statics.findByName = function(name, cb) {
  return this.find({ name: new RegExp(name, 'i') }, cb);
};

var Animal = mongoose.model('Animal', animalSchema);
Animal.findByName('fido', function(err, animals) {
  console.log(animals);
});
```

### Virtual Properties

* **Virtual properties** are document properties that you can `get` and `set`, but are not actually persisted in our MongoDB database
* The *getters* are useful for formatting or combining fields, while *setters* are useful for de-composing a single value into multiple values for storage.

```javascript
// define a schema
var personSchema = new Schema({
  name: {
    first: String,
    last: String
  }
});

// compile our model
var Person = mongoose.model('Person', personSchema);

// create a document
var axl = new Person({
  name: { first: 'Axl', last: 'Rose' }
});
```

Suppose you want to print out the person's full name. You could do it yourself:

`console.log(axl.name.first + ' ' + axl.name.last); // Axl Rose`

But concatenating the first and last name every time can get cumbersome. And what if you want to do some extra processing on the name, like removing [diacritics](https://en.wikipedia.org/wiki/Diacritic)?.
A virtual property getter lets you define a `fullName` property that won't get persisted to MongoDB.

```javascript
personSchema.virtual('fullName').get(function () {
  return this.name.first + ' ' + this.name.last;
});
```

Now, Mongoose will call your getter function every time you access the `fullName` property:

`console.log(axl.fullName); // Axl Rose`

**NOTE**: If you use `toJSON()` or `toObject()` (or use `JSON.stringify()` on a Mongoose document) Mongoose will not include `virtuals` by default. Pass `{ virtuals: true }` to either toObject() or toJSON().

**NOTE ABOUT THE NOTE**: If the above note did make sense to you don't worry. Do the "code along" and then revisit this. It should make more sense once you've actually used the `toJSON()` method.

### A Code-Along Because Code-Alongs are Sometimes Fun

#### GOAL

**To get hands on practice create virtual properties and static methods on Mongoose model**

#### Step 1: Project Initialization

Follow these steps in turn to start a Mongoose project using npm and Sublime as your text editor.

```bash
$ mkdir advanced-mongoose
$ cd advanced-mongoose
$ npm init -y
$ npm install mongoose
$ touch food.js
$ subl .
```

We will create a file called `food.js`. In it we will write the following:

```javascript
var mongoose = require('mongoose');

var foodSchema = new mongoose.Schema({
  name: {type: String, required: true},
  group: {type: String, required: true, enum: ['Veg', 'Dairy', 'Meat', 'Bread']},
  shelfLife: {type: Number, required: true}
});

module.exports = mongoose.model('Food', foodSchema);
```

#### Step 2: Messing About with our Database

We can "play" around with our Mongo database.

Remember to initiate your `mongod` process in a separate Terminal tab.

```
$ mongod
```

Then in a separate Terminal tab open the `node` REPL.

```bash
$ node
```

Now type the following in `node` to create a new document in your MongoDB database.

```bash
> var mongoose = require('mongoose')
> mongoose.connect('mongodb://localhost/food')
> var Food = require('./food')
> Food.create({name: 'Tomato', group: 'Veg', shelfLife: 5}, function(err, doc) {
  ...console.log(doc)
  ...})
> Food.find({}, function(err, doc) {
  ...console.log(doc)
  ...})
```

**You Do**: Add another food item of a different type into the database.

#### Step 3: Creating databasse.js

Let's create a file called `database.js` that will programmatically connect our code to a MongoDB database. In Node we can simply `require(./database)` to use this.

```javascript
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/food')
```

Your project should now have the following directory structure:

```
advanced-mongoose
|_ database.js
|_ food.js
|_ node_modules
|_ package.json
```

#### Step 4: Add a Description Virtual Property

We will now add a virtual property to our `foodSchema` called `description`. This will give use a description of what food item we are querying.

Inside our `food.js` before the `module.exports` add this code:

```javascript
// add before module.exports
foodSchema.virtual('description').get(function() {
  return `${this.name} (${this.group}) - Good for ${this.shelfLife} days`;
});

module.exports = mongoose.model('Food', foodSchema);
```

In the node REPL:

```bash
$ node
> require('./database')
> var Food = require('./food')
> Food.findOne( {}, (err, item) => console.log(item.description) )
```

#### Step 5: Adding a Static Method

In `food.js` write the following code before we export to the global namespace.

```javascript
foodSchema.statics.findByGroup = function(group, cb) {
  return this.find({group: group}, cb);
};
```

In the Node REPL:

```bash
$ node
> require('./database')
> var Food = require('./food')
> Food.findByGroup('Veg', (err, food) => console.log(food))
```

This should have returned a document with name of "Tomato".

#### Step 6: JSON Serialization

When a client request some user data from the database we **DO NOT** want to send password data as part of the JSON response for obvious security reasons. The term **serialization** is a term you will see a lot in software engineering. Serialization is the process of taking data and transforming into a form that is able to then be stored in a database or sent over a network.

We use the `set` method in Mongoose to set options. Here we are "setting" the `toJSON` option to the object that is passed as a second argument to `set`. Add the following code above `module.exports` in `food.js`.

```javascript
foodSchema.set('toJSON', {
  virtuals: true, // serialize virtuals
  transform: function(doc, ret, options) {
    // add an id property
    ret.password = 'I am a password';
    // remove a property like password or whatever
    // delete ret.password;
    return ret;
  }
});
```

In the Node REPL:

```bash
$ node
> require('./database')
> var Food = require('./food')
> var item
> Food.findOne( {}, (err, food) =>  item = food )
> item  // outputs actual document
> item.toJSON()  // shows how document will be serialized when sent to client
```

Now try this again but with `delete ret.password` NOT commented out.
