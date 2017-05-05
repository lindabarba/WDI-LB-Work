<img src="https://i.imgur.com/luucbAA.png" style="width:100%">

# The Thirsty Mongoose Lab

## Goal

The goal of this lab is to get some practice writing an Express application and modeling a many-to-many relationship between Mongoose models.

The application will have _bars_ and _beers_ collections thanks to `Bar` and `Beer` models.

The app will enable _bars_ and _beers_ to be created independent of each other, however, the application will also allow the user to link a bar & beer in a many-to-many relationship.

The many-to-many association you will implement, will allow:

- A bar's detail view (show) will list the beers it is serving, and
- A beer's detail view will list the bars where it is being served.

My kind of app!

Work independently as much as possible, however, collaborate as needed.

Successful completion of this lab is important to getting ready for project 3, so work on it over the weekend if need be.

## Getting Started

1. Use the `express` generator to scaffold an Express app that uses EJS templating.

2. Rename **app.js** to **server.js**. Be sure to update the **www** file to reflect this change.

3. Create a `database.js` module with the appropriate code to connect mongoose to the MongoDB engine. Be sure to `require` it in `server.js`. Add a `mongoose.connection.on('open', ...)` event listener that console.logs out to the terminal the host and port of the connection.

4. If you're going to perform full CRUD, you'll probably need to install, require, and mount a certain middleware that's used to change a POST to a PUT, etc.

## The Schemas and Models

This app will have two models: `Beer` and `Bar`.

There will also be one extra schema, `commentSchema`, used for embedding sub-documents within beers. Since `commentSchema` will be referenced by the `beerSchema`, be sure to define it before the `beerSchema`.

**Each schema should have the `timestamps` option enabled.** [Here's the Mongoose docs for adding timestamps](http://mongoosejs.com/docs/guide.html#timestamps)

#### `commentSchema`

Used to embed sub-docs in `Beer` and has the following attributes:

- `content` (String)

#### `Beer`

The `Beer` model should have the following attributes:

- `name` (String)
- `style` (String)
- `bars` (array of type `ObjectId` with a `ref` set to the `Bar` model
- `comments` (array of embedded `commentSchema`)

#### `Bar`

The `Bar` model should have the following attributes:

- `name` (String)
- `location` (String)
- `beers` (array of type `ObjectId` with a `ref` set to the `Beer` model

Then...

## Seed some `Bars` and `Beers` (optional)

There is an existing _seeds.js_ file in the starter code that will create some Bars and Beers.

1. **First**, finish creating the schemas and models referenced above.
2. Modify _seeds.js_ to create a link between at one of the bars and two of the beers.

>**Important:** We are maintaining the relationship on **both** models, adding a beer's ObjectId to a bar's `beers` array requires that you **also** add the bar's ObjectId to the beer's `bars` array.  This of course also means that "unlinking" a beer from a bar, or a bar from a beer, required both the bar and beer to updated.

## User Stories to Implement

Implement the following user stories in order as listed:

#### Nav and Landing Page:

- AAU, when I browse to the root of the app, I want to see a landing page with a thirsty mongoose on it (optional).
- AAU, I always want to see a nav bar at the top of the page containing the following two links: `All Bars` and `All Beers`.
- AAU, if I click `All Bars` in the nav bar, I want to see all of the bars listed with just their name.
- AAU, if I click `All Beers` in the nav bar, I want to see all of the beers listed with just their name.

#### Create Bars and Beers

- AAU, when viewing the list of all bars, I want to be able to click a button that will take me to a page to add a new bar. After adding a new bar, I want to be sent to the details (show) page for that bar.
- AAU, when viewing the list of all beers, I want to be able to click a button that will take me to a page to add a new beer. After adding a new beer, I want to be sent to the details (show) page for that beer.

#### Bar Details

- AAU, while viewing the list of all bars, I want to be able to click a link that will show a details (show) page for that bar.
- AAU, while viewing the details page for a bar, I want to see the bar's `name`, `location`, a list of all beers being served, and a [Add Beer] button to add a beer to the list of beers being served.

#### Beer Details

- AAU, while viewing the list of all beers, I want to be able to click a link that will show a details (show) page for that beer.
- AAU, while viewing the details page for a beer, I want to see the beer's `name`, `style`, `comments`, and a list of all bars serving this beer.
- AAU, I want to see, in addition to the comments, the date and time each comment was posted.

#### Add a Beer being Served by a Bar

- AAU, when viewing the details page of a bar, I want to click the [Add Beer] button to see an "Add Beer to <name of bar>" page that lists all of the beers **not** currently being served by that bar.
- AAU, I want to be able to click a button to add one of the listed beers to the bars list of served beers.
- AAU, After adding a beer to be served, I want to return to the details page of the bar so that I can see that the beer was added.

#### Add a Comment for a Beer

- AAU, while viewing the details page for a beer, I want to see an input box and a [Add Comment] button that allows me to comment on the beer.
- AAU, I want to continue viewing the same details page after I add a comment about the beer.

#### Stop Serving a Beer

- AAU, while viewing the details view for a bar, I want to be able remove any beer from the list of beers being served.

#### Completely Delete a Bar or Beer

- AAU, when viewing the detail page for a bar, I want to be able to click a [Delete Bar] button that will delete the bar forever and take me to the All Bars page.
- AAU, when viewing the detail page for a beer, I want to be able to click a [Delete Beer] button that will delete the beer forever and take me to the All Beers page.

> Implementation note: When a bar is deleted, be sure to also remove that bar's ObjectId from the `bars` array of any beer that was being served by the deleted bar. Same goes for when a beer is deleted. See hints regarding Mongoose middleware below.

## Hints

#### Routing

Use RESTful routing whenever possible. You may want to review how we did nested resource routing in Rails. For example, to add a comment to a beer, the request would look like:  `POST /beers/:id/comments`

#### Automatic Fetching of sub-docs (`beers` and/or `bars`)

Remember, both bar and beer documents only store the ObjectId of their related beers and bars, for example, in the `Bar` model, you have something like this: `beers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Beer'}]`

However, in the detail views, you will need to show the actual properties, not the ObjectId.

You can fetch the beers or bars using separate queries if you wish, however, the more elegant approach is to use the `populate` method to automatically make those separate queries and "embed" the sub-docs for us.

In essence, `populate` makes working with _reference_ associations almost as easy as _embedded_ ones.

[Here's the docs for the populate method](http://mongoosejs.com/docs/populate.html)

#### Stop Serving a Beer

Here's an example of code to stop serving a beer at a bar:

The request might look like:  `DELETE /bars/:barId/beers/:beerId`

>Note: We can't use "shallow" routing here because we have a many-to-many relationship here.  We don't want to remove a beer from the _beers_ collection, we simply want to remove the beer from the bar and the bar from the beer.

```js
Bar.findById(req.params.barId, function(err, bar) {
	bar.beers.remove(req.params.beerId);
	bar.save(function(err) {
		Beer.findById(req.params.beerId, function(err, beer) {
			beer.bars.remove(req.params.barId);
			beer.save(function(err) {
				res.redirect(`/bars/${req.params.barId}`);
			});
		});
	});
});
```

#### Using MongooseMiddleware to Perform `pre`/`post` Processing

There are `pre`/`post` "hooks" (middleware) available on Mongoose models.

These can really come in handy in such cases as when completely deleting a bar or beer, and then having to remove it from all of the arrays where it was referenced.

For example:

```js
barSchema.post('remove', function(barDoc) {
	// find all beer docs that have this bar
	Beer.find({bars: barDoc._id}, function(err, beers) {
		beers.forEach(function(beerDoc) {
			// handy remove method on mongoose arrays
			beerDoc.bars.remove(barDoc._id);
			// no need to wait for async to finish, thus no callback
			beerDoc.save();
		});
	});	
});
```

## Bonuses

#### Images

- AAU, I want to see an image of the beer. If no image is available, I want to see a placeholder image.
- AAU, I want to see an image of the bar. If no image is available, I want to see a placeholder image.

#### Edit/Update

- AAU, I want to be able to edit/update the details of a bar.
- AAU, I want to be able to edit/update the details of a beer.

#### Add a Beer Rating

- AAU, I want to be able to rate each beer on a 1 to 5 scale.
- AAU, I want to see a beer's **average** rating on its detail view.

#### Make it look sweet by adding a CSS framework and/or custom styling!






