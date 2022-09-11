'use strict';


const uuid = require('uuid');
const logger = require('../utils/logger');
const stationlistStore = require('../models/stationlist-store');
const analytics = require("../utils/analytics");
const _ = require('lodash');
const axios = require("axios");

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
  //*async addreport(request, response) {
 //   logger.info("rendering new report");
 //   let report = {};
   // const lat = request.body.lat;
 //   const lng = request.body.lng;
 //   const requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=5e4f3222073ac88008d8b516e18b7df0`;
 //   const result = await axios.get(requestUrl);
 //   if (result.status == 200) {
 //     const reading = result.data.current;
 //     report.code = reading.weather[0].id;
 //     report.temperature = reading.temp;
 //     report.windSpeed = reading.wind.speed;
 //     report.pressure = reading.main.pressure;
  //    report.windDirection = reading.wind.deg;
//    }
//    console.log(report);
 //   const viewData = {
  //   title: "Weather Report",
 //     reading: report
 //   };
//    response.render("stationlist", viewData);
//  }
//
};

module.exports = stationlist;