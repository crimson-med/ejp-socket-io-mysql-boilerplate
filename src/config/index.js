// Importing various config files

const dev = require('./dev');
const production = require('./production');
const test = require('./test');

// Basic config information
const config = {
  port: 8080,
  bodyLimit: "100kb",
}

const activeEnvironment = 'dev'

const setupConfig = () => {
  let exportCfg
  if(activeEnvironment === 'test') {
    exportCfg = {
      ...config,
      ...test
    }
  }
  else if(activeEnvironment === 'prod') {
    exportCfg = {
      ...config,
      ...production
    }
  }
  else {
    exportCfg = {
      ...config,
      ...dev
    }
  }
  return exportCfg
}

module.exports = setupConfig()
