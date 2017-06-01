var jwt = require('jsonwebtoken');
var fs = require('fs');

var cert = fs.readFileSync('key.pem');
var pub = fs.readFileSync('key.pub');

function sign(obj, expireIn, callback) {
    jwt.sign(obj, cert, { algorithm: 'RS256', expiresIn: expireIn }, function (token) {
        callback(null, token);
    });
}

function verify(token, callback) {
    jwt.verify(token, pub, function (err, decoded) {
        callback(err, decoded);
    });
}

function reSign(token, callback) {
    var decoded = jwt.decode(token);
    sign(decoded, function (err, jwt) {
        callback(err, jwt);
    });
}

module.exports = {
    sign: sign,
    verify: verify,
    reSign: reSign
};
