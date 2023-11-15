const express = require("express");
const router = express.Router();
const ResponseUtility = require("../../../core/utility/PageUtility");

router.get('/', function (req, res, next) {
    ResponseUtility.renderPage(res, "modules/main/views/index");
});

router.get('/about-professor', function (req, res, next) {
    ResponseUtility.renderPage(res, "modules/main/views/about-professor");
});

module.exports = router;
