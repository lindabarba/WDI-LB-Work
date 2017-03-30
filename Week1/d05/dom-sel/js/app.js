
var titleEl = document.querySelector('#title');
/*var titleEl = document.getElementById('title');
getElementById is preferred
var titleEl = document.querySelector('#title');
*/
var cool = document.querySelector('.cool');

/*this will not work because wrong .text:
cool.textContent = 'Comments for <strong>Today</strong>';
*/
cool.innerHTML = 'Comments for <strong>Today</strong>';
titleEl.style.textAlign = 'center';
cool.style.color = 'green';
/*OR - document.querySelector('cool').style.color = 'green'; */

var comments = document.getElementsByTagName('li');
var comments2 = document.querySelectorAll('.comments');



console.log(comments);



console.dir(cool);
