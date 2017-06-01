var db = require('./config/db');
var express = require('express');
var path = require('path');
var multipart = require('connect-multiparty');
var bodyParser = require('body-parser');

var app = express();

var serverConfig = require('./config/server');
var jwtParser = require('./middlewares/jwt-parser');
var errorHandler = require('./middlewares/error-handler');

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(jwtParser.parser());
app.use(multipart());
app.use(allowCrossDomain);

// app.use(serverConfig.BASE_URL + '/user', require('./routes/user')());
// app.use(serverConfig.BASE_URL + '/auth', require('./routes/auth')());
// app.use(serverConfig.BASE_URL + '/orders', require('./routes/orders')());
// app.use(serverConfig.BASE_URL + '/additional-services', require('./routes/additional-services')());
// app.use(serverConfig.BASE_URL + '/vehicle-types', require('./routes/vehicle-types')());
// app.use(serverConfig.BASE_URL + '/vehicles', require('./routes/vehicle')());
// app.use(serverConfig.BASE_URL + '/global-settings', require('./routes/global-settings')());
// app.use(serverConfig.BASE_URL + '/payment', require('./routes/payment')());
// app.use(serverConfig.BASE_URL + '/forgot-password', require('./routes/forgot-password')());
// app.use(serverConfig.BASE_URL + '/password', require('./routes/reset-password')());
// app.use(serverConfig.BASE_URL + '/open-app', require('./routes/open-app')());
// app.use(serverConfig.BASE_URL + '/images', require('./routes/images')());
// app.use(serverConfig.BASE_URL + '/pages', require('./routes/pages')());
// app.use(serverConfig.BASE_URL + '/feedback', require('./routes/feedback')());
// app.use(serverConfig.BASE_URL + '/extra_service', require('./routes/extra-service')());
// app.use(serverConfig.BASE_URL + '/admin', require('./routes/admin')());
app.use(errorHandler.errorHandler());

app.listen(serverConfig.PORT);

console.log("Server is listening on port " + serverConfig.PORT);