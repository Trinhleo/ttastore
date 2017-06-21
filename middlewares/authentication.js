var jwt = require('./../services/jwt');
module.exports = {
    authentication: authentication,
    hasRole: hasRole,
    isAdmin: isAdmin
};

function authentication(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.headers['x-access-token'] || req.headers['authorization'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, function (err, decoded) {
            if (err) {
                return res.status(401).send({ success: false, message: 'Failed to authenticate token or token has expire.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
}

function hasRole(req, res, next) {

    if (req.decoded && req.decoded.roles && req.decoded.roles.length > 0) {
        next();
    } else {
        res.status(403).send({
            message: "unAuthorize"
        })
    }
}

function isAdmin(req, res, next) {
    if (req.decoded && req.decoded.roles && req.decoded.roles.indexOf('admin') > -1) {
        next();
    } else {
        res.status(403).send({
            message: "You are not admin"
        })
    }
}
