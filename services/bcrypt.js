var bcrypt = require('bcryptjs');
var Promise = require('promise');

function genSalt(callback) {
    bcrypt.genSalt(callback);
}

function hashWithSalt(myPlaintextPassword, salt, callback) {
    bcrypt.hash(myPlaintextPassword, salt, callback);
}

// function comparePassword(myPlaintextPassword, password, callback) {
//     bcrypt.compare(myPlaintextPassword, password, callback);
// }

function comparePassword(myPlaintextPassword, password) {
 return new Promise(function(resolve, reject) {
    bcrypt.compare(myPlaintextPassword, password, function(err, res) {
        if (err) {
            reject(err);
        } else {
            resolve(res);
        }
    })
})
}


module.exports = {
    hashWithSalt: hashWithSalt,
    genSalt: genSalt,
    comparePassword: comparePassword
};