/**
 * Created by Ankit Verma on 3/28/17.
 */
'use strict';
const Promise = require('bluebird');

const models = require("../../models/index");
const thinky = require("../../util/thinky");

const Errors = thinky.Errors;


const RethinkSurveyDAO = function() {

    const self = this;

    self.insertSurvey = (surveyData) => {
        return models.Survey(surveyData).saveAll();
    };

    self.getSurveyById = (surveyId) => {
        return models.Survey
            .get(surveyId)
            .getJoin({ survey_questions : true })
            .catch(thinky.Errors.DocumentNotFound, (err) => Promise.resolve('User not found by given id.'));
    };

    self.insertSurveyTaken = (surveyTakenData) => {
        return models.SurveyTaken(surveyTakenData).saveAll();
    };

    return self;
};

RethinkSurveyDAO.$inject = [];

module.exports = RethinkSurveyDAO;