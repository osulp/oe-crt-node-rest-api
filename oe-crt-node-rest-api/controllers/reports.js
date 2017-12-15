var db = require("../core/db");
var settings = require("../settings");
var httpMsgs = require("../core/httpMsgs");
var utilities = require("../core/utilities");
var format = "json";

exports.get_all_geo_indicator_by_year = function (req, resp) {
    settings.format = req.query.f !== "undefined" ? req.query.f : "json";
    var sqlQuery = '';
    var metadata = {};
    var reportTitle = '';
    var reportType = req.query.reportType;
    switch (reportType) {
        case 'year_indicators':
        case 'year_variables':
            sqlQuery = "exec getAdminReport '" + reportType + "',null,'" + req.query.year + "';";
            metadata.filename = reportType + '_' + req.query.year;
            metadata.reportTitle = reportType === 'year_indicators'
                ? 'All indicators for year ' + req.query.year
                : 'All variable data records for year ' + req.query.year;
            break;
        case 'all_year_indicator':
        case 'all_year_variable':
            sqlQuery = "exec getAdminReport '" + reportType + "','" + req.query.varIndicator + "',null;";
            metadata.filename = req.query.varIndicator
            .replace(/\ /g, '')
            .replace(/\$/g, 'S')
            .replace(/\,/g, '')
            .replace(/\</g, 'lt')
            .replace(/\>/g, 'gt');
            metadata.reportTitle = reportType === 'all_year_indicator'
                ? 'All data for indicator: ' + req.query.varIndicator
                : 'All data for variable data record: ' + req.query.varIndicator;
            break;
        default:
            break;
    }

    db.executeSql(sqlQuery, false,
        function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        }
        else {

            if (settings.format === "json" || settings.format === "pjson") {
                httpMsgs.sendJson(req, resp, data, settings.format);
            } else if (settings.format === "csv") {
                httpMsgs.sendCSV(req, resp, data, metadata);
            } else {
                var _stylePath = (process.env.virtualDirPath !== undefined ? 'public' : '') + '/stylesheets/style.css';
                resp.render('dataTable', { title: "Community Data by Indicator Table", table: utilities.tableMarkup(data, false, null), stylePath: _stylePath });
            }
        }
    });
}