![](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/440px-Node.js_logo.svg.png)

# Debugging and Logging in Node

| Learning Objectives - SBAT: |
| :--- |
| Use `morgan` Middleware for Logging |
| Use `nodemon` to Restart Node App Automatically |
| Debug Node inside of Chrome's DevTools |

## Roadmap
- Intro to Debugging
- Create a Skeleton Express App
- Morgan, Your Friendly Logger
- Stop Server, Start Server - Not!
- Step-by-Step Debugging

## Intro to Debugging<br><small>(5 mins)</small>

Debugging is the process of fixing our code and is fundamental to software development.

Debugging server-side code, especially Node's asynchronous code can be tricky.

In this lesson, we will look at three npm packages that are helpful to debugging and development as a whole:

  - Server-side logging with `morgan`, a middleware package.
  - Auto-restart of our Node/Express server using `nodemon`.
  - Live debugging of server-side code using `node-inspector`.

## Create a Skeleton Express App<br><small>(Code Along - 5 mins)</small>
This lesson will require an Express app to work with, so let's use the `express-generator` to build a skeleton app for us.

Remember, it's the Wild West out there, and you will undoubtedly come across multiple structures for Node apps.

The `express-generator` was authored by the TJ Holowaychuk, the same person that authored Express itself.

It scaffolds a **minimal** Express app that includes the vital middleware and configuration necessary for most web apps.

We already installed `express-generator` earlier this week. As a reminder, this is how we did it:

```
$ npm install express-generator -g
```

Even though we will not be using views in this lesson, let's generate our app as if we are using the **ejs** template engine:

```
$ express debug-app -e
$ cd debug-app
$ npm install
$ subl .
```

Then, test that the app starts up with<br>`$ npm start`<br>which will run the command associated with the `start` key in `package.json`.

Browse to `localhost:3000` and observe Express's welcome page.

## Morgan, Your Friendly Logger<br><small>(Code Along - 15 mins)</small>

Take a gander at your Terminal output for our Node server.  You will see something like this:

```
...
GET / 304 284.925 ms - -
GET /stylesheets/style.css 304 2.426 ms - -
```

Obviously, this is the server logging out our request for the root path of our app and the request from the browser for the stylesheet that was linked in the `<head>`.

No big deal, right? Heck, we've seen this time and time again with Rails. However, there's very little magic in Node. In Node, nothing gets done without the use of modules.

The logging we are seeing here is provided by a piece of _middleware_ required and then mounted in the app's middleware stack.

Remember, think of **middleware** as a stack of processes that requests flow through. Each piece of middleware can perform tasks such as logging, authentication, compiling CSS, etc.

<img src="http://media.developeriq.in/images/nodeexpress_2_9_2015_1.png" style="width:900px">

Now let's take a look at `app.js`.

>Earlier this week we changed the name of `app.js` to `server.js` - you're going to see both names out in the Wild West...

This is the line that loads the `morgan` module used for logging requests:

```js
var logger = require('morgan');
```

and this is the line that plugs it into, or mounts it, into the middleware stack:

```js
app.use(logger('dev'));
```
> Note: The `'dev'` specifies one of Morgan's available format options.

Let's comment out the `app.use(logger('dev'));` line of code and restart the server. Watch your Terminal's output while refreshing the browser - nothing, nada...

**What would happen if we moved our logger middleware between our two routes like this?**

```js
app.use('/', routes);
app.use(logger('dev'));
app.use('/users', users);
```
**Test it out to confirm...**

## Stop Server, Start Server - Not!<br><small>(Code Along - 5 mins)</small>

Unfortunately, every change in the JS source code requires a server restart. This is because Node loads the entire application into memory at startup.

There's nothing quite as fun as stopping and starting the server right? If you answered "Yes", you may skip to the next section :)

Fortunately, there's a Node module, [`nodemon`](http://nodemon.io/), that will watch for changes saved to our files and restart the server for us. Let's install it globally so that we can use it in terminal as a command:

```
$ npm install nodemon -g
```

Now we can start our server like this:

```
$ nodemon
```
`nodemon` by default will run the command specified by the "start" key in `package.json`. 

To try it out, let's move...

```js
app.use(logger('dev'));
```

back above

```js
app.use(bodyParser.json());
```
Watch the terminal window when you save the file, and you'll see the server restart automatically!

A tool like `nodemon` is virtually mandatory for Node development because it saves a tremendous amount of time!

## Step-by-Step Debugging<br><small>(20 mins)</small>

### Debugging Server-Side Code

Debugging applications is a huge part in the life of a developer.

I remember showing several of you how useful Chrome's debugger in DevTools could be when you were developing your game.

You will find being able to use an instance of Chrome's debugger to debug server-side JavaScript to be just as useful!

Also, being able to set breakpoints, step through code line-by-line, inspect variables, etc., is not only valuable for debugging, it's a great way to learn how code masters craft their programs & libraries!

### What Used To Be

There is exciting news in regards to debugging server-side JavaScript!

The geniuses over at Google have found a way to debug Node code in Chrome's DevTools without using the `node-inspector` package discussed below!

Accordingly, we will not install `node-inspector`, but the information about it has been left in this lesson because according to Google, the new way is "experimental".

### How to Use DevTools to Debug Node

There are two steps to follow in order to debug Node:

- Launch the server with the `--inspect` option, and
- Open the provided URL in a separate Chrome tab - this tab is where the debugging magic happens!

#### Launching the Server for Debugging

To debug the Node/Express server, just add the `-- inspect` option after the `node` or `nodemon` command.

For example: `$ nodemon --inspect bin/www`, `$ node --inspect bin/www`

Note that when debugging, we must specify the start file - `$ nodemon --inspect` will not work.

#### Open the Provided URL

When your app is launched using the `--inspect` option, a special debugging URL will be provided in Terminal.

It will look something like this:<br>
`chrome-devtools://devtools/remote/serve_file/@60cd6e859b9f557d2312f5bf532f6aec5f284980/inspector.html?experiments=true&v8only=true&ws=localhost:9229/node`

Copy and paste that URL in a new Chrome tab.

In a different tab, you will still browse to `localhost:3000`.

Congrats, you can set breakpoints, step through/over code, inspect variables, etc. as discussed below...

#### Hello `node-inspector`

`node-inspector` is a dev tool that provides a visual interface to Node's built-in debugger. It uses a version of the same tooling engine that Chrome's DevTools does. Let's install it globally so that we don't have to install it for every app:

```
$ npm install node-inspector -g
```

#### Starting in Debug Mode

Starting an app to use the debugger is not quite as straight forward as it is without debugging.  Throw in our desire to use `nodemon` for auto-restarts; requires a step-by-step guide:

1. In Terminal, type `node-inspector` to start the debugger.
2. **In a separate Terminal window**, we start our app in Node's debug mode using `nodemon`:<br>`nodemon --debug bin/www`<br>The `bin/www` is the path to our Express bootstrap code.
3. Open a browser window and copy/paste the URL that `node-inspector` provided - probably<br>`http://127.0.0.1:8080/?ws=127.0.0.1:8080&port=5858`
  - This will open the debugger's UI.
  - The debugger will sometimes automatically hit a breakpoint in Express's bootstrap code.  To continue loading your app, click the bluish _Resume..._ button<br><p align='center'>
<img src='http://s10.postimg.org/ycaokgsl1/Screen_Shot_2015_07_27_at_14_22_53.png'
</p>
4. In another browser tab/window, browse to your app at `localhost:3000`.

  You are now set to debug!

**?: What is the minimum number of Terminal sessions open we will need to debug our Node app?**

**?: What npm package did we install to debug our Node app? Is it installed locally or globally?**

#### Setting a Breakpoint

We can view the source code by clicking on the files within the _Sources_ tab of the the debugger.

Let's set a breakpoint in our `/users` route handler. The handler code is in the `routes` folder. Click on `user.js` to view its source.

To set a breakpoint, we click on the line number - line 6 is where we want to break at. Click it and a blue breakpoint marker will appear.

Browsing to `localhost:3000/users` will trigger the breakpoint and the app will not continue until we tell it to.

The blue line highlights the next line of code to be executed.

There are lots of things we can do now, just take a look at those **Call Stack** & **Scope Variables** windows on the right!

One of the niftiest things to do is to hover over variables that are in scope and drill into their values if they are objects.

Hover over the `req` parameter  and explore it a bit. There are lots of properties in there like `body`, `params` and `query` that you will likely find useful when developing your apps!

Note that you can use the console and access any variables and methods that are within scope.

Continue the code (click on the bluish resume icon), then let's browse to `localhost:3000/users?includeDetail=true`.

When we hit our breakpoint, check the `query` property on the `req` object - sweet!

#### Stepping Through Code

Next to the blue resume button are buttons that allow you to step through, into and out of functions. Try clicking the _Step into next function call_ button.

You're now looking at the `send` function inside of the `response.js` module's source code!

Click the _Step out of current function_ button several times and watch the _Call Stack_ shrink - amazing!

Click the _Resume script execution_ button when you've been dazzled enough...

## Individual Practice - Set Up a New App for Debugging<br><small>(until 5 mins remain)</small>

To get some practice, you're going to set up a new app.

1. Create a new app using the `express` generator.
2. Ensure that you can browse to the Express welcome page.
3. Both `nodemon` and `node-inspector` were installed globally, so you won't have to install them again...
4. Start your app in debug mode (feel free to reference the lesson on how to do this).
5. Experiment as follows:
	1. Set a breakpoint on line 6 of `routes/user.js`.
	2. Browse to `localhost:3000/users`, which should trigger the breakpoint.
	3. What is the `baseUrl` of the `req` object?
	4. What does `this` point to?
	5. Step into the `res.send` method, then...
	6. What is the value of the `body` argument?
	7. Set a breakpoint on the `switch` statement on line 134.
	8. Using your mouse, select/highlight the expression `typeof chunk` then hover over the selection, what is the result of that expression?
	9. Click the "Step over next function call" icon once.
	10. Hover over `this.get` - what line number is the `get` method at?
	11. Click the "Step into next function call" icon - there we are, inside of the `get` method.
	12. Over over the `getHeader` method, note the file it defined in and the line number within the file.
	13. Click the "Step into next function call", there you are, in that file!
	14. Click the "Resume" icon.
	15. Explore on your own!

## Conclusion

- **Why can't you use the Chrome console to debug Node.js code without using `node-inspector`?**

- **If we want to debug our Express app, before browsing to our app, we need to browse where first?**

- **What is middleware?**

- **What is the middleware used to perform server-side logging in an Express app?**


## References

- [Morgan](https://github.com/expressjs/morgan)
- [Nodemon](https://github.com/remy/nodemon)
- [Express](http://expressjs.com/)
