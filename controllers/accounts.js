"use strict";

const userstore = require("../models/user-store");
const logger = require("../utils/logger");
const uuid = require("uuid");

const accounts = {
  index(request, response) {
    const viewData = {
      title: "Login or Signup"
    };
    response.render("index", viewData);
  },

  login(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.render("login", viewData);
  },

  logout(request, response) {
    response.cookie('stationlist', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.render("signup", viewData);
  },

  register(request, response) {
    const user = request.body;
    user.id = uuid.v1();
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect('/');
  },

  authenticate(request, response) {                                 //check if user exist
    const user = userstore.getUserByEmail(request.body.email);           //check email c
    const password = userstore.getUserByPassword(request.body.password);  //check password
    if (user && password) {
      response.cookie('stationlist', user.email);             //create cookie
      logger.info(`logging in ${user.email}`);
      response.redirect('/dashboard');
    } else {
      response.redirect('/login');                //ask user to try again if email and password aren't in system
    }
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.stationlist;
    return userstore.getUserByEmail(userEmail);
  }
};

module.exports = accounts;