var express = require('express');
var router = express.Router();
var communities = require("../controllers/community_data_by_indicator");
var topics = require("../controllers/topics");
var indicators = require("../controllers/indicators");
var settings = require("../settings");
var httpMsgs = require("../core/httpMsgs.js");

/* GET home page. */
router.get(settings.virtualDirPath, function (req, res) {
    res.render('index', { title: 'Community Reporter REST API' });
});

var communityDataPath = settings.virtualDirPath + 'communityData';
router.get(communityDataPath, function (req, res){
    communities.get_community_data_by_indicator(req, res);    
})

var topicsPath = settings.virtualDirPath + 'topics';
router.get(topicsPath, function (req, res){
    topics.get_topics(req, res);
})

var indicatorsPath = settings.virtualDirPath + 'indicators';
router.get(indicatorsPath, function (req, res) {
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