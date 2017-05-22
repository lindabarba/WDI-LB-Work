# Building Your First React App: A Tutorial

## Learning Objectives

By the end of this lecture you should be able to:

1. Start a React application using `create-react-app`
2. Reason about a React application's component hierarchy
3. Be able to differentiate between JSX and JavaScript

## A Quick Overview of React

React is a library used to build user interfaces (UI). We will be using React to build UI that is displayed in a web browser. We were just introduced to the fundamental concepts of React:

* components written in JSX
* data represented by props and state

*Once thing to keep in mind is that React is used to display data.* In React this done via components which take in props as arguments and return UI.

![Imgur](http://i.imgur.com/vb4pT81.jpg)

## What are We Building

We are going to build an application similar to Trello. We will call it React Tracker! Here is a mock-up of our application.

![Imgur](http://i.imgur.com/uDIcF5W.jpg)

This application is a simple "ticket" management system. It allows users to add tasks to a "Back Log". Once a task is created by a user the task is in one of three states:

1. Back Log
2. In Progress
3. Complete

A task moves through the different states from "Back Log" to "In Progress" and "In Progress" to "Complete".

[Here's](http://localhost:3000/) a demo of the application.

## Tutorial

What follows is a guide for building the application described above.

### Initial Configuration

Initialize the project using `create-react-app`.

```bash
$ create-react-app react-tracker
```

Let's navigate into the `react-tracker` directory and start the development server.

```bash
$ cd react-tracker
$ npm start
```

Navigate to `localhost:3000`. You just made an application using React. Great job!

Let's take a look at the code that `create-react-app` gives us.

Here are some things to note about the default React application we are given by `create-react-app`:

* In order for our `create-react-app` application to *build*<sup>1</sup> we need:
	- `public/index.html`
	- `src/index.js`
* **Hot module reloading**: When we make changes to our application we don't need to refresh the page to see them

<sup>1</sup>What do I mean by build? I mean that `webpack` takes all of the JSX code and converts it into JavaScript. Other things happen during the build process, but the aforementioned process is the most important.

#### Setting Up Our File Structure

We will be putting all of our code in the `src` directory. Let's modify our `src` directory to look like this:

**Note**: Below is the folder structure of the `src` directory in `react-tracker`.

```
|-index.css
|-index.js
|-components
			|- AddTask.js
			|- Board.js
			|- Lane.js			
```

* `index.js` - Where we will put all of our React code
* `index.css` - Where we will put all of our styles
* `components` - Where we will put all of our components (each one of our components will get its own file)

React is a library so we need to include it inside `index.js`. There are actually two related libraries we need to include. Inside `index.js`:

```js
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
```

`ReactDOM` was originally part of the React library. `ReactDOM` has methods associated with that allow us to attach our React components to the DOM.

### UI Architecture

**The way to start a React application is to break UI down into components**. Our application can be broken down like this:

![Imgur](http://i.imgur.com/iM3JC3B.jpg)

Each box represents a React component. From this picture we can derive our component hierarchy. Components in React have a parent-child relationship. There should only be one **root component** that all components are children of. This **root component** is the most top-level component and will be the component that is rendered to the DOM. In a React application only one component is passed to the `ReactDOM.render()` method and is therefore added to the DOM. In our application `<Board />` will be our top-level component.

```
	<Board /> (Red)
		<AddTaskLane/> (Orange)
		<Lane/> (Green)
		<Lane/> (Green)
		<Lane/> (Green)
```

> Let's create our `<Board />` component and append it to the DOM. For now we will put it inside `index.js` just to make sure we have everything hooked up correctly.

```js
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Board extends Component {
	render() {
		return <div>Hello World</div>
	}
}

ReactDOM.render(<Board />, getElementById('root'));
```

**All class components must have a render method that returns a single DOM node**.

We just created our first React application. The `ReactDOM.render()` method takes 2 arguments:

1. Our root component
2. The DOM node we are appending our root component to

In our `index.html` we have an anchor DOM node with an `id` of `root`.

> Let's start writing our `<Board />` component. We will need to update `index.js` to `import` our `<Board />` component.

### Adding State to Our Board Component

Our React application will have some data that it will render. Namely we are representing a list of tasks. Each task will have the following attributes:

* `id` - An unique numerical identifier
* `title` - A task title
* `description` - A task description
* `progressLevel` - The current level of progress on a given task which can be either "backlog", "in-progress" or "complete"

The way we *create* **mutable** data in our React application is with `state`. State is created in the `constructor()` method of a React component class. In React `state` is just a JavaScript object.

> Let's create our initial state.

### Creating a Stateless Functional Lane Component

Let's now create our `<Lane />` component. This component will be what we call a **stateless functional component** and will be a child component of `<Board />`.  A stateless functional component is a component that is written as a function that accepts `props` as a parameter and returns JSX. No state is created in a stateless functional component. Components that only have a `render()` method should be converted into stateless functional components. These components are strictly presentational. Add this below our `<Board />` component. Props are immutable data that is passed 

```js
let Lane = ({tasks, laneProgressLevel, updateState}) => {

	let laneTasks = tasks.map(task => {
		if (task.progressLevel === laneProgressLevel) {
			return (
				<div className="task" key={task.id}>
					<h2>{task.title}</h2>
					<p>{task.description}</p>
					<button onClick={() => {updateState(task.id, task.progressLevel)}}>
						Promote
					</button>
				</div>
			)
		}
	});

	return (
		<div className="lane">
			<h2 className="lane-header">{laneProgressLevel.toUpperCase()}</h2>
			{laneTasks}
		</div>
	)

};
```

Let's add some styles to `index.css` so we can see the lanes in our application. We add our styles to `index.css`.

Let's add our not-yet created `<Lane />` components to our `<Board />`'s `render()` method.

### Child Components Altering State

We will need to pass functions in our `<Board />` component to the child components that will need to modify the state in the `<Board />` component.
