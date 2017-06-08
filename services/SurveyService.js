/**
 * Created by Ankit Verma on 3/28/17.
 */
'use strict';
const validator = require('validator');
const Promise = require('bluebird');

const errors = require('../models/error');


const Service = function(SurveyDAO) {

    const self = this;

    self.fetchSurveyById = SurveyDAO.getSurveyById;

    self.addNewSurvey = (title, description, source, time_limit, expected_time, questionsList) => {
        const insertObj = {
            title: title,
            description: description,
            source: source,
            time_limit: time_limit,
            expected_time: expected_time
        };
        let questionArray = questionsList.map( (question) => {
            return ({
                question: question.question,
                type: question.type,
                cluster: question.cluster,
                charge: question.charge,
                choices: question.choices
            });
        });
        insertObj.survey_questions = questionArray;
        return SurveyDAO.insertSurvey(insertObj);
    };

    self.addNewSurveyTaken = (user_id, survey_id, time_taken, answers) => {
        const insertObj = {
            user_id: user_id,
            survey_id: survey_id,
            time_taken: time_taken
        };
        let answerArray = answers.map( (answer) => {
            return ({
                text: answer.text,
                question_id: question.id
            });
        });
        insertObj.answers = answerArray;
        return SurveyDAO.insertSurveyTaken(insertObj);
    };

    return self;
};

Service.$inject = [
    'surveyDao'
];

module.exports = Service;