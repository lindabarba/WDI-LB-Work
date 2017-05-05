# asnyc and defer Attributes for script Tags

The `async` and `defer` attributes have good support on `<script>` tags for most browsers. Let's learn what they do.

## Normal Script Tags

When you see a script tag like this in an HTML file,

```html
<script src="http://www.my-cdn.com"></script>
```

you may have wondered when this JavaScript is loaded during the construction of the DOM. What's happening in the above example is this:

1. The browser is parsing the HTML above this `<script>` tag and constructing the DOM
2. When the browser runs into the above `<script>` tag it **STOPS** parsing the HTML, fetches the external script and executes it

How is this process different when we use the `async` and `defer` attributes?

## async

When we include `async` as an attribute in our `<script>` tag like this,

```html
<script async src="http://www.my-cdn.com"></script>
```

what happens is this:

1. The browser is parsing the HTML above this `<script>` tag and constructing the DOM
2. When the browser runs into the above `<script>` tag it **CONTINUES** parsing the HTML, *asynchronously* downloads the external script and "returns" to the script once its fully loaded to execute it

## defer 

With defer the story is a little different.

```html
<script defer src="http://www.my-cdn.com"></script>

```

When a browser runs into a `<script>` tag with a defer attribute it continues parsing the HTML and creating the DOM and similiarly to a `<script>` tag with `async` asynchronously fetches and downloads the external JavaScript file. With `defer` the downloaded JavScript file is only executed once the entire HTML page is parsed. This ensures that script tags are executed in the order in which they appear in the HTML file.