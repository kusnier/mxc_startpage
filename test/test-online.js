var nodeunit = require('nodeunit');
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

testRedirect= function(test, source, destination) {
  request.get(source, function(error, res, body) {
    test.equal(error, undefined);
    if (!error) {
      test.ok([200, 302].indexOf(res.statusCode) > -1, 'Invalid response.statusCode (200, 302)');
      test.equal(res.request.uri.href, destination, 'Desired redirct not reached.');
    }
    test.expect(3);
    test.done();
  });
};


exports.alwaystrue= function(test) {
  test.equal(1, 1);
  test.done();
};

exports.mxconline= function(test) {
  request.get('http://kusnier.net', function(error, res, body) {
    test.equal(error, undefined);
    if (!error) {
      test.equal(res.statusCode, 200);
    }
    test.expect(2);
    test.done();
  });
};


exports.redirect= nodeunit.testCase({
  setUp: function(callback) {
    callback();
  },
  tearDown: function(callback) { callback(); },

  blog: function(test) {
    testRedirect(test, 'http://blog.kusnier.net', 'http://kusnier.net/');
  },

  google: function(test) {
    testRedirect(test, 'http://google.kusnier.net', 'https://plus.google.com/106738679594465136514');
  },

  vimrc: function(test) {
    testRedirect(test, 'http://vimrc.kusnier.net', 'https://raw.github.com/kusnier/dotfiles/master/home/vimrc');
  },

  github: function(test) {
    testRedirect(test, 'http://github.kusnier.net', 'https://github.com/kusnier');
  },

  facebook: function(test) {
    testRedirect(test, 'http://facebook.kusnier.net', 'http://www.facebook.com/sebastian.kusnier');
  },

  nkpl: function(test) {
    testRedirect(test, 'http://nkpl.kusnier.net', 'https://nk.pl/main?target=%2Fprofile%2F16665973');
  },

  twitter: function(test) {
    testRedirect(test, 'http://twitter.kusnier.net', 'http://twitter.com/#!/skusnier');
  }

});
