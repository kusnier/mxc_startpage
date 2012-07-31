
/**
 * Module dependencies.
 */

var express= require('express'),
  routes = require('./routes'),
  http = require('http'),
  path = require('path'),
  mongodb = require("mongodb"),
  Db = mongodb.Db,
  Server = mongodb.Server;

// Http port
var listenport= 1400;

// Db settings
var host = 'localhost';
var port = 27017;
var db= new Db('mxc', new Server(host, port, {auto_reconnect: true}), {native_parser:false});
// App
var app = express();

// Configuration

app.configure(function(){
  app.set('port', process.env.PORT || listenport);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
//  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
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

app.get('/', loadButtons, routes.index);

// Open db connection and start listening on port
db.open(function(err, db){
  if(err) throw err;

  app.listen(app.get('port'), 'localhost');

  console.log("Express server listening on port %d in %s mode",
    app.get('port'),
    app.settings.env
  );
});

