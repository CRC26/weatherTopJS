'use strict';
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
    // Pass stations to the view
    const viewData = {
      title: 'WeatherTop Dashboard',
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
    const newStationList = {
      id: uuid.v1(),
      title: request.body.title,
      readings: [],
    };
    stationlistStore.addStationlist(newStationList);
    response.redirect('/dashboard');
  }
};

module.exports = dashboard;  //object exported

