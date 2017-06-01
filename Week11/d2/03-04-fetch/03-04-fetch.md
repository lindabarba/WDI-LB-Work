# Making Fetch Requests in React 

This is an introduction to incorporating AJAX requests into your React application in order to render an API's data. This lesson can be thought of a way to apply your knowledge of lifecycle methods in React.

## Learning objectives: 

* You should be able to use the fetch API to display an API's data in your React application 
* Explain why AJAX requests should be put in the `componentDidMount` method 

## So Fetch: GET Requests with fetch 

The `fetch` API is used to make Promise-based AJAX requests. It returns a Promise as the result of its HTTP request. Let's briefly review how we make a `GET` request using the fetch API. 

We can use the fetch API to make an API call to get a given user's GitHub user data. We can paste the code below into DevTools to log the result of the `GET` request. 

**Note**: Replace `<YOUR_GITHUB_USERNAME>` with your actual GitHub username.

```js
fetch('https://api.github.com/users/<YOUR_GITHUB_USERNAME>', {
    method: 'get'
})
.then(response => response.json())
.then(data => console.log(data))
.catch((error) => {
    console.log(error)
    console.error(error)
})
```

The `json()` method on the `response` object takes a completely resolved Promise and converts it to JSON. It then passes this newly converted JSON to the next `then`. We use `catch` to handle the scenario where the API call is unsuccessful and the Promise is *NOT* resolved.

## Promise.all 

I want to take a brief detour and disucss a useful mechanism for when you have more than one Promise (i.e., more than one API call) and you want the data returned from each asynchronous only when *ALL* three asynchronous events have resolved.

For example, suppose you need to gather information from three separate remote API calls and when you have the results from all three API calls, you then need to run some further code using all three results. That situation would be perfect for `Promise.all()`. You could do something like this:

```js
Promise.all([apiRequest(...), apiRequest(...), apiRequest(...)]).then((results) => {
    // API results in the results array here
    // processing can continue using the results of all three API requests
}, (err) => {
    // an error occurred, process the error here
});
```

`Promise.all` returns a master Promise that will reject as soon as the first Promise you passed it rejects.

We can see `Promise.all` in action here:

```js
//Used to display results
let write = (msg) => {
  document.write(msg);
};

//Different speed async operations
let slow = new Promise((resolve) => {
  setTimeout(resolve, 2000, 'slow');
});

let instant = 'instant';

let quick = new Promise((resolve) => {
  setTimeout(resolve, 50, 'quick');
});

//The order is preserved regardless of what resolved first
Promise.all([slow, instant, quick]).then((responses) => {
  responses.map(response => write(response + "/"));
});
```

In the above example we have three "asynchronous" operations:

* slow 
* instant 
* quick

`responses` is an iterable that we can `map` over and apply a callback to each element in `responses`.

## Building an Application that Makes an AJAX Request 

Today we will building an application that hits the GitHub API. This application will "fetch" some data and display it for the user. We will be using the fetch API outlined above. Before we begin there a few things worth mentioning.

First, is that all AJAX requests in a React application should go inside the `componentDidMount` lifecycle method. Remember that `componentDidMount` is invoked immediately after a component is mounted. It is possible that our AJAX request will return data before the component mounts. If our AJAX request resolves before we mount our component this means we will calling `setState` on an unmounted component which results in a React bug. A component must be mounted for `setState` to be called on it. Performing our AJAX request in `componentDidMount` will gauruntee that there's a component to call `setState` on.

Second, since our AJAX request is asynchronous we will need to create some conditional logic in our JSX to render data only once its returned.

Third, we have decided to make our AJAX request in our root component (`App.js`) and pass data down to our child components. Make note of this decision. Tomorrow we will learn about Redux which gives us hard requirements for how we configure our state.

## Configuration 

We are going to use `create-react-app`. 


```bash
$ create-react-app fetch-practice
```

We should create the following directory structure in `src`:

```
src
 |- api
     |- api.js
 |- components
 |       |- App.js
 |       |- ReposGrid.js
 |       |- SelectLanguage.js
 |- index.css
 |- index.js
```

Let's start of by copying the CSS file I provided you with into `index.css`.

Next, let's make sure our `index.js` is properly configured.

Our state will comprise of two properties:

* `repos` - list of repos returned from the GitHub API 
* `selectedLanugage` - the current language we are viewing data for 

Our component hierarchy will look like this:

```
<App>
    <SelectLanuguage /> // corresponds to lanuguage selection view 
    <ReposGrid /> // corresponds to grid showing repos
</App>
``` 

Let's continue along together...

## In Conclusion 

We can use the fetch API inside the `componentDidMount` lifecycle method where we can fetch data and pass it as props to child components which can be in charge of rendering this data. We typically fetch data from a container component and pass data down to child components.

## Lab 

Make use of the GitHub user API endpoint (`https://api.github.com/users/<YOUR_GITHUB_USERNAME>`) to render data for a given user of GitHub. This application should allow you to search for a user based on GitHub username. It should also display the following data for each user:

* Picture (`avatar_url`)
* Name (`name`)
* Location (`location`)
* Bio (`bio`)
* Blog URL (`blog`)

Here is a wireframe for this:

![wireframe](./lab_wireframe.jpg)
