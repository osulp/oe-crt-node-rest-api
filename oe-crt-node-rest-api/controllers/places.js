﻿var db = require("../core/db");
var settings = require("../settings");
var httpMsgs = require("../core/httpMsgs");
var utilities = require("../core/utilities");
var format = "json";

exports.getPlaces = function (req, resp) {
    settings.format = req.query.f !== "undefined" ? req.query.f : "json";
    db.executeSql("exec searchPlacesAndIndicators '" + req.query.term.replace(/\'/g, "''")  + "', 'Place';", false,
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
                resp.render('dataTable', { title: "Search Places and Indicators", table: utilities.tableMarkup(data, false, null), stylePath: _stylePath });
            }
        }
    });
}

exports.getPlaceInfo = function (req, resp) {
    ///////////////////
    // Can deprecate once code ported to support getPlaceInfoNameGeoid
    settings.format = req.query.f !== "undefined" ? req.query.f : "json";
    db.executeSql("exec getPlaceInfo '" + req.query.place.replace(/\'/g, "''")  + "';", false,
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
                resp.render('dataTable', { title: "Get Place Info", table: utilities.tableMarkup(data, false, null), stylePath: _stylePath });
            }
        }
    });
}

exports.getPlaceInfoNameGeoid = function (req, resp) {
    settings.format = req.query.f !== "undefined" ? req.query.f : "json";
    db.executeSql("exec getPlaceInfoByNameGeoid '" + req.query.place.replace(/\'/g, "''") + "','" + req.query.geoid + "','" + req.query.geoType + "';", false,
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
                resp.render('dataTable', { title: "Get Place Info by Name or Geoid", table: utilities.tableMarkup(data, false, null), stylePath: _stylePath });
            }
        }
    });
}

exports.get = function (req, resp, community) {

    db.executeSql("Select * from Communities", false, function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        }
        else {
            httpMsgs.sendJson(req, resp, data);
        }
    });

}