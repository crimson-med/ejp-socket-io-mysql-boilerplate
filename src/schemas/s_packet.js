
const db = require('./../config/db.js');
exports.create = function(activePacket) {
  console.warn(JSON.stringify(activePacket));
  var values = [
    activePacket.base_url,
    activePacket.cookies,
    activePacket.hostname,
    activePacket.ip,
    activePacket.original_url,
    activePacket.params,
    activePacket.protocol,
    activePacket.query,
    activePacket.method,
    activePacket.body,
  ]
  console.log(`Inserting packet: for: ${activePacket.hostname}`)
  return new Promise((resolve, reject) => {
    db.get().query('INSERT INTO packets (base_url, cookies, hostname, ip, original_url, params, protocol, query, method, body) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', values, ((err, result) => {
      if (err) {
        console.warn(err);
        reject(err)
      }
      resolve(result.insertId)
    }))
  })
}

exports.getAll = function(done) {
  db.get().query('SELECT * FROM packets', function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}

exports.getAllByUser = function(userId, done) {
  db.get().query('SELECT * FROM comments WHERE user_id = ?', userId, function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}
