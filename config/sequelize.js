var config = require('./db');
var Sequelize = require('sequelize');

config.sql.dialectOptions = {
    multipleStatements: true
};
var db = {
    sequelize: new Sequelize(
        config.sql.database,
        config.sql.username,
        config.sql.password,
        config.sql
    )
};

// db.OAuthAccessToken = db.sequelize.import('./../models/oauth-access-token.model');
// db.OAuthAuthorizationCode = db.sequelize.import('./../models/oauth-authorization-code.model');
// db.OAuthClient = db.sequelize.import('./../models/oauth-client.model');
// db.OAuthRefreshToken = db.sequelize.import('./../models/oauth-refresh-token.model');
// db.OAuthScope = db.sequelize.import('./../models/oauth-scope.model');
// db.User = db.sequelize.import('./../models/user.model');
// db.Order = db.sequelize.import('./../models/order.model');
// db.ExtrasNames = db.sequelize.import('./../models/extras-names.model');
// db.OrderStatuses = db.sequelize.import('./../models/order-statuses.model');
// db.Review = db.sequelize.import('./../models/review.model');
// db.OrderLocation = db.sequelize.import('./../models/order-location.model');
// db.OrderExtras = db.sequelize.import('./../models/order-extras.model');
// db.VehicleTypes = db.sequelize.import('./../models/vehicle-type.model');
// db.Vehicle = db.sequelize.import('./../models/vehicle.model');
// db.File = db.sequelize.import('./../models/file.model');
// db.FileToEntity = db.sequelize.import('./../models/file-to-entity.model');
// db.AuditLog = db.sequelize.import('./../models/audit-log.model');
// db.GlobalSettings = db.sequelize.import('./../models/global-settings.model');
// db.UserLocation = db.sequelize.import('./../models/user-location.model');
// db.UserRole = db.sequelize.import('./../models/user-role.model');
// db.UserMeta = db.sequelize.import('./../models/user-meta.model');
// db.MetaName = db.sequelize.import('./../models/meta-name.model');
// db.Payment = db.sequelize.import('./../models/payment.model');
// db.UserToVehicle = db.sequelize.import('./../models/user-to-vehicle.model');
// db.OrderStatusHistory = db.sequelize.import('./../models/order-status-history.model');
// db.DeviceToken = db.sequelize.import('./../models/device-token.model');
// db.DriverNewOrderViewed = db.sequelize.import('./../models/driver-new-order-viewed.model');
// db.DriverFutureOrderViewed = db.sequelize.import('./../models/driver-future-order-viewed.model');
// db.Pages = db.sequelize.import('./../models/pages.model');
// db.OrderType = db.sequelize.import('./../models/order-type.model');

Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

module.exports = db;