# Choose Your Own Adventure Hackathon

**GOAL**: Pick one of the 3 app ideas (or come up with your own) and build a working application by the end of today. Your deadline is 5 PM. By 5 PM please Slack me a link to a repository containing your project. Include a `README.md` with instructions on how to run your application locally.

## Choices

### fd.io

I have built an application called `fd.io` check it out [here](https://github.com/jtamsut/fdio). I will do a code along with you to build this application. This is a full CRUD application built using Express, Mongoose, Materialize and the Google Maps API.


### Uber Coding Challenge: SF Movies

Create a service that shows on a map where movies have been filmed in San Francisco. The user should be able to filter the view using autocompletion search.

The data is available [here](https://data.sfgov.org/Arts-Culture-and-Recreation-/Film-Locations-in-San-Francisco/yitu-d5am).

Use this API endpoint:

```
https://data.sfgov.org/resource/wwmu-gmzc.json
```

You should use the `fetch` API as well as the [Google Maps API](https://developers.google.com/maps/documentation/javascript/tutorial).


### Build a Voting Application<sup>1</sup>

Build a voting application like this [one](https://fcc-voting-arthow4n.herokuapp.com/polls).

This application should have the following features:

  * A way for a user to add a new poll
    - A poll should have 3 to 5 options a user can vote on
    - The creator of a poll *must* specify the choices when creating the poll
  * A page for a given poll that has:
    - a drop down and button so a user can select a given item
    - a graphical representation of the current tally of the poll as either a pie or bar chart

Things to Note:

* You should use [Chart.js](http://www.chartjs.org/docs/) to create a graphical representation of the results of a given poll
* Poll data should be persisted in a MongoDB database
  - *One* poll has *many* respondents
  - The choices in a poll belong in an `enum` field in a Mongoose model

<sup>1</sup>Idea was taken from [freecodecamp.com](https://www.freecodecamp.com).</sup>

### Pick Your Own

I am fine if you pick your own. If you do please run the idea by me first.
