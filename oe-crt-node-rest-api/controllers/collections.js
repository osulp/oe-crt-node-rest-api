var db = require("../core/db");
var settings = require("../settings");
var httpMsgs = require("../core/httpMsgs");
var utilities = require("../core/utilities");
var format = "json";

exports.get = function (req, resp) {       
    settings.format = req.query.f !== "undefined" ? req.query.f : "json";    
    let sql = "exec getCollections " + (req.query.featured ? req.query.featured : 1) + ";";
        db.executeSql(sql, false,
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
                
                var _stylePath = (process.env.virtualDirPath !== undefined ? 'public' : '') + '/stylesheets/style.css';                              
                resp.render('dataTable', { title:"Collections", table: html, stylePath: _stylePath });             
            }
        }
    });

}
