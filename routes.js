'use strict';

const express = require('express');
const router = express.Router();


const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const stationlist = require('./controllers/stationlist.js');
const accounts = require('./controllers/accounts.js');

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/dashboard', dashboard.index);
router.get('/dashboard/deletestationlist/:id', dashboard.deleteStationlist);
router.post('/dashboard/addstationlist', dashboard.addStationlist);

router.get('/about', about.index);
router.get('/stationlist/:id', stationlist.index);
router.get('/stationlist/:id/deletereading/:readingid', stationlist.deleteReading);
router.post('/stationlist/:id/addreading', stationlist.addReading);


module.exports = router;
