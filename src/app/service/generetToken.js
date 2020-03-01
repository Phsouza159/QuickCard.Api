const bcrypt = require('bcryptjs')
    , jwt = require('jsonwebtoken')
    , authConfig = require('@config/autenticacao');

const generetToken = (args = {}) => {
    return jwt.sign(args, authConfig.secret, {
        expiresIn: 86400,
    });
}

module.exports = generetToken