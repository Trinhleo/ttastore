var moment = require('moment');
var _ = require('lodash');
var constant = require('../config/constant');
var hostName = require('../services/network').getHostName();

module.exports = {
    convertDatabaseTime: convertDatabaseTime,
    convertUserMetaModel: convertUserMetaModel,
    convertUserMetaModelForAdmin,
    isAdmin: isAdmin,
    convertUserMetaModelToObject: convertUserMetaModelToObject,
    convertImageArrayToObject: convertImageArrayToObject,
    isCustomer: isCustomer,
    isDriver: isDriver,
    handleOrderData: handleOrderData,
    handleOrderObjectData: handleOrderObjectData,
    getDeviceTokensDrivers: getDeviceTokensDrivers,
    getDeviceTokensCustomerOfOneOrder: getDeviceTokensCustomerOfOneOrder,
    getDeviceTokensDriverOfOneOrder: getDeviceTokensDriverOfOneOrder,
    calculatePagination: calculatePagination,
    handleCustomerData: handleCustomerData,
    calculateResponePaginationData: calculateResponePaginationData,
    getPictureUrl: getPictureUrl,
    handleCustomerDataObj: handleCustomerDataObj,
    handleDriverData: handleDriverData,
    handleDriverDataObj: handleDriverDataObj,
    getDeviceTokensDriversForNewOrder: getDeviceTokensDriversForNewOrder,
    handleExtrasService: handleExtrasService,
    handleValue: handleValue,
    calculateAvgRating: calculateAvgRating
};

function convertDatabaseTime(dateTime) {
    return moment.utc(dateTime).format("YYYY-MM-DD HH:mm:ss");
}

function convertUserMetaModel(userMetaModel, metaNames, userId) {
    var userMetaModelNew = [];
    var userMetaModelKeys = Object.keys(userMetaModel);
    _.forEach(userMetaModelKeys, function (userMeta) {
        var metaName = _.find(metaNames, function (o) { return o.key === userMeta; });
        if (metaName) {
            userMetaModelNew.push({
                user_id: userId,
                meta_name_id: metaName.meta_name_id,
                meta_value: userMetaModel[userMeta]
            });
        }
    });
    return userMetaModelNew;
}

function convertUserMetaModelForAdmin(userMetaModel, metaNames, userId, currentMetas) {
    var userMetaModelToUpdate = [];
    var userMetaModelToCreate = [];
    var userMetaModelNew = [];
    var userMetaModelKeys = Object.keys(userMetaModel);
    _.forEach(userMetaModelKeys, function (userMeta) {
        var metaName = _.find(metaNames, function (o) { return o.key === userMeta; });
        if (metaName) {
            userMetaModelNew.push({
                user_id: userId,
                meta_name_id: metaName.meta_name_id,
                meta_value: userMetaModel[userMeta]
            });
        }
    });
    _.forEach(userMetaModelNew, function (userMeta) {
        var metaNameObj = _.find(currentMetas, function (o) { return o.meta_name_id === userMeta.meta_name_id; });
        if (metaNameObj) {
            userMetaModelToUpdate.push(userMeta);
        } else {
            userMetaModelToCreate.push(userMeta);
        }
    });

    return { toCreate: userMetaModelToCreate, toUpdate: userMetaModelToUpdate };
}
function convertUserMetaModelToObject(userMetaModel, metaNames) {
    var userMetaModelNew = {};
    var o = {};
    _.forEach(userMetaModel, function (userMeta) {
        var metaName = _.find(metaNames, function (_o) {
            o = _o;
            return o.meta_name_id === userMeta.meta_name_id;
        });
        if (metaName) {
            userMetaModelNew[o.key] = userMeta.meta_value;
        }
    });
    return userMetaModelNew;
}

function convertImageArrayToObject(_imageFiles) {
    var imageObject = {};
    _.forEach(_imageFiles, function (image) {
        imageObject[image.entity_name] = image.file_id;
    });
    return imageObject;
}

function isAdmin(roleId) {
    var result;
    if (Array.isArray(roleId)) {
        var role = _.find(roleId, function (o) { return o.role_id === constant.ROLES.ADMIN; });
        result = role ? true : false;
    } else if (typeof roleId === "object") {
        result = roleId.role_id = constant.ROLES.ADMIN;
    } else {
        result = roleId === constant.ROLES.ADMIN;
    }
    return result;
}
function isCustomer(roleId) {
    var result;
    if (Array.isArray(roleId)) {
        var role = _.find(roleId, function (o) { return o.role_id === constant.ROLES.USER; });
        result = role ? true : false;
    } else if (typeof roleId === "object") {
        result = roleId.role_id = constant.ROLES.USER;
    } else {
        result = roleId === constant.ROLES.USER;
    }
    return result;
}
function isDriver(roleId) {
    var result;
    if (Array.isArray(roleId)) {
        var role = _.find(roleId, function (o) { return o.role_id === constant.ROLES.DRIVER; });
        result = role ? true : false;
    } else if (typeof roleId === "object") {
        result = roleId.role_id = constant.ROLES.DRIVER;
    } else {
        result = roleId === constant.ROLES.DRIVER;
    }
    return result;
}

function handleOrderData(_orders, _avatars, _orderExtras, _userMetas) {
    var orders = _orders || [];
    var avatars = _avatars || [];
    var orderExtras = _orderExtras || [];
    var userMetas = _userMetas || [];
    _.forEach(orders, function (order) {
        if (order) {
            var avatar_customer_object = _.find(avatars, function (o) {
                if (!order.customer) {
                    return false;
                }
                return o.entity_id === order.customer_id;
            });
            var avatar_driver_object = _.find(avatars, function (o) {
                if (!order.driver) {
                    return false;
                }
                return o.entity_id === order.driver_id;
            });
            if (order.dataValues.customer && avatar_customer_object && avatar_customer_object.File) {
                order.dataValues.customer.dataValues.avatar = hostName.concat(avatar_customer_object.File.path).concat('/').concat(avatar_customer_object.File.full_filename);
            }
            if (order.dataValues.driver && avatar_driver_object && avatar_driver_object.File) {
                order.dataValues.driver.dataValues.avatar = hostName.concat(avatar_driver_object.File.path).concat('/').concat(avatar_driver_object.File.full_filename);
            }
            order.dataValues.pickup_location = {};
            order.dataValues.dropoff_location = {};

            _.forEach(order.dataValues.order_location, function (orderLocation) {
                if (orderLocation.type === "pickup") {
                    order.dataValues.pickup_location = orderLocation;
                }
                if (orderLocation.type === "destination") {
                    order.dataValues.dropoff_location = orderLocation;
                }
            });
            delete order.order_location;
            delete order.dataValues.order_location;
            order.dataValues.order_extras = [];
            _.forEach(orderExtras, function (orderExtra) {
                if (order.order_id === orderExtra.order_id) {
                    order.dataValues.order_extras.push(orderExtra);
                }
            });
            var phone_number_object = _.find(userMetas, function (o) {
                return o.user_id === order.customer_id;
            });
            var phone_number_object_driver = _.find(userMetas, function (o) {
                return o.user_id === order.driver_id;
            });
            if (phone_number_object && order.dataValues.customer) {
                order.dataValues.customer.dataValues.phone_number = phone_number_object.meta_value;
            }
            if (phone_number_object_driver && order.dataValues.driver) {
                order.dataValues.driver.dataValues.phone_number = phone_number_object_driver.meta_value;
            }
            if (order.driver) {
                var rating = 0;
                var total_feedback = 0;
                var feedbacks = order.driver.feedback;
                if (feedbacks && feedbacks.length > 0) {
                    var totalRate = 0;
                    _.forEach(feedbacks, function (feedback) {
                        if (feedback.rating > 0) {
                            totalRate += feedback.rating;
                        }
                    });
                    rating = totalRate / feedbacks.length;
                    total_feedback = feedbacks.length;

                }
                order.dataValues.driver_rating = rating;
                order.dataValues.total_feedback = total_feedback;
            }
        };
    });
    return orders;
}

function handleOrderObjectData(_order, _avatars, _orderExtras, _userMetas) {
    var order = _order || {};
    var avatars = _avatars || [];
    var orderExtras = _orderExtras || [];
    var userMetas = _userMetas;
    if (order) {
        var avatar_customer_object = _.find(avatars, function (o) {
            if (!order.customer) {
                return false;
            }
            return o.entity_id === order.customer.user_id;
        });
        var avatar_driver_object = _.find(avatars, function (o) {
            if (!order.driver) {
                return false;
            }
            return o.entity_id === order.driver.user_id;
        });
        if (order.dataValues.customer && avatar_customer_object && avatar_customer_object.File) {
            order.dataValues.customer.dataValues.avatar = hostName.concat(avatar_customer_object.File.path).concat('/').concat(avatar_customer_object.File.full_filename);
        }
        if (order.dataValues.driver && avatar_driver_object && avatar_driver_object.File) {
            order.dataValues.driver.dataValues.avatar = hostName.concat(avatar_driver_object.File.path).concat('/').concat(avatar_driver_object.File.full_filename);
        }
        order.dataValues.pickup_location = {};
        order.dataValues.dropoff_location = {};

        _.forEach(order.order_location, function (orderLocation) {
            if (orderLocation.type === "pickup") {
                order.dataValues.pickup_location = orderLocation;
            }
            if (orderLocation.type === "destination") {
                order.dataValues.dropoff_location = orderLocation;
            }
        });
        delete order.order_location;
        delete order.dataValues.order_location;
        order.dataValues.order_extras = [];
        _.forEach(orderExtras, function (orderExtra) {
            if (order.order_id === orderExtra.order_id) {
                order.dataValues.order_extras.push(orderExtra);
            }
        });
        var phone_number_object = _.find(userMetas, function (o) {
            return o.user_id === order.customer_id;
        });
        var phone_number_object_driver = _.find(userMetas, function (o) {
            return o.user_id === order.driver_id;
        });
        if (phone_number_object && order.dataValues.customer) {
            order.dataValues.customer.dataValues.phone_number = phone_number_object.meta_value;
        }
        if (phone_number_object_driver && order.dataValues.driver) {
            order.dataValues.driver.dataValues.phone_number = phone_number_object_driver.meta_value;
        }
        if (order.driver) {
            var rating = 0;
            var feedbacks = order.driver.feedback;
            if (feedbacks && feedbacks.length > 0) {
                var totalRate = 0;
                _.forEach(feedbacks, function (feedback) {
                    if (feedback.rating > 0) {
                        totalRate += feedback.rating;
                    }
                });
                rating = totalRate / feedbacks.length;
            }
            order.dataValues.driver_rating = rating;
        }
    };
    return order;
}


function getDeviceTokensDriversForNewOrder(_deviceTokens) {
    var deviceTokens = _deviceTokens;
    var tokens = [];
    if (deviceTokens) {
        _.forEach(deviceTokens, function (deviceToken) {
            var userRole = deviceToken.user_role || {};
            if (isDriver(userRole.role_id) && deviceToken.enable_new_order === true) {
                tokens.push(deviceToken.token);
            }
        });
    }
    return tokens;
}

function getDeviceTokensDrivers(_deviceTokens) {
    var deviceTokens = _deviceTokens;
    var tokens = [];
    if (deviceTokens) {
        _.forEach(deviceTokens, function (deviceToken) {
            var userRole = deviceToken.user_role || {};
            if (isDriver(userRole.role_id)) {
                tokens.push(deviceToken.token);
            }
        });
    }
    return tokens;
}

function getDeviceTokensCustomerOfOneOrder(_deviceTokens, _customerId) {
    var deviceTokens = _deviceTokens;
    var customerId = _customerId || "";
    var tokens = [];
    if (deviceTokens) {
        _.forEach(deviceTokens, function (deviceToken) {
            if (deviceToken.user_id === customerId) {
                tokens.push(deviceToken.token);
            }
        });
    }
    return tokens;
}

function getDeviceTokensDriverOfOneOrder(_deviceTokens, _driverId) {
    var deviceTokens = _deviceTokens;
    var driverId = _driverId || "";
    var tokens = [];
    if (deviceTokens) {
        _.forEach(deviceTokens, function (deviceToken) {
            if (deviceToken.user_id === driverId) {
                tokens.push(deviceToken.token);
            }
        });
    }
    return tokens;
}


function calculatePagination(_page, _limit) {
    var offset = 0;
    var limit = 0;
    var pagination = {};
    if (_page && _limit && _page > 1 && _limit > 0) {
        offset = (_page - 1) * _limit;
    }
    if (_limit > 0) {
        limit = _limit;
    }
    if (_limit === 0) {
        offset = 0;
    }
    pagination.offset = offset;
    pagination.limit = limit;
    return pagination;
}

function handleCustomerData(_customers) {
    var customers = _customers || [];
    var newCustomers = [];
    _.forEach(customers, function (customer) {
        var userMetaObject = _.find(customer.user_metas, function (o) {
            if (!o) {
                return false;
            }
            return o.meta_name_id === constant.META_NAME_ID.MOBILE_NUMBER;
        });
        var customerNotes = _.find(customer.user_metas, function (o) {
            if (!o) {
                return false;
            }
            return o.meta_name_id === constant.META_NAME_ID.CUSTOMER_NOTES;
        });
        if (userMetaObject) {
            customer.dataValues.mobile_number = userMetaObject.meta_value;
        }
        if (customerNotes) {
            customer.dataValues.customer_notes = customerNotes.meta_value;
        }
        delete customer.dataValues.user_metas;
        delete customer.dataValues.role;
        newCustomers.push(customer);
    });
    return newCustomers;
}

function calculateResponePaginationData(query, result) {
    var totalPages = 0;
    var totalItems = 0;
    if (result) {
        var limit = parseInt(query.limit);
        if (limit === 0 || !limit) {
            totalPages = 1;
        } else {
            totalPages = result.count / limit;
            if (totalPages > 0 && totalPages < 1) {
                totalPages = 1;
            }
        }
        if (result.count && result.count === 0) {
            totalPages = 0;
        }
        totalItems = result.count || 0;
    }
    if (totalPages % 1 > 0) {
        totalPages = totalPages - totalPages % 1 + 1;
    }
    return { totalPages: totalPages, totalItems: totalItems };
}

function getPictureUrl(file, preFix, thumbnail) {
    var filePath = file.path;
    var fileName = "";;
    if (thumbnail) {
        fileName += file.filename + '_thumb.' + file.extension;
    } else {
        fileName += file.full_filename;
    }
    return preFix.concat(filePath.concat('/').concat(fileName));
}

function handleCustomerDataObj(customer) {
    mobileNumberObj = _.find(customer.user_metas, function (o) {
        if (!o) {
            return false;
        }
        return o.meta_name_id === constant.META_NAME_ID.MOBILE_NUMBER;
    });
    deviceIdObj = _.find(customer.user_metas, function (o) {
        if (!o) {
            return false;
        }
        return o.meta_name_id === constant.META_NAME_ID.UUID;
    });
    var customerNotes = _.find(customer.user_metas, function (o) {
        if (!o) {
            return false;
        }
        return o.meta_name_id === constant.META_NAME_ID.CUSTOMER_NOTES;
    });
    if (mobileNumberObj) {
        customer.mobile_number = mobileNumberObj.meta_value;
    }
    if (deviceIdObj) {
        customer.device_id = deviceIdObj.meta_value;
    }
    if (customerNotes) {
        customer.customer_notes = customerNotes.meta_value;
    }
    delete customer.user_metas;
    delete customer.role;
    return customer;
}

function handleDriverData(_drivers) {
    var drivers = _drivers || [];
    var newDrivers = [];
    _.forEach(drivers, function (driver) {
        var mobile = _.find(driver.user_metas, function (o) {
            if (!o) {
                return false;
            }
            return o.meta_name_id === constant.META_NAME_ID.MOBILE_NUMBER;
        });
        var address1 = _.find(driver.user_metas, function (o) {
            if (!o) {
                return false;
            }
            return o.meta_name_id === constant.META_NAME_ID.ADDRESS_1;
        });
        var address2 = _.find(driver.user_metas, function (o) {
            if (!o) {
                return false;
            }
            return o.meta_name_id === constant.META_NAME_ID.ADDRESS_2;
        });
        var postCode = _.find(driver.user_metas, function (o) {
            if (!o) {
                return false;
            }
            return o.meta_name_id === constant.META_NAME_ID.POSTCODE;
        });

        var country = _.find(driver.user_metas, function (o) {
            if (!o) {
                return false;
            }
            return o.meta_name_id === constant.META_NAME_ID.COUNTRY;
        });
        var drivingLocation = _.find(driver.user_metas, function (o) {
            if (!o) {
                return false;
            }
            return o.meta_name_id === constant.META_NAME_ID.DRIVING_LOCATION;
        });

        var city = _.find(driver.user_metas, function (o) {
            if (!o) {
                return false;
            }
            return o.meta_name_id === constant.META_NAME_ID.CITY;
        });

        var driverNotes = _.find(driver.user_metas, function (o) {
            if (!o) {
                return false;
            }
            return o.meta_name_id === constant.META_NAME_ID.DRIVER_NOTES;
        });

        var ni = _.find(driver.user_metas, function (o) {
            if (!o) {
                return false;
            }
            return o.meta_name_id === constant.META_NAME_ID.NI;
        });

        var company = _.find(driver.user_metas, function (o) {
            if (!o) {
                return false;
            }
            return o.meta_name_id === constant.META_NAME_ID.COMPANY;
        });

        var dayOfBirth = _.find(driver.user_metas, function (o) {
            if (!o) {
                return false;
            }
            return o.meta_name_id === constant.META_NAME_ID.DAY_OF_BIRTH;
        });

        if (mobile) {
            driver.dataValues.mobile_number = mobile.meta_value;
        }
        if (address1) {
            driver.dataValues.address_1 = address1.meta_value;
        }
        if (address2) {
            driver.dataValues.address_2 = address2.meta_value;
        }
        if (postCode) {
            driver.dataValues.postcode = postCode.meta_value;
        }
        if (country) {
            driver.dataValues.country = country.meta_value;
        }
        if (drivingLocation) {
            driver.dataValues.driving_location = drivingLocation.meta_value;
        }
        if (city) {
            driver.dataValues.city = city.meta_value;
        }

        if (driverNotes) {
            driver.dataValues.driver_notes = driverNotes.meta_value;
        }

        if (ni) {
            driver.dataValues.ni = ni.meta_value;
        }
        if (company) {
            driver.dataValues.company = company.meta_value;
        }

        if (dayOfBirth) {
            driver.dataValues.day_of_birth = dayOfBirth.meta_value;
        }

        var rating = 0;
        if (driver.feedback && driver.feedback.length > 0) {
            var feedbacks = driver.feedback;
            var totalRate = 0;
            _.forEach(feedbacks, function (feedback) {
                if (feedback.rating > 0) {
                    totalRate += feedback.rating;
                }
            });
            rating = totalRate / feedbacks.length;
        }
        driver.dataValues.rating = rating;
        delete driver.dataValues.feed_back;
        delete driver.dataValues.user_metas;
        delete driver.dataValues.role;
        newDrivers.push(driver);
    });
    return newDrivers;
}

function handleDriverDataObj(driver, _userImages) {
    var mobile = _.find(driver.user_metas, function (o) {
        if (!o) {
            return false;
        }
        return o.meta_name_id === constant.META_NAME_ID.MOBILE_NUMBER;
    });
    var address1 = _.find(driver.user_metas, function (o) {
        if (!o) {
            return false;
        }
        return o.meta_name_id === constant.META_NAME_ID.ADDRESS_1;
    });
    var address2 = _.find(driver.user_metas, function (o) {
        if (!o) {
            return false;
        }
        return o.meta_name_id === constant.META_NAME_ID.ADDRESS_2;
    });
    var bankAccountNumber = _.find(driver.user_metas, function (o) {
        if (!o) {
            return false;
        }
        return o.meta_name_id === constant.META_NAME_ID.BANK_ACCOUNT_NUMBER;
    });
    var sortCode = _.find(driver.user_metas, function (o) {
        if (!o) {
            return false;
        }
        return o.meta_name_id === constant.META_NAME_ID.SORT_CODE;
    });
    var postCode = _.find(driver.user_metas, function (o) {
        if (!o) {
            return false;
        }
        return o.meta_name_id === constant.META_NAME_ID.POSTCODE;
    });

    var country = _.find(driver.user_metas, function (o) {
        if (!o) {
            return false;
        }
        return o.meta_name_id === constant.META_NAME_ID.COUNTRY;
    });

    var city = _.find(driver.user_metas, function (o) {
        if (!o) {
            return false;
        }
        return o.meta_name_id === constant.META_NAME_ID.CITY;
    });

    var driverLicenceNumber = _.find(driver.user_metas, function (o) {
        if (!o) {
            return false;
        }
        return o.meta_name_id === constant.META_NAME_ID.DRIVER_LICENCE_NUMER;
    });

    var driverLicenceNumberExpiry = _.find(driver.user_metas, function (o) {
        if (!o) {
            return false;
        }
        return o.meta_name_id === constant.META_NAME_ID.DRIVER_LICENCE_NUMBER_EXPIRY;
    });

    var logBookNumber = _.find(driver.user_metas, function (o) {
        if (!o) {
            return false;
        }
        return o.meta_name_id === constant.META_NAME_ID.LOG_BOOK_NUMBER;
    });

    var vanInsuranceExpiry = _.find(driver.user_metas, function (o) {
        if (!o) {
            return false;
        }
        return o.meta_name_id === constant.META_NAME_ID.VAN_INSURANCE_EXPIRY;
    });

    var passportNumber = _.find(driver.user_metas, function (o) {
        if (!o) {
            return false;
        }
        return o.meta_name_id === constant.META_NAME_ID.PASSPORT_NUMBER;
    });

    var passportExpiry = _.find(driver.user_metas, function (o) {
        if (!o) {
            return false;
        }
        return o.meta_name_id === constant.META_NAME_ID.PASSPORT_EXPIRY;
    });
    var liabilityNotes = _.find(driver.user_metas, function (o) {
        if (!o) {
            return false;
        }
        return o.meta_name_id === constant.META_NAME_ID.LIABILITY_NOTES;
    });

    var other = _.find(driver.user_metas, function (o) {
        if (!o) {
            return false;
        }
        return o.meta_name_id === constant.META_NAME_ID.OTHER;
    });

    var driverNotes = _.find(driver.user_metas, function (o) {
        if (!o) {
            return false;
        }
        return o.meta_name_id === constant.META_NAME_ID.DRIVER_NOTES;
    });

    var dayOfBirth = _.find(driver.user_metas, function (o) {
        if (!o) {
            return false;
        }
        return o.meta_name_id === constant.META_NAME_ID.DAY_OF_BIRTH;
    });

    var ni = _.find(driver.user_metas, function (o) {
        if (!o) {
            return false;
        }
        return o.meta_name_id === constant.META_NAME_ID.NI;
    });

    var bankName = _.find(driver.user_metas, function (o) {
        if (!o) {
            return false;
        }
        return o.meta_name_id === constant.META_NAME_ID.BANK_NAME;
    });

    var bankNotes = _.find(driver.user_metas, function (o) {
        if (!o) {
            return false;
        }
        return o.meta_name_id === constant.META_NAME_ID.BANK_NOTES;
    });

    var company = _.find(driver.user_metas, function (o) {
        if (!o) {
            return false;
        }
        return o.meta_name_id === constant.META_NAME_ID.COMPANY;
    });

    var motExpiry = _.find(driver.user_metas, function (o) {
        if (!o) {
            return false;
        }
        return o.meta_name_id === constant.META_NAME_ID.MOT_EXPIRY;
    });

    var roadTaxExpiry = _.find(driver.user_metas, function (o) {
        if (!o) {
            return false;
        }
        return o.meta_name_id === constant.META_NAME_ID.ROAD_TAX_EXPIRY;
    });

    if (mobile) {
        driver.mobile_number = mobile.meta_value;
    }
    if (address1) {
        driver.address_1 = address1.meta_value;
    }
    if (address2) {
        driver.address_2 = address2.meta_value;
    }
    if (bankAccountNumber) {
        driver.bank_account_number = bankAccountNumber.meta_value;
    }
    if (sortCode) {
        driver.sort_code = sortCode.meta_value;
    }
    if (postCode) {
        driver.postcode = postCode.meta_value;
    }

    if (country) {
        driver.country = country.meta_value;
    }

    if (city) {
        driver.city = city.meta_value;
    }

    if (driverLicenceNumber) {
        driver.driver_licence_number = driverLicenceNumber.meta_value;
    }

    if (driverLicenceNumberExpiry) {
        driver.driver_licence_expiry = driverLicenceNumberExpiry.meta_value;
    }

    if (logBookNumber) {
        driver.log_book_number = logBookNumber.meta_value;
    }

    if (vanInsuranceExpiry) {
        driver.van_insurance_expiry = vanInsuranceExpiry.meta_value;
    }

    if (passportNumber) {
        driver.passport_number = passportNumber.meta_value;
    }

    if (passportExpiry) {
        driver.passport_expiry = passportExpiry.meta_value;
    }

    if (liabilityNotes) {
        driver.liability_notes = liabilityNotes.meta_value;
    }
    if (other) {
        driver.other = other.meta_value;
    }
    if (driverNotes) {
        driver.driver_notes = driverNotes.meta_value;
    }
    if (dayOfBirth) {
        driver.day_of_birth = dayOfBirth.meta_value;
    }

    if (ni) {
        driver.ni = ni.meta_value;
    }
    if (bankName) {
        driver.bank_name = bankName.meta_value;
    }
    if (bankNotes) {
        driver.bank_notes = bankNotes.meta_value;
    }
    if (company) {
        driver.company = company.meta_value;
    }
    if (motExpiry) {
        driver.mot_expiry = motExpiry.meta_value;
    }
    if (roadTaxExpiry) {
        driver.road_tax_expiry = roadTaxExpiry.meta_value;
    }
    if (_userImages) {
        var avatar = _.find(_userImages, function (o) {
            if (!o) {
                return false;
            }
            if (!o.File) {
                return false;
            }
            return o.File.category === constant.IMAGE.PROFILE.AVATAR;
        });
        var driverLicenceFront = _.find(_userImages, function (o) {
            if (!o) {
                return false;
            }
            if (!o.File) {
                return false;
            }
            return o.File.category === constant.IMAGE.PROFILE.DRIVER_LICENCE_FRONT;
        });
        var driverLicenceBack = _.find(_userImages, function (o) {
            if (!o) {
                return false;
            }
            if (!o.File) {
                return false;
            }
            return o.File.category === constant.IMAGE.PROFILE.DRIVER_LICENCE_BACK;
        });

        var motPhoto = _.find(_userImages, function (o) {
            if (!o) {
                return false;
            }
            if (!o.File) {
                return false;
            }
            return o.File.category === constant.IMAGE.PROFILE.MOT_PHOTO;
        });

        var roadTaxInformation = _.find(_userImages, function (o) {
            if (!o) {
                return false;
            }
            if (!o.File) {
                return false;
            }
            return o.File.category === constant.IMAGE.PROFILE.ROAD_TAX_INFORMATION;
        });

        var passportPhoto = _.find(_userImages, function (o) {
            if (!o) {
                return false;
            }
            if (!o.File) {
                return false;
            }
            return o.File.category === constant.IMAGE.PROFILE.PASSPORT_PHOTO;
        });

        var liabilityInsurance = _.find(_userImages, function (o) {
            if (!o) {
                return false;
            }
            if (!o.File) {
                return false;
            }
            return o.File.category === constant.IMAGE.PROFILE.LIABILITY_INSURANCE;
        });


        if (avatar) {
            driver.user_photo = getPictureUrl(avatar.File, hostName);
            driver.user_photo_thumb = getPictureUrl(avatar.File, hostName, true);
        }
        if (driverLicenceFront) {
            driver.driver_licence_front_photo = driverLicenceFront.file_id;
        }
        if (driverLicenceBack) {
            driver.driver_licence_back_photo = driverLicenceBack.file_id;
        }
        if (motPhoto) {
            driver.mot_photo = motPhoto.file_id;
        }
        if (roadTaxInformation) {
            driver.road_tax_information = roadTaxInformation.file_id;
        }

        if (passportPhoto) {
            driver.passport_photo = passportPhoto.file_id;
        }

        if (liabilityInsurance) {
            driver.liability_insurance = liabilityInsurance.file_id;
        }


        _.forEach(driver.vehicles, function (vehicle) {
            var vehicleImage = _.find(_userImages, function (o) {
                if (!o) {
                    return false;
                }
                return o.entity_name === constant.IMAGE.VEHICLE.CATEGORY_NAME && o.entity_id === vehicle.vehicle_id;
            });

            var logBook = _.find(_userImages, function (o) {
                if (!o) {
                    return false;
                }
                if (!o.File) {
                    return false;
                }
                return o.File.category === constant.IMAGE.PROFILE.LOG_BOOK && o.entity_id === vehicle.vehicle_id;
            });
            var insurancePaper = _.find(_userImages, function (o) {
                if (!o) {
                    return false;
                }
                if (!o.File) {
                    return false;
                }
                return o.File.category === constant.IMAGE.PROFILE.INSURANCEPAPER && o.entity_id === vehicle.vehicle_id;
            });
            if (logBook) {
                vehicle.dataValues.log_book_photo = logBook.file_id;
            }
            if (insurancePaper) {
                vehicle.dataValues.insurance_paper_photo = insurancePaper.file_id;
            }
            if (vehicleImage) {
                vehicle.dataValues.van_photo = vehicleImage.file_id;
            }
        });
    }
    delete driver.user_metas;
    delete driver.role;
    return driver;
}

function handleExtrasService(orderExtras, extrasServiceId) {
    var extraToAdd = [];
    var extraToRemove = [];
    if (extrasServiceId) {
        // find extra service to add;
        _.forEach(extrasServiceId, function (et) {
            var checkObject = _.find(orderExtras, function (o) {
                return (et.extras_name_id === o.extra_name_id);
            });
            if (!checkObject) {
                extraToAdd.push(et.extras_name_id);
            }
        });
        //find extra service to remove
        if (extrasServiceId.length > 0) {
            _.forEach(orderExtras, function (et) {
                var checkObject = _.find(extrasServiceId, function (o) {
                    if (!o) {
                        return true;
                    }
                    return (et.extra_name_id === o.extras_name_id);
                });
                if (!checkObject) {
                    extraToRemove.push(et.extra_name_id);
                }
            });
        } else {
            _.forEach(orderExtras, function (et) {
                extraToRemove.push(et.extra_name_id);
            });
        }
    }
    return { extraToAdd: extraToAdd, extraToRemove: extraToRemove };
}

function handleValue(value) {
    if (value === "") {
        return null;
    }
    return value;
}

function calculateAvgRating(_feedbacks) {
    var rating = 0;
    var total_feedback = 0;
    var feedbacks = _feedbacks;
    if (feedbacks && feedbacks.length > 0) {
        var totalRate = 0;
        _.forEach(feedbacks, function (feedback) {
            if (feedback.rating > 0) {
                totalRate += feedback.rating;
            }
        });
        rating = totalRate / feedbacks.length;
        total_feedback = feedbacks.length;

    }
    return rating;
}