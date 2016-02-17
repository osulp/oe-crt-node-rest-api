var db = require("../core/db");
var settings = require("../settings");
var httpMsgs = require("../core/httpMsgs");
var utilities = require("../core/utilities");
var format = "json";

exports.search = function (req, resp) {
    settings.format = req.query.f !== "undefined" ? req.query.f : "json";

    db.executeSql("exec searchPlacesAndIndicators '" + req.query.term + "';", 
        function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        }
        else {
            
            if (settings.format === "json" || settings.format === "pjson") {
                httpMsgs.sendJson(req, resp, data, settings.format);
            }
            else {
                var _stylePath = (process.env.virtualDirPath !== undefined ? 'public' : '') + '/stylesheets/style.css';
                resp.render('dataTable', { title: "Search Places and Indicators", table: utilities.tableMarkup(data, false, null), stylePath: _stylePath });
            }
        }
    });

}
