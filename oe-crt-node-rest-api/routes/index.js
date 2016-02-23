var express = require('express');
var router = express.Router();
//controllers
var collections = require("../controllers/collections");
var communities = require("../controllers/community_data_by_indicator");
var topics = require("../controllers/topics");
var indicators = require("../controllers/indicators");
var search = require("../controllers/search_places_indicators");
var settings = require("../settings");
var util = require("../core/utilities");
var httpMsgs = require("../core/httpMsgs.js");

/* GET home page. */
router.get('/', function (req, res) {
    var _stylePath = (process.env.virtualDirPath !== undefined ? 'public' : '') + '/stylesheets/style.css';
    res.render('index', { title: 'Community Reporter REST API', stylePath: _stylePath });
});

router.get('/communityData', function (req, res){
    util.processRequest(req);
    communities.get_community_data_by_indicator(req, res);    
})

router.get('/collections', function (req, res) {
    util.processRequest(req);
    collections.get(req, res);
})

router.get('/topics', function (req, res){
    util.processRequest(req);
    topics.get_topics(req, res);
})

router.get('/search', function (req, res) {
    util.processRequest(req);
    search.search(req, res);
})

router.get('/indicators', function (req, res) {
    util.processRequest(req);
    if (req.query.deep !== undefined) {
        indicators.get_all_indicators_list_deep(req, res);
    }
    else if (req.query.topic !== undefined) {
        indicators.get_all_indicators_list_deep(req, res);
    }
    else if (req.query.indicator !== undefined) {
        indicators.get_indicator(req, res);
    }
    else {
        indicators.get_all_indicators_list(req, res);
    }    
})

module.exports = router;