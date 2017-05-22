# AJAX with JS & JQuery

### Objectives

* Implement a XHR client using the `fetch` API
* Compare and contrast the `fetch` API with jQuery's XHR methods

## What is AJAX? Introduction

**AJAX (Asynchronous JavaScript and XML)** is a method of building interactive applications for the Web that processes user requests immediately without re-rendering a whole page. Basically a AJAX request makes a HTTP request without refreshing the page.

> **Example:** A weather forecasting site could display local conditions on one side of the page as soon as a user finishes typing in a zip code. The temperature could refresh every minute, without the user having to hit a refresh button.

In general the process looks like this – use JavaScript on the client side to hit an API (without reloading a page), then use the pure data you get back to manipulate the DOM somehow if you need to. This DOM manipulation can take the form of rendering a template or just changing a number on the page.

### Advantages of AJAX To Make HTTP Requests

* __Faster__ - This is the most obvious reason for using AJAX on your Front End: AJAX allows easier and quicker interaction between user and website as pages are not reloaded for content to be displayed.  The server doesn't have to get data, render HTML, and then spit it out, it just has to get data and your already-loaded front end does the rest.

* __Backend Separated from Frontend__ - Applications that use AJAX-heavy front ends mean developers don't have to work on both sides of the stack at the same time. Some developers can be dedicated to building an API that just serves data, and others can focus on consuming that data and building interfaces.

### Disadvantages

* __The back and refresh button are rendered useless__ - Since things are loaded dynamically on a page, without that page reloading (or more importantly, without a URL being changed), clicking the back or refresh button in a browser doesn't work the way you're used to. That's actually a pretty big deal – UX designers are very familiar with the fact that users are *accustomed* to being able to hit back when they need to. Some advanced front-end frameworks have tried to solve this issue with clever workarounds, but that's not always the case and not always accurate.

* __Javascript can be disabled__ - While JavaScript is secure and has been heavily used by websites for a long period of time, a percentage of website surfers prefer to turn JavaScript functionality off on their browser, rendering the AJAX application totally useless. That's not always the best thing to design for, and more often than not, you'll find yourself assuming users have JS on, but it's important to know your whole site could be useless in some situations. Nowadays most websites use JavaScript, so it's very uncommon for users to disable it.

## Cross-Origin Request Sharing (CORS)

A resource makes a cross-origin HTTP request when it requests a resource from a domain or port which is different from the one which the first resource itself serves. For example, an HTML page served from http://domain-a.com makes an `<img> src` request for http://domain-b.com/image.jpg. Many pages on the web today load resources like CSS style sheets, images and scripts from separate domains. For security reasons, browsers restrict cross-origin HTTP requests initiated from within scripts.

## The Fetch API

The **fetch** API allows us to make AJAX requests that return Promises. The `fetch` API takes only one required paramter: the URL of the endpoint you'd like to hit.

```js
let cats = fetch('http://cats.com',
  {
    method: 'get'
  }
)
```

The above code makes a `GET` request to the URL `http://cats.com`. Whatever gets returned is specified by how the API deals with `GET` requests. In typical promise fashion we can convert our data to JSON so we can "play" with it using the `json()` method.

```js
let cats = fetch('http://cats.com',
  {
    method: 'get'
  }
)

cats.then(function(response) {
  return response.json();
})

// cats is now equal to the JSON response of hitting this API
```

Note that `cats` is a Promise and is "thenable".

## Setup - Codealong

While we're still learning the ins-and-outs of building APIs, let's use an already-made API for today that handy thing lives at https://agile-chamber-77499.herokuapp.com/artists – it's a simple dummy data service that'll let us do `GET`s & `POST`s quickly. This API uses `PATCH`, not put, for updates.

While you're at it, in the starter-code folder, we've got a super basic index and a CSS file to get started. Nothing fancy.

Open up your `index.html` in a browser, and make sure to load up that console - we're going to be working with it quite a bit.

Now, we've set a few things up for you. We've got here a form with 2 inputs.

[This](https://davidwalsh.name/fetch) is a great article on the fetch API.

#### fetch GET Requests

```js
function getArtists() {
  return fetch('https://agile-chamber-77499.herokuapp.com/artists', {
    method: 'get'
  });
}
```

Our `getArtists()` method grabs all artist information from our API.

#### fetch POST Requests

Here is an example of `POST` request using the `fetch` API.

```js
const url = 'https://randomuser.me/api';
// The data we are going to send in our request
let data = {
    name: 'Sara'
}
// Create our request constructor with all the parameters we need
var request = new Request(url, {
    method: 'POST',
    body: data,
    headers: new Headers()
});

fetch(request)
.then(function() {
    // Handle response we get from the API
})
```

You can set headers using the fetch API.

```js
var content = "Hello World";
var myHeaders = new Headers();
myHeaders.append("Content-Type", "text/plain");
myHeaders.append("Content-Length", content.length.toString());
myHeaders.append("X-Custom-Header", "ProcessThisImmediately");
```
Let's interrogate this API using Postman.

## Conclusion

* What's the main use case of AJAX? Why would anyone use it?
* How do you do a `GET` and `POST` request with the `fetch` API?


#### Extra Reading
- [`No 'Access-Control-Allow-Origin' header is present on the requested resource` – WTF?](https://jvaneyck.wordpress.com/2014/01/07/cross-domain-requests-in-javascript/)
- [What is Cross Origin Resource Sharing (CORS)?](https://www.maxcdn.com/one/visual-glossary/cors/)
- [Using CORS with Express](http://enable-cors.org/server_expressjs.html)
