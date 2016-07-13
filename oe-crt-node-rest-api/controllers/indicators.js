var db = require("../core/db");
var settings = require("../settings");
var httpMsgs = require("../core/httpMsgs");
var utilities = require("../core/utilities");
var format = "json";

exports.get_all_indicators_list = function (req, resp) {
    settings.format = req.query.f !== "undefined" ? req.query.f : "json";
    db.executeSql("exec getIndicatorList;", false,
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
                resp.render('dataTable', { title: "Community Reporter Indicators", table: utilities.tableMarkup(data, true, "indicators?indicator="), stylePath: _stylePath });
            }
        }
    });
}

exports.get_all_indicators_list_deep = function (req, resp) {
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

exports.get_indicator = function (req, resp) {
    settings.format = req.query.f !== "undefined" ? req.query.f : "json";
    var indicator = req.query.indicator !== undefined ? req.query.indicator : "%";
    db.executeSql("select * from VariableDesc where ((UPPER(Show) is NULL or UPPER(Show) like 'YES') or (is10YrPlan = 1)) and Variable like '" + indicator + "' or Dashboard_Chart_Title like '" + indicator + ";", false,
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

exports.get_indicator_desc_and_related = function (req, resp) {
    settings.format = req.query.f !== "undefined" ? req.query.f : "json";
    var indicator = req.query.indicator !== undefined ? req.query.indicator : "%";
    db.executeSql("select * from VariableDesc where ((UPPER(Show) is NULL or UPPER(Show) like 'YES') or (is10YrPlan = 1)) and (Variable like '" + indicator + "' or Dashboard_Chart_Title like '"+indicator+"'); select vd2.Variable 'related_indicators' from RelatedIndicators as ri join VariableDesc as vd on ri.indicator_id = vd.Variable_ID join VariableDesc as vd2 on ri.related_indicator_id = vd2.Variable_ID where vd.Variable like '" + indicator + "';", true,
        function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        }
        else {
            var returnObj = {};
            returnObj.Desc = data[0];
            returnObj.RelatedIndicators = data[1];
            if (settings.format === "json" || settings.format === "pjson") {
                httpMsgs.sendJson(req, resp, returnObj, settings.format);
            }
            else {
                var _stylePath = (process.env.virtualDirPath !== undefined ? 'public' : '') + '/stylesheets/style.css';
                resp.render('dataTable', { title: "Community Data by Indicator Table", table: utilities.tableMarkup(data, false, null), stylePath: _stylePath });
            }
        }
    });

}