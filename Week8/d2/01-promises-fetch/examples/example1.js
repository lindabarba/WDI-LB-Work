/*

  This code can be run using Node.

    $ node example1.js

*/

let myFirstPromise = new Promise(function(resolve, reject) {
	setTimeout(function() {
		resolve('Success!');
	}, 4000);
});

let returnedPromise = myFirstPromise.then(function(successMessage) {
	console.log('Yay!' + successMessage);
});
