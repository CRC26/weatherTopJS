'use strict';

const conversion = require("./conversions");
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
         stationlist.cToF = conversion.cToF(stationlist.temp);
         stationlist.degreesToCompass = conversion.degreesToCompass(stationlist.deg);
         stationlist.windChill=this.getLastReading(stationlist.readings).windSpeed.temp;

      }

   },


}
module.exports = analytics;