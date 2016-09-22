var db = require("../core/db");
var settings = require("../settings");
var httpMsgs = require("../core/httpMsgs");
var utilities = require("../core/utilities");
var format = "json";

exports.get_school_distict_data = function (req, resp) {
    settings.format = req.query.f !== "undefined" ? req.query.f : "json";
    db.executeSql("exec getSchoolDistrictData_CRT  '" + req.query.schooldists + "', '" + req.query.indicator + "';", false,
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
                resp.render('dataTable', { title: "School District Data", table: utilities.tableMarkup(data, false, null), stylePath: _stylePath });
            }
        }
    });
}

exports.get_schools_data = function (req, resp) {
    settings.format = req.query.f !== "undefined" ? req.query.f : "json";
    db.executeSql("select * from VariableDesc where (UPPER(Show) is NULL or UPPER(Show) like 'YES') or (is10YrPlan = 1);", false,
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
                resp.render('dataTable', { title: "Community Data by Indicator Table", table: utilities.tableMarkup(data, false, null), stylePath: _stylePath });
            }
        }
    });

}

