'use strict';

const logger = require('../utils/logger');
const stationStore = require('../models/stationlist-store');
const analytics = require("../utils/analytics");

const station = {
  index(request, response) {  //The index method
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId)
    logger.debug('Station id = ', stationId);
    const currentWeather = analytics.getCurrentWeather(station);
    const windSpeedToBft = analytics.getWindSpeedToBft(station);
    const cToF = analytics.getCToF(station);


    const viewData = {   //pass to view
        title: 'Station',  //a title field containing the string station
        lastReading: stationAnalytics.getLastReading(station.readings)


      }

  response.render("station", viewData);
  },
};

module.exports = station;