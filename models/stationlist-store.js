'use strict';

const JsonStore = require('./json-store');

const stationlistStore = {
  store: new JsonStore("./models/stationlist-store.json", { stationlistCollection: [] }),
  collection: "stationlistCollection",

  getAllStations() {
    return this.store.findAll(this.collection);
  },

  getStation(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },


}

module.exports = stationlistStore;