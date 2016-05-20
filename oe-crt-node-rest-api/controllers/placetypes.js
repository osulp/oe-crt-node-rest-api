var db = require("../core/db");
var settings = require("../settings");
var httpMsgs = require("../core/httpMsgs");
var utilities = require("../core/utilities");
var format = "json";

exports.getPlaceTypeGeoYears = function (req, resp) {
    settings.format = req.query.f !== "undefined" ? req.query.f : "json";
    db.executeSql("exec getPlaceTypeGeoYears;", true,
        function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        }
        else {
            var returnObj = {};
            returnObj.Places = data[0];
            returnObj.Tracts = data[1];
            returnObj.Counties = data[2];
            returnObj.SchoolDistricts = data[3];
            
            if (settings.format === "json" || settings.format === "pjson") {
                httpMsgs.sendJson(req, resp, returnObj, settings.format);
            }
        }
    });

}
