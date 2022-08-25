'use strict';

const logger = require('../utils/logger');
const stationlistCollection = require('../models/stationlist-store.js'); // importing the collection from the station-list-store module.
const analytics = require("../utils/analytics");  // importing analytics form utils

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const stations = stationlistCollection.getAllStations();

    // Check latest readings for each station
    for (let i = 0; i < stations.length; i++) {
      analytics.updateWeather(stations[i]);
    }
    // Pass stations to the view
    const viewData = {
      title: 'WeatherTop Dashboard',
      stations: stations
    };
    logger.info('about to render', stations);  // display the stations before we render it
    response.render("dashboard", viewData);
  }
};

module.exports = dashboard;  //object exported