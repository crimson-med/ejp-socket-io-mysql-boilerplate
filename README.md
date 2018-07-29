# Ejp Socket-io Mysql Boilerplate

A NodeJS boilerplate for backend using: Express, jwt, passport, socket-io and mysql

## Installation

 1. Please execute the ejp_db.sql on a mysql environment.

 2. Create a user with all rights on the newly created database: `ejp_dev`.

 3. Configure `config/dev.js` with correct credentials.

 4. Execute a `npm install`.

PS: the added user information is: `john:123456789`

## Running the project

To initiate the project modify the configuration files and then execute:

```js
npm start
```

## Understanding the project

### `socket.js`

This creates a class that is initialized with an instance of the server.

By default it has:

 - User count
 - Receive message via socket-io
 - Send message via socket-io

For now all the functions and events related to socket-io are in this file. But if you are going to be using a lot of socket-io events I reccomend you move the event functions into a folder for instance:

```
D - events
---- F - eventsReceived.js
---- F - eventsSent.js
```
<hr>

### `db.js`

This file is where the DB connection is initialized.

If you would want to switch to another database engine youd have to change this file accordingly.

The file load it's config from the according config instance.

<hr> 

### `config/index.js`

This file loads the right configuration depending on what environment you are in.

To easily switch environment modify the following line:

```js
const activeEnvironment = 'dev'
```

with the values: 

 - prod
 - test
 - dev

<hr>

### `config/production.js` & `config/test.js` & `config/dev.js`

These are your main configuration file relating to the different environments.

I **highly recommend** that:

 - Change the default `jwtSecret`.
 - Do not use the basic MySQL info created in the example.
 - Use different databases and users for production, test, dev.

<hr>

### `config/passport.js`

This is where all the passport authorization functions are defined.

In the current ecample I use the username for checking but I recommend you mix up these functions maybe also adding a **session expiration time** and to not store any sensitive information in the token.

<hr>

### `api/index.js`

This file is where all the routes are located.

By default as defined in the main `index.js` every route relating to those files is at the `/api` endpoint.

I added routes for authentification:

```js
router.use('/auth', auth);
```

Where you can find login register functions.

As well as a: 

```js
router.use('/protected', protected);
```

With all the important endpoint protected by login.

To protect routes with the login system in `auth` make sure to use: 

```js
passport.authenticate('jwt')
```
<hr>

### Accessing Protected Routes

To be able to access a protected route you first need to login at the: `api/auth/login` endpoint.

The request takes `POST` and two parameters in the body:

- username
- password

Example:

```js
var qs = require("querystring");
var http = require("http");

var options = {
  "method": "POST",
  "hostname": "127.0.0.1",
  "port": "8080",
  "path": "/api/auth/login",
  "headers": {
    "content-type": "application/x-www-form-urlencoded",
    "cache-control": "no-cache",
    "postman-token": "c267a39e-e802-7b83-a0f1-13e8ce27b75b"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(qs.stringify({ username: 'MyUsername', password: 'MyPassword' }));
req.end();
```

<hr>

### `schemas/userSchema.js`

This is where you can find a schema of the basic user database with basic useful functions such as:

 - Create a user
 - Get all users
 - Find by username
 - Find by email
 - Find by username and email

 
## Bugs, Issues, Improvements

If you would like to submit any bugs, issues, improvements please do so in the issues section:

`link to issues`

And try to follow the model given here:

`link model`

 
## More information

For more information read my blog post:

[http://medericburlet.com/ejp-socket-io-mysql-boilerplate/](http://medericburlet.com/ejp-socket-io-mysql-boilerplate/)

Feel free to use it for your projects just please mention the author as the licence explains:

[MIT Licence](https://github.com/crimson-med/ejp-socket-io-mysql-boilerplate/blob/master/LICENSE)

Coded with :heart: by [Mederic Burlet](http://medericburlet.com)