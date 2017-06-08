/**
 * Created by Ankit Verma on 3/28/17.
 */
'use strict';
const UserDAO = function(RethinkSurveyDAO) {

    const self = this;

    self.insertSurvey = RethinkSurveyDAO.insertSurvey;
    self.getSurveyById = RethinkSurveyDAO.getSurveyById;
    self.insertSurveyTaken = RethinkSurveyDAO.insertSurveyTaken;

    return self;
};

UserDAO.$inject = ['rethinkSurveyDao'];

module.exports = UserDAO;