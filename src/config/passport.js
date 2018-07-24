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

/**
*Module variables
*/
//var
  //LocalStrategy = require('passport-local').Strategy;
/**
*Configuration and Settings
*/
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
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
}
/**
*Strategies
*/
//---------------------------Local Strategy-------------------------------------
/*passport.use('local-signup', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
  },
  function(req, email, password, done) {
    process.nextTick(function() {
      User.findOne({email: email}, function(err, user) {
        if(err) {
          return errHandler(err);
          }
        if(user) {
          console.log('user already exists');
          return done(null, false, {errMsg: 'email already exists'});
        }
        else {
            var newUser = new User();
            newUser.username = req.body.username;
            newUser.email = email;
            newUser.password = newUser.generateHash(password);
            newUser.save(function(err) {
              if(err) {
                console.log(err);
                if(err.message == 'User validation failed') {
                  console.log(err.message);
                  return done(null, false, {errMsg: 'Please fill all fields'});
                }
                return errHandler(err);
                }
              console.log('New user successfully created...',newUser.username);
              console.log('email',email);
              console.log(newUser);
              return done(null, newUser);
            });
          }
      });
    });
}));
*/
//---------------------------local login----------------------------------------
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

/**
*Export Module
*/
module.exports = passport;
