function notFound(message, errorCode) {
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.message = message || 'The requested resource couldn\'t be found';
    this.statusCode = 404;
    this.errorCode = errorCode || 404;
}

function badRequest(message, errorCode) {
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.message = message || 'Bad Request';
    this.statusCode = 400;
    this.errorCode = errorCode || 400;
}

function unAuthorized(message, errorCode) {
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.message = message || 'UnAuthorized';
    this.statusCode = 401;
    this.errorCode = errorCode || 401;
}

module.exports = {
    notFound: notFound,
    badRequest: badRequest,
    unAuthorized: unAuthorized
};