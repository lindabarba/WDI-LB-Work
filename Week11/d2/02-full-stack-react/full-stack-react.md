<img src="https://i.imgur.com/fx2orT2.png">

# Full-stack React
---

## Learning Objectives

| Students Will Be Able To: |
| --- |
| Build a React app for production |
| Logically layout a full-stack file structure |
| Configure an Express app to serve a React app's **index.html** file |
| Configure an Express app to accommodate client-side routing |
| Configure a React app for full-stack development |

## Roadmap

- Why Full-stack?
- Architecting a Full-stack App
- Open the Starter Code
- Build the React App's Production Code
- Code the Express App
- Configure React for Full-stack Development
- Essential Questions
- Bonus - Deploying to Heroku
- Lab

## Why Full-stack?

Thus far, our React apps have been static, front-end only apps.

It's possible for front-end only SPAs to have lots of functionality if they incorporate calls to **third-party** APIs.

However, it's common for a SPA to need to be architected to include a back-end server app for tasks such as:

- Performing CRUD
- Authenticating users

Such an app, where we code the front-end and the back-end, as you know, is a full-stack application.

## Architecting a Full-stack App

Up until this point, we've taken for granted that full-stack apps, like your Express and Rails projects, we're a single, integrated codebase.

However, you've now seen that developing a React SPA is more complex due to the fact that it involves tooling and includes it's own development server.

It get's even more complex when you want to serve your React app from a real server and have the React SPA be able to make AJAX calls to it - in both **development and production** environments.

#### Development Environment Issues

If we're going to develop using the MERN-stack, we have to figure out how we're going to:

- Use React's Development Server (`npm start`)
- **and**, run `nodemon` to productively develop the Express back-end

#### Production Environment Issues

To be able to deploy our MERN-stack app, we're going to have to:

- **Build** the React front-end code to make it production ready
- Configure the Express app to serve the production code

#### Possible Architectures

There are two general architectures we could pursue:

- Maintain **two** separate projects, one for the React SPA, the other for the Express back-end.
- Integrate the codebase for both the React front-end and the Express back-end.

| Architecture | Pros | Cons |
| --- | --- | --- |
| Separate Projects | Easier to set up. | Manage two projects and git repos. Must deploy to two separate hosts, **or**, copy built over the built front-end code to the server project before each deployment. |
| Single Project | A single codebase. | More difficult to set up and configure. |

Me likely the single, integrated project approach, however, what does the structure of a single project look like?

Again, two options:

- Start with an Express app, then generate the React app within it (naming it `client` or something similar). This approach will have nested **package.json** files and **node_modules** folders requiring you to "know where you are" when installing additional Node modules.
- Start with a React app, then add an Express **server.js** and other server folders/files "around" it.

Since we're going to continue to work with the Mastermind game app, we'll go with the second approach...

## Open the Starter Code

The starter code is the React Mastermind app that includes the timer and practice exercises implemented from the previous lesson.

#### Setup

Ensure the starter code is ready:

1. `cd` to  the project folder in Terminal
2. Install the Node modules: `$ npm install`
3. Open your text editor

## Build the React App's Production Code

The server does not care about the code in the React app's `src` or `public` folders - they are for development purposes only. 

The Express server needs to be configured to serve the React app's **production** code - but we don't have production code, yet...

The `create-react-app` CLI has a build utility and a **build** script in **package.json**. Let's run it:

`$ npm run build`

>Note: npm requires us to use the `run` command for scripts other than `start`.
 
Examining our project's structure reveals a new **build** folder containing a production ready **index.html**, along with **css** & **js** folders. Look at those production ready files just ready to be served up by an Express back-end...

## Code the Express App

We're going code our own Express app from scratch. This will be easier than using `express-generator` since we're starting with a fully-built React app and want to build a server app "around" it within the same project.

#### Install the Modules for the Express Server

For now, we're only going to install a minimal number of modules for the Express app:

`$ npm i express morgan serve-favicon --save`

>Note: We don't need a view engine because our server will be either serving static assets (index.html & CSS and JS files) or responding to AJAX requests with JSON.

In the future, to add database access, we would install `mongoose`, `body-parser` and `dotenv`.

#### Create `server.js`

Let's write our server:

1. `$ touch server.js`.
2. At the top of **server.js**, let's do all the familiar stuff: `require` the modules, create the Express app and mount the `morgan` logging middleware:

	```js
	var express = require('express');
	var path = require('path');
	var favicon = require('serve-favicon');
	var logger = require('morgan');
	
	var app = express();
	
	app.use(logger('dev'));
	```
3. Mount the `serve-favicon` & `static` middleware so that they serve from the **build** folder:

	```js
	// Configure both serve-favicon & static middlewares
	// to serve from the production 'build' folder
	app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
	app.use(express.static(path.join(__dirname, 'build')));
	```
4. A single "catch all" route is required for client-side routing to work properly:

	```js
	// Put API routes here, before the "catch all" route
	
	// The following "catch all" route is necessary for
	// a SPA'sclient-side routing to properly work
	app.get('/*', function(req, res) {
	  res.sendFile(path.join(__dirname, 'build', 'index.html'));
	});
	```
	>Note: Since this route is a "catch all" that matches every `get` request, be sure to mount API or other routes before it.

5. Set the port for development to use 3001 so that React's dev server can continue to use 3000 and finally tell the Express app to listen for incoming requests:

	```js
	// Configure to use port 3001 instead of 3000 during
	// development to avoid collision with React's dev server
	var port = process.env.PORT || 3001;
	
	app.listen(port, function() {
	  console.log(`Express app running on port ${port}`)
	});
	```

#### Try It Out

Again, React is using the **start** script, so be sure to start the Express app with `$ nodemon server.js`.

Be sure to browse to `localhost:3001` - note the port number.

Congrats!

## Configure React for Full-stack Development

Although everything seems to be working perfectly, there be a problem **during development** (not production).

Because the React app is being served from `localhost:3000` during development, that's where all AJAX calls to the server will go, however, our server is running on `localhost:3001`.

Luckily, the fix is an easy one. The React development server allows us to specify where API/AJAX calls with _relative paths_ should made.

The fix is to add a `"proxy"` key to **package.json**:

```js
...
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  "proxy": "http://localhost:3001"
}
```
Now during development, the SPA can make AJAX calls to the server like `fetch('/api/todos)` and they will be sent to `localhost:3001`.

Welcome to the MERN-stack!

## Essential Questions

- **What is the command that readies a React app for production? - npm run build**
- **What folder holds a React app's production-ready code? - build**
- **What Express middleware needs to be configured to serve assets from the `build` folder? - ```static```**
- **Why does a "catch all" route need to be mounted in Express? - for client-side routing to work**

## Bonus - Deploying to Heroku

You want to play Mastermind on your phone or have friends play it, right? Get it deployed! 

Once the Express server has been tested, it's **almost** ready to be deployed to Heroku.

Heroku, if it does not have a **Procfile**, will look for a **start** script in **package.json**. Yes, we have a **start** script, but it's configured to start React's dev server - not our run **node server.js**.

The easy way out is to create that **Procfile**:

- `$ touch Procfile`

Then, one line inside **Procfile** takes care of informing Heroku how to boot our app:

`web: node server.js`

One more change, React adds the **/build** folder to the **.gitignore** - comment it out:

```
# production
#/build
```

Now you are set to deploy to Heroku. Don't forget that you deploy by pushing the `master` branch to the `heroku` remote (created with `heroku create`).

Play it anywhere!
<img src="https://i.imgur.com/5mGAeIB.png">

>#### IMPORTANT: Be sure to re-build the React app if anything has been changed since the last deployment

## Lab

Looking for a challenge?

Now that we've taken Mastermind full-stack, what better way to get some practice using a back-end's API to persist high scores?

##### Hints:

- Plan what the UI should look like. Perhaps another client-side route and React "page" component is in order.
- The back-end API will work no differently than what we've already built in class. Routing, returning JSON - it's all the same.
- What will the high-score schema look like? Keep it simple, the players `initials`, `numGuesses` and `seconds` should work.
- The `numGuesses` should be prioritized over `seconds`. Will the back-end limit the number of high-scores? I like 20 or so.
- When a player has guessed correctly, that's the moment to check if the score should be persisted.
- If a score has made the list, how about letting the user know!
- Don't forget to install the necessary node modules like `dotenv`, `mongoose` & `body-parser`. You will not need `method-override` (do you know why?).
- Also, you'll need a hosted MongoDB if you want to deploy. You already have an mLab account, so go for it.








