'use strict';

/*
 * In this service the user data is defined for the current session. Within
 * angular current session is until the page is refreshed. When the page is
 * refreshed the user is reinitialized through $window.sessionStorage at the
 * login.js file.
 */
angular.module('myApp').service('Session', function () {
  this.create = function (sessionEmail) {
    this.email = sessionEmail;
  };
  this.destroy = function () {
    this.email = null;
  };
})