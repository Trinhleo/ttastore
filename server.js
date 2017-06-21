// require("babel-register");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./config/db');
var serverConfig = require('./config/server');
var routes = require('./routes/index.routes.js');
var errorHandler = require('./middlewares/error-handler');
var methodOverride = require('method-override');
var path = require('path');
var serveStatic = require('serve-static');
var server = require('http').createServer(app);
var favicon = require('serve-favicon');
var morgan = require('morgan');
var jwtParser = require('./middlewares/jwt-parser');
var multipart = require('connect-multiparty');
// =======================
// configuration =========
// =======================
var port = serverConfig.PORT;
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, authorization');
    next();
};

// use body parser so we can get info from POST and/or URL parameters
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(jwtParser.parser());
app.use(multipart());
app.use(allowCrossDomain);
//service static files
// console.log(path.resolve('./uploads'));
//socket io
// socketConfig(io, app);
// nodeDeviceConfig(io);
//register routes
routes(app);
app.use(errorHandler.errorHandler());
// register socket io
// socketIoConfig(app);
// use morgan to log requests to the console
server.listen(port);
console.log('Server starting :' + port);