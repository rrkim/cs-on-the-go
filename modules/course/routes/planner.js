const express = require("express");
const fs = require("fs");
const router = express.Router();
const Logger = require('../../../core/component/logger');
const logger = new Logger().getLogger();
const ResponseUtility = require("../../../core/utility/PageUtility");
const {response} = require("express");
const course = JSON.parse(fs.readFileSync("modules/course/assets/course.json", "utf8"));
const tmapApi = JSON.parse(fs.readFileSync("modules/course/assets/tmap-api.json", "utf8"));
const buildingPosition = JSON.parse(fs.readFileSync("modules/course/assets/position.json", "utf8"));

router.get('/planner', function (req, res, next) {
    ResponseUtility.renderPage(res, "modules/course/views/planner");
});

router.get('/map', function (req, res, next) {
    ResponseUtility.renderPage(res, "modules/course/views/map");
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

router.get('/get-building-time-api', function (req, res, next) {
    let startBuildingNumber = req.query.startBuildingNumber;
    let endBuildingNumber = req.query.endBuildingNumber;
    if(startBuildingNumber === endBuildingNumber) { res.json({totalDistance: 0, totalTime: 0}); return; }

    let startPosition = getBuildingPosition(startBuildingNumber);
    let endPosition = getBuildingPosition(endBuildingNumber);

    fetch("https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "appKey": tmapApi.appKey
        },
        body: JSON.stringify({
            "startX" : startPosition.x,
            "startY" : startPosition.y,
            "endX" : endPosition.x,
            "endY" : endPosition.y,
            "reqCoordType" : "WGS84GEO",
            "resCoordType" : "EPSG3857",
            "startName" : "출발지",
            "endName" : "도착지"
        })
    }).then(response => response.json()).then((data) => {
        let resultData = data.features;
        res.json({totalDistance: ((resultData[0].properties.totalDistance) / 1000).toFixed(1), totalTime: ((resultData[0].properties.totalTime) / 60).toFixed(0)})
    }).catch((e) => {
        logger.error(e.message);
        res.json(null);
    });
});


function getBuildingPosition(buildingNumber) {
    let position = {};

    buildingPosition.buildings.forEach(iv => {
        if(iv.buildingNumber === String(buildingNumber)) {
            position = iv.position;
        }
    });

    return position;
}

module.exports = router;
