var db = require("../core/db");
var settings = require("../settings");
var httpMsgs = require("../core/httpMsgs");
var utilities = require("../core/utilities");
var format = "json";

exports.get_community_data_by_indicator = function (req, resp) {       
    settings.format = req.query.f !== "undefined" ? req.query.f : "json";
    db.executeSql("exec getCommunityData '" + req.query.geoids + "', '" + req.query.indicators + "';", false, 
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
                resp.render('dataTable', { title:"Community Data by Indicator Table", table: utilities.tableMarkup(data, false, null), stylePath: _stylePath });                
            }
        }
    });
}

exports.get_community_data_by_indicator_geoType = function (req, resp) {
    settings.format = req.query.f !== "undefined" ? req.query.f : "json";
    //PARAMS for getIndicatorData in order: 1. indicator, 2.geotypes(adv view only,3.geoids(basic view only),4.geonames(basic view only) Not currently used,5.viewType (basic/advanced)
    db.executeSql("exec getIndicatorData '" + req.query.indicator + "', '" + req.query.geoType + "';", true, 
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
            returnObj.RelatedIndicators = data.length > 4 ? data[4] : null;
            returnObj.SubTopicCategories = data.length > 5 ? data[5]: null;
            returnObj.TopicCategories = data.length > 6 ? data[6]: null;
            
            
            if (settings.format === "json" || settings.format === "pjson") {
                httpMsgs.sendJson(req, resp, returnObj, settings.format);
            }
            else {
                var _stylePath = (process.env.virtualDirPath !== undefined ? 'public' : '') + '/stylesheets/style.css';
                resp.render('dataTable', { title: "Community Data by Indicator by GeoType Table", table: utilities.tableMarkup(data, false, null), stylePath: _stylePath });
            }
        }
    });
}

exports.get_community_data_by_indicator_with_metadata = function (req, resp) {
    settings.format = req.query.f !== "undefined" ? req.query.f : "json";
    //PARAMS for getIndicatorData in order: 1. indicator, 2.geotypes(adv view only,3.geoids(basic view only),4.geonames(basic view only) Not currently used,5.viewType (basic/advanced)
    db.executeSql("exec getIndicatorData '" + req.query.indicator + "', '','" + req.query.geoids + "','','basic';", true, 
        function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        }
        else {
            var returnObj = {};
            returnObj.Metadata = data[0];
            returnObj.Years = data[1];
            returnObj.Data = data[2];          
            
            if (settings.format === "json" || settings.format === "pjson") {
                httpMsgs.sendJson(req, resp, returnObj, settings.format);
            }
            else {
                var _stylePath = (process.env.virtualDirPath !== undefined ? 'public' : '') + '/stylesheets/style.css';
                resp.render('dataTable', { title: "Community Data by Indicator with Metadata Table", table: utilities.tableMarkup(data, false, null), stylePath: _stylePath });
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