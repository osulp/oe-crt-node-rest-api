var db = require("../core/db");
var settings = require("../settings");
var httpMsgs = require("../core/httpMsgs");
var utilities = require("../core/utilities");
var format = "json";

exports.get_community_data_by_indicator = function (req, resp) {       
    settings.format = req.query.f !== "undefined" ? req.query.f : "json";
    db.executeSql("exec getCommunityData '" + req.query.geoids + "', '" + req.query.indicators + "';", 
        function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        }
        else {

            if (settings.format === "json" || settings.format === "pjson") {
                httpMsgs.sendJson(req, resp, data, settings.format);
            }
            else {                              
                resp.render('dataTable', { title:"Community Data by Indicator Table", table: utilities.tableMarkup(data, false, null) });                
            }
        }
    });

}

exports.get = function (req, resp, community) {
    
    db.executeSql("Select * from Communities", function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        }
        else {
            httpMsgs.sendJson(req, resp, data);
        }
    });

}