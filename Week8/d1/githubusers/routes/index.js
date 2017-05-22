var express = require('express');
var router = express.Router();
var request = require('request');

const rootURL = 'https://api.github.com/';
var key = process.env.GITHUB_TOKEN;

router.get('/', function(req, res, next) {
  res.render('index', {userData: null});
});

router.post('/', function(req, res, next) {
  var options = {
    url: `${rootURL}users/${req.body.username}`,
    headers: {
      'User-Agent': 'lindabarba',
      'Authorization': 'token ' + key
    }
  };
  request(options, function (err, response, body) {
    var userData = JSON.parse(body);
    options.url = userData.repos_url;
    request(options, function(err, response, body) {
      userData.repos = JSON.parse(body);
      res.render('index', {userData: userData});
    });
  });
});

router.post('/search', function(req, res, next) {
  var options = {
    url: `${rootURL}users/${req.body.username}`,
    headers: {
      'User-Agent': 'lindabarba',
      'Authorization': 'token ' + key
    }
  };
  request(options, function (err, response, body) {
    var userData = JSON.parse(body);
    options.url = userData;
    request(options, function(err, response, body) {
      userData.repos = JSON.parse(body);
      res.render('index', {userData: userData});
    });
  });
});

module.exports = router;
