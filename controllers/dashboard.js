"use strict";

const logger = require("../utils/logger");
const stationlistCollection = require('../models/stationlist-reading.js');

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: 'Weather Top Dashboard',
      stationlists: stationlistCollection,
    };
    logger.info('about to render', stationlistCollection);
    response.render('dashboard', viewData);
  },
};

module.exports = dashboard;
