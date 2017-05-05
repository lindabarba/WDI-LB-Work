var Student = require('../models/student');

function index(req, res) {
  Student.find({}, function(err, students) {
    res.render('students/index', {students});
  });
}

function newStudent(req, res) {
  res.render('students/new');
}

function create(req, res) {
  var student = new Student(req.body);
  student.save(function(err) {
    if (err) return res.render('students/new');
    res.redirect('/students/new');
  });
}

module.exports = {
  index,
  new: newStudent
}
