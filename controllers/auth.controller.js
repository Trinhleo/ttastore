var userDao = require('./../dao/user.dao');
var errorResult = require('../services/errorResult');
var bcryptService = require('../services/bcrypt');
var imageService = require('../services/image');
var errorConst = require('../config/error.constant');
var validateService = require('./../services/validate-model');
var constant = require('../config/constant');
var _ = require('lodash');
var jwtService = require('../services/jwt');
var networkService = require('../services/network');
module.exports = {
    register: register,
    login: login
};

function getPublicUser(user) {
    delete user.password;
    delete user.salt;
    return user;
}
async function register(req, res, next) {
    var userModel = req.body;
    var img = req.files ? req.files[constant.IMAGE.PROFILE.FILE_FIELD] : null;
    userModel = _.omit(userModel, function (value) {
        return _.isUndefined(value) || _.isNull(value);
    });
    var errorList = validateUserModel(userModel, img);
    if (errorList.length > 0) {
        return next(new errorResult.badRequest(errorList));
    }
    var imageOptions = {
        fileField: constant.IMAGE.PROFILE.FILE_FIELD,
        fileSizeLimits: constant.IMAGE.PROFILE.MAX_FILE_SIZE,
        heightResize: constant.IMAGE.PROFILE.HEIGHT,
        widthResize: constant.IMAGE.PROFILE.WIDTH,
        dir: constant.IMAGE.PROFILE.DIR + userModel.email + '/avatar',
        prePath: constant.IMAGE.PROFILE.PRE_PATH + userModel.email + '/avatar'
    };
    try {
        var checkUser = await userDao.findOne({ $or: [{ username: userModel.username }, { email: userModel.email }] })
        if (checkUser) {
            return next(new errorResult.badRequest("user is exist"));
        }
        var avatar = await imageService.uploadSingleImage(req, imageOptions);
        console.log("Upload avatar", avatar);
        const salt = await bcryptService.genSalt();

        // hash the password along with our new salt
        const hash = await bcryptService.hashWithSalt(userModel.password, salt);

        // override the cleartext password with the hashed one
        userModel.salt = salt;
        userModel.password = hash;
        userModel.avatar = imageOptions.prePath + '/' + avatar.fullFileName;
        userModel.created_by = 'admin@ttastore.com';
        var result = await userDao.create(userModel);
        res.send(result);
    }
    catch (err) {
        console.log(err);
        next(err);
    }

}
function validateUserModel(userModel, imageFile) {
    var errorList = [];
    if (!userModel.first_name) {
        errorList.push(errorConst.USER.FIRST_NAME_IS_REQUIRED);
    } else if (!validateService.validateFirstName(userModel.first_name)) {
        errorList.push(errorConst.USER.FIRST_NAME_NOT_EMPTY);
    }
    if (!userModel.last_name) {
        errorList.push(errorConst.USER.LAST_NAME_IS_REQUIRED);
    } else if (!validateService.validateLastName(userModel.last_name)) {
        errorList.push(errorConst.USER.LAST_NAME_NOT_EMPTY);
    }
    if (!userModel.email) {
        errorList.push(errorConst.USER.EMAIL_IS_REQUIRED);
    } else if (!validateService.validateEmail(userModel.email)) {
        errorList.push(errorConst.USER.EMAIL_INVALID);
    }
    if (!userModel.password) {
        errorList.push(errorConst.USER.PASSWORD_IS_REQUIRED);
    } else if (!validateService.validatePassword(userModel.password)) {
        errorList.push(errorConst.USER.PASSWORD_CHARACTERS_AT_LEAST);
    }
    if (!imageFile) {
        errorList.push(errorConst.USER.PROFILE_PICTURE_IS_REQUIRED);
    }
    if (!userModel.username) {
        errorList.push(errorConst.USER.USERNAME_IS_REQUIRED);
    }
    if (!userModel.mobile_number) {
        errorList.push(errorConst.USER.PHONE_NUMBER_IS_REQUIRED);
    } else if(!validateService.validateMobileNumber(userModel.mobile_number)){
         errorList.push(errorConst.USER.MOBILE_NUMBER_DIGITS);
    }
    return errorList;
}

async function login(req, res, next) {
    var userModel = {
        username: req.body.username,
        password: req.body.password
    };
    userModel = _.omit(userModel, function (value) {
        return _.isUndefined(value) || _.isNull(value);
    });
    var errorList = validateLoginModel(userModel);
    if (errorList.length > 0) {
        return next(new errorResult.badRequest(errorList));
    }
    try {
        console.log('user model', userModel);
        var user = await userDao.findOne({ username: userModel.username });
        if (!user) {
            return next(new errorResult.badRequest('Username or password wrong'));
        }
        var isMatchPassword = await bcryptService.comparePassword(userModel.password, user.password);
        if (!isMatchPassword) {
            return next(new errorResult.badRequest('Username or password wrong'))
        }
        var token_info = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            displayName: user.displayName,
            roles: user.roles,
            email: user.email,
            createtionDate: user.createtionDate,
            avatar: networkService.getHostName() + user.avatar
        };
        var token = await jwtService.sign(token_info, "12h");
        res.status(200).send({
            userInfo: token_info,
            access_token: token
        });
    } catch (err) {
        return next(err);
    }

}
function validateLoginModel(userModel) {
    var errorList = [];
    if (!userModel.username) {
        errorList.push(errorConst.USER.USERNAME_IS_REQUIRED);
    }
    if (!userModel.password) {
        errorList.push(errorConst.USER.PASSWORD_IS_REQUIRED);
    }
    return errorList
}