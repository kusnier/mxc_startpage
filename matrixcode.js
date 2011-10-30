
/**
 * Module dependencies.
 */

var express= require('express'),
  Db = require('mongodb').Db,
  Server = require('mongodb').Server,
  Connection = require('mongodb').Connection;

// Db settings
var host = 'localhost';
var port = Connection.DEFAULT_PORT;
var db= new Db('mxc', new Server(host, port, {auto_reconnect: true}), {native_parser:false});

var app= module.exports = express.createServer();

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

function loadButtons(req, res, next) {
  db.collection('communitybuttons', function(err, collection) {
    collection.find({}).toArray(function(err, buttons) {
      if (err) next(new Error("Can't get buttons."));
      res.buttons= buttons;
      next();
    });
  });
}

// Routes
app.get('/', loadButtons, function(req, res){
  var host= req.header('Host');
  prefix= host.split('.')[0];

  for (var i=0; i < res.buttons.length; i++) {
    if (res.buttons[i].name.replace(/\W/, '') == prefix) {
      res.redirect(res.buttons[i].link)
      return;
    }
  };

  res.render('index', {
    title: 'matrixcode.de',
     buttons: res.buttons
  });
});

db.open(function(err, db){
  if(err) throw err

  app.listen(1400, 'localhost');
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

