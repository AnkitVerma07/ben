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
            .getJoin({ survey_questions : {
                _apply: function(sequence) {
                    return sequence.orderBy("order")
                }
            }
            })
            .catch(thinky.Errors.DocumentNotFound, (err) => Promise.resolve('Survey Id provided not found.'));
    };

    self.insertSurveyTaken = (surveyTakenData) => {
        return models.SurveyTaken(surveyTakenData).saveAll();
    };

    return self;
};

RethinkSurveyDAO.$inject = [];

module.exports = RethinkSurveyDAO;