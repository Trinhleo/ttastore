module.exports = {
    USER: {
        NOT_FOUND: "User couldn't be found",
        EMAIL_IS_REQUIRED: "Email is required",
        PASSWORD_IS_REQUIRED: "Password is required",
        FIRST_NAME_IS_REQUIRED: "First name is required",
        LAST_NAME_IS_REQUIRED: "Last name is required",
        PHONE_NUMBER_IS_REQUIRED: "Phone number is required",
        EMAIL_EXISTED: "Email already existed",
        UUID_DEVICE_IS_REQUIRED: "Uuid device is required",
        UUID_DEVICE_EXISTED: "Uuid device existed",
        UUID_DEVICE_NOT_REGISTER: "Uuid device not registered",
        UUID_DEVICE_HAVE_DRIVER_REGISTER: "Uuid device have registered by driver",
        PROFILE_PICTURE_IS_REQUIRED: "Profile picture is required",
        MOBILE_NUMBER_IS_EXIST: "Mobile number is exist.",
        FIRST_NAME_NOT_EMPTY: "First name must not be empty",
        LAST_NAME_NOT_EMPTY: "Last name must not be empty",
        MOBILE_NUMBER_DIGITS: "Mobile number must have 11 digits",
        PASSWORD_CHARACTERS_AT_LEAST: "Password must have at least 6 characters",
        EMAIL_INVALID: "Email is invalid",
        ROLE_REQUIRED: 'Role is required',
        ROLE_INVALID: 'Role is invalid',
        NOT_ADMIN: 'You are not admin',
        BLOCKED_IS_REQUIRED: 'Blocked is required',
        PASSWORD_NOT_EQUAL_CURRENT_PASSWORD: 'Current Password is invalid',
        PASSWORD_NOT_EQUAL_CONFIRM_PASSWORD: 'New Password is not equal of Confirm New Password',
        PASSWORD_EQUAL_CURRENT_PASSWORD: 'New Password must not equal of Current Password',
        CURRENT_PASSWORD_REQUIRED: 'Current Password is required',
        USER_BLOCKED: "Contact Locovan Support",
        NEW_PASSWORD: "New Password is required",
        DRIVER_BLOCKED: "Your account is not activated, please contact support",
        USERNAME_IS_REQUIRED: "Username is required"
    },
    ORDERS: {
        NOT_FOUND: "Order could not be found",
        ORDER_NUMBER_IS_REQUIRED: "Order number is required",
        ORDER_TYPE_IS_REQUIRED: "Order type is required",
        CUSTOMER_IS_REQUIRED: "Customer is required",
        STATUS_IS_REQUIRED: "Status is required",
        DRIVER_ID_IS_REQUIRED: "Driver id is required",
        PICKUP_DATE_IS_REQUIRED: "Pickup date is required",
        PICKUP_IS_REQUIRED: "Pickup is required",
        DROPOFF_IS_REQUIRED: "Dropoff is required",
        STATUS_CHANGED: 'This order has already been this status',
        NOT_COMPLETED: 'You still have not completed a another order',
        CAN_NOT_CHANGED_STATUS: 'You can not change to this status',
        ORDER_COMPLETED: 'This order has been completed',
        NOT_ALLOW_CANCEL_IN_24H_AFTER: 'Not allowed to cancel order because it is within 24 hours after the pick up date & time',
        NOT_ALLOW_CANCEL_IN_DATE: 'Not allowed cancel when pickup date is still not outdated',
        NOT_ALLOW_CANCEL_IN_24H_BEFORE: 'Not allowed to cancel order because it is within 24 hours before the pick up date & time',
        NOT_CONFIRM: 'Order is not confirm',
        NOT_DRIVER: 'You are not driver',
        NOT_CUSTOMER: 'You are not customer',
        NOT_OWNER: 'You are not owner of this order',
        NOT_DRIVER_OF_ORDER: 'You are not driver of this order',
        NOT_ALLOWED_ROLE: 'You are not allowed role in this action',
        ORDER_OUT_DATE: 'This order is out-date',
        NOT_ALLOW_ACTION: 'Cannot start job 10 hours before the job time',
        ORDER_CLOSED: 'This order has been closed'
    },
    EXTRAS_NAME: {
        NOT_FOUND: "Extras couldn't be found",
        NAME_IS_REQUIRED: "Name is required",
        PRICE_IS_REQUIRED: "Price is required"
    },
    ORDER_STATUS: {
        NOT_FOUND: "Order status couldn't be found"
    },
    IMAGE: {
        NOT_FOUND: 'Image file not found!',
        NOT_IMAGE_FORMAT: 'Not image format!',
        CAN_NOT_MAKE_DIR: 'Can not make directory!',
        FILE_TOO_LARGE: 'File too large!',
        FILE_TYPE: 'File type must be required'
    },
    VEHICLE: {
        NOT_FOUND: 'Vehicle not found',
        OWNER_ID: 'Owner id is required!',
        TYPE_ID: 'Type id is required!',
        REGISTRATION_NUMBER: 'Registration number is required!',
        REGISTRATION_NUMBER_INVALID: 'Van registration number must be at least 3 and not more than 7 characters',
        REGISTRATION_NUMBER_EXIST: 'This registration number already exists',
        VEHICLE_ID_REQUIRED: 'Vehicle id is required'
    },
    FILE_TO_ENITY: {
        NOT_FOUND: 'File to entity not found'
    },
    USER_LOCATION: {
        NOT_FOUND: 'User location not found',
        NAME: 'Name is required',
        ADDRESS: 'Address is required',
        LAT: 'Latitude is required',
        LNG: 'Longitude is required'

    },
    USER_ROLE: {
        NOT_FOUND: 'User role not found',
    },
    UNAUTHORIZED: 'unAuthorized!',
    USER_META: {
        NOT_FOUND: 'User meta not found',
        ADDRESS_1: 'Address 1 is required.',
        ADDRESS_2: 'Address 2 is required.',
        CITY: 'City is required.',
        POST_CODE: 'Post Code is required.',
        COUNTRY: 'Country is required.',
        ADDRESS_1_ATLEAST_3_CHARS: "Address 1 is at least 3 characters",
        POSTCODE_ATLEAST_4_CHARS: "Post Code is at least 4 characters",
        CITY_ATLEAST_2_CHARS: "City is at least 2 characters",
        BANK_ACCOUNT_NUMBER: "Bank account number is required.",
        BANK_ACCOUNT_NUMBER_ATLEAST_CHARS: "Bank account number is at least 8 characters.",
        SORT_CODE: "Sort code is required.",
        SORT_CODE_ATLEAST_6_CHARS: "Sort code is at least 6 characters."
    },
    META_NAME: {
        NOT_FOUND: 'Meta name not found',
    },
    RESET_PASSWORD: {
        EMAIL_NOT_FOUND: 'This email has not been sign up with any account!',
        TOKEN_EXPIRED: 'This token has expired!',
        TOKEN_INVALID: 'This token is invalid!',
        RESET_TOKEN: 'Reset token is required!',
        NEW_PASSWORD: 'New password is required!',
        NEW_PASSWORD_2: 'New second password is required!',
        EQUAL_NEW_PASSWORD: 'New password and new second password must equal!',
        SEND_MAIL_ERROR: 'Send mail error!'
    },
    BAD_REQUEST: 'Bad request',
    DEVICE_TOKEN: {
        NOT_FOUND: 'Device token not found',
        UUID_REQUIRED: 'Uuid is required',
        TOKEN_REQUIRED: 'Token is required',
        ENABLE_NEW_ORDER_REQUIRED: 'Enable new order is required'
    },
    REVIEW: {
        RATING_REQUIRED: 'Rating must be required',
        SUBJECT_REQUIRED: 'Subject must be required',
        RATING_INVALID: 'Rating shoud be from 1 to 5',
        CUSTOMER_ID_REQUIRED: 'Customer id is required',
        DRIVER_ID_REQUIRED: 'Driver id is required',
        ORDER_NOT_COMPLETED: 'This order must be completed',
        REVIEW_EXIST: 'This order review already exist'
    }
};