var router = require('express').Router();
var authController = require('../controllers/auth.controller.js');
var authMiddlewares = require('../middlewares/authentication.js');


module.exports = function () {
    console.log(router)
    router.post('/register', authController.register);
    router.post('/login', authController.login);
    return router;
};