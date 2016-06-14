var db = require("../core/db");
var settings = require("../settings");
var httpMsgs = require("../core/httpMsgs");
var utilities = require("../core/utilities");
var format = "json";

exports.get_topics = function (req, resp) {
    settings.format = req.query.f !== "undefined" ? req.query.f : "json";

    db.executeSql("select d.domain, t.topic from Topics t join Domains d on d.domain_id = t.Domain_ID  order by Topic asc", false,
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
                resp.render('dataTable', { title: "Topics", table: utilities.tableMarkup(data, false, null), stylePath: _stylePath });
            }
        }
    }, function (err) {
        alert(err);
    });

}

exports.get_crt_topics = function (req, resp) {
    settings.format = req.query.f !== "undefined" ? req.query.f : "json";
    
    db.executeSql("select crt_topic_name as topic, crt_topic_icon 'icon', crt_topic_featured 'featured' from CRT_Topics", false,
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
                resp.render('dataTable', { title: "CRT Topics", table: utilities.tableMarkup(data, false, null), stylePath: _stylePath });
            }
        }
    }, function (err) {
        alert(err);
    });

}

