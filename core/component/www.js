const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const fs = require('fs');
const Logger = require('./logger');
const logger = new Logger().getLogger();

class Web {
    constructor(port) {
        this.port = port;
        this.app = express();

        this.#initializeSetting();
        this.#registerModules();
        this.#registerErrorHandling();
    }

    #initializeSetting() {
        this.app.set('views', path.join($_FORWARD.configuration.default.rootPath));
        this.app.set('view engine', 'ejs');
        this.app.use(morgan('dev', {stream: logger.stream}));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cookieParser());
        this.app.use("/static", express.static(path.join($_FORWARD.configuration.default.rootPath, "static")));
        this.app.use(favicon(path.join("static", "favicon.ico")));
    }

    #registerModules() {
        global.$_FORWARD.modules = [];
        const instance = this;
        const rootPath = $_FORWARD.configuration.default.rootPath;
        const modulesPath = path.join(rootPath, "modules");
        const modules = fs.readdirSync(modulesPath, {withFileTypes: true}).filter(dirent => dirent.isDirectory()).map(dir => dir.name);

        modules.forEach(function (iv, i) {
            const moduleInfoFile = fs.readFileSync(path.join(modulesPath, iv, "module-info.json"), 'utf8');
            const moduleInfo = JSON.parse(moduleInfoFile);
            const routesPath = path.join(modulesPath, iv, "routes");
            const module = {};
            module.moduleName = moduleInfo.moduleName;
            module.routesPath = moduleInfo.contextPath;
            module.routes = [];
            $_FORWARD.modules.push(module);
            logger.debug(`${moduleInfo.moduleName} 모듈을 등록하였습니다.`);

            const routerFiles = fs.readdirSync(routesPath).filter(d => d.endsWith(".js"));
            routerFiles.forEach(function (kv, k) {
                const routerFileName = kv.split(".")[0];
                const routerEntry = require(path.join(routesPath, routerFileName));
                module.routes.push({routerName: routerFileName, router: routerEntry});

                instance.app.use(routerEntry);
                logger.debug(`${routerFileName} 라우터를 등록하였습니다.`);
            });
        });
    }

    #registerErrorHandling() {
      this.app.use(function (req, res, next) {
        next(createError(404));
      });

      this.app.use(function (err, req, res, next) {
        res.locals.message = err.message;
        res.locals.error = err;
        res.status(err.status || 500);
        res.render(path.join($_FORWARD.configuration.default.rootPath, "core", "views", "common", "error"));
      });
    }

    listen(port) {
      this.app.listen(this.port, () => {
          logger.info(`${this.port}번 포트에서 HTTP 서버가 실행되었습니다.`);
      });
    }
}

module.exports = Web;
