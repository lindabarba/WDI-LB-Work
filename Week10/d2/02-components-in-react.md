<img src="https://i.imgur.com/fx2orT2.png">

# Components in React
---

## Learning Objectives

#### Students Will Be Able To:

- Design a UI using components
- Decide when to use _presentational_ components
- Define a presentational component as a stateless functional component
- Decide when to use _container_ components
- Define container & presentational components using classes

## Roadmap

- "Component Thought"
- Review of Built-in vs. User-defined Components
- Categorizing Components as _Presentational_ or _Container_ Components
- Start a New React App - `react-mastermind`
- Exercise: Identify the App's Components
- React Development Approach
- Defining **Presentational** Components as Stateless Functional Components
- Defining Components as Classes
- Essential Questions
- Lab: Define the Remaining Components for Mastermind

## "Component Thought"

Components have become the fundamental building block of modern-day front-end libraries/frameworks such as React, Angular, Vue, etc.

To build a React application, we must build the UI with a hierarchy of components:

<img src="https://i.imgur.com/TqerRDf.png">

We must think in terms of components. This "Component Thought" requires us to:

- Build lots of small manageable components that have a single responsibility.
- Compose these components into other components.
- Compose an entire "screen", or view, with a hierarchy of components.
- Use client-side routing in a SPA to render the "screens" according to which route is active.

Until we learn about routing in React at the end of the week, we will concern ourselves with only with building a single screen/view.

#### f(d) = V

This is one way to think of components in React: `f(d) = V`, where a component is a function (`f`) that accepts data (`d`) and returns a view (`V`).

Does `f(d) = V` help you write better code? Probably not, but it's certainly a way the experts think about React.

## Review of Built-in vs. User-defined Components

#### Built-in Components

As we've already seen, React has several built-in components that we use to render HTML elements.

<details>
<summary>**Syntatically, what distinguishes a built-in component from our user-defined components?**</summary>
>React components are lower-cased, for example `<div>`.
</details>

#### User-defined Components

Our user-defined components must be capitalized.

<details>
<summary>Thinking about our user-defined components, going into the lowest-level components, **what must our low-level components ultimately be comprised of?**</summary>
>React's built-in HTML components - HTML is what the browser knows and loves.
</details>

## Categorizing Components as _Presentational_ or _Container_ Components

So you've seen components that have **state** and components that only have **props** (or neither) - why is this? How do we know which components _should_ have state, or just props? That's what we're going to discuss in this section.

#### Two Categories of Components

To build better UIs with components, experts like Dan Abramov within the React community have established guidelines to separate components into one of two different categories:

- **Presentational** (formerly known as "dumb components")
- **Container** (formerly known as "smart components")

#### Characteristics of _Container_ Components

- Are concerned with how things work, not how they look.
- Provide the data and behavior to presentational or other container components.
- Are often stateful, as they tend to serve as data sources to nested components.
- May contain both presentational and container components, but usually don’t have any HTML components of their own except for some wrapping `<div>`s, and never have any styles.

#### Characteristics of _Presentational_ Components

- Are concerned with how things look.
- Receive data and methods exclusively via props.
- Have no dependencies on the rest of the app.
- Don’t specify how data is loaded or mutated.
- Highly reusable.
- Rarely have their own state, and if they do, it’s UI-related state rather than data. Example: state to represent whether some of the component's UI is collapsed or open.
- Stateless are written as functional components unless they need state or lifecycle hooks (for optimization purposes). Lifecycle hooks will be discussed next week.
- May contain other presentational and container components.

<details>
<summary>**In a React app, do you believe there will be more _presentational_ or _container_ components?**</summary>
>A React app will have more **presentational** components than **container** components.
</details>

## Start a New React App - `react-mastermind`

#### Mastermind - _"A game of cunning and logic for two players"_

Developing a game in React provides excellent practice designing and developing React components.

Our goal is by the end of the week, to have a working game of [Mastermind](https://en.wikipedia.org/wiki/Mastermind_(board_game)).

You're not familiar? Come on, it was only named game of the year - in 1973 :)

It used to take two players to play Mastermind because one player had to set the secret code and score the guesses of the other player trying to break the code.

Luckily, computers have made it possible for those without friends to play games like Mastermind.

You can play a version online [here](http://www.web-games-online.com/mastermind/).

#### Generate the App

Because you might want to add this project to your GitHub, move **outside** of the student repo then: `$ create-react-app react-mastermind`

After the process completes: `$ cd react-mastermind`

Spin up the dev server: `$ npm start`, which will also automatically browse to the app.

Let's clean-up **App.js** so that just a `<header>` is rendered:

```js
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <header className="App-header">React Mastermind</header>
    );
  }
}

export default App;
```

Note that we're reusing the `App-header` CSS class, so let's clean up **App.css** while we're at it:

```css
.App {
  text-align: center;
}

.App-header {
  background-color: #222;
  height: 50px;
  padding: 20px;
  color: white;
  font-size: 40px;
  text-align: center;
}
```

With the app created and cleaned up, consider creating a repo and an initial commit. If you do, try to remember to do additional commits at milestones.

## Exercise: Identify the App's Components

#### Start With A Wireframe

But first, we'll need a wireframe of the Mastermind game. Here's an image of a "clean/minimal" Mastermind application - let's pretend it's a wireframe for this exercise:

<img src="https://i.imgur.com/mnIl2uA.jpg">

#### Outline Components

Looking again at the image near the top of the page shows how we might identify components by outlining and naming the individual components. Doing so reveals the hierarchy and relationship between them.

As a class, let's identify the components on the wall.

## React Development Approach

We all know how challenging it can be to get started developing an app. Of course, this app is only a front-end app, so we don't need to be concerned about a database, server routes, etc.

One common approach is:

1. Identify potential components (like we did above).
2. Identify the application's data-model (state). Remember: **State is the single-source of truth** in an application.
3. Start coding and styling **presentational** components in a top-down approach.
4. Put state in top-level **container** components initially.
5. As development progresses, identify where more container components should be used to move state closer to the presentational components that need it and below the components that don't. More on state later today. This ongoing refactoring is like a lot of development - more art than science.

We don't have time in this lesson to focus on the data model that a game of Mastermind requires. We'll come back to it later.

Lastly, [Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html) from the docs is a fantastic read when you get a chance.

Let's start defining some components...

## Defining **Presentational** Components as Stateless Functional Components

#### What Are They?

**Stateless functional components** were introduced in version 0.14 of React (current version is 15.5.4 - yes, they changed their versioning scheme).

As mentioned, most of the components you write will be presentational, simply composing other components and perhaps rendering their props.

Stateless functional components provide a simpler syntax for these components where you can take props as an argument and return the element you want to render, for example:

```js
// A functional component using an ES2015 (ES6) arrow function:
const Aquarium = (props) => {
  let fish = getFish(props.species);
  return <Tank>{fish}</Tank>;
};

// Then can be used like this:
<Aquarium species="rainbowfish" />
```

These components behave just like a React class component with only a `render` method defined. Functional components do not have lifecycle methods (next week), but you can set `propTypes` (later today) as properties on the function.

#### Write Our First Mastermind Component

Assuming we want a component named `<GameBoard />`:

1. Create a **components** folder within the **src** folder. All our new components will go inside this new folder.
2. Create a **GameBoard** folder within the **components** folder. This is a best practice that allows you to organize the components module file with other files used by component (css files, images, tests, etc.).
3. Create a **GameBoard.js** module within the **GameBoard** folder.  Note that the name of the module is the same as the component.
4. Add the following code to:

	```js
	// When using JSX, React must be in scope
	import React from 'react';
	
	const GameBoard = (props) => {
	  return (
	    <div>
	      This is the GameBoard
	    </div>
	  );
	}
	
	export default GameBoard;
	```
5. Update **App.js** to:

	```js
	import React, { Component } from 'react';
	import './App.css';
	// Must import components used in the JSX
	import GameBoard from './components/GameBoard/GameBoard';
	
	class App extends Component {
	  render() {
	    return (
	      <div>
	        <header className="App-header">React Mastermind</header>
	        <GameBoard />
	      </div>
	    );
	  }
	}
	
	export default App;
	```
	<details>
	<summary>**Why is the `<header>` and `<GameBoard>` components wrapped by a `<div>` component?**</summary>
	>Components can only return/render a single node. **Why?**
	</details> 

#### YOU DO: Write Another Component as a Stateless Function Component (5 mins):

In addition to the `<header>` and `<GameBoard>`, we will want a `<ColorPicker>` component that allows a user to "select" a color by clicking on it.

>Note: We won't worry about layout today, but we'll do that tomorrow.

Go ahead and create the `<ColorPicker>` component - just like we did with `<GameBoard>`.

## Defining Components as Classes

Both **presentational** and **container** components may be written as JS classes.

However, any component that has its own state or needs to tap into component's lifecycle hooks (next week), has to be defined as a class. The reason is that classes allow us to define methods, as well as inherit methods such as `setState`, etc.

Let's examine the `<App>` component to see how a class is used to define components.

A few observations:

1. This is a very simple component that currently does not have any state, etc.
2. The only method is `render`. This is the only required method when defining a component using a class.
2. If it had state, it would have a `constructor` method, which would be used to initialize the component's state.
3. Because there's no state, there's no other methods defined that would be used to update the state, such as click event handlers that might need to be called by its nested components.
4. The first line is using ES2015's `import` statement to import functionality from the _react_ module. The **React** object is the _default export_ and **Component** is a class that's also exported (but not the default), this is why we have to put it in curly braces (similar to [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) in ES2015).
5. The class is usually the default exports (same as stateless functional components).

You'll be working with class components this afternoon when you start working with state.

## Essential Questions

- **A UI in React is hierarchy of ____________. - components**

- **Will there be more _presentational_ or _container_ components in a React app? - presentational**

- **Can a _presentational_ component be defined using a class? - yes, both can be**

- **What is the use case of _container_ components? - functionality, logic - has state & methods**

## Lab: Define the Remaining Components for Mastermind

Build out the components for the Mastermind app based on the component **hierarchy** we identified earlier:

- `<App>`
	- `<GuessRow>` x N
		- `<GuessPegs>`
			- `<GuessPeg>`
			- `<GuessPeg>`
			- `<GuessPeg>`
			- `<GuessPeg>`
		- `<GuessScore>`
	- `<NewGameButton>`
	- `<ScoreButton>`

For now, all of the components can be defined as stateless functional components.

When finished, it might look something like this:

<img src="https://i.imgur.com/e4n0R2V.png">

## References

[React Docs - Components & Props](https://facebook.github.io/react/docs/components-and-props.html)

[Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html)


