/**
 * Created by Ankit Verma on 3/28/17.
 */
'use strict';
const validator = require('validator');
const Promise = require('bluebird');

const errors = require('../models/error');


const Service = function(UserDAO) {

    const self = this;

    return self;
};

Service.$inject = [
    'userDao'
];

module.exports = Service;