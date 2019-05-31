# oe-crt-node-rest-api

After cloning, you may need to create a file in the bin folder called www.  It should have the following in it.

#!/usr/bin/env node
var debug = require('debug')('oe_crt_node_rest_api');
var app = require('../app');

app.set('port', process.env.PORT || 1337);

var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});


Run:  npm install 
This will load the node modules needed for the application.  It should run in VS 20xx by pushing f5.  

The server deploy involves using iisnode which creates a handler for the node application.  The configuration settings are in the web.config in the iisnode tag.


