var settings = require("../settings");
var fs = require("fs");

exports.syntaxHighlight = function (json){
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

exports.tableMarkup = function (data, addLinks, linkPath)
{
    var html = '<table id="dataTable"><tr>';
    var counter = 0;
    var columns;
    data.some(function (row) {
        columns = Object.keys(row).sort(exports.sortAlphaNumeric);
        return counter === 0
    });
    columns.forEach(function (column) {
        html += '<th>' + column + '</th>';
    });
    html += '</tr>';

    data.forEach(function (row) {
        html += "<tr>";
        columns.forEach(function (key) {
            //html += '<td><a href="indicators?indicator=' + row[key] + '&f=HTML">' + row[key] + '</a></td>';
            html += '<td>' + (addLinks ? '<a href="' + linkPath : "") + row[key] + (addLinks ? ('&f=HTML">' + row[key] + '</a>') : "") + '</td>';
        });
        html += '</tr>';
    });
    html += '</table>';
    return html;
}

exports.isNumeric = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

exports.sortAlphaNumeric = function (a, b) {
    // order primary columns first then sort the rest
    if (b.toUpperCase() === "COMMUNITY") {
        return 1000;
    } else if (a.toUpperCase() === "COMMUNITY") {
        return -1000;
    }
    if (b.toUpperCase().indexOf("GEOID") !== -1) {
        return 900;
    } else if (a.toUpperCase().indexOf("GEOID") !== -1) {
        return -900;
    }
    if (b.toUpperCase().indexOf("GEOTYPE") !== -1) {
        return 800;
    } else if (a.toUpperCase().indexOf("GEOTYPE") !== -1) {
        return -800;
    }
    if (b.toUpperCase() === "YEAR") {
        return 700;
    } else if (a.toUpperCase() === "YEAR") {
        return -700;
    }
    if (b.toUpperCase().indexOf("VARIABLE") !== -1) {
        return 600;
    } else if (a.toUpperCase().indexOf("VARIABLE") !== -1) {
        return -600;
    }
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

exports.processRequest = function (req)
{
    settings.isJSONP = req.query.callback !== undefined ? true : false;
}
    
exports.ConvertToCSV = function (objArray, metadata) {
    var data = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    str += "Report generated on " + Date() + '\r\n';
    str += (metadata.reportTitle ? metadata.reportTitle : '' ) + '\r\n\r\n';
    var row = "";
    var columns;
    var counter = 0;
    data.some(function (row) {
        columns = Object.keys(row)
        .sort(exports.sortAlphaNumeric);
        //columns = exports.arrangeColumns(columns);
        return counter === 0;
    });
    columns.forEach(function (column) {
        //table column headers
        row +=  '"' + column + '",';
    });

    row = row.slice(0, -1);
    //append Label row with line break
    str += row + '\r\n';
    data.forEach(function (row) {
        line = '';
        columns.forEach(function (key) {
            line += line !== '' ? ',' : '';
            //console.log('row key', row, key);
            if (row[key]) {
                var val = row[key].toString();
                line += val === null ? '' : val.indexOf(',') !== -1 ? '\"' + val + '\"' : val;
            }
        });
        str += line + '\r\n';
    });
    return str;
}
