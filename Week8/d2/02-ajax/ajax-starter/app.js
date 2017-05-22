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
  fetch(URL, {
    method: 'get'
  }).then(function(response) {
    return response.json();
  }).catch(function(err) {

  });
}

// Append artists to the DOM
function addArtist(artistObj) {
  // Takes an artist object and appends it to the DOM
  // use the response from above to add new form data to it ie req.body
  // var newArtist = req.body;
  // document.artistObj.newArtist;
}

// fetch API POST request
function sendDataViaFetch(e) {
  // Write a fetch POST request that sends form data to API
  // fetch(URL'/submit-json', {
  //   method: 'post',
  //   body: JSON.stringify({
  //     newArtist;
  //   });
  // });
}
