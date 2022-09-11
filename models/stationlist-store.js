'use strict';
const _ = require('lodash');
const JsonStore = require('./json-store');
const axios = require("axios");

const stationlistStore = {
  store: new JsonStore("./models/stationlist-store.json", {
    stationlistCollection: []
  }),
  collection: "stationlistCollection",

  //method
  getAllStationlists() {
    return this.store.findAll(this.collection);
  },

  getStationlist(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addStationlist(stationlist) {
    this.store.add(this.collection, stationlist);
    this.store.save();
  },

  removeStationlist(id) {
    const stationlist = this.getStationlist(id)
    this.store.remove(this.collection, stationlist);
    this.store.save();
  },

  removeAllStationlists() {
    this.store.removeAll(this.collection);
    this.store.save();
  },

  addReading(id, reading) {
    const stationlist = this.getStationlist(id);
    stationlist.readings.push(reading);
    this.store.save();
  },

  removeReading(id, readingId) {
    const stationlist = this.getStationlist(id);
    const readings = stationlist.readings;
    _.remove(readings, {id: readingId});
    this.store.save();
    // remove the reading with id readingId from the stationlist
  },
  getReading(id, readingId) {
    const stationList = this.store.findOneBy(this.collection, { id: id });
    const readings = stationList.readings.filter(reading => reading.id == readingId);
    return readings[0];
  },

  getUserStationlists(userid) {   //creating user id               //https://egghead.io/lessons/javascript-lodash-sortby-and-sortedindex
    return this.store.findBy(this.collection, { userid: userid });
  },

};

module.exports = stationlistStore;