var assert = require("assert");
var request = require('request');

var userAgents= {
  'firefox': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:9.0.1) Gecko/20100101 Firefox/9.0.1',
  'chrome': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11'
};

var defaultHeader= {
  'User-Agent': userAgents.chrome
};

request= request.defaults({
  headers: defaultHeader
});

testRedirect= function(done, source, destination) {
  request.get(source, function(error, res, body) {
    assert.equal(error, undefined);
    if (!error) {
      assert.ok([200, 302].indexOf(res.statusCode) > -1, 'Invalid response.statusCode (200, 302)');
      assert.equal(res.request.uri.href, destination, 'Desired redirct not reached.');
    }
    done();
  });
};


suite('Online', function(){
  setup(function(){
    // ...
  });

  suite('request.get("kusnier.net")', function(){
    test('should return statusCode 200', function(){
      request.get('http://kusnier.net', function(error, res, body) {
        assert.equal(error, undefined);
        if (!error) {
          assert.equal(res.statusCode, 200);
        }
      });
    });
  });
});

suite('Redirects', function(){

  suite('google.kusnier.net', function() {
    test('should be redirected to google+ profile', function(done) {
      testRedirect(done, 'http://google.kusnier.net', 'https://plus.google.com/106738679594465136514');
    });
  });

  suite('vimrc.kusnier.net', function() {
    test('should be redirected to my vimrc on github', function(done) {
      testRedirect(done, 'http://vimrc.kusnier.net', 'https://raw.github.com/kusnier/dotfiles/master/home/vimrc');
    });
  });

  suite('github.kusnier.net', function() {
    test('should be redirected my github profile', function(done) {
      testRedirect(done, 'http://github.kusnier.net', 'https://github.com/kusnier');
    });
  });

  suite('facebook.kusnier.net', function() {
    test('should be redirected to my facebook profile', function(done) {
      testRedirect(done, 'http://facebook.kusnier.net', 'https://www.facebook.com/sebastian.kusnier');
    });
  });

  suite('nkpl.kusnier.net', function() {
    test('should be redirected to my nk.pl profile', function(done) {
      testRedirect(done, 'http://nkpl.kusnier.net', 'https://nk.pl/main?target=%2Fprofile%2F16665973');
    });
  });

  suite('twitter.kusnier.net', function() {
    test('should be redirected to my twitter profile', function(done) {
      testRedirect(done, 'http://twitter.kusnier.net', 'https://twitter.com/skusnier');
    });
  });

});
