/**
 * Created by Ankit Verma on 3/28/17.
 */
'use strict';
const validator = require('validator');
const Promise = require('bluebird');

const errors = require('../models/error');


const Service = function(SurveyDAO) {

    const self = this;

    self.fetchSurveyById = (surveyId) => {
        return SurveyDAO.getSurveyById(surveyId);
       //      .then( (survey) => {
       //            const FiveStarClusters = ['careerProgression', 'resourcesNtraining ', 'resourcesNtraining', 'team', 'culture', 'ethicsNvaluesNdiversity', 'recognitionNsenseOfInfluence', 'communication', 'tenure', 'clarity', 'work', 'process', 'organization', 'department', 'job', 'rapport', 'affect ','expectations ', 'expectations', 'overall'];
       //          const multipleChoiceCluster = ['affect ','expectations ', 'expectations', 'overall', 'careerProgression', 'resourcesNtraining ', 'resourcesNtraining', 'team', 'culture', 'ethicsNvaluesNdiversity', 'recognitionNsenseOfInfluence', 'communication', 'tenure', 'clarity', 'work', 'process', 'organization', 'department', 'job', 'rapport' ];
       //
       //          const types =
       //          [ '5star',
       //              'NPS',
       //              'dropdown',
       //              'dropdownWInput',
       //              'multipleChoice',
       //              'text' ];
       //          const questionsByClusters = types.map(type => {
       //              if(type === '5star'){
       //                  return survey.survey_questions.filter(question => question.type === type).sort((a,b) => {
       //                      return FiveStarClusters.indexOf(a.cluster) - FiveStarClusters.indexOf(b.cluster);
       //                  })
       //              }
       //              if(type === 'multipleChoice'){
       //                  return survey.survey_questions.filter(question => question.type === type).sort((a,b) => {
       //                      return multipleChoiceCluster.indexOf(a.cluster) - multipleChoiceCluster.indexOf(b.cluster);
       //                  })
       //              }
       //
       //          });
       //          const endClusters = ['demographic', 'NPS'];
       //          const demoNPS = endClusters.map(cluster => {
       //              return survey.survey_questions.filter(question => question.cluster === cluster);
       //          });
       //          questionsByClusters.unshift(...demoNPS);
       //          survey.survey_questions = questionsByClusters;
       //          return survey;
       //
       // });
    };

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
                choices: question.choices,
                order: question.order
            });
        });
        insertObj.survey_questions = questionArray;
        return SurveyDAO.insertSurvey(insertObj);
    };

    self.addNewSurveyTaken = (user_id, survey_id, time_taken, answers) => {
        const insertObj = {
            user_id: "4f36bcf6-a62d-4c89-bd86-3483d3760a6a" ,
            survey_id: survey_id,
            time_taken: time_taken
        };
        let answerArray = answers.map( (answer) => {
            if(answer.i === '0'){
               return SurveyDAO.getQuestionByText('What is your location?').then( (questions) => {
                   return ({
                       text: answer.s,
                       question_id: questions[0].id
                   });
                    });
            }
            if(answer.i === '1'){
                return SurveyDAO.getQuestionByText('What country/city?').then( (questions) => {
                    return ({
                        text: answer.s,
                        question_id: questions[0].id
                    });
                });
            }else {
                return ({
                    text: answer.s,
                    question_id: answer.i
                });
            }
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