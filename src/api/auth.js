const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
//const User = require('../models/userModel');
//const userSchema = require('./../schemas/userSchema');
const passport = require('passport');
const config = require('../config');


exports.login = function(req, res){
  if (!req.body.username || !req.body.password) {
		return res.status(400).json({ message: 'Missing required fields' })
	}
	userSchema.checkUsername(req.body.username)
	.then(user => {
		if(!user) return res.status(400).json({ message: 'No user' })
    user = user[0];
		bcrypt.compare(req.body.password, user.password, (err, result) => {
			if(result) {
				const token = jwt.sign({id: req.body.username},  config.jwtSecret)
				return res.status(200).json({ message: 'ok', token })
			}
			else {
				return res.status(400).json({ message: 'Bad password' })
			}
		})
	})
	.catch((err) => {
		return res.status(400).json(err)
	})
};

exports.register = function(req, res){
  if (!req.body.username || !req.body.password || !req.body.email) {
		return res.status(400).json({ message: 'Missing required fields' })
	}
  let saltRounds = 15
  const ip = (req.headers['x-forwarded-for'] ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress).split(",")[0];
  let user = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    ip: ip,
    firstconnection: new Date().toISOString().slice(0, 19).replace('T', ' '),
    lastconnection: new Date().toISOString().slice(0, 19).replace('T', ' '),
  };
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err)
      user.password = hash;
      console.log(hash)
      userSchema.checkUsernameAndEmail(user.username, user.email, (err, result) => {
        if (err !== null) {
          console.log(JSON.stringify(err));
        }else {
          if (result.length > 0 && result[0].username === user.username) {
            return res.status(400).json({ message: 'Username is already taken' })
          } else if (result.length > 0 && result[0].email === user.email) {
            return res.status(400).json({ message: 'Email is already taken' })
          } else {
            userSchema.create(user.username, user.password, user.email, user.ip, user.firstconnection, user.lastconnection, (err, result) => {
              if (result){
                res.status(200).json(user)
                console.log(`Account successfully created.`)
              }
              if (err){
                console.log(JSON.stringify(err));
              }
            })
          }
        }
      })
    });
  })
}

exports.test = function(req, res){
    res.status(200).json({ message: 'Hello sweetie', auth: req.isAuthenticated(), user: req.session.passport.user})
}
