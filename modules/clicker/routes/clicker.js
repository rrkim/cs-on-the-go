const express = require("express");
const router = express.Router();
const cheerio = require('cheerio');
const clickerDummyJson = require('../assets/clicker.json');
const ResponseUtility = require("../../../core/utility/PageUtility");

router.get('/', function (req, res, next) {
    ResponseUtility.renderPage(res, "modules/clicker/views/clicker");
});


router.get('/get-clicker-room-data', function (req, res) {
    fetch('https://clicker.gnu.ac.kr/Clicker/k/').then(response => response.text()).then((html) => {
        const $ = cheerio.load(html);

        // 원하는 열의 데이터를 추출합니다.
        const data = [];

        $('.clicker_libtech_table_list tr').each(function (i, row) {
            const columns = $(row).find('td');
            if (columns.length >= 3) {
                data.push({
                    roomName: $(columns[0]).text().trim(),
                    totalCnt: $(columns[1]).text().trim(),
                    currentRemainCnt: $(columns[2]).text().trim(),
                    currentUsedPercent: $(columns[3]).find(".clicker_progress").text().trim().replace("%", "")
                });
            }
        });

        res.json(data);
    }).catch(e => {
        res.json(clickerDummyJson);
    });
});

module.exports = router;
