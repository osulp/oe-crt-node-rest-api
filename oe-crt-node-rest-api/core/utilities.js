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

exports.sortAlphaNumeric = function(a, b) {
    var aA = a.replace(/[^a-zA-Z]/g, "").replace("MOE", "");
    var bA = b.replace(/[^a-zA-Z]/g, "").replace("MOE", "");
    if (aA === bA) {
        var aN = parseInt(a.replace(/[^0-9]/g, ""), 10);
        var bN = parseInt(b.replace(/[^0-9]/g, ""), 10);
        return aN === bN ? 0 : aN > bN ? 1 : -1;
    } else {
        return aA > bA ? -1 : 1;
    }
}