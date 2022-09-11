'use strict';

const uuid = require('uuid');
const logger = require('../utils/logger');
const stationlistStore = require('../models/stationlist-store');
const analytics = require("../utils/analytics");
const _ = require('lodash');
const axios = require("axios");

const stationlist = {
  index(request, response) {  //The index method
    const stationlistId = request.params.id;    //station*ids  -extracting and logging the id here
    logger.debug('Stationlist id = ', stationlistId);
    const stationlist = stationlistStore.getStationlist(stationlistId)   //getting as specific stationlist - with the id stationlistId - and placing it in the viewData object
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
      stationlist: stationlist,   //Listreadings will pick up the stationlist and display each reading
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
  deleteReading(request, response) {   // method to handle this route //added element in view to delete reading //route to match //model to remove reading
    const stationlistId = request.params.id;  //adding load dash library for removal at the top of stationlist-store,js
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

  async addreport(request, response) {
    const stationlistId = request.params.id;
    const stationlist = stationlistStore.getStationlist(stationlistId);
    const lat = stationlist.latitude;
    const lng = stationlist.longitude;
    logger.info("rendering new report");
    let report = {};
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=5941006c20dc48f0810544f5c723b78e`
    const result = await axios.get(requestUrl);
    if (result.status == 200) {
      const reading = result.data;
      report.id = uuid.v1();
      report.code = reading.weather[0].id;
      report.temperature = reading.main.temp;
      report.windSpeed = reading.wind.speed;
      report.pressure = reading.main.pressure;
      report.windDirection = reading.wind.deg;
    }
    console.log(report);
    stationlistStore.addReading(stationlistId, report);
    response.redirect('/stationlist/' + stationlistId);
  }
};

module.exports = stationlist;

