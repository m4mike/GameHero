var utils = require("../utils")

exports.players = {
    name: 'userActions',
    description: 'List possible actions on users',
    domain:"User",
    outputExample: null,
    
    run: function (api, action, next) {
       

        var collection = new utils.hyperJson();
        collection.link("Find User by id", utils.host + "/api/users/byId/:userId")
            .link("Delete user", utils.host + "-delete-/api/users/:userId");
        
        action.response = collection.toObject();
        action.response.error = null;
        
        next();
    }
    
};

exports.userById = {
    name: 'userById',
    description: 'Get user by Id',
    inputs: {
        userId: {
            required: true,
            validator: null
        }
    },
    
    run: function (api, action, next) {
        
        api.data.users.getById(action.params.userId, function (err, result) {
            if (err) {
                next(err);
            } else {
                if (result == null) {
                    action.connection.rawConnection.responseHttpCode = "404";
                    next(new Error("not found"));
                } else {
                    if (result.length == 0) {
                        action.connection.rawConnection.responseHttpCode = "404";
                        next(new Error("not found: " + id));
                        return;
                    }
                    //var collection = new utils.hyperJson({
                    //    _items : result
                            
                    //});
                    //collection.addSelfIdsToItems(utils.host + "/api/users/getById/" , "_id");
                    action.response = result;
                    next();
                }
            }
        });
        
    }
};

exports.userDelete = {
    name: 'userDelete',
    description: 'Delete user by Id',
    inputs: {
        userId: {
            required: true,
            validator: null
        }
    },
    
    run: function (api, action, next) {
         api.data.users.deleteById(action.params.userId, function (err, result) {
            if (err) {
                next(err);
            } else {
                if (result == null) {
                    action.connection.rawConnection.responseHttpCode = "404";
                    next(new Error("not found"));
                } else {
                    if (result.length == 0) {
                        action.connection.rawConnection.responseHttpCode = "404";
                        next(new Error("not found: " + id));
                        return;
                    }
                    //var collection = new utils.hyperJson({
                    //    _items : result
                    
                    //});
                    //collection.addSelfIdsToItems(utils.host + "/api/users/getById/" , "_id");
                    action.response = result.result;
                    next();
                }
            }
        });
        
    }
};





