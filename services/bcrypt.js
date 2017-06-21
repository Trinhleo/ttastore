var bcrypt = require('bcryptjs');
async function genSalt(callback) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(function (err, salt) {
            if (err) {
                return reject(err);
            }
            return resolve(salt)
        });
    });
}

async function hashWithSalt(myPlaintextPassword, salt) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
            if (err) {
                return reject(err);
            }
            return resolve(hash);
        });
    })
}

// function comparePassword(myPlaintextPassword, password, callback) {
//     bcrypt.compare(myPlaintextPassword, password, callback);
// }

async function comparePassword(myPlaintextPassword, password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(myPlaintextPassword, password, function (err, res) {
            if (err) {
                return reject(err);
            }
            return resolve(res);
        });
    });
}


module.exports = {
    hashWithSalt: hashWithSalt,
    genSalt: genSalt,
    comparePassword: comparePassword
};