/**
 * Created by Ankit Verma on 3/28/17.
 */
'use strict';
const UserDAO = function(RethinkUserDAO) {

    const self = this;


    return self;
};

UserDAO.$inject = ['rethinkUserDao'];

module.exports = UserDAO;