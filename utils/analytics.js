'use strict';

const conversion = require("./conversions");
const { template } = require("lodash");
const analytics = {

  getLastReading(readings) {
    return readings[readings.length - 1];
  },

  // Method called in dashboard controller to check the latest readings for the station
  updateWeather(stationlist) {
    if (stationlist.readings.length > 0) {
      stationlist.code = this.getLastReading(stationlist.readings).code;
      stationlist.currentWeather = conversion.currentWeather(Number(stationlist.code));
      stationlist.icon = conversion.icon(stationlist.code);
      stationlist.tempC = this.getLastReading(stationlist.readings).temp;
      stationlist.pressure = this.getLastReading(stationlist.readings).pressure;
      stationlist.windSpeed = this.getLastReading(stationlist.readings).windSpeed;
      stationlist.windSpeedToBft = conversion.windSpeedToBft(stationlist.windSpeed);
      stationlist.cToF = conversion.cToF(stationlist.tempC);
      stationlist.degreesToCompass = conversion.degreesToCompass(stationlist.deg);
      stationlist.windChill = conversion.windChill(stationlist.tempC, stationlist.windSpeed);
      stationlist.maxTemp = analytics.maxTemp(stationlist).temp;
      stationlist.minTemp = analytics.minTemp(stationlist).temp;
      stationlist.maxP = analytics.maxP(stationlist).pressure;
      stationlist.minP = analytics.minP(stationlist).pressure;
      stationlist.maxW = analytics.maxW(stationlist).windSpeed;
      stationlist.minW = analytics.minW(stationlist).windSpeed;

    }
  },

  latitude(stationlist) {
    return stationlist.latitude;
  },

  longitude(stationlist) {
    return stationlist.longitude;
  },

  weatherIcon(stationlist){
    return stationlist.weatherIcon;
  },

  maxTemp(stationlist) {
    let maxTemp = null;
    if (stationlist.readings.length > 0) {
      maxTemp = stationlist.readings[0];
      for (let i = 1; i < stationlist.readings.length; i++) {
        if (stationlist.readings[i].temp > maxTemp.temp) {
          maxTemp = stationlist.readings[i];
        }
      }
    }
    return maxTemp
  },

  minTemp(stationlist) {
    let minTemp = null;
    if (stationlist.readings.length > 0) {
      minTemp = stationlist.readings[0];
      for (let i = 1; i < stationlist.readings.length; i++) {
        if (stationlist.readings[i].temp < minTemp.temp) {
          minTemp = stationlist.readings[i];
        }
      }
    }
    return minTemp;
  },
  maxP(stationlist) {
    let maxP = null;
    if (stationlist.readings.length > 0) {
      maxP = stationlist.readings[0];
      for (let i = 1; i < stationlist.readings.length; i++) {
        if (stationlist.readings[i].pressure > maxP.pressure) {
          maxP = stationlist.readings[i];
        }
      }
    }
    return maxP
  },
  minP(stationlist) {
    let minP = null;
    if (stationlist.readings.length > 0) {
      minP = stationlist.readings[0];
      for (let i = 1; i < stationlist.readings.length; i++) {
        if (stationlist.readings[i].pressure < minP.pressure) {
          minP = stationlist.readings[i];
        }
      }
    }
    return minP;
  },
  maxW(stationlist) {
    let maxW = null;
    if (stationlist.readings.length > 0) {
      maxW = stationlist.readings[0];
      for (let i = 1; i < stationlist.readings.length; i++) {
        if (stationlist.readings[i].pressure > maxW.windSpeed) {
          maxW = stationlist.readings[i];
        }
      }
    }
    return maxW;
  },
  minW(stationlist) {
    let minW = null;
    if (stationlist.readings.length > 0) {
      minW = stationlist.readings[0];
      for (let i = 1; i > stationlist.readings.length; i++) {
        if (stationlist.readings[i].pressure > minW.windSpeed) {
          minW = stationlist.readings[i];
        }
      }
    }
    return minW;
  },
}
module.exports = analytics;