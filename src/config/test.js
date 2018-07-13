module.exports.test = () => {
  return {
    env: 'test',
    host: 'localhost',
    db: 'ejp_test',
    user: 'ejp_test_user',
    password: '123456789',
    jwtSecret: 'myJWTsecrettest',
    port: 8080,
  }
}
