'use strict';

const { getTempFilename } = require("express-fileupload/lib/utilities");
const conversion = {

  currentWeather(code) {
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

  windSpeedToBft(windSpeed) {
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

  cToF(temp) {
  let tempF
  temp = 13;
  tempF =((temp*9)/5)+32;
  return tempF;
  },


  degreesToCompass(deg) {
    let degree;
    switch (true) {
      case deg > 11.25 && deg <= 33.75:
        degree = "North North East"
        break;
      case deg > 33.75 && deg <= 56.25:
        degree = "North East"
        break;
      case deg > 56.25 && deg <= 78.75:
        degree = "East North East"
        break;
      case deg > 78.75 && deg <= 101.25:
        degree = "East"
        break;
      case deg > 101.25 && deg <= 123.75:
        degree = "East South East"
        break;
      case deg > 123.75 && deg <= 146.25:
        degree = "South East"
        break;
      case deg > 146.25 && deg <= 168.75:
        degree = "South South East"
        break;
      case deg > 168.75 && deg <= 191.25:
        degree = "South"
        break;
      case deg > 191.25 && deg <= 213.75:
        degree = "South South West"
        break;
      case deg > 213.75 && deg <= 236.25:
        degree = "South West"
        break;
      case deg > 236.25 && deg <= 258.75:
        degree = "West South West"
        break;
      case deg > 258.75 && deg <= 281.25:
        degree = "West"
        break;
      case deg > 281.25 && deg <= 303.75:
        degree = "West North West"
        break;
      case deg > 303.75 && deg <= 326.25:
        degree = "North West"
        break;
      case deg > 326.25 && deg <= 348.75:
        degree = "North North West"
        break;
    }

  }
}

  module.exports = conversion;
//*package utils;
//
// import java.util.HashMap;
// import java.util.Map;
//
// public class Conversion {
//   static Map<Integer, String> weatherCodes = new HashMap<>();
//   static Map<Integer, String> weatherCodeIcons = new HashMap<>();
//   static {
//     weatherCodes.put(100, "Clear");
//     weatherCodes.put(200, "Partial Clouds");
//     weatherCodes.put(300, "Cloudy");
//     weatherCodes.put(400, "Light Showers");
//     weatherCodes.put(500, "Heavy Showers");
//     weatherCodes.put(600, "Rain");
//     weatherCodes.put(700, "Snow");
//     weatherCodes.put(800, "Thunder");
//
//     weatherCodeIcons.put(100, "sun");
//     weatherCodeIcons.put(200, "cloud sun");
//     weatherCodeIcons.put(300, "cloud");
//     weatherCodeIcons.put(400, "cloud sun rain");
//     weatherCodeIcons.put(500, "cloud showers heavy");
//     weatherCodeIcons.put(600, "cloud rain");
//     weatherCodeIcons.put(700, "snowflake");
//     weatherCodeIcons.put(800, "bolt");
//   }
//
//   public static String weatherIcon(int code) {
//     return weatherCodeIcons.get(code);
//   }
//
//   public static String currentWeather(int code) {
//     return weatherCodes.get(code);
//   }
//
//   public static double tempF(double tempC) {
//     return (tempC * 1.8) + 32;
//   }
//
//
//
//   public static String degreesToCompass(double deg) {
//     if (deg > 11.25 && deg <= 33.75) {
//       return "North North East";
//     } else if (deg > 33.75 && deg <= 56.25) {
//       return "East North East";
//     } else if (deg > 56.25 && deg <= 78.75) {
//       return "East";
//     } else if (deg > 78.75 && deg <= 101.25) {
//       return "East South East";
//     } else if (deg > 101.25 && deg <= 123.75) {
//       return "East South East";
//     } else if (deg > 123.75 && deg <= 146.25) {
//       return "South East";
//     } else if (deg > 146.25 && deg <= 168.75) {
//       return "South South East";
//     } else if (deg > 168.75 && deg <= 191.25) {
//       return "South";
//     } else if (deg > 191.25 && deg <= 213.75) {
//       return "South South West";
//     } else if (deg > 213.75 && deg <= 236.25) {
//       return "South West";
//     } else if (deg > 236.25 && deg <= 258.75) {
//       return "West South West";
//     } else if (deg > 258.75 && deg <= 281.25) {
//       return "West";
//     } else if (deg > 281.25 && deg <= 303.75) {
//       return "West North West";
//     } else if (deg > 303.75 && deg <= 326.25) {
//       return "North West";
//     } else if (deg > 326.25 && deg <= 348.75) {
//       return "North North West";
//     } else {
//       return "North";
//     }
//   }
// }