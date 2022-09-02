'use strict';
const uuid = require('uuid');
const logger = require('../utils/logger');
const stationlistStore = require('../models/stationlist-store');
const analytics = require("../utils/analytics");

const stationlist = {
  index(request, response) {  //The index method
    const stationlistId = request.params.id;    //station*ids
    const stationlist = stationlistStore.getStationlist(stationlistId)
    // Check latest readings for each station
    analytics.updateWeather(stationlist);
    logger.debug('Stationlist id = ', stationlistId);

    const viewData = {   //pass to view
      title: 'Weather Readings',  //a title field containing the string station
      stationlist: stationlist
    }
    response.render("stationlist", viewData);
  },
  deleteReading(request, response) {
    const stationlistId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Deleting Reading ${readingId} from Stationlist ${stationlistId}`);
    stationlistStore.removeReading(stationlistId, readingId);
    response.redirect('/stationlist/' + stationlistId);
  },

  addReading(request, response) {
    const stationlistId = request.params.id;
    const stationlist = stationlistStore.getStationlist(stationlistId);
    const newReading = {
      id: uuid.v1(),
      code: request.body.code,
      temp: request.body.temp,
      windDirection: request.body.windDirection,
      windSpeed: request.body.windSpeed,
      pressure: request.body.pressure,
    };
    logger.debug('New Reading = ', newReading);
    stationlistStore.addReading(stationlistId, newReading);
    response.redirect('/stationlist/' + stationlistId);
  },

};

module.exports = stationlist;