const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const userSchema = require('./../schemas/userSchema');
const config = require('../config');
const express = require('express');
const router = express.Router();
// Initialize passport for secured connections
const passport = require('../config/passport');
router.use(passport.initialize({ session: false }));
router.use(passport.session());

// Middleware for error tracking
router.use(function(req, res, next) {
    console.log('Something is happening in Protected');
    console.log(passport);
    next();
});

// Use: passport.authenticate('jwt') for protected routes
router.get('/test', passport.authenticate('jwt') , (req, res) => {
    res.status(200).json({ message: 'Hello sweetie', auth: req.isAuthenticated(), user: req.session.passport.user})
});
module.exports = router;
