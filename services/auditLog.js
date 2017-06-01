var sqldb = require('./../config/sequelize');
var AuditLog = sqldb.AuditLog;
var log4js = require('./log4js');

module.exports = {
    createLog: createLog
}

function createLog(object_name, object_id, reference_name, action_code, action_message, original_value, new_value, created_by, data) {

    var auditLogModel = {
        action: action_code + ": " + action_message,
    };
    if (object_name) {
        auditLogModel.object_name = object_name;
    }
    if (object_id) {
        auditLogModel.object_id = object_id;
    }
    if (reference_name) {
        auditLogModel.reference_name = reference_name;
    }
    if (original_value) {
        auditLogModel.original_value = original_value;
    }
    if (new_value) {
        auditLogModel.new_value = new_value;
    }
    if (created_by) {
        auditLogModel.created_by = created_by;
    }
    if (data) {
        auditLogModel.data = data;
    }
    return new Promise(function (resolve, reject) {
        AuditLog.create(auditLogModel).then(function (newAuditLog) {
            log4js.info.info('AUDIT LOG USER META CHANGED - Success', newAuditLog);
            resolve(newAuditLog);
        }).catch(function (err) {
            log4js.error.info('AUDIT LOG USER META CHANGED - Error', err);
            reject(err);
        });
    });

}