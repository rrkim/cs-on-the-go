const express = require("express");
const fs = require("fs");
const router = express.Router();
const ResponseUtility = require("../../../core/utility/PageUtility");
const course = JSON.parse(fs.readFileSync("modules/course/assets/course.json", "utf8"));

router.get('/planner', function (req, res, next) {
    ResponseUtility.renderPage(res, "modules/course/views/planner");
});

router.get('/get-course-data', function (req, res, next) {
    let course_name = req.query.course_name;
    let course_list = course;
    if(course_name != null && course_name !== "") { course_list = course.filter(d => d.course_name.indexOf(course_name) !== -1); }

    let courseData = course_list.filter((iv, i) => {
        return (
            course_list.findIndex(kv => iv.course_id === kv.course_id) === i
        );
    }).map(d => {
        return {course_id: d.course_id, course_name: d.course_name, point: d.point}
    });
    res.json(courseData);
});

router.get('/get-class-data', function (req, res, next) {
    let course_id = req.query.course_id;
    let courseData = course.filter(d => d.course_id === parseInt(course_id));
    res.json(courseData);
});

module.exports = router;
