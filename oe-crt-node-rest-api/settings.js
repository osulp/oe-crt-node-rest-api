exports.dbConfig = {
    "user": 'RuralAdmin',
    "password": 'Rural!$OutThere',
    "server": 'lib-mssql1.library.oregonstate.edu', // You can use 'localhost\\instance' to connect to named instance
    "port": "1434",
    "database": 'community_reporter_5',
    //stream: true, // You can enable streaming globally

    "options": {
        //encrypt: true // Use this if you're on Windows Azure
    }
}
// add needed headers
var headers = {};
headers["Access-Control-Allow-Origin"] = "*";
headers["Access-Control-Allow-Methods"] = "GET, POST"; //"POST, GET, PUT, DELETE, OPTIONS";
headers["Access-Control-Allow-Credentials"] = true;
headers["Access-Control-Max-Age"] = '86400'; // 24 hours
headers["Access-Control-Allow-Headers"] = "X-Requested-With, Access-Control-Allow-Origin, X-HTTP-Method-Override, Content-Type, Authorization, Accept";
headers["Content-Type"] = "application/json";
exports.headers = headers;

exports.httpMsgsFormat = "HTML";

exports.webPort = "9003";