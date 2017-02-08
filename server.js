'use strict';
// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./server/config/environment');
var path = require('path');
var ejs = require('ejs');
var favicon = require('serve-favicon');
var methodOverride = require('method-override');
var serveStatic = require('serve-static');
var errorhandler = require('errorhandler');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var passport = require('passport');


/* connect mongo */
mongoose.connect(config.mongo.uri, config.mongo.options);

if(config.seedDB) { 
  console.log('  Mongodb connected success!  😄');
  require('./server/config/seed'); 
}
else {
  console.log("  Conected mongodb failed! 😢");
}

/* start server */
var app = express();
var server = require('http').createServer(app);
var env = app.get('env');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(__dirname, { setHeaders: deliverXHTML }));

if (env === 'development') {
    app.use(favicon(__dirname + '/client/assets/favicon.ico'));

    app.set('appPath', path.join(__dirname, 'client'));
    app.use(express.static(path.join(config.root, 'client')));
    app.use(morgan('dev'));
    app.use(errorhandler());
}

// var socketio = require('socket.io')(server, {
//   serveClient: (config.env === 'production') ? false : true,
//   path: '/socket.io-client'
// });
// require('./server/config/socketio')(socketio);
require('./routes')(app);
 

server.listen(config.port, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});


//Check whether the browser accepts XHTML, and record it in the response.
function negotiate(req, res, next) {
    var accepts = req.headers.accept.split(",");
    if (accepts.indexOf("application/xhtml+xml") >= 0) res.acceptsXHTML = true;
    next();
}

// Called by express.static.  Delivers response as XHTML when appropriate.
function deliverXHTML(res, path, stat) {
    if (ends(path, '.html') && res.acceptsXHTML) {
        res.header("Content-Type", "application/xhtml+xml");
    }
}

function ends(s, x) {
    return s.indexOf(x, s.length - x.length) >= 0;
}

exports = module.exports = app;


