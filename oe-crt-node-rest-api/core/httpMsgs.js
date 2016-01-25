var settings = require("../settings");
var utilities = require("./utilities.js");
var fs = require("fs");

exports.show500 = function (req, resp, err) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(500, "Internal Error occurred", { "Content-Type": "text/html" });
        resp.write("<html><head><title>500</title></head><body>500: Internal Error. Details: " + err + "</body></html>");
    }
    else {
        resp.writeHead(500, "Internal Error occurred", settings.headers);
        resp.write(JSON.stringify({ data: "ERROR occured:" + err }));
    }
    resp.end();
};

exports.sendJson = function (req, resp, data, format) {
    if (data) {
        settings.headers['Content-Type'] = format ==="pjson" ? "text/html" : "application/json";
        resp.writeHead(200, settings.headers);        
        resp.write(format === "pjson" ? ("<style> pre {outline: 1px solid #ccc; padding: 5px; margin: 5px; } .string { color: green; } .number { color: darkorange; } .boolean { color: blue; } .null { color: magenta; } .key { color: red; }</style><pre>" 
            + utilities.syntaxHighlight(JSON.stringify(data, undefined, 4)) 
            + "</pre>") 
            : JSON.stringify(data));        
    }
    resp.end();
};

exports.sendHTML = function (req, resp, data) {
    if (data) {
        settings.headers['Content-Type'] = "text/html";
        resp.writeHead(200, settings.headers);
        resp.write(data);
    }
    resp.end();
}

exports.show405 = function (req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(405, "Method not supported", { "Content-Type": "text/html" });
        resp.write("<html><head><title>405</title></head><body>405: Method not supported</body></html>");
    }
    else {
        resp.writeHead(405, "Method not supported", settings.headers);
        resp.write(JSON.stringify({ data: "Method not supported" }));
    }
    resp.end();
};

exports.show404 = function (req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(404, "Resource not found", { "Content-Type": "text/html" });
        resp.write("<html><head><title>404</title></head><body>404: Resource not found</body></html>");
    }
    else {
        resp.writeHead(404, "Resource not found", settings.headers);
        resp.write(JSON.stringify({ data: "Resource not found" }));
    }
    resp.end();
};

exports.show413 = function (req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(413, "Request Entity Too Large", { "Content-Type": "text/html" });
        resp.write("<html><head><title>404</title></head><body>413: Request Entity Too Large</body></html>");
    }
    else {
        resp.writeHead(413, "Request Entity Too Large", settings.headers);
        resp.write(JSON.stringify({ data: "Request Entity Too Large" }));
    }
    resp.end();
};

exports.send200 = function (req, resp) {
    resp.writeHead(200, settings.headers);
    resp.end();
};

exports.showHome = function (req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(200, { "Content-Type": "text/html" });
        fs.readFile("./index.html", "utf8", function (err, data) {
            if (err) throw err;
            resp.write(data);
            resp.end();
        });
    }
    else {
        resp.writeHead(200, settings.headers);
        resp.write(JSON.stringify([
            { url: "/communities", operation: "GET", desc: "To list all communities" },
            { url: "/communities/<name/id>", operation: "GET", desc: "To search for a community" }
        ]
        ));
        resp.end();
    }
    //resp.end();
}


