var jwt = require('./../services/jwt');


exports.parser = function () {
    return function (req, res, next) {
        var token = req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, function (err, decodedData) {
                if (err) {
                    return next(err);
                } else {
                    req.tokenData = decodedData;
                }
                next();
            })
        } else {
            next();
        }
    }
} 