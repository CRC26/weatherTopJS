'use strict';


const uuid = require('uuid');
const logger = require('../utils/logger');
const stationlistStore = require('../models/stationlist-store');
const analytics = require("../utils/analytics");
const _ = require('lodash');

const stationlist = {
  index(request, response) {  //The index method
    const stationlistId = request.params.id;    //station*ids
    logger.debug('Stationlist id = ', stationlistId);
    const stationlist = stationlistStore.getStationlist(stationlistId)
    analytics.updateWeather(stationlist);// Check latest readings for each station
    const icon = analytics.icon(stationlist);
    const maxTemp = analytics.maxTemp(stationlist);
    const minTemp = analytics.minTemp(stationlist);
    const maxP = analytics.maxP(stationlist);
    const minP = analytics.minP(stationlist);
    const maxW = analytics.maxW(stationlist);
    const minW = analytics.minW(stationlist);
    const viewData = {   //pass to view
      title: 'Weather Readings',  //a title field containing the string station
      stationlist: stationlist,
      icon: icon,
      maxTemp: maxTemp,
      minTemp: minTemp,
      maxP: maxP,
      minP: minP,
      maxW: maxW,
      minW: minW,
      pressureTrend: analytics.getPressureTrend(stationlist),
      tempTrend: analytics.getTempTrend(stationlist),
      windTrend: analytics.getWindTrend(stationlist),
    };

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

    const newReading = {
      id: uuid.v1(),
      code: request.body.code,
      temp: request.body.temp,
      windDirection: request.body.windDirection,
      windSpeed: request.body.windSpeed,
      pressure: request.body.pressure,
      icon: request.body.icon,
      date: new Date().toISOString(),


    };
    logger.debug('New Reading = ', newReading);
    stationlistStore.addReading(stationlistId, newReading);
    response.redirect('/stationlist/' + stationlistId);
  },

};

module.exports = stationlist;