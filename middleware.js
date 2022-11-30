const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    let token = req.header('x-token');
    if (!token) {
        res.status(500).send('token not found')

    }
    let decoded = jwt.verify(token, 'jwtPass');
    req.user = decoded.user;
    next();
}