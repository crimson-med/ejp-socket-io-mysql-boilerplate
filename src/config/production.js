const production = () => {
  return {
    env: 'production',
    host: 'localhost',
    db: 'ejp_production',
    user: 'ejp_production_user',
    password: '123456789',
    jwtSecret: 'myJWTsecretprod',
    port: 8080,
  }
}

production.exports
