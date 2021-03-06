var express = require('express');
var router = express.Router();
var path = require('path');
const passport = require('passport');

/* GET home page. */
router.get('/', authenticationMiddleware(), (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'abi.html'));
});

function authenticationMiddleware () {
    return (req, res, next) => {
        console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

        if (req.isAuthenticated()) return next();
        req.session.returnTo = req.originalUrl;
        res.redirect('/auth/login')
    }
}

module.exports = router;