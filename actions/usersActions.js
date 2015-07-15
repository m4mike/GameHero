var utils = require("../utils")
var async = require('async');

exports.users = {
    name: 'userActions',
    description: 'List possible actions on users',
    domain: "User",
    outputExample: null,

    run: function (api, action, next) {


        var collection = new utils.HyperJson();
        collection.link("Find User by id", api.serverUrl + "/api/users/byId/:idUser")
            .link(" DELETE Delete user, will delete its players", api.serverUrl + "-delete-/api/users/:idUser")
            .link("Create player for App", api.serverUrl + "/api/users/:idUser/addPlayer/:idPlayer/:app")
            .link("Add interest to user", api.serverUrl + "/api/users/:idUser/addInterest/:lang/:cat/:interest")
            .link("Remove interest from user", api.serverUrl + "/api/users/:idUser/removeInterest/:lang/:cat/:interest")
            .link("check if user has interest", api.serverUrl + "/api/users/:idUser/hasInterest/:lang/:cat/:interest")


        action.response = collection.toObject();
        action.response.error = null;

        next();
    }

};

exports.userAddInterest = {
    name: 'userAddInterest',
    description: 'Add an interest to the user',
    inputs: {
        idUser: {
            required: true,
            validator: null
        },
        lang: {
            required: true,
            validator: null
        },
        cat: {
            required: true,
            validator: null
        }, interest: {
            required: true,
            validator: null
        }
    },

    run: function (api, action, next) {

        api.data.users.addInterest(action.params.idUser, 
                                   action.params.lang, 
                                   action.params.cat, 
                                   action.params.interest, function (err, data) {
            //var collection = new utils.HyperJson(data);
            //collection.addSelfId();
            action.response = data;
            next();
        });
    }
};


exports.userRemoveInterest = {
    name: 'userRemoveInterest',
    description: 'Remove an interest from the user',
    inputs: {
        idUser: {
            required: true,
            validator: null
        },
        lang: {
            required: true,
            validator: null
        },
        cat: {
            required: true,
            validator: null
        }, interest: {
            required: true,
            validator: null
        }
    },

    run: function (api, action, next) {

        api.data.users.removeInterest(action.params.idUser, 
                                   action.params.lang, 
                                   action.params.cat, 
                                   action.params.interest, function (err, data) {
            action.response = data;
            next(null, data);
        });
    }
};


exports.userHasInterest = {
    name: 'userHasInterest',
    description: 'Check if the user has that interest ',
    inputs: {
        idUser: {
            required: true,
            validator: null
        },
        lang: {
            required: true,
            validator: null
        },
        cat: {
            required: true,
            validator: null
        }, interest: {
            required: true,
            validator: null
        }
    },

    run: function (api, action, next) {

        api.data.users.hasInterest(action.params.idUser, 
                                   action.params.lang, 
                                   action.params.cat, 
                                   action.params.interest, function (err, data) {
            action.response = data;
            next();
        });
    }
};


exports.userById = {
    name: 'userById',
    description: 'Get user by Id',
    inputs: {
        idUser: {
            required: true,
            validator: null
        }
    },

    run: function (api, action, next) {

        api.data.users.getById(action.params.idUser, function (err, result) {
            if (err || result == null || result.length == 0) {

                action.connection.rawConnection.responseHttpCode = "404";
                return next(new Error("not found"));
            } else {

                action.response = result;
                next();
            }

        })
    }

};

exports.createPlayerForApp = {
    name: 'createPlayerForApp',
    description: 'Create a player for an app attached to this user',
    inputs: {
        idUser: {
            required: true,
            validator: null
        }
    },

    run: function (api, action, next) {
        // get the user adn his apps
        //  if the user already plays the app -> return player 
        // create a player for the app
        // -> return player
        
        var temp = { user: null, abort: false, err: null };

        async.series(
            [
                //get user
                function (cb) {
                    api.data.users.searchOne({ "_id": action.params.idUser }, { "_id": 1, "apps": 1 }, function (err, result) {
                        if (err || result == null || result.length == 0) {
                            temp.err = new Error('user not found');
                            temp.abort = true;
                            return cb();
                        }
                        temp.user = result;

                        return cb();
                    });
                },
                function (cb) {
                    if (temp.abort) return cb();
                    var selected = _.where(temp.users, { "apps.idapp": action.params.idApp });


                }
            ]
            , function (err) {
                next();
            });
    }
};

exports.userDelete = {
    name: 'userDelete',
    description: 'Delete user by Id',
    inputs: {
        idUser: {
            required: true,
            validator: null
        }
    },

    run: function (api, action, next) {
        api.data.users.deleteById(action.params.idUser, function (err, result) {
            if (err) {
                next(err);
            } else {
                if (result == null) {
                    action.connection.rawConnection.responseHttpCode = "404";
                    next(new Error("not found"));
                } else {
                    if (result.length == 0) {
                        action.connection.rawConnection.responseHttpCode = "404";
                        next(new Error("not found: " + action.params.idUser));
                        return;
                    }
                    //var collection = new utils.hyperJson({
                    //    _items : result
                    
                    //});
                    //collection.addSelfIdsToItems(api.serverUrl + "/api/users/getById/" , "_id");
                    action.response = result.result;
                    next();
                }
            }
        });

    }
};
