const path = require("path");

function renderPage(res, viewPage, params) {
    if(params == null) { params = {}; }
    res.render(viewPage, Object.assign(params, {$_FORWARD: $_FORWARD, getViewPath: getViewPath}));
}

function getViewPath(viewPath) {
    return path.join($_FORWARD.rootPath, viewPath);
}

module.exports = { renderPage, getViewPath };
