module.exports = {
    startPriority: 800,
    stopPriority: 1000,
    loadPriority: 1000,
    initialize: function (api, next) {
        
        
        
        var chatMiddleware = {
            name: 'chat middleware',
            priority: 1000,
            join: function (connection, room, callback) {
                // announce all connections entering a room
                api.chatRoom.broadcast({}, room, 'I have joined the room: ' + connection.id, function (e) {
                    callback(null);
                });
            },
            leave: function (connection, room, callback) {
                // announce all connections leaving a room
                api.chatRoom.broadcast({}, room, 'I have left the room: ' + connection.id, function (e) {
                    callback(null);
                });
            },
            /**
               * Will be executed once per client connection before delivering the message.
               */
            say: function (connection, room, messagePayload, callback) {
                // do stuff
                api.log(messagePayload);
                callback(null, messagePayload);
            },
            /**
               * Will be executed only once, when the message is sent to the server.
               */
            onSayReceive: function (connection, room, messagePayload, callback) {
                // do stuff
                api.log(messagePayload);
                callback(null, messagePayload);
            }
        };
        
        api.chatRoom.addMiddleware(chatMiddleware);
        next();
    }
}