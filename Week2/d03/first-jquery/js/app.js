$(function() {

$('#addHome').removeClass('btn-danger').addClass('btn-success');
$('h1.jumbotron').addClass('text-center');

var $newLink = $( '<br><br><a id="zillowLink" href="http://www.zillow.com">Visit Zillow.com<a>' );
$('body').append($newLink);
$('#zillowLink').attr('target', '_blank');

$('#addHome').on('click', function(e) {
  //console.log(e, this);
  //get first element from newHomes & set to var = newHomeLine
  //populate new tr with newHomeLine USE ATTR
  //add tr to tbody

})

$('#homes').on('click', 'button', function(e) {
  $(this).closest('tr').fadeOut(1000, function() {
    $(this).remove();
  });
});

var newHomes = [
  {address: "27569 Cedarwood Drive", sf: "2,535", bedrooms: 3, baths: 2.5, price: "$496,500"},
  {address: "316 Annandale Drive", sf: "1,326", bedrooms: 4, baths: 2, price: "$275,000"},
  {address: "251 Grandview Road", sf: "3,800", bedrooms: 3, baths: 2, price: "$699,900"},
  {address: "28571 Manitoba", sf: "2,960", bedrooms: 4, baths: 3.5, price: "$775,000"}
];

var $newHomeLine = $( '<tr><td>'address'</td><td>'cost'</td><td>'bedrooms'</td><td>'baths'</td><td>'cost'</td><td><id="addHome">Add Home</button></td></tr> ');
//how to name class or id so it is unique each time but doesn't
// overwrite each time button is clicked
$('tbody').append($newHomeLine);
$('#')







  });
