const URL = `https://agile-chamber-77499.herokuapp.com/artists`;

$(document).ready(function() {
  $('form#new-artist').submit(function(e) {
    e.preventDefault();
  });
  getArtists()
});

// GET all artists
function getArtists() {
  // Use the fetch API to GET all artists
}

// Append artists to the DOM
function addArtist(artistObj) {
  // Takes an artist object and appends it to the DOM
};

// fetch API POST request
function sendDataViaFetch(e) {
  // Write a fetch POST request that sends form data to API
}
