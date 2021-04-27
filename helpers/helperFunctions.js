const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Creates a Password using Bcrypt
const generatePassword = (password) => {

}

// Check Password
const validatePassword = (password) => {
    return password.length >= 5 || password.length <=30;
};

const checkPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

const generateUserToken = (userId, secret) => {

    return jwt.sign({id: userId}, secret);
}

module.exports = {generatePassword, checkPassword, generateUserToken, validatePassword}