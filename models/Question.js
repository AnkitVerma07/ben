/**
 * Created by Ankit Verma on 3/28/17.
 */
'use strict';
const crypto = require('crypto');
const thinky = require('../util/thinky');

const r = thinky.r;
const type = thinky.type;

const Question = thinky.createModel('questions', {
    id: type.string(),
    createdAt: type.date().default(r.now()),
    updatedAt: type.date(),
    question: type.string(),
    type: type.string(),
    cluster: type.string(),
    charge: type.number(),
    choices: type.array(),
    survey_id: type.string()
});

// Setup Indexes
Question.ensureIndex('title');



module.exports = Question;

const Survey = require('./Survey');
const Answer = require('./Answer');


Question.belongsTo(Survey, 'surveys', 'survey_id', 'id');
Question.hasOne(Answer, 'answer', 'id', 'question_id');