// actions/game.js

// A collection of tasks and helper methods to create a simpel tic-tac-toe game
// - single player 
// - simple AI
// - each connection can only have one active game at a time

exports.tictacCreate = {
    name: "tictacCreate",
    category:"tictac toe game",
    description: "Create a new tictactoe game",
    inputs: {},
    outputExample: {},
    version: 1.0,
    run: function (api, data, next) {
        var game = new api.tictac.gamePrototype();
        api.tictac.saveGame(game, function (error, result) {
            data.error = error;
            data.response.game = result;
            next();
        });
    }
};

exports.tictacView = {
    name: "tictacView",
    category: "tictac toe game",
    description: "I view the game board",
    inputs: {},
    outputExample: {},
    version: 1.0,
    run: function (api, data, next) {
        api.tictac.loadGame(data, function (error, game) {
            data.error = error;
            data.response.game = game;
            next();
        });
    }
};

exports.tictacMove = {
    name: "tictacMove",
    category: "tictac toe game",
    description: "a move by a human player of tic-tac-toe",
    inputs: {
        gameId: {
            required: true,
            validator: function (s) { return s.indexOf("tic") == 0 }
        },
        x: {
            required: true,
            formatter: function (s) { return Number(s); },
            validator: function (s) {
                var i = Number(s);
                if (isNaN(i)) return  'x is not a number';
                if (i < 0 || i > 2) {
                    return 'hor: horizontal x should be between 0 and 2'
                }
                else { return true; }
            }
        },
        y: {
            required: true,
            formatter: function (s) { return Number(s); },
            validator: function (s) {

                var i = Number(s);
                if (isNaN(i)) return 'nan: y is not a number';
                if (i < 0 || i > 2) { return 'ver: vertical y should be between 0 and 2';  }
                return true;
            }
        },
    },  
    
    
    outputExample: {},
    version: 1.0,
    run: function (api, connection, next) {
        var gameId = connection.params.gameId;
        var x = parseInt(connection.params.x);
        var y = parseInt(connection.params.y);
        api.tictac.loadGame(gameId, function (error, game) {
            if (error != null) {
                connection.response.error = "404: Game not found" ;
                
                next(error);
            } else if (game.state != "playing") {
                connection.response.error = "fin: This game is over";
                
                connection.response.game = game;
                next();
            } else if (game.board[y][x] != null) {
                connection.response.error=  "move: you can only draw a new shape on a blank tile";
                 connection.response.game = game;
                next();
            } else {
                game.board[y][x] = game.playerMarker;
                game.state = api.tictac.determineGameState(game);
                api.tictac.aiTurn(game);
                game.state = api.tictac.determineGameState(game);
                game.turn++;
                api.tictac.saveGame(game, function () {
                    connection.response.game = game;
                    next();
                });
            }
        });
    }
};
