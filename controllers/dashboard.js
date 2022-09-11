'use strict';

const accounts = require ('./accounts.js');
const logger = require("../utils/logger");
const stationlistStore = require("../models/stationlist-store");// importing the collection from the station-list-store module.
const uuid = require("uuid");
const analytics = require("../utils/analytics");  // importing analytics form utils


const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);    //see which user is logged in  //request allows us to recover the cookie
    const stationlist = stationlistStore.getUserStationlists(loggedInUser.id);// Pass stations to the view
    for (let i = 0; i < stationlist.length; i++) {
      analytics.updateWeather(stationlist[i]);
    }
    const viewData = {
      title: 'WeatherTop Dashboard',
      stationlists: stationlistStore.getUserStationlists(loggedInUser.id),
      stationlist: stationlist.sort((a, b) => a.title.localeCompare(b.title)), //sort
    };
    logger.info('about to render', stationlistStore.getAllStationlists());
    response.render('dashboard', viewData);

  },
  deleteStationlist(request, response) {
    const stationlistId = request.params.id;
    logger.debug(`Deleting Stationlist ${stationlistId}`);
    stationlistStore.removeStationlist(stationlistId);
    response.redirect("/dashboard");
  },

  addStationlist(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);  //discover which user is currently logged in
    const newStationList = {
      id: uuid.v1(),
      userid: loggedInUser.id, //in the new station include the id of the currently logged in user
      title: request.body.title,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
      readings: [],
    };
    logger.debug('Creating a new Stationlist', newStationList);
    stationlistStore.addStationlist(newStationList);
    response.redirect('/dashboard');
  },
};

module.exports = dashboard;  //object exported