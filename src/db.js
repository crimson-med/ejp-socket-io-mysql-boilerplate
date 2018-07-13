const config = require('./config');

const mysql = require('mysql')
  , async = require('async')


const state = {
  pool: null,
  mode: null,
}

exports.connect = function(done) {
  state.pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.db,
  })
  done()
}

exports.get = function() {
  return state.pool
}

exports.fixtures = function(data) {
  const pool = state.pool
  if (!pool) return done(new Error('Missing database connection.'))
  const names = Object.keys(data.tables)
  async.each(names, function(name, cb) {
    async.each(data.tables[name], function(row, cb) {
      const keys = Object.keys(row)
        , values = keys.map(function(key) { return "'" + row[key] + "'" })

      pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb)
    }, cb)
  }, done)
}

exports.drop = function(tables, done) {
  const pool = state.pool
  if (!pool) return done(new Error('Missing database connection.'))
  async.each(tables, function(name, cb) {
    pool.query('DELETE * FROM ' + name, cb)
  }, done)
}
