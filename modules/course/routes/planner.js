const express = require("express");
const fs = require("fs");
const router = express.Router();
const ResponseUtility = require("../../../core/utility/PageUtility");
const course = require("../assets/course.json");

router.get('/planner', function (req, res, next) {
    ResponseUtility.renderPage(res, "modules/course/views/planner");
});

router.get('/get-course-data', function (req, res, next) {
    let courseData = JSON.parse(fs.readFileSync("modules/course/assets/course.json", "utf8"));
    res.json(courseData);
});


module.exports = router;
