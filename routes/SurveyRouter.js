/**
 * Created by Ankit Verma on 3/28/17.
 */
'use strict';
const expressPromiseRouter = require("express-promise-router");
const router = expressPromiseRouter();

const Router = function(SurveyService) {

    const self = this;

    router.post('/', function(req, res, next) {
        const title = req.body.title;
        const description = req.body.description;
        const source = req.body.source;
        const time_limit = req.body.time_limit;
        const expected_time = req.body.expected_time;
        const questionsList = req.body.questionsList;
        return SurveyService.addNewSurvey(title, description, source, time_limit, expected_time, questionsList).then(function(fileUpload) {
            res.success(fileUpload);
        }).catch(next);
    });

    router.get('/:survey_id', function(req, res, next) {
        const survey_id = req.params.survey_id;
        return SurveyService.fetchSurveyById(survey_id).then(function(fileUpload) {
            res.success(fileUpload);
        }).catch(next);
    });

    router.post('/:user_id/surveyTaken/:survey_id', function(req, res, next) {
        const user_id = req.params.user_id;
        const survey_id = req.params.survey_id;
        const time_taken = req.body.time_taken;
        const answers = req.body.answers;
        return SurveyService.addNewSurveyTaken(user_id, survey_id, time_taken, answers).then(function(fileUpload) {
            res.success(fileUpload);
        }).catch(next);
    });


    self.router = router;

    return self;
};

Router.$inject = ['surveyService'];

module.exports = Router;