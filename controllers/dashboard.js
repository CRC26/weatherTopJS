'use strict';

const accounts = require ('./accounts.js');
const uuid = require('uuid');
const logger = require('../utils/logger');
const stationlistStore = require('../models/stationlist-store.js'); // importing the collection from the station-list-store module.
const analytics = require("../utils/analytics");  // importing analytics form utils


const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const stationlist = stationlistStore.getAllStationlists();
    for (let i = 0; i < stationlist.length; i++) {
      analytics.updateWeather(stationlist[i]);
    }
    const loggedInUser = accounts.getCurrentUser(request);
    // Pass stations to the view
    const viewData = {
      title: 'WeatherTop Dashboard',
      stationlists: stationlistStore.getUserStationlists(loggedInUser.id),
      stationlist: stationlist
    };
    logger.info('about to render', stationlistStore.getAllStationlists());  // display the stations before we render it
    response.render("dashboard", viewData);
  },

  deleteStationlist(request, response) {
    const stationlistId = request.params.id;
    logger.debug(`Deleting Playlist ${stationlistId}`);
    stationlistStore.removeStationlist(stationlistId);
    response.redirect("/dashboard");
  },

  addStationlist(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newStationList = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      date: request.body.date,
      title: request.body.title,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
      readings: [],
    };
    logger.debug('Creating a new Stationlist', newStationList);
    stationlistStore.addStationlist(newStationList);
    response.redirect('/dashboard');
  }
};

module.exports = dashboard;  //object exported

