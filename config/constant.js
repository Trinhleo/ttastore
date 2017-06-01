var config = require('../config/config.json');
module.exports = {
    ORDER_STATUS: {
        NEW: 1,
        CONFIRMED: 2,
        PAID: 3,
        CANCELLED: 4,
        DRIVING_PICKUP: 5,
        ARRIVED_PICKUP: 6,
        DRIVING_DROPOFF: 7,
        ARRIVED_DROPOFF: 8,
        COMPLETED: 9,
        CLOSED: 10,
    },
    ORDER_TYPE: {
        INSTANT: 1,
        SCHEDULED: 2
    },
    CUSTOMER: {
        ADMIN: 1
    },
    DRIVER: {
        ADMIN: 1
    },
    ORDER_LOCATION: {
        PICK_UP: "pickup",
        DROPOFF: "destination",
        STOP: "stop"
    },
    IMAGE: {
        PROFILE: {
            AVATAR: 'avatar',
            DRIVER_LICENCE_FRONT: 'driving_licence_front',
            DRIVER_LICENCE_BACK: 'driving_licence_back',
            LOG_BOOK: "log_book",
            INSURANCEPAPER: "insurancepaper",
            MOT_PHOTO: "mot_photo",
            ROAD_TAX_INFORMATION: "road_tax_information",
            LIABILITY_INSURANCE: "liability_insurance",
            PASSPORT_PHOTO: "passport_photo",
            DIR: './public/images/user/',
            PRE_PATH: '/images/user/',
            FILE_FIELD: 'image',
            MAX_FILE_SIZE: 8589934592,
            DIR_PRIVATE: './private/images/user/'
        },
        VEHICLE: {
            CATEGORY_NAME: 'vehicle_photo',
            DIR: './private/images/vehicles/',
            PRE_PATH: './private/images/vehicles/',
            FILE_FIELD: 'image'
        },
        IMAGE_FORMATS: [
            'image/png',
            'image/jpg',
            'image/jpeg',
            'image/gif'
        ],
        DEFAULT_EXTENSION: '.png',
        THUMBNAIL_HEIGHT: 150,
        THUMBNAIL_WIDTH: 150
    },
    GLOBAL_SETTINGS: {
        KEY: {
            LOGIN_KEY: "login_key",
            TERM_AND_POLICY: "term_and_policy"
        }
    },
    ROLES: {
        ADMIN: 1,
        USER: 2,
        DRIVER: 3,
        VEHICLE_OWNER: 4,
        SUPPORT: 5
    },
    RESET_PASSWORD: {
        RESET_SUCCESS: config.RESET_PASSWORD.RESET_SUCCESS,
        SEND_MAIL_SUCCESS: config.RESET_PASSWORD.SEND_MAIL_SUCCESS,
        EMAIL_BODY: config.RESET_PASSWORD.EMAIL_BODY
    },
    META_STATUS: {
        STEP1: "step1",
        STEP2: "step2",
        STEP3: "step3",
        STEP4: "step4",
        STEP5: "step5"
    },
    PAYMENT_METHODS: {
        CASH: 1,
        PAYPAL: 2,
        DEBIT_CARD: 3,
        CREDIT_CARD: 4
    },
    META_NAME: {
        DEVICE_UUID: 'device-uuid'
    },
    META_NAME_ID: {
        MOBILE_NUMBER: 1,
        STATUS: 13,
        UUID: 9,
        POSTCODE: 4,
        ADDRESS_1: 2,
        ADDRESS_2: 3,
        COUNTRY: 5,
        DRIVING_LOCATION: 11,
        CITY: 12,
        BANK_ACCOUNT_NUMBER: 14,
        SORT_CODE: 15,
        COMPANY: 16,
        DAY_OF_BIRTH: 17,
        NI: 18,
        DRIVER_LICENCE_NUMER: 19,
        DRIVER_LICENCE_NUMBER_EXPIRY: 20,
        PASSPORT_NUMBER: 21,
        PASSPORT_EXPIRY: 22,
        LIABILITY_NOTES: 23,
        OTHER: 24,
        LOG_BOOK_NUMBER: 25,
        BANK_NAME: 26,
        DRIVER_NOTES: 27,
        VAN_INSURANCE_EXPIRY: 28,
        ROAD_TAX_EXPIRY: 29,
        MOT_EXPIRY: 30,
        BANK_NOTES: 31,
        CUSTOMER_NOTES: 32
    },
    ORDER: {
        DAY_ALLOW_CANCEL: 172800000, //2 days
        TIME_ALLOW_ACTION: 36000000, //10h,
        DAY_ALLOW_CANCEL_24H: 86400000, //24h,
        AVAILABLE_JOB_TO_NOTIFY: config.ORDER.AVAILABLE_JOB_TO_NOTIFY
    },
    SEND_MAIL: {
        SUCCEED_COMPLETE_ORDER: config.SEND_MAIL.SUCCEED_COMPLETE_ORDER,
        SUCCEED_CANCEL_ORDER: config.SEND_MAIL.SUCCEED_CANCEL_ORDER,
        SUCCEED_PAYMENT: config.SEND_MAIL.SUCCEED_PAYMENT
    },
    NOTIFICATION: {
        CREATE_ORDER_TITLE: config.NOTIFICATION.CREATE_ORDER_TITLE,
        CANCEL_ORDER_TITLE: config.NOTIFICATION.CANCEL_ORDER_TITLE,
        CANCEL_ORDER_TITLE_AUTO: config.NOTIFICATION.CANCEL_ORDER_TITLE_AUTO,
        FUTURE_JOB_TITLE: config.NOTIFICATION.FUTURE_JOB_TITLE,
        FUTURE_JOB_TITLE_BEFORE_ONE_DAY: config.NOTIFICATION.FUTURE_JOB_TITLE_BEFORE_ONE_DAY,
        FUTURE_JOB_TITLE_BEFORE_ONE_DAY_CUSTOMER: config.NOTIFICATION.FUTURE_JOB_TITLE_BEFORE_ONE_DAY_CUSTOMER,
        CONFIRM_JOB_TITLE: config.NOTIFICATION.CONFIRM_JOB_TITLE,
        ON_THE_WAY_TITLE: config.NOTIFICATION.ON_THE_WAY_TITLE,
        PICKUP_LOCATION_TITLE: config.NOTIFICATION.PICKUP_LOCATION_TITLE,
        NEW_ORDER_MESSAGE: config.NOTIFICATION.NEW_ORDER_MESSAGE,
        CANCEL_ORDER_MESSAGE: config.NOTIFICATION.CANCEL_ORDER_MESSAGE,
        COMPLETED: config.NOTIFICATION.COMPLETED,
        AVAILABLE_JOB_TITLE: config.NOTIFICATION.AVAILABLE_JOB_TITLE,
        AVAILABLE_JOB_MESSAGE: config.NOTIFICATION.AVAILABLE_JOB_MESSAGE,
        CONFIRM_JOB_MESSAGE: config.NOTIFICATION.CONFIRM_JOB_MESSAGE,
        TYPE: {
            NEW_JOB: config.NOTIFICATION.TYPE.NEW_JOB,
            CONFIRM_JOB: config.NOTIFICATION.TYPE.CONFIRM_JOB,
            CANCEL_JOB_BY_DRIVER: config.NOTIFICATION.TYPE.CANCEL_JOB_BY_DRIVER,
            CANCEL_JOB_BY_CUSTOMER: config.NOTIFICATION.TYPE.CANCEL_JOB_BY_CUSTOMER,
            CANCEL_JOB_BY_ADMIN: config.NOTIFICATION.TYPE.CANCEL_JOB_BY_ADMIN,
            DRIVING_PICKUP: config.NOTIFICATION.TYPE.DRIVING_PICKUP,
            ARRIVED_PICKUP: config.NOTIFICATION.TYPE.ARRIVED_PICKUP,
            DRIVING_DROPOFF: config.NOTIFICATION.TYPE.DRIVING_DROPOFF,
            ARRIVED_DROPOFF: config.NOTIFICATION.TYPE.ARRIVED_DROPOFF,
            COMPLETED: config.NOTIFICATION.TYPE.COMPLETED,
            NOTIFY_2_HOURS: config.NOTIFICATION.TYPE.NOTIFY_2_HOURS,
            NOTIFY_24_HOURS_DRIVER: config.NOTIFICATION.TYPE.NOTIFY_24_HOURS_DRIVER,
            NOTIFY_24_HOURS_CUSTOMER: config.NOTIFICATION.TYPE.NOTIFY_24_HOURS_CUSTOMER,
            AVAILABLE_JOB: config.NOTIFICATION.TYPE.AVAILABLE_JOB
        },
        LOG_TOKEN_DRIVER: config.NOTIFICATION.LOG_TOKEN_DRIVER,
        LOG_TOKEN_CUSTOMER: config.NOTIFICATION.LOG_TOKEN_CUSTOMER,

    },
    TIME: {
        ONE_HOUR: 3600000,
        TWO_HOURS: 7200000,
        ONE_DAY: 86400000,
        MINUTES_59: 3540000,
        ONE_MINUTE: 60000
    },
    TRANSACTION: {
        COMPLETED: 'submitted_for_settlement',
        VOID: 'voided',
        REJECT: 'gateway_rejected'
    },
    ROLE_NAMES: {
        DRIVER: 'driver',
        CUSTOMER: 'user'
    }
};