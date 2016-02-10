var db = require("../core/db");
var settings = require("../settings");
var httpMsgs = require("../core/httpMsgs");
var utilities = require("../core/utilities");
var format = "json";

exports.get_all_indicators_list = function (req, resp) {       
    settings.format = req.query.f !== "undefined" ? req.query.f : "json";
    db.executeSql("select Variable 'Indicators' from VariableDesc where UPPER(Show) is NULL or UPPER(Show) like 'YES' order by Variable asc ;", 
        function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        }
        else {

            if (settings.format === "json" || settings.format === "pjson") {
                httpMsgs.sendJson(req, resp, data, settings.format);
            }
            else {                              
                resp.render('dataTable', { title:"Community Reporter Indicators", table: utilities.tableMarkup(data, true, "indicators?indicator=") });                
            }
        }
    });
}

exports.get_all_indicators_list_deep = function (req, resp) {
    settings.format = req.query.f !== "undefined" ? req.query.f : "json";
    db.executeSql("select * from VariableDesc where UPPER(Show) is NULL or UPPER(Show) like 'YES' ;", 
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
    });

}

exports.get_indicator = function (req, resp) {
    settings.format = req.query.f !== "undefined" ? req.query.f : "json";
    var indicator = req.query.indicator !== undefined ? req.query.indicator : "%";
    db.executeSql("select * from VariableDesc where (UPPER(Show) is NULL or UPPER(Show) like 'YES') and Variable like '" + indicator + "';", 
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
    });

}