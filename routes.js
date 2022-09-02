'use strict';

const express = require('express');
const router = express.Router();

const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const stationlist = require('./controllers/stationlist.js');

router.get('/', dashboard.index);
router.get('/dashboard', dashboard.index);
router.get('/dashboard/deletestationlist/:id', dashboard.deleteStationlist);
router.post('/dashboard/addstationlist', dashboard.addStationlist);

router.get('/about', about.index);
router.get('/stationlist/:id', stationlist.index);
router.get('/stationlist/:id/deletereading/:readingid', stationlist.deleteReading);
router.post('/stationlist/:id/addreading', stationlist.addReading);


module.exports = router;

// <a href="/dashboard/deletestationlist/{{id}}" class="ui icon button">
//       <i class="icon red trash"></i>

//deleteStationlist(request, response) {
//     const stationlistId = request.params.id;
//     const stationlist = stationlistStore.getStationlist(stationlistId);
//     logger.debug(`Deleting Stationlist ${stationlistId}`);
//     stationlistStore.removeStationlist(stationlistId);
//     response.redirect('/dashboard');