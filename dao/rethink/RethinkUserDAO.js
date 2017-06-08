/**
 * Created by Ankit Verma on 3/28/17.
 */
'use strict';
const Promise = require('bluebird');

const models = require("../../models/index");
const thinky = require("../../util/thinky");

const Errors = thinky.Errors;


const RethinkUserDAO = function() {

    const self = this;

    return self;
};

RethinkUserDAO.$inject = [];

module.exports = RethinkUserDAO;