<img src="https://i.imgur.com/fx2orT2.png">

# Component Lifecycle Methods
---

## Learning Objectives

| Students Will Be Able To: |
| --- |
| Explain the use case for lifecycle methods |
| List the three phases lifecycles are grouped into |
| Override a lifecycle method |

## Roadmap

- The Lifecycle of Components
- The Lifecycle Methods
- Review the Starter Code
- Overriding the Lifecycle Methods
- Adding a Game Timer to Mastermind
- Essential Questions
- Practice Exercises

## The Lifecycle of Components

#### Quick React review:

- **A React app's UI consists of a hierarchy of _________. components**
- **What method do we use to change a component's state? setState**
- **What happens when use invoke the above method? all is re-rendered from that component down**

#### What are Lifecycle Methods

When a React app first loads and/or when state is changed, React components are instantiated, updated, and destroyed.

These three **phases** represent a component's **lifecycle** and are more formally called:

- **Mounting** - the phase that occurs when an instance of a component is being created and inserted into the DOM
- **Updating** - the phase that occurs when a component is being re-rendered when state changes
- and **Unmounting** - the phase that occurs when a component is being removed from the DOM and destroyed

React's `Component` base class, that we subclass using `extends`, has several methods that React automatically invokes during a component's lifecycle process.

For example, you are already familiar with a couple of them: `constructor` and `render`.

#### Why do Lifecycle Methods Exist?

In many React apps, sometimes overriding just the `render` method is not enough.

**Lifecycle methods enable developers to write code that executes during the stages of a component's lifetime.**

Some use cases that require overriding certain lifecycle methods are:

- Making AJAX calls
- Animations
- Performance optimization
- Adding/removing event listeners & timers

Before we look at specific lifecycle methods, let's set up the provided starter code...
 
####NOTES ON THE GAME:  
There is a ```pages``` directory to organize the views. 
 
## Review the Starter Code

Ensure the starter code is ready to go:

1. `cd` to  the project folder in Terminal
2. Install the Node modules: `$ npm install`
3. Open the project in your text editor
4. Spin up the dev server: `$ npm start`

The dev server should automatically open Mastermind in the browser, which should look like this:
<img src="https://i.imgur.com/4sllgdP.png">

Since the last time you saw the Mastermind app in the _Handling Events in React_ lesson, routing has been implemented using components from the `react-router` module.

There are two route paths: The `/` URL is for playing the game; and `/settings` is for selecting the difficulty level of the game:
<img src="https://i.imgur.com/eSR0qLR.png">

## The Lifecycle Methods

The following diagram lists the lifecycle methods available on components:

<img src="https://i.imgur.com/R1WSXS6.jpg">

#### Mounting Phase (Initial Render of a Component)

| Lifecycle Method | When Invoked | Uses |
| --- | --- | --- |
| `componentWillMount`<br>Args: `()` | Before `render()` & mounting | Use to further initialize `state` without triggering another `render()`. |
| `render`<br>Args: `()` | Called after `componentWillMount()`. The only method required to be overridden. Never modify state within. | Renders the component to the virtual DOM. Nothing will be rendered if `false` is returned. |
| `componentDidMount`<br>Args: `()` | Invoked after the component has been added to the DOM. | One of the most useful methods. Access raw DOM nodes, add event listeners & timers, load data via AJAX, etc. |

#### Updating Phase (State or Props Change)

| Lifecycle Method | When Invoked | Uses |
| --- | --- | --- |
|`componentWillReceiveProps`<br>Args: `(nextProps)` | Invoked before a mounted component receives new props. Called even if props may not have changed. Not called on inital rendering. | Use to examine props and compute state if based on values of props. |
| `shouldComponentUpdate`<br>Args: `(nextProps, nextState)` | Invoked before rendering when props or state are updated. | Performance optimization - gives us a chance to exit the remaining lifecycle by returning `false`, however, does not prevent child components from rendering if their state has changed. |
|`componentWillUpdate`<br>Args: `(nextProps, nextState)` | Invoked immediately rendering. Won't be invoked if `shouldComponentUpdate()` returns `false`. | Use to prep for an update about to happen. |
|`componentDidUpdate`<br>Args: `(nextProps, nextState)` | Invoked after rendering. | Perform AJAX based on prop values changing. Manipulate DOM using libraries such as jQuery (although this is not recommended). |

#### Unmounting Phase

| Lifecycle Method | When Invoked | Uses |
| --- | --- | --- |
|`componentWillUnmount`<br>Args: `()` | Invoked immediately before a component is removed (unmounted) from the DOM and destroyed. | Perform any necessary cleanup in this method, such as cancelling timers, removing event listeners, etc. |

## Overriding the Lifecycle Methods

In case it's not obvious, in order to use lifecycle methods, the component needs to be written as a `class`, not as a _stateless functional component_.

We override lifecycle methods the same way we override any method in the superclass, by simply defining the methods.

Let's override the `componentWillMount` method in **App.jsx**:

```js
class App extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign(
      {},
      this.getInitialState(),
      {difficultyLevel: 0, colors: colorTable[0].colors}
    );
  }

  /*---------- Lifecycle Methods ----------*/

  componentWillMount() {
    console.log('App: componentWillMount');
  }
  
  ...
```

Checking the console of the browser should now show `App: componentWillMount` logged out.

#### Practice (5 mins)

1. Override the `componentDidMount` method and log out a message like we just did above.
2. Add `` as the first line in the `render` method.

After the app refreshes, console should show something like this:

<img src="https://i.imgur.com/D1AEFKG.png">

## Adding a Game Timer to Mastermind

It would be cool to have a timer to keep track of how long it takes to break the code:

>As a player, I want to see how long I'm taking to crack the code so that there will be some urgency.

#### App's Implementation Logic

The app will:

- Render a single `<GameTimer>` component.
- Maintain the `elapsedTime` in state. Holding `elapsedTime` in `<App>` is necessary if we want to persist them one day.
- Pass these props to `<GameTimer>`:
	- `elaspedTime` (number) - the current elapsed time to render.
	- `interval` (number) - the "tick" interval. For this app, it will always be set to 1000 milliseconds (one second).
	-  `handleTick` (callback method) - the method to be invoked with every "tick"
	- `isTiming` (boolean) - let's `<GameTimer>` know if it should invoke `handleTick` or not. We will want to pass `true` when the game is being played, and `false` to stop the timer when the code has been guessed correctly.

#### Why Are Lifecycle Methods Necessary?

Each JavaScript timer consumes system resources (memory and CPU).

Since the `<GameTimer>` component will be using a timer, we want to make sure that it destroys the timer when itself is destroyed. For example, every time the player switches to the set difficulty route, `<GameTimer>` is destroyed and then created when the player returns to game play.

If `<GameTimer>` doesn't destroy the current timer before creating a new timer, timers might pile up.

The key to preventing this "memory leak" is to override the `componentDidMount` and `componentWillUnmount` lifecycle methods.

#### Component's Implementation

Although the `<GameTimer>` will not have any state, we cannot write it as a _stateless functional component_ - **why? - to access Class lifecycle methods so we can overwrite it later**

Let's do this:

1. Create a **src/components/GameTimer** folder.
2. Create a **GameTimer.jsx** file for the component's class.
3. Create a **GameTimer.css** file to hold CSS dedicated to the `<GameTimer>`.
4. Add some minimum code to define the component in **GameTimer.jsx**:

	```js
	import React, {Component} from 'react';
	
	class GameTimer extends Component {
	  render() {
	    return (
	      <div>
	          GameTimer
	      </div>
	    );
	  }
	}
	
	export default GameTimer;
	```
5. Render the component within **GamePage.jsx** (baby steps):

	Import `<GameTimer>`
	
	```js
	import NewGameButton from '../../components/NewGameButton/NewGameButton';
	// new import below
	import GameTimer from '../../components/GameTimer/GameTimer';
	```
	Render `<GameTimer>` after the `<ColorPicker>`:
	
	```html
	...
	<ColorPicker
	    handleColorSelection={props.handleColorSelection}
	    colors={props.colors}
	    selColorIdx={props.selColorIdx}
	  />
	  <GameTimer />
	  ...
	```

6. The text "GameTimer" should now be showing. Now let's add `elapsedTime` state to `<App>`:

	```js
	getInitialState() {
	  return {
	    code: this.genCode(colorTable[0].colors.length),
	    selColorIdx: 0,
	    guesses: [this.getNewGuess()],
	    // new state below
	    elapsedTime: 0
	  };
	}
	```

7. Pass `elapsedTime` as a prop:

	First to `<GamePage>` from within **App.jsx**:
	
	```html
	<GamePage
	  ...
	  handleScoreClick={this.handleScoreClick}
	  // new prop below
	  elapsedTime={this.state.elapsedTime}
	/>
	```
	
	Now down to `<GameTimer>` from within **GamePage.jsx**:

	```html
	<GameTimer elapsedTime={props.elaspedTime} />
	```
8. Update `<GameTimer>`'s `render` method to display `elapsedTime` formatted as `min:sec`:

	```js
	formatElapsedTime(seconds) {
	  function pad(val, places) {
	    var s = val.toString();
	    return '0'.repeat(places - s.length) + s;
	  } 
	  return `${pad(Math.floor(seconds / 60), 2)}:${pad(seconds % 60, 2)}`;
	}
	
	render() {
	  return (
	    <div>{this.formatElapsedTime(this.props.elapsedTime)}</div>
	  );
	}
	``` 
9. Cool. Now let's style by adding a class to the `<div>` in **GameTimer.js**:

	```html
	<div className='GameTimer'>{this.formatElapsedTime(this.props.elapsedTime)}</div>
	```
	Then, define the class within **GameTimer.css**:

	```css
	.GameTimer {
	  display: flex;
	  justify-content: center;
	  align-items: center;
      font-family: 'Roboto Mono', monospace;
      font-size: 20px;
	  color: grey;
	  height: 50px;
	  margin: 20px 0;
	}
	```
	Note that the **Roboto Mono** Google font is being loaded in the `<head>` of **index.html**.<br><br>Let's also update **ColorPicker.css** to remove the extra margin below it by removing the `margin-bottom` declaration - this will center `<GameTimer>` between the `<ColorPicker>` and the `Difficulty` link/button.
	
10. Import **GameTimer.css** into **GameTimer.jsx** - **you got this!**	
11. Let's create the `handleTick` callback method in **App.jsx**:

	```js
	handleTick = () => {
	  this.setState((prevState) => ({
	    elapsedTime: ++prevState.elapsedTime
	  }));
	}
	```
	Because we are using existing state to calculate new state, we should use the approach of providing `setState` with a function instead of an object. The function then returns an object.
	
12. Pass the `handleTick` method all the way down to the `<GameTimer>` component - **you got this!**

13. Time to add the `componentDidMount` lifecycle method in **GameTimer.jsx**:

	```js
	/*---------- Lifecycle Methods ----------*/
	
	componentDidMount() {
	  this.timerId = setInterval(
	    this.props.handleTick,
	    1000
	  );
	}
	```
	We are saving the returned timer id in a property of the component so that we can destroy the timer - that's next...
	
14. Add the `componentDidUnmount` lifecycle method to destroy the existing timer when `<GameTimer>` itself is destroyed:

	```js
	componentWillUnmount() {
	  clearInterval(this.timerId);
	}
	```
	JavaScript's `clearInterval` method removes the timer identified by the id passed to it.
	
Congrats - the `<GameTimer>` is looking sweet!

## Essential Questions

- **In your own words, what do lifecycle methods allow developers to do?**

- **What are the three phases lifecycle methods are grouped into?**

- **Name two lifecycle methods.**

## Practice Exercises

During the planning, we discussed passing in a couple of other props to `<GameTimer>`:

- Allow the time between ticks to be set using an `interval` prop.

- Stop the timer by passing it an `isTiming` boolean as a prop. If the value is `false`, then do not invoke the `handleTick` callback. The value of the `isTiming` prop should be `true` unless the player has correctly cracked the code.

## References

[React Docs - The Component Lifecycle](https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle)





