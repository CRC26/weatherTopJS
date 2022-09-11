'use strict';

const conversion = require("./conversions");
const _ = require('lodash');
const analytics = {

  getLastReading(readings) {
    return readings[readings.length - 1];
  },

  // Method called in dashboard controller to check the latest readings for the station
  updateWeather(stationlist) {
    if (stationlist.readings.length > 0) {
      stationlist.code = this.getLastReading(stationlist.readings).code;
      stationlist.currentWeather = conversion.currentWeather(Number(stationlist.code));
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
      stationlist.icon = conversion.icon(Number(stationlist.code));

    }
  },

  latitude(stationlist) {
    return stationlist.lat;
  },

  longitude(stationlist) {
    return stationlist.lon;
  },

  icon(stationlist) {
    return stationlist.icon;
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

  getTempTrend(stationlist){
    if (stationlist.readings.length >= 3) {
      let trend1 = stationlist.readings[stationlist.readings.length - 3]; //grabs last 3 readings
      let trend2 = stationlist.readings[stationlist.readings.length - 2];
      let trend3 = stationlist.readings[stationlist.readings.length - 1];
      let tempTrend = "";
      if (trend3.temp > trend2.temp && trend2.temp > trend1.temp) {
        tempTrend = "arrow circle up icon";
      } else if (trend3.temp < trend2.temp && trend2.temp < trend1.temp) {
        tempTrend = "arrow circle down icon";
      } else {
        tempTrend = "arrows alternate vertical icon";
      }
      return tempTrend;
    }
  },


  getWindTrend(stationlist) {
    if (stationlist.readings.length >= 3) {
      let windTrend = "";
      let trend1 = stationlist.readings[stationlist.readings.length - 3]; //grabs last 3 readings
      let trend2 = stationlist.readings[stationlist.readings.length - 2];
      let trend3 = stationlist.readings[stationlist.readings.length - 1];
      if (trend3.windSpeed > trend2.windSpeed && trend2.windSpeed > trend1.windSpeed) {
        windTrend = "arrow circle up icon";
      } else if (trend3.windSpeed < trend2.windSpeed && trend2.windSpeed < trend1.windSpeed) {
        windTrend = "arrow circle down icon";
      } else {
        windTrend = "arrows alternate vertical icon";
      }
      return windTrend;
    }
  },
  getPressureTrend(stationlist) {
    if (stationlist.readings.length >= 3) {
      let pressureTrend = "";
      let trend1 = stationlist.readings[stationlist.readings.length - 3]; //grabs last 3 readings
      let trend2 = stationlist.readings[stationlist.readings.length - 2];
      let trend3 = stationlist.readings[stationlist.readings.length - 1];
      if (trend3.pressure > trend2.pressure && trend2.pressure > trend1.pressure) {
        pressureTrend = "arrow circle up icon";
      } else if (trend3.pressure < trend2.pressure && trend2.pressure < trend1.pressure) {
        pressureTrend = "arrow circle down icon";
      } else {
        pressureTrend = "arrows alternate vertical icon";
      }
      return pressureTrend;
    }
  },
};
module.exports = analytics;