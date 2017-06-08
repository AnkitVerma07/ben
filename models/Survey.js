/**
 * Created by Ankit Verma on 3/28/17.
 */
'use strict';
const crypto = require('crypto');
const thinky = require('../util/thinky');

const r = thinky.r;
const type = thinky.type;

const Survey = thinky.createModel('surveys', {
    id: type.string(),
    createdAt: type.date().default(r.now()),
    updatedAt: type.date(),
    title: type.string(),
    description: type.string(),
    source: type.string(),
    time_limit: type.string(),
    expected_time: type.string()
});

// Setup Indexes
Survey.ensureIndex('title');



module.exports = Survey;

const SurveyTaken = require('./SurveyTaken');
const Question = require('./Question');

Survey.hasMany(SurveyTaken, 'survey_surveyTaken', 'id', 'survey_id');
Survey.hasMany(Question, 'survey_questions', 'id', 'survey_id');

