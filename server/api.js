var router  = require('express').Router(),
    request = require('request');

var uberApiUrl       = 'https://sandbox-api.uber.com/v1',
    uberClientId     = process.env.UBER_CLIENT_ID,
    uberClientSecret = process.env.UBER_CLIENT_SECRET,
    uberServerToken  = process.env.UBER_SERVER_TOKEN;

var uberServerToken = process.env.UBER_SERVER_TOKEN;
var uberClientID = process.env.UBER_CLIENT_ID;
var uberClientSecret = process.env.UBER_CLIENT_SECRET;

var serverUrl = 'http://localhost:8080';


router.get('/estimates/price', function(req, res){
  var start_latitude = 21.308507;
  var start_longitude = -157.818326;
  var end_latitude = 21.307977;
  var end_longitude = -157.8088867;

  request.get({
    url : uberApiUrl + '/estimates/price',
    qs : {
      server_token : uberServerToken,
      start_latitude : start_latitude,
      start_longitude : start_longitude,
      end_latitude : end_latitude,
      end_longitude : end_longitude
    }
  }, function(err, response, body) {
    if(err) {
      return res.json(err);
    }
    var results = JSON.parse(body);
    res.json(results);
  });
});

router.get('/estimates/time', function(req, res){
  var start_latitude = 21.308507;
  var start_longitude = -157.818326;

  request.get({
    url : uberApiUrl + '/estimates/time',
    qs : {
      server_token : uberServerToken,
      start_latitude : start_latitude,
      start_longitude : start_longitude
    }
  }, function(err, response, body) {
    if(err) {
      return res.json(err);
    }
    var results = JSON.parse(body);
    res.json(results);
  });
});

var OAuth2 = require('oauth').OAuth2;

var oauth2 = new OAuth2(
  uberClientID,
  uberClientSecret,
  'https://login.uber.com/',
  'oauth/authorize',
  'oauth/token',
  null);


router.get('/oauth/cb', function(req, res){
  var code = req.query.code;

  console.log(code);

  oauth2.getOAuthAccessToken(
    code,
    { // NOT IN THE UBER DOCS
      grant_type: 'authorization_code',
      redirect_uri: serverUrl+'/api/oauth/cb'
    },
    function (err, access_token, refresh_token, results){
      if(err){
        console.log(err);
        if(err.data){
          res.end(err.data);
        }else{
          res.json(err);
        }
      } else if(results.error) {
        console.log(results.error);
        res.json(results.error);
      } else {
        // got token, send back to client
        // POPUP Blocker must be disabled, or find workaround, or use redirect instead
        console.log(access_token);
        res.send(serverUrl+'#store-auth-token/'+access_token);
      }
    });

});



module.exports = router;