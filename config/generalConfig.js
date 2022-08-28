const crypto = require('crypto');
const jwt = require('jwt-simple');
const moment = require('moment');
const _ = require('lodash');
require('dotenv').config();
const algorithm = process.env.ALGORITHM;
const saltKey = process.env.SALTKEY;
const secretKey = process.env.SECRETKEY;
let jwtSession = { session: false }

let validImageExtensions = ['.png', '.jpg', '.jpeg', 'gif'];
let validImageSize = 5000000;

function authenticate(plainText, hashedPassword) {
    return encryptPassword(plainText, saltKey) === hashedPassword;
}

function generateJwtToken(id, email, type, res) {
    if (id) {
        let expireDate = moment().add(12, 'months').valueOf();
        let payload = {
            id: id,
            email: email,
            userType: type,
            expDate: expireDate
        };
        res({ newToken: jwt.encode(payload, secretKey) });
    } else {
        res({ newToken: null });
    }
}


function getUserId(req) {
    if (req.headers.authorization) {
        var accesstoken = req.headers.authorization.split(" ")[1];
        var obj = jwt.decode(accesstoken, secretKey);
        return obj.id;
    } else {
        return null;
    }
}

module.exports = {
    cryptoAuthentication: {
        crypto: crypto,
        algorithm: algorithm,
        password: 'cnhzeXN0ZW0'
    },
    cryptKey: 'cnhzeXN0ZW0',
    authenticate: authenticate,
    saltKey: saltKey,
    secretKey: secretKey,
    jwtSession: jwtSession,
    getUserId: getUserId,
    generateJwtToken: generateJwtToken,
    validImageExtensions: validImageExtensions,
    validImageSize: validImageSize,
};
