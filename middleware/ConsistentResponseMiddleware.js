/**
 * Created by Ankit Verma on 3/28/17.
 */
'use strict';
// const jwt = require('jsonwebtoken');

const Middleware = function() {

    const self = this;

    self.middleware = function(req, res, next) {

        req.success = function(result) {
            res.json({
                success: true,
                result: result
            });
        };

        req.fail = function(message, isError) {
            res.json({
                success: false,
                message: message
            });
        };
//Errors were happening without these two babies.. (AS)
        res.success = function(result) {
            res.json({
                success: true,
                result: result
            });
        };

        res.fail = function(message, isError) {
            res.json({
                success: false,
                message: message
            });
        };
        next();
    };

    return self;
};

module.exports = Middleware;