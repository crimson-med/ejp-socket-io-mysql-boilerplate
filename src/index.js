const http = require( 'http');
const express = require( 'express');
const bodyParser = require( 'body-parser');
const initializeDb = require( './db');
// const middleware = require( './middleware');
const api = require( './api');
const config = require( './config');
//const passport = require( 'passport');
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

//app.use(passport.initialize({ session: false }));

console.log(JSON.stringify(config));


initializeDb.connect(function(err) {
  if (err) {
    console.log('Unable to connect to MySQL.')
    process.exit(1)
  } else {
		// internal middleware
		//app.use(middleware({ config, initializeDb }));
		// api router
		app.use('/api', api);
		const serv = app.server.listen(config.port);
		let ioSocket = new IO(serv)
		ioSocket.init()
		console.log(`Started on port ${app.server.address().port}`);
  }
})
