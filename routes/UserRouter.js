/**
 * Created by Ankit Verma on 3/28/17.
 */
'use strict';
const expressPromiseRouter = require("express-promise-router");
const router = expressPromiseRouter();

const Router = function() {

    const self = this;

    router.get('/', function(req, res, next) {
        res.send('respond with a resource');
    });


    self.router = router;

    return self;
};

Router.$inject = [];

module.exports = Router;