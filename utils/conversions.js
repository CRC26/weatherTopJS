'use strict';
const _ = require('lodash');
const { getTempFilename } = require("express-fileupload/lib/utilities");
const conversion = {

currentWeather(code)
{
  const weatherCodes = new Map([
    [100, 'Clear'],
    [200, 'Partial Clouds'],
    [300, 'Cloudy'],
    [400, 'Light Showers'],
    [500, 'Heavy Showers'],
    [600, 'Rain'],
    [700, 'Snow'],
    [800, 'Thunder']
  ]);
  return weatherCodes.get(code);
},

 icon(code) {
  let weatherIcon;
  switch(true) {
      case code = 100:
        weatherIcon = "cloud sun";
        break;
      case code = 200:
        weatherIcon = "cloud sun";
        break;
      case code = 300:
        weatherIcon = "cloud";
        break;
      case code = 400:
        weatherIcon = "cloud sun rain"
        break;
      case code = 500:
        weatherIcon = "cloud showers heavy"
        break;
      case code = 600:
        weatherIcon = "cloud rain"
        break;
      case code = 700:
        weatherIcon = "snowflake"
        break;
      case code = 800:
        weatherIcon = "bolt"
        break;
    }
    return weatherIcon;
  },

  windChill(tempC, windSpeed)
  {
    let wc = Number(13.12 + 0.6215 * tempC - 11.37 * (Math.pow(windSpeed, 0.16)) + 0.3965 * tempC * (Math.pow(windSpeed, 0.16)));
    //round
    wc = Math.floor(wc);
    // chill < temp, return the temp
    wc = (wc > tempC) ? tempC : wc;
    return wc;
  },


  windSpeedToBft(windSpeed)
    {
      let bft;
      switch (true) {
        case windSpeed >= 1 && windSpeed <= 6:
          bft = "1"
          break;
        case windSpeed >= 7 && windSpeed <= 11:
          bft = "2"
          break;
        case windSpeed >= 12 && windSpeed <= 19:
          bft = "193"
          break;
        case windSpeed >= 20 && windSpeed <= 29:
          bft = "4"
          break;
        case windSpeed >= 30 && windSpeed <= 39:
          bft = "5"
          break;
        case windSpeed >= 40 && windSpeed <= 39:
          bft = "6"
          break;
        case windSpeed >= 51 && windSpeed <= 62:
          bft = "7"
          break;
        case windSpeed >= 63 && windSpeed <= 75:
          bft = "8"
          break;
        case windSpeed >= 76 && windSpeed <= 87:
          bft = "9"
          break;
        case windSpeed >= 88 && windSpeed <= 102:
          bft = "10"
          break;
        case windSpeed >= 103 && windSpeed <= 117:
          bft = "11"
          break;
        case windSpeed >= 117:
          bft = "12"
          break;
      }
      return bft;
    },

    cToF(tempC)
    {
      return Number(tempC * 9 / 5) + 32;
    },


    degreesToCompass(deg)
    {
      if (deg > 11.25 && deg <= 33.75) {
        return "North North East";
      } else if (deg > 33.75 && deg <= 56.25) {
        return "North East";
      } else if (deg > 56.25 && deg <= 78.75) {
        return "East North East";
      } else if (deg > 78.75 && deg <= 101.25) {
        return "East";
      } else if (deg > 101.25 && deg <= 123.75) {
        return "East South East";
      } else if (deg > 123.75 && deg <= 146.25) {
        return "South East";
      } else if (deg > 146.25 && deg <= 168.75) {
        return "South South East";
      } else if (deg > 168.75 && deg <= 191.25) {
        return "South";
      } else if (deg > 191.25 && deg <= 213.75) {
        return "South South West";
      } else if (deg > 213.75 && deg <= 236.25) {
        return "South West";
      } else if (deg > 236.25 && deg <= 258.75) {
        return "West South West";
      } else if (deg > 258.75 && deg <= 281.25) {
        return "West";
      } else if (deg > 281.25 && deg <= 303.75) {
        return "West North West";
      } else if (deg > 303.75 && deg <= 326.25) {
        return "North West";
      } else if (deg > 326.25 && deg <= 348.75) {
        return "North North West"
      } else {
        return "North";
      }
  },
}
module.exports = conversion;