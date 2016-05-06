//var sqlDb = require("mssql");
var sqlDb = require("seriate");
var settings = require("../settings");


exports.executeSql = function (sql, returnMultiple, callback) {
    sqlDb.setDefaultConfig(settings.dbConfig);    
    sqlDb.execute({
        query: sql,
        multiple: returnMultiple       
    }).then(function (results) {
        //console.log(results);
        callback(results);
    }, function (err) {
        console.log("Something bad happened:", err);
        callback(null, err);
    });
};


//exports.executeSql = function (sql, callback) {

//    var conn = new sqlDb.Connection(settings.dbConfig);
//    conn.connect()
//   .then(function () {
//        var req = new sqlDb.Request(conn);
//        console.log(sql);
//        req.query(sql)
//        .then(function (recordset) {
//            callback(recordset);
//        })
//        .catch(function (err) {
//            console.log(err);
//            callback(null, err);
//        });
//    })
//   .catch(function (err) {
//        console.log(err);
//        callback(null, err);
//    }
//    );
//};

exports.execStoredProc = function (proc_name, valu, callback) {
    var request = new sql.Request();   
    
    var conn = new sqlDb.Connection(settings.dbConfig);
    conn.connect()
   .then(function () {
        var req = new sqlDb.Request(conn);
        console.log(sql);
        req.input('input_parameter', sql.Int, value);
        req.output('output_parameter', sql.VarChar(50));
        req.execute('procedure_name').then(function (recordset) {
            console.dir(recordset);
        }).catch(function (err) {
		// ... error checks 
        });
    })
   .catch(function (err) {
        console.log(err);
        callback(null, err);
    }
    );


}