'use strict';

const conversion = require("./conversions");
const stationAnalytics = {

   getLastReading(readings) {
      return readings[readings.length - 1];
   },

   // Method called in dashboard controller to check the latest readings for the station
   updateWeather(station) {
      if (station.readings.length > 0) {
         station.code = this.getLastReading(station.readings).code;
         station.currentWeather = conversion.currentWeather(Number(station.code));
         station.tempC = this.getLastReading(station.readings).temp;
         station.pressure = this.getLastReading(station.readings).pressure;
         station.windSpeed = this.getLastReading(station.readings).windSpeed;
         station.windSpeedToBft = conversion.windSpeedToBft(station.windSpeed)
         station.cToF = conversion.cToF(station.temp)
      }

   }
}
module.exports = stationAnalytics;