<img src="https://i.imgur.com/fx2orT2.png">

# Event Handling in React
---

## Learning Objectives

#### Students Will Be Able To:

- Identify which components trigger browser events
- Pass an event handler (method) to a child component
- Ensure event handlers that need to modify state are bound to the proper context (component)
- Use ES7's Class Properties to efficiently and concisely properly bind methods
- Optionally pass arguments to event handlers

## Roadmap

- Review the Starter Code
- Intro to Browser Events in React
- Event Handlers (methods)
- Essential Questions

## Review the Starter Code

#### Setup

The supplied starter code is the styled Mastermind game app thus far (the same code as the solution code for the styling lab).

We will learn about event handling by implementing it in Mastermind, so:

1. `cd` to  the project folder in Terminal
2. Install the Node modules: `$ npm install`
3. Open the project in your text editor: `$ subl .`
4. Spin up the dev server: `$ npm start`

The dev server should automatically open Mastermind in the browser, which should look like this:

<img src="https://i.imgur.com/GjPY7qY.png">

#### Refactoring the App's State

Notice that for styling purposes, **line 25** of **App.js** is filling the `guesses` array with 4 calls to `this.getNewGuess()`. Let's change this so that the game loads with only one pending guess:

```js
this.state = {
  colors,
  code: this.genCode(colors.length),
  selColorIdx: 0,
  // Update below to only one call to getNewGuess
  guesses: [this.getNewGuess()]
};
```

That's a good start, but we also don't want to "pre-select" the player's color choices as we're currently doing (again, for styling purposes).

On **line 32** you'll see that we are returning a new guess with the **code** array set like this: `code: [3, 2, 1, 0]`. **What do those numbers correspond to?**

Instead, we are going to represent a "no color choice" with a `null` value which has been set up on **line 31** - uncomment it and **delete line 32**.

With that done, the pegs will not no longer have any color (but the `<div>`s are still there). Our goal should be to show an "empty" peg. Let's update the `style` object in **GuessPeg.jsx** as follows:

>Note: Using _jsx_ as an extension on a component module allows the text editor to "recognize" the file as containing JSX and should provide syntax highlighting accordingly.

```js
let style = {
  width: 40,
  height: 40,
  margin: 5,
  borderRadius: '50%',
  backgroundColor: props.color,
  opacity: 0.85,
  // Add a border unless there's a color
  border: props.color || '1px dashed grey'
};
```
>Refresher: JS's logical `OR` operator returns the first truthy value. If both are falsey, the second falsey value is returned.

Looking really good now, but let's make the pegs in our current guess row look clickable by making the cursor a pointer. This will take a little more effort than it appears at first because we need access to the value of `currentGuess`.

**Use React and move up the hierarchy until you find the first component that has the `currentGuess` prop - first person that finds it is the first person to find it!**

Cool, **now write the code to pass the `currentGuess` down to each of the four `<GuessPeg>` components**.

Lastly, just add the following property to the `style` object:

```js
cursor: props.currentGuess && 'pointer'
```
>Refresher: JS's logical `AND` operator returns the first falsey value, or if both are truthy, the second truthy value (`props.currentGuess`) is returned.

Note that React does not get pissed off if we assign `false` to the `cursor` property - it just ignores it!

Here's what we should be seeing at this point:

<img src="https://i.imgur.com/mPDHwRz.png">

Excellent! Now let's talk about events...

## Intro to Browser Events in React

First, **what are some common browser events we've seen during WDI so far?**

In case you need to be reminder, there's, as Sam would say, a ["shit-ton" of 'em](https://developer.mozilla.org/en-US/docs/Web/Events).

Like many things in React, event handling is a little different than what we are used to.

Let's see how...

#### Connecting Handler Code to Events in React

In React, we do not add event listeners using JavaScript's `addEventListener` method. Instead, we use a component's props to connect that component's events to a handler.

Let's see this by adding an anonymous arrow function as a click handler on the colored circles within the `<ColorPicker>` component:

```js
const ColorPicker = (props) => {
  return (
    <div className="ColorPicker">
      {props.colors.map((color, idx) =>
        <div
          className="ColorPicker-color"
          style={{backgroundColor: color}}
          key={color}
          onClick={() => alert('clicked!')}
        />
      )}
    </div>
  );
}
```
Just an `alert` for now - test it out.

Observations:

- The names for event props are camel-cased (`onClick`). In HTML, the attribute would be `onclick`. Here's the [list of events](https://facebook.github.io/react/docs/events.html#supported-events) supported by React.
- The JS expression (always within curly braces) assigned to an event prop must evaluate to a function. A function type, **not** a function call - unless that function call returns a function - what? Dynamically assigning an event handler? Now that's awesome sauce :)
- In native JS, if the event handler function returns `false`, it prevents the default behavior of that event. In React, we must call the `preventDefault` method on the **Synthetic Event** object...

#### The Synthetic Event Object

You've seen how event handlers are automatically passed an event object as an argument. In a React app however, this event object is a React [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html) that wraps the browser's native event object.

React does this because React has its own event system that:

- Handles lingering browser incompatibilities.
- Improves performance by using a single delegated event handler for all events.

The good news is that React's event system is transparent to us. More importantly, the API of the Synthetic Event object is pretty similar to the browser's, which means we can still invoke `preventDefault()`, `stopPropagation()`, access `clientX`, etc.

## Event Handlers (methods)

You just saw a silly inline anonymous arrow function used as an event handler that popped up an alert when one of the colors in the `<ColorSelector>` was clicked - not very useful.

More commonly, the event handler will need to update some state in response to an event.

Questions:

1. **What method do we call to mutate (change) state?**
2. **Slightly obvious, yet confusing question: To what object does that method belong to?**

#### Defining a Method for Event Handling

Let's continue working with the `<ColorSelector>` with the intention of setting the `selColorIdx` to the index of the clicked color...

**What component owns the `selColorIdx` state property?**

**Where are we going to have to put our click handler method?**

For now, a method in `<App>` that pops up an alert:

```js
handleColorSelection() {
  alert('color selected!');
}
	
render() {
  ...
```

#### Passing Event Handlers to Children Components

We need to be able to invoke the `handleColorSelected` that lives in `<App>`, from the // `<ColorPicker>` component // - ```props```.

The only way to give `<ColorPicker>` a **reference** to the method is to pass it via props:

```js
// App.js

<ColorPicker handleColorSelection={this.handleColorSelection} colors={this.state.colors} />
```

Now, `<ColorPicker>` will have access to the `handleColorSelection` via its `props.handleColorSelection`.

Inside of `<ColorPicker>` we can now assign `handleColorSelection` to the `onClick` event on any **DOM component** like so:

```js
const ColorPicker = (props) => {
  return (
    <div className="ColorPicker">
      {props.colors.map((color, idx) =>
        <div
          onClick={props.handleColorSelection}
          className="ColorPicker-color"
          style={{backgroundColor: color}}
          key={color}
        />
      )}
    </div>
  );
}
```

>Note: We got lucky in that `<ColorPicker>` is a direct child of `<App>`. However, this often won't be the case, so, **what will we have to do?**

You should now see the alert when a color is clicked!

Can it really be this easy? In most cases, the answer is "No" due to the reasons you are about to see...

#### Providing Arguments to Methods

We will need to pass the newly selected color's index as an argument to the `handleColorSelection` method when the color is clicked.

First, let's update the `handleColorSelection` method in **App.js** to accept the index as an argument:

```js
handleColorSelection(colorIdx) {
  alert(`color index ${colorIdx} selected!`);
}
```
Now on to `<ColorPicker>`...

As stated earlier, we must provide a function type, **not invoke** the function. So this won't work:

```js
onClick={props.handleColorSelection(idx)}
```

Writing the above code will actually invoke the method each time it's rendered - resulting in an alert each time :)

So, what's the solution? Try this on for size:

```js
onClick={() => props.handleColorSelection(idx)}
```

**What have we done here?**

Nice solution and testing out seems like things are going to great - except...

#### Context Binding

Now that we have the index of the newly selected color being passed to `handleColorSelection`, it seems like we should be able to easily call `setState` to update `state.selColorIdx` like this:

```js
handleColorSelection(colorIdx) {
  this.setState({selColorIdx: colorIdx});
}
```

However, testing it out reveals that it doesn't work and there's an error in the browser's console telling us why: `Uncaught TypeError: this.setState is not a function`.

We know that the component has a `setState` method on it, so what gives? The problem is that `this` is not bound to the `<App>` component!

Logging out `this` will verify that it's actually bound to the `<ColorPicker>` component - not `<App>` where the `handleColorSelection` method lives!

<details>
<summary>Who knows why?</summary>
The binding of `this` is determined by how a function is called. In this case, the `<ColorPicker>` is the one invoking the `handleColorSelection` method - it is the object left of the dot...</details>
</detail>

So, there are a couple of ways to explicitly set the binding of _regular_ functions by using their `bind`, `call` and `apply` methods.

In React, prior to a new syntax coming that I'm going to show you next, the most popular way is to use `bind` in the constructor to create a **new** function that has `this` explicitly bound to its first argument:

```js
class App extends Component {
  constructor(props) {
    super(props);
    let colors = ['#155765', '#57652A', '#AB9353', '#4D2C3D'];
    this.state = {
      colors,
      code: this.genCode(colors.length),
      selColorIdx: 0,
      guesses: [this.getNewGuess()]
    };
    // Explicit binding to this component
    this.handleColorSelection = this.handleColorSelection.bind(this);
  }
  ...
```

That one line of code fixed the problem!

However, there's a better way that's coming with ES7 called **Class Properties**. Class properties allow us to define properties within a class like we currently do with methods. The upshot is that it will allow us to define our methods as arrow function expressions - which are always bound to their surrounding functions context!

>Reminder: As we learned in the JavaScript classes lesson, classes are just syntactic sugar over constructor functions.

First, remove the explicit binding line of code we just added in the constructor:

```js
// remove this line of code!
this.handleColorSelection = this.handleColorSelection.bind(this);
```

Okay, here's the latest and greatest way, using _class properties_, to define a method used as a callback:

```js
handleColorSelection = (colorIdx) => {
  this.setState({selColorIdx: colorIdx});
}
```

I can assure you that using class properties for defining callbacks will become a best practice.

#### Summary

Writing event handler code can be challenging and error prone until you get used to it.

If things aren't working, be sure to `console.log` the value of `this` and closely read the error messages. Or better yet, set a breakpoint in the debugger - you haven't lived until you've set a breakpoint on a line of JSX! You'll find the source code of your components within the `webpack://` folder.

## Essential Questions

- **True or False: Does a method that mutates a component's state have to be defined within that component? Explain your answer.**

- **How does a nested component obtain a reference to a container component's methods?**

- **Is this code bogus or cool? Why?**

	```js
	<Square className="Square" handleClick={this.handleClick(5)} />
	```

## References

[Synthetic Events](https://facebook.github.io/react/docs/events.html)





