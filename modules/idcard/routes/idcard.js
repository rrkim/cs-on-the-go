const express = require("express");
const router = express.Router();
const ResponseUtility = require("../../../core/utility/PageUtility");

router.get('/view', function (req, res, next) {
    ResponseUtility.renderPage(res, "modules/idcard/views/identify-card");
});

module.exports = router;
