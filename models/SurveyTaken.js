/**
 * Created by Ankit Verma on 3/28/17.
 */
'use strict';
const crypto = require('crypto');
const thinky = require('../util/thinky');

const r = thinky.r;
const type = thinky.type;

const SurveyTaken = thinky.createModel('surveys_taken', {
    id: type.string(),
    createdAt: type.date().default(r.now()),
    updatedAt: type.date(),
    survey_id: type.string(),
    user_id: type.string(),
    time_taken: type.string()
});

// Setup Indexes
SurveyTaken.ensureIndex('survey_id');
SurveyTaken.ensureIndex('user_id');


module.exports = SurveyTaken;

const Survey = require('./Survey');
const User = require('./User');
const Answer = require('./Answer');


SurveyTaken.belongsTo(User, 'users', 'user_id', 'id');
SurveyTaken.belongsTo(Survey, 'surveys', 'survey_id', 'id');
SurveyTaken.hasMany(Answer, 'answers', 'id', 'survey_taken_id');