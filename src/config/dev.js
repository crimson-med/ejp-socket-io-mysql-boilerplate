const dev = () => {
  return {
    env: 'dev',
    host: 'localhost',
    db: 'ejp_dev',
    user: 'ejp_dev_user',
    password: '123456789',
    jwtSecret: 'myJWTsecretdev',
    port: 8080,
  }
}

export default dev
