var express = require('express');
var router = express.Router();
//controllers
var collections = require("../controllers/collections");
var communities = require("../controllers/community_data_by_indicator");
var topics = require("../controllers/topics");
var places = require("../controllers/places");
var place_types = require("../controllers/placetypes");
var geojson = require("../controllers/geojson");
var indicators = require("../controllers/indicators");
var search = require("../controllers/search_places_indicators");
var settings = require("../settings");
var util = require("../core/utilities");
var httpMsgs = require("../core/httpMsgs.js");
var school_data = require('../controllers/school_data');
var reports = require('../controllers/reports');

/* GET home page. */
router.get('/', function (req, res) {
    var _stylePath = (process.env.virtualDirPath !== undefined ? 'public' : '') + '/stylesheets/style.css';
    res.render('index', { title: 'Community Reporter REST API', stylePath: _stylePath });
});

router.get('/communityData', function (req, res) {
    util.processRequest(req);
    if (req.query.geoType !== undefined) {
        communities.get_community_data_by_indicator_geoType(req, res);
    } else if (req.query.viewType !== undefined) {
        communities.get_community_data_by_indicator_with_metadata(req, res, req.query.viewType);
    } else if (req.query.drilldown !== undefined) {
        communities.get_indicator_drilldown_data(req, res);
    } else {
        communities.get_community_data_by_indicator(req, res);
    }
})

router.get('/collections', function (req, res) {
    util.processRequest(req);
    collections.get(req, res);
})

router.get('/topics', function (req, res){
    util.processRequest(req);
    if (req.query.crt !== undefined) {
        //new crt topics
        topics.get_crt_topics(req, res);
    } else {
        //old crt topics with domains
        topics.get_topics(req, res);
    }
})

router.get('/places', function (req, res) {
    util.processRequest(req);
    if (req.query.place !== undefined) {
        places.getPlaceInfo(req, res);
    } else {
        places.getPlaces(req, res);
    }
})

router.get('/placetypes', function (req, res) {
    util.processRequest(req);
    place_types.getPlaceTypeGeoYears(req, res);
})

router.get('/geojson', function (req, res) {
    util.processRequest(req);
    geojson.getGeoJSON(req, res);
})

router.get('/search', function (req, res) {
    util.processRequest(req);
    search.search(req, res);
})

router.get('/reports', function (req, res) {
    util.processRequest(req);
    if (req.query.reportType) {
        reports.get_all_geo_indicator_by_year(req, res);
    }

})

router.get('/schools', function (req, res) {
    util.processRequest(req);
    if (req.query.schooldistrict) {
        school_data.get_school_distict_data(req, res);
    }
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
        indicators.get_indicator_desc_and_related(req, res);
    }
    else if (req.query.featured !== undefined) {
        indicators.get_featured_indicators(req, res);
    }
    else {
        indicators.get_all_indicators_list(req, res);
    }
})

module.exports = router;