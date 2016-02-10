var db = require("../core/db");
var settings = require("../settings");
var httpMsgs = require("../core/httpMsgs");
var utilities = require("../core/utilities");
var format = "json";

exports.get_topics = function (req, resp) {
    settings.format = req.query.f !== "undefined" ? req.query.f : "json";

    db.executeSql("select d.domain, t.topic from Topics t join Domains d on d.domain_id = t.Domain_ID  order by Rank", 
        function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        }
        else {
            if (settings.format === "json" || settings.format === "pjson") {
                httpMsgs.sendJson(req, resp, data, settings.format);
            }
            else {
                resp.render('dataTable', { title: "Community Data by Indicator Table", table: utilities.tableMarkup(data, false, null) });
            }
        }
    }, function (err) {
        alert(err);
    });

}
