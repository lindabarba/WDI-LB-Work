<img src="https://i.imgur.com/2mZHtjU.png">

# Challenge Lab

## Requirements

- Continue to build out this GitHub users app to add search functionality that finds GitHub usernames based upon a provided partial username/actual name.

- For the UI, display a search form to the left of the existing form.

- When the search form is submitted, display a new view that lists the matching usernames (the way we are listing repos would work well).

- Clicking on a username would then perform the search and display the user info as we've been doing.


## Hints

- The _index.js_ routes file might look something like this when you're done:

	```js
	router.get('/', githubCtrl.userDetails);
	router.post('/search', githubCtrl.search);
	router.post('/', githubCtrl.userDetails);
	```

- Refactor by putting the code for the POST routes in _routes/index.js_ into a separate controller module.  Refactoring will allow us to reuse the code from another route. The `userDetails` handler might start like this:

	```js
	function userDetails(req, res) {
	  var username = req.body.username || req.query.username;
	  if (!username) res.render('index', {userData: null});
	```
	Notice how this allows for reuse of the _index.ejs_ view.
	

- After you add the search form, copy the _index.erb_ view to another view to display the search results.

- This will require using the _**user\_search\_url**_ endpoint that accepts a `?q={query}` query string.

- Here are the search docs that explains how to search for users:<br>[https://developer.github.com/v3/search/#search-users](https://developer.github.com/v3/search/#search-users)

- Use the `in:fullname` qualifier so that we can enter part of a name and find matches.


#### Collaboration with your fellow students is suggested - and so is having fun!

