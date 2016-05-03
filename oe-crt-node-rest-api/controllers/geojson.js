var db = require("../core/db");
var settings = require("../settings");
var httpMsgs = require("../core/httpMsgs");
var utilities = require("../core/utilities");
var format = "json";
var oregon_counties_2010 = require('../geojson/counties_oregon_2010.json');

exports.getGeoJSON = function (req, resp) {
    settings.format = req.query.f !== "undefined" ? req.query.f : "json";
    httpMsgs.sendJson(req, resp, oregon_counties_2010, format);    
}
