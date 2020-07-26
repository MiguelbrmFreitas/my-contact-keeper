const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    // Get token from header
    token = req.header('x-auth-token');

    // Check if there's a token

    if (!token) {
        return res.status(401).json({    msg: 'No token, auth denied.'   })
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    } catch(err) {
        return res.status(401).json({
            msg: 'Token is not valid'
        })
    }
}