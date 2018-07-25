const db = require('../db.js')

exports.table = "user";

exports.create = function(username, password, email, ip, firstconnection, lastconnection, done) {
  var values = [username, password, email, ip, firstconnection, lastconnection]
  db.get().query('INSERT INTO user (username, password, email, ip, firstconnection, lastconnection) VALUES(?, ?, ?, ?, ?, ?)', values, function(err, result) {
    if (err) return done(err)
    done(null, result.insertId)
  })
}

exports.getAll = function(done) {
  db.get().query('SELECT * FROM user', function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}

exports.checkUsername = function(username, done) {
  return new Promise((resolve, reject) => {
    db.get().query('SELECT * FROM user WHERE username = ?', username, function (err, rows) {
      if (err) reject(err)
      resolve(rows)
    })
  })
}

exports.checkEmail = function(email, done) {
  db.get().query('SELECT * FROM user WHERE email = ?', userId, function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}

exports.checkUsernameAndEmail = function(username, email, done) {
  var values = [username, email]
  db.get().query('SELECT * FROM user WHERE username = ? OR email = ?', values, function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}

/*
For future me when I have time implement promises instead of callbacks:
return new Promise((resolve, reject) => {
  db.get().query('INSERT INTO packets (base_url, cookies, hostname, ip, original_url, params, protocol, query, method, body) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', values, ((err, result) => {
    if (err) {
      console.warn(err);
      reject(err)
    }
    resolve(result.insertId)
  }))
})*/
