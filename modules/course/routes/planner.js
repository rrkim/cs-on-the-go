const express = require("express");
const fs = require("fs");
const router = express.Router();
const ResponseUtility = require("../../../core/utility/PageUtility");
const course = JSON.parse(fs.readFileSync("modules/course/assets/course.json", "utf8"));

router.get('/planner', function (req, res, next) {
    ResponseUtility.renderPage(res, "modules/course/views/planner");
});

router.get('/get-course-data', function (req, res, next) {
    let courseData = course.map(d => {
        return {course_id: d.course_id, course_name: d.course_name, point: d.point}
    });
    res.json(courseData);
});

router.get('/get-class-data', function (req, res, next) {
    let course_id = req.query.course_id;
    console.log(course_id);

    let courseData = course.filter(d => d.course_id === parseInt(course_id));
    console.log(courseData);
    res.json(courseData);
});

module.exports = router;
