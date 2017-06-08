/**
 * Created by Ankit Verma on 3/28/17.
 */
'use strict';
const crypto = require('crypto');
const thinky = require('../util/thinky');

const r = thinky.r;
const type = thinky.type;

const Answer = thinky.createModel('answers', {
    id: type.string(),
    createdAt: type.date().default(r.now()),
    updatedAt: type.date(),
    text: type.string(),
    question_id: type.string(),
    survey_taken_id: type.string()
});

// Setup Indexes



module.exports = Answer;

const Question = require('./Question');
const SurveyTaken = require('./SurveyTaken');


Answer.belongsTo(Question, 'question', 'question_id', 'id');
Answer.belongsTo(SurveyTaken, 'survey_belongsto', 'survey_taken_id', 'id');
