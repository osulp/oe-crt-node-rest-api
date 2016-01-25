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
                var html = '<table id="dataTable"><tr>';
                var counter = 0;
                var columns;
                data.some(function (row) {
                    columns = Object.keys(row).sort(utilities.sortAlphaNumeric);
                    return counter === 0
                });
                columns.forEach(function (column) {
                    html += '<th>' + column + '</th>';
                });
                html += '</tr>';
                
                data.forEach(function (row) {
                    html += "<tr>";
                    columns.forEach(function (key) {
                        html += '<td>' + row[key] + '</td>';
                    });
                    html += '</tr>';
                });
                html += '</table>';
                resp.render('dataTable', { title: "Community Data by Indicator Table", table: html });
            }
        }
    });

}