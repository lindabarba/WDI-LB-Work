var allStudents;
var filteredStudents = [];
var searchName = '';
var template;

$(function() {
  // load all students one time at load
  $.get('/api/students', function(data) {
    allStudents = data;
    template = _.template($('#studentTemplate').html());
    render();
  });
});

function render() {
  applyFilterAndSort();
  $('#students').html(template({students: filteredStudents}));
}

function applyFilterAndSort() {
  if (searchName) {
    filteredStudents = allStudents.filter(function(student) {
      return student.name.toLowerCase().indexOf(searchName.toLowerCase()) >= 0;
    });
  } else {
    filteredStudents = allStudents;
  }
  var sortKey = $('#sortCohort').is(":checked") ? 'cohort' : 'name';
  filteredStudents = _.sortBy(filteredStudents, sortKey);
}

function doSearch() {
  var curSearch = $('#search').val();
  if (curSearch != searchName) searchName = curSearch;
  render();
}

function addFact() {
  $.post(
    '/api/facts',
    {
      fact: $('#fact').val()
    }
  ).done(function(data) {
    $('#fact').val('');
    var updated = allStudents.find(function(student) {
      return student._id === data._id;
    });
    updated.facts.push(data.facts.pop());
    render();
  });
}

function removeFact(factId) {
  $.ajax({
      url: '/api/facts/' + factId,
      type: 'DELETE'
    })
    .done(function() {
      var student = allStudents.find(function(student) {
        return student.facts.some(fact => fact._id == factId);
      });
      student.facts.splice(student.facts.findIndex(f => f._id == factId), 1);
      render();
    });
}

/* ----- event handlers ----- */

$('#search').on('keypress blur', function(evt) {
  if (evt.keyCode === 13 || evt.type === 'blur') doSearch();
});

$('[type="radio"]').on('change', function() { render(); });

$('#students').on('click', 'li.collection-item a', function() {
  removeFact($(this).attr('data'));
});
