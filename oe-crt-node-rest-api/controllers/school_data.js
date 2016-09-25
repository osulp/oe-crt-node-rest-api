var db = require("../core/db");
var settings = require("../settings");
var httpMsgs = require("../core/httpMsgs");
var utilities = require("../core/utilities");
var format = "json";

exports.get_school_distict_data = function (req, resp) {
    settings.format = req.query.f !== "undefined" ? req.query.f : "json";
    db.executeSql("exec getSchoolDistrictData_CRT  '" + req.query.schooldists + "', '" + req.query.indicator + "', '" + (req.query.counties !== undefined ? req.query.counties : '') + "', '" + (req.query.cts !== undefined ? req.query.cts : '') + "';", true,
        function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        }
        else {
            var returnObj = {};
            returnObj.Metadata = data[0];
            returnObj.Years = data[1];
            returnObj.GeoTypes = data[3];
            returnObj.Data = data[2];
            returnObj.GeoYears = data[4];
            returnObj.RelatedIndicators = data.length > 5 ? data[5] : null;
            returnObj.SubTopicCategories = data.length > 6 ? data[6]: null;
            returnObj.TopicCategories = data.length > 7 ? data[7]: null;

            if (settings.format === "json" || settings.format === "pjson") {
                httpMsgs.sendJson(req, resp, returnObj, settings.format);
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

