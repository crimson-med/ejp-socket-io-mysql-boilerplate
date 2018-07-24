const auth = require( './auth');
const protected = require( './protected');
//import { version } from '../../package.json';
//const import { Router } from 'express';
const express = require('express');
const router = express.Router();



router.use('/auth', auth);
router.use('/protected', protected);

router.use(function(req, res, next) {
  console.log('Something is happening.');
  next();
});

router.get('/', function(req, res) {
  res.send('home page');
});

module.exports = router;
