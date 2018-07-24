const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const userSchema = require('./../schemas/userSchema');
const config = require('../config');
const express = require('express');
const router = express.Router();
const passport = require('../config/passport');


router.use(passport.initialize({ session: false }));
router.use(passport.session());


/*function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/login');
}*/

router.use(function(req, res, next) {
    console.log('Something is happening in Protected');
    next();
});


/*router.get('/dashboard', isLoggedIn, function (req, res) {
res.status(200).json({ message: 'Hello sweetie', auth: req.isAuthenticated(), user: req.session.passport.user})
});*/


router.get('/test', passport.authenticate('jwt') , (req, res) => {
    res.status(200).json({ message: 'Hello sweetie', auth: req.isAuthenticated(), user: req.session.passport.user})
});

module.exports = router;
