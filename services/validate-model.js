module.exports = {
    validateFirstName: validateFirstName,
    validateLastName: validateLastName,
    validateMobileNumber: validateMobileNumber,
    validatePassword: validatePassword,
    validateAddress: validateAddress,
    validateCity: validateCity,
    validatePostCode: validatePostCode,
    validateBankAccountNumber: validateBankAccountNumber,
    validateSortCode: validateSortCode,
    validateEmail: validateEmail,
    validateVanNumber: validateVanNumber
};

function validateFirstName(firstName) {
    return firstName && firstName.trim().length > 0;
}

function validateLastName(lastName) {
    return lastName && lastName.trim().length > 0;
}

function validateMobileNumber(mobileNumber) {
    var numberFilter = /^[0-9]*$/;
    return mobileNumber && mobileNumber.trim().length > 9 && mobileNumber.trim().length < 12 && numberFilter.test(mobileNumber.toString().trim());;
}

function validatePassword(password) {
    return password && password.trim().length >= 6;
}

function validateAddress(address) {
    return address && address.trim().length >= 3;
}
function validateCity(city) {
    return city && city.trim().length >= 2;
}
function validatePostCode(postcode) {
    return postcode && postcode.toString().trim().length >= 4;
}

function validateBankAccountNumber(bankAccountNumber) {
    var bankAccountNumberInvalidFilter = /\D/g;
    var bankNumber = (bankAccountNumber + "").trim();
    return bankNumber && bankNumber.length == 8 && !bankAccountNumberInvalidFilter.test(bankNumber);

}
function validateSortCode(sortCode) {
    var sortCodeInvalidFilter = /([^- \d])/g;
    var sc = (sortCode + "").trim();
    return sc && sc.length == 6 && !sortCodeInvalidFilter.test(sc);
}

function validateEmail(email) {
    var emailFilter = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return emailFilter.test(email);
}

function validateVanNumber(vanNumber) {
    return vanNumber && vanNumber.toString().trim().length >= 3 && vanNumber.toString().trim().length <= 7;
}
