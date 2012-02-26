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

exports.alwaystrue= function(test) {
  test.equal(1, 1);
  test.done();
};

exports.mxconline= function(test) {
  request.get('http://matrixcode.de', function(error, res, body) {
    test.equal(error, undefined);
    if (!error) {
      test.equal(res.statusCode, 200);
    }
    test.expect(2);
    test.done();
  });
};

var testRedirect= function(test, source, destination) {
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

exports.blogredirect= function(test) {
  testRedirect(test, 'http://blog.matrixcode.de', 'http://kusnier.net/');
};

exports.googleredirect= function(test) {
  testRedirect(test, 'http://google.matrixcode.de', 'https://plus.google.com/106738679594465136514');
};

exports.vimrcredirect= function(test) {
  testRedirect(test, 'http://vimrc.matrixcode.de', 'https://raw.github.com/kusnier/dotfiles/master/home/vimrc');
};

exports.githubredirect= function(test) {
  testRedirect(test, 'http://github.matrixcode.de', 'https://github.com/kusnier');
};

exports.facebookredirect= function(test) {
  testRedirect(test, 'http://facebook.matrixcode.de', 'http://www.facebook.com/sebastian.kusnier');
};

exports.nkplredirect= function(test) {
  testRedirect(test, 'http://nkpl.matrixcode.de', 'https://nk.pl/main?target=%2Fprofile%2F16665973');
};

exports.twitterredirect= function(test) {
  testRedirect(test, 'http://twitter.matrixcode.de', 'http://twitter.com/#!/skusnier');
};
