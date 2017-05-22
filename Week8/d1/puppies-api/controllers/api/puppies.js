var Puppy = require('../../models/puppy');

module.exports = {
  getAllPuppies,
  getOnePuppy,
  createPuppy,
  updatePuppy,
  deletePuppy
}

function getAllPuppies(req, res) {
  Puppy.find({}, function(err, puppies) {
    if (err) return res.status(500).json({msg: err});
    res.status(200).json(puppies);
  });
}

function getOnePuppy(req, res) {
  Puppy.findById(req.params.id, function(err, puppy) {
    res.status(200).json(puppy);
  });
}

function createPuppy(req, res) {
  var pup = new Puppy(req.body);
  pup.save(function(err) {
    if (err) return res.status(404).json({msg: err});
    res.status(201).json(pup);
  });
}

function updatePuppy(req, res) {
  Puppy.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, puppy) {
    if (err) return res.status(404).json({msg: err});
    res.status(200).json(puppy);
  });
}

function deletePuppy(req, res) {
  Puppy.findByIdAndRemove(req.params.id, function(err, puppy) {
    if (err) return res.status(404).json({msg: err});
    res.status(200).json(puppy);
  });
}
