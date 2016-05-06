var db = require("../core/db");
var settings = require("../settings");
var httpMsgs = require("../core/httpMsgs");
var utilities = require("../core/utilities");
var format = "json";

exports.get_all_indicators_list = function (req, resp) {       
    settings.format = req.query.f !== "undefined" ? req.query.f : "json";
    db.executeSql("select Variable 'Indicator', Topic 'Topics', 'ChartDisplay' = case when ScriptName IS NULL then 'default' else ScriptName end  from VariableDesc as vd join Topics as t on t.Topic_ID = vd.Topic_ID where UPPER(Show) is NULL or UPPER(Show) like 'YES' order by Topics asc, Indicator asc;", false,
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
                resp.render('dataTable', { title:"Community Reporter Indicators", table: utilities.tableMarkup(data, true, "indicators?indicator="), stylePath: _stylePath });                
            }
        }
    });
}

exports.get_all_indicators_list_deep = function (req, resp) {
    settings.format = req.query.f !== "undefined" ? req.query.f : "json";
    db.executeSql("select * from VariableDesc where UPPER(Show) is NULL or UPPER(Show) like 'YES' ;", false,
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
    db.executeSql("select * from VariableDesc where (UPPER(Show) is NULL or UPPER(Show) like 'YES') and Variable like '" + indicator + "';", false,
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