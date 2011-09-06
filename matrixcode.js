
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
//  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Buttons, replace later with mongodb
var buttons= [
  {name: 'vimrc',    color: {fg: '#000000', bg: '#FF0000'}, link: 'https://github.com/kusnier/dotfiles/raw/master/home/vimrc'},
  {name: 'github',   color: {fg: '#000000', bg: '#FF0000'}, link: 'https://github.com/kusnier'},
  {name: 'skype',    color: {fg: '#000000', bg: '#0000FF'}, link: 'skype:kuseba?add'},
  {name: 'facebook', color: {fg: '#000000', bg: '#00FF00'}, link: 'http://www.facebook.com/sebastian.kusnier'},
  {name: 'google+',  color: {fg: '#000000', bg: '#00FF00'}, link: 'https://plus.google.com/106738679594465136514'},
  {name: 'nk.pl',    color: {fg: '#000000', bg: '#00FF00'}, link: 'http://nk.pl/profile/16665973'},
  {name: 'twitter',  color: {fg: '#000000', bg: '#00FF00'}, link: 'http://twitter.com/#!/skusnier'},
  {name: 'blog',     color: {fg: '#000000', bg: '#00EEEE'}, link: 'http://kusnier.net'}
];

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'matrixcode.de',
    buttons: buttons
  });
});

app.listen(1400, 'localhost');
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
