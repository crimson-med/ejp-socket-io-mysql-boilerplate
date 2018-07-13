const http = require( 'http');
const express = require( 'express');
const bodyParser = require( 'body-parser');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
//const { ExtractJwt, Strategy as JwtStrategy } = require( 'passport-jwt');
//const { ExtractJwt, Strategy as JwtStrategy } = require( 'passport-jwt');
//const { ExtractJwt, JwtStrategy } = require( 'passport-jwt');
const initializeDb = require( './db');
// const middleware = require( './middleware');
//const api = require( './api');
const config = require( './config');
const passport = require( 'passport');
//const User = require( './models/userModel');
const IO = require( './socket');


let app = express();
app.server = http.createServer(app);

// logger id in dev mode
//if(process.env.NODE_ENV !== 'test') {
//	app.use(morgan('dev'));
//}

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json({
	limit : config.bodyLimit
}));
app.use(passport.initialize({ session: false }))
console.log(JSON.stringify(config));
const jwtOptions = {
	secretOrKey: config.jwtSecret,
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
}
passport.serializeUser(function(user, done) {
  done(null, user.username);
})
passport.deserializeUser(function(username, done) {
	User.findOne({ username: username })
	.then((user) => {
		return done(user)
	})
	.catch(done)
})
passport.use('jwt', new JwtStrategy(jwtOptions, (jwt_payload, done) => {
	User.findOne({ username: jwt_payload.id })
	.then(user => {
		if(user) return done(null, user)
		else return done(null, false)
	})
}))
initializeDb.connect(function(err) {
  if (err) {
    console.log('Unable to connect to MySQL.')
    process.exit(1)
  } else {
		// internal middleware
		app.use(middleware({ config, initializeDb }));
		// api router
		app.use('/api', api({ config, initializeDb }));
		const serv = app.server.listen(config.port);
		let ioSocket = new IO(serv)
		ioSocket.init()
		console.log(`Started on port ${app.server.address().port}`);
  }
})
