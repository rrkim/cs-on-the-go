global.$_FORWARD = {};
global.$_FORWARD.rootPath = __dirname;
global.$_FORWARD.configuration = {};
const path = require('path');
const fs = require('fs');
const Logger = require('./core/component/logger');
const logger = new Logger().getLogger();
const WebApplication = require('./core/component/www');
const StringUtility = require("./core/utility/StringUtility");

const confPath = "./core/conf";
const confFiles = fs.readdirSync(confPath).filter(d => d.endsWith(".json"));
confFiles.forEach(function(kv, k) {
  const fileName = kv.split(".")[0];
  const confFile = fs.readFileSync(path.join(confPath, kv), 'utf8');
  global.$_FORWARD.configuration[fileName] = JSON.parse(confFile);
  logger.debug(`${StringUtility.toCapitalize(fileName)} 설정 정보 를 정상적으로 등록하였습니다.`);
});

const port = $_FORWARD.configuration.default.port;
const webApplication = new WebApplication(port);
webApplication.listen();