/**
 * Created by Ankit Verma on 3/28/17.
 */
'use strict';
const crypto = require('crypto');
const thinky = require('../util/thinky');

const r = thinky.r;
const type = thinky.type;

const User = thinky.createModel('users', {
    id: type.string(),
    createdAt: type.date().default(r.now()),
    updatedAt: type.date(),
    firstname: type.string(),
    lastname: type.string(),
    phone: type.string(),
    aboutMe: type.string(),
    gender: type.boolean(),   //1 is male, 0 is  female
    email: type.string().email(),
    type: type.number().default(1),
    hashedPassword: type.string(),
    age: type.number(),
    birthdate: type.date(),
    banned: type.boolean().default(false),
    badge: type.number().default(0),
    goals: type.string(),
    active: type.boolean(),
    role: type.string(),
    rating: type.number()
});

// Setup Indexes
User.ensureIndex('email');
User.ensureIndex('banned');

User.ensureIndex('fullname', function(doc) {
    return [doc('firstname'), doc('lastname')];
});



module.exports = User;

const SurveyTaken = require('./SurveyTaken');


User.hasMany(SurveyTaken, 'user_surveyTaken', 'id', 'user_id');

