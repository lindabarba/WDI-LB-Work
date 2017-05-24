<img src="https://i.imgur.com/fx2orT2.png">

# Intro to JSX
---

## Learning Objectives

#### Students Will Be Able To:

- Explain the benefits JSX provides
- Explain what JSX transpiles into
- Use JSX to define a component's UI
- Include props in JSX
- Embed JS expressions within JSX
- Explain how a component's UI gets rendered
- Render a "list" of components

## Roadmap

- JSX - What and Why?
- Transpiling JSX
- Basic Syntax of JSX
- Including `props` in JSX
- JavaScript Expressions in JSX
- Component Rendering
- Essential Questions

## JSX - What and Why?

#### What?

- **JSX** is an XML-like syntax extension to JavaScript. [XML](https://en.wikipedia.org/wiki/XML) is short for _extensible markup language_ and JSX it's one of those extensions - just like HTML is.
- Created by Facebook for use in React.
- It provides a way to concisely define tree structures with attributes - perfect for defining a DOM tree!
- It is transpiled into pure JavaScript. **Why is this necessary? - browsers**

#### Why?

- Why JSX? Very simple. As compared to pure JavaScript, JSX provides a more concise and clearer (better) way to define a UI.
- JSX resembles HTML, which allows us to more easily visualize the UI its JavaScript will create.
- 99.99% (a guess) of React apps are developed today using JSX to define the UI, not native JS.

## Transpiling JSX

Yesterday we discussed that developing real-world React apps requires tooling. One of the reasons tooling is necessary is for the transpiling of JSX into JavaScript that can run in the browser.

The most popular transpiler for JSX is [Babel](https://babeljs.io/). Babel originally was created because developers got tired of waiting for ES2015 features to be implemented in browsers. Babel has become the go to tool for enabling the use of tomorrow's features of JavaScript today. Babel also has the ability to transpile JSX into native JS.

Babel's website has a REPL that enables typing in some JSX and see what its pure JS equivalent is. Click the **Try it out feature** tab and make sure that **react** is selected as one of the _presets_.

We type our preprocessed code on the left and the pane on the right will show the compiled version.  Let's just type in something silly at first:

```js
const monkey = <monkey>Loves bananas</monkey>;
```

You will see the above compiled into:

```js
const monkey = React.createElement(
  "monkey",
  null,
  "Loves bananas"
);
```

**What observations do you have?**

Now let's make it a bit sillier. this JSX:

```js
const monkey = <monkey>Loves bananas<br/>and trees</monkey>;
```
Results in this JS:

```js
const monkey = React.createElement(
  "monkey",
  null,
  "Loves bananas",
  React.createElement("br", null),
  "and trees"
);
```

**What further observations do you have?**

>Note: In JSX, every element must be explicitly _closed_. Every tag must either have an opening **and** closing tag, or in the case of an [empty element](https://developer.mozilla.org/en-US/docs/Glossary/Empty_element) (a tag that has no content such as `<br>`, `<img>`, `<hr>`, etc.), unlike in HTML, we must include a forward slash before the closing angle bracket like we did with `<br/>` above.

Okay, we have the following observations regarding the JS for a component:

- There's a call to the `React.createElement` method that creates an element used internally by React.
- The first argument is the component's name.
- The second argument seems to be `null` so far - more on this next.
- Any arguments after the second define the children of the component. In the case of the `<br />`, React recognized this as its built-in component for an HTML `<br>` element and knowing that it cannot have children, its `createElement` method was only passed two arguments.

Now let's discuss that `null` second argument. It is for passing **props** to a component. You will learn more about props in a bit in more detail later today, however, you can think of them as key/value pairs, much like the attributes we put within HTML elements.

Let's add a prop and see what happens:

```js
const monkey = <monkey monkeyName='Curious George'>Loves bananas<br/>and trees</monkey>;
```

Now the transpiled JS looks like this:

```js
const monkey = React.createElement(
  "monkey",
  { "monkeyName": "Curious George" },
  "Loves bananas",
  React.createElement("br", null),
  "and trees"
);
```

So, I ask you - **Which is a more clear and concise way of defining a component's UI - JSX or JavaScript?**

In summary, in React, JSX is just syntactic sugar for:

```js
React.createElement(component, props, ...children);
```

## Basic Syntax of JSX

#### Basic Syntax Review

We wrote some silly JSX (`<monkey...>`) and used Babel's REPL to see how what JS it was transpiled into.

**What have we learned about the _syntax_ of JSX so far?**

#### Setting Up a React Playground

Let's use [codepen](https://codepen.io/) to experiment further with JSX.

Be sure to click **[Create]**, then **[New Pen]** and do the following to configure it to work with React:

1. Select **Settings** to open the settings dialog, then click on **JavaScript**
2. For **JavaScript Preprocessor** select **Babel**
3. Use the **Quick-add** dropdown to add **React**, then **React DOM**
4. Click **Save & Close**
5. We need an HTML element to append our React component to:

	```html
	<div id="root"></div>
	```
6. A little CSS:

	```css
	html, body {
	  height: 100%;
	  font: 2rem sans-serif;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}
	```
7. A simple component:

	```js
	class Greeter extends React.Component {
	  render() {
	    return (
	      <h1>Greetings Earthling</h1>
	    );
	  }
	}
	
	ReactDOM.render(
	  <Greeter />,
	  document.getElementById('root')
	);
	```

If you are seeing the text "Greeting Earthling" in Codepen's output, consider saving this pen in your account with a name like "React Template" and select the template option. Lastly, create a new pen from your new template.

#### More Syntax Rules

Besides what we've already learned:

- JSX uses XML syntax (elements within angle brackets) for defining components.
- All "empty" components (components with just a start tag - no closing tag) must be self-closed using a forward slash.
- **props** are camel-cased like `monkeyName='Curious George'`, never kebob-cased - **why? - dashes do not translate in JS**

There are a few other syntax rules:

- There are built-in React components for all of the HTML elements. These components are **always lowercased** - like the `<h1>` component used in the `<Greeter />` component.
- Our app's user-defined components are **always uppercased** - like the `<Greeter />` component.
- A component must have a **single root component (node)**. However, we will often want to _compose_ components from multiple components. To return multiple components from the `render` method they must be wrapped by a single component (like a `<div>`). For example, let's update the `Greeter` component like this:

	```js
	class Greeter extends React.Component {
	  render() {
	    return (
	      <div>
	        <h1>Greetings Earthling</h1>
	        <h2>We have come in peace</h2>
	      </div>
	    );
	  }
	}
	```
	Removing the `<div>` would create a syntax error.
	
	<details>
  	<summary>**Can you reason WHY only a single node can be returned? - a function can only a single element**</summary>
  	>Because the `render` method, like any function, can only return a single "thing"!
	</details>
	
#### Curiosity

We now know that JSX is transpiled into a method call to `React.createElement`, however, we haven't seen what that method call returns.

Let's add this to the bottom of the pen:

```js
const greeter = <Greeter />;
console.dir(greeter);
```

An object of course!

## Including `props` in JSX

Later today you will learn much more about `props` and `state` in React, but let's cover a few basics regarding `props`.

The syntax of adding props to a component is much like defining attributes on an element.

Many pre-defined props map to HTML attributes. [These docs](https://facebook.github.io/react/docs/dom-elements.html) list the supported HTML attributes and discuss important differences. For example, we cannot use **class** to assign CSS classes to a built-in HTML component, instead we must use **className** because _class_ is a reserved word in JavaScript.

Many props map to HMTL attributes but have a slightly differently implementation, for example, the `style` prop is used to style a component inline, however, it must be passed an object consisting of CSS property/values, not a string like its HTML counterpart. **the style prop must get an object(key:value pair)**

Let's pass a prop to the `<Greeter />` component:

```js
ReactDOM.render(
  <Greeter earthling='Wilma' />,
  document.getElementById('root')
);
```

When we logged out the component object returned by `React.createElement`, there was a `props` property that was set to an empty object. This object holds the props that we pass to a component.

<details>
<summary>
**Because a component is an object, and the object has a _props_ property, how do we access _props_ from methods within the object?**
</summary>
>By using the `this` keyword - `this.props`
</details>

## JavaScript Expressions in JSX

You can embed any JavaScript **expression** in JSX by wrapping it in curly braces.

Now let's use the `earthling` prop that was passed:

```js
<div>
  <h1>Greetings Earthling, {this.props.earthling}</h1>
  <h2>We have come {new Date().getDay() === 1 ? 'on a Monday' : 'in peace'}</h2>
</div>
```

`this.props.earthling` IS a JavaScript expression and its result is being embedded in the JSX.

Here's a little more interesting expression:

```js
<div>
  <h1>Greetings Earthling</h1>
  <h2>We have come {new Date().getDay() === 1 ? 'on a Monday' : 'in peace'}</h2>
</div>
```

Awesome!

#### Expressions vs. Statements in JS

We can only embed **expressions**, not JS statements.

JavaScript expressions produce a value and can be used wherever a value is expected (logged out, assigned to a variable, provided as an argument to a function call, etc.).

Statements basically perform an action. A program consists primarily of statements.

We were able to use the `ternary` operator above because it's an expression, whereas we would not be able to use an `if` statement.

>Although JavaScript allows us to write an expression when it expects a statement, the opposite is not true - you cannot use write a statement when JS expects an expression, for example, you cannot supply `console.log('something')` as an argument in a function call.

#### JSX is an Expression Too

JSX transpiles into a function call, which returns an object, and an object is an expression!

This means that you can use JSX inside of `if` statements and `for` loops, assign it to variables, accept it as arguments, and return it from functions:

```js
function getGreeting(user) {
  if (user) return <h1>Hello, {formatName(user)}!</h1>;
  return <h1>Hello, Stranger.</h1>;
} 
```

## Component Rendering

#### When & How Components Get Rendered

Every component object has a `render` method which is internally called by React  when:

1. The component is rendered initially with `ReactDOM.render`.
2. When the `setState` method is called to update a component's state.

Be aware that when a component is rendered, all of its children components are rendered as well.  This cascade of rendering is how an entire app gets rendered with just one `ReactDOM.render` call.

#### Rendering Lists (Arrays) of Components

Quite often we need to render "lists" of components, for example, a list of To Dos :)

This afternoon you're going to learn about **state** in detail, so we won't get into it here. Just be aware that the array in the `render` method below would more commonly be held in the **state** object.

How about an array of things the aliens want from Earth:

```js
class Greeter extends React.Component {
  render() {
    let things = ['Water', 'Cattle', 'Plutonium', 'Gold'];
    let listOfThings = things.map(thing => <li>{thing}</li>);
    return (
      <div>
        <h1>Greetings Earthling, {this.props.earthling}</h1>
        <h2>We have come {new Date().getDay() === 1 ? 'on a Monday' : 'in peace'}</h2>
        <h3>Give us your:</h3>
        <ul>
          {listOfThings}
        </ul>
      </div>
    );
  }
}
```

Pretty cool. JSX automatically spreads out the components in an array.

Note that because `things.map...` is an expression, evaluating to a new array, it's actually possible to put it right in the JSX like this:

```js
class Greeter extends React.Component {
  render() {
    let things = ['Water', 'Cattle', 'Plutonium', 'Gold'];
    return (
      <div>
        <h1>Greetings Earthling, {this.props.earthling}</h1>
        <h2>We have come {new Date().getDay() === 1 ? 'on a Monday' : 'in peace'}</h2>
        <h3>Give us your:</h3>
        <ul>
          {things.map(thing => <li key={thing}>{thing}</li>)}
        </ul>
      </div>
    );
  }
}
```

Note that a `key` prop has been added. Whenever React has a list of components, it wants a `key` prop so that it can more efficiently track changes. The value assigned to the key can be any primitive value, but it needs to be unique. It's also better to use a value from the data itself instead of an index.

## Essential Questions

- **In your own words, what is JSX and why do we use it?**

- **How many component nodes can be returned from a component's `render` method?**

- **We use _______ to pass information as key/value pairs to a component.**

- **To embed JS expressions within JSX, we wrap the expressions with ________?**

## References

[React Docs - JSX](https://facebook.github.io/react/docs/introducing-jsx.html)

[Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)
