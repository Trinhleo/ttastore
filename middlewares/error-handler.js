var log4js = require('./../services/log4js');

exports.errorHandler = function () {
    return function (err, req, res, next) {
        if (err) {
            log4js.error.info(req.method, "-", req.url, "-", 'error:', err);
            res.status(err.statusCode || 500).send(removeStatusCode(err));
        }
    };
};

function removeStatusCode(err) {
    delete err.statusCode;
    if (err.sql) {
        return { message: err.message, errors: err.errors };
    } else if (!err.message) {
        return { message: err };
    }
    return err;
}