/**
*Module dependencies
*/
const
  passport = require('passport'),
  config = require('./../config'),
  passportJwt = require('passport-jwt'),
  JwtStrategy = passportJwt.Strategy,
  ExtractJwt = passportJwt.ExtractJwt,
  userSchema = require('./../schemas/userSchema');

passport.serializeUser(function(user, done) {
    console.log(JSON.stringify(user));
    done(null, user[0].username);
});

passport.deserializeUser(function(username, done) {
    console.log('DESER -- '+username);
    userSchema.checkUsername(username)
    .then(user => {
        console.log(user[0]);
        done(null, user[0]);
    })
    .catch(err =>{
        console.log(JSON.stringify(err));
    });
});

const jwtOptions = {
	secretOrKey: config.jwtSecret,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

passport.use('jwt', new JwtStrategy(jwtOptions, function(jwt_payload, done) {
	console.log('Strategy: '+ jwt_payload.id);
	userSchema.checkUsername(jwt_payload.id)
	.then(user => {
		console.log(user[0].username);
		if(user[0]) return done(null, user)
		else return done(null, false)
	})
    .catch(err =>{
        console.log(JSON.stringify(err));
    });
}));

module.exports = passport;
