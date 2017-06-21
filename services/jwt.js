var jwt = require('jsonwebtoken');
var fs = require('fs');

var cert = fs.readFileSync('key.pem');
var pub = fs.readFileSync('key.pub');

module.exports = {
    sign: sign,
    verify: verify,
    reSign: reSign
};

function sign(obj, expireIn) {
    return new Promise(function (resolve, reject) {
        return jwt.sign(obj, cert, { algorithm: 'RS256', expiresIn: expireIn }, function (err, token) {
            console.log('token err:', err);
            if (err) {
                return reject(err);
            }
            resolve(token);
        });
    })
}

function verify(token) {
    jwt.verify(token, pub, function (err, decoded) {
        callback(err, decoded);
    });
}

function reSign(token) {
    var decoded = jwt.decode(token);
    sign(decoded, function (err, jwt) {
        callback(err, jwt);
    });
}

