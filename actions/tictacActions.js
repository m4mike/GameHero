// actions/game.js

// A collection of tasks and helper methods to create a simpel tic-tac-toe game
// - single player 
// - simple AI
// - each connection can only have one active game at a time


        var inputGame =   {
            required: true,
            validator: function (s) { return s.indexOf("tic") == 0 }
        };
        var inputx =  {
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
        };
        var inputy= {
            required: true,
            formatter: function (s) { return Number(s); },
            validator: function (s) {

                var i = Number(s);
                if (isNaN(i)) return 'nan: y is not a number';
                if (i < 0 || i > 2) { return 'ver: vertical y should be between 0 and 2';  }
                return true;
            }
        };

var moveOutputExample = {
  "game": {
    "board": [
      [
        "X",
        "O",
        null
      ],
      [
        null,
        null,
        null
      ],
      [
        null,
        null,
        null
      ]
    ],
    "turn": 1,
    "state": "playing",
    "playerMarker": "X",
    "computerMarker": "O",
    "id": "tic:ngrue"
  }
};



exports.tictacView = {
    name: "tictacView",
    category: "tictac toe game",
    description: "I view the game board",
    inputs: {
        gameId: inputGame
    },
    outputExample: moveOutputExample,
    version: 1.0,
    run: function (api, action, next) {
        var gameId = action.params.gameId;
        api.tictac.loadGame(gameId, function (error, game) {
            action.error = error;
            action.response.game = game;
            next();
        });
    }
};

exports.tictacMove = {
    name: "tictacMove",
    category: "tictac toe game",
    description: "a move by a human player of tic-tac-toe",
    inputs: {gameId:inputGame,x:inputx,y:inputy},
    
    outputExample: moveOutputExample,
    version: 1.0,
    run: function (api, action, next) {
        var gameId = action.params.gameId;
        var x = parseInt(action.params.x);
        var y = parseInt(action.params.y);
        api.tictac.loadGame(gameId, function (error, game) {
            if (error != null) {
                action.response.error = "404: Game not found" ;
                
                next(error);
                return;
            } else if (game.state != "playing") {
                action.response.error = "fin: This game is over";
                
                action.response.game = game;
                next();
                return;
            } else if (game.board[y][x] != null) {
                action.response.error=  "move: you can only draw a new shape on a blank tile";
                action.response.game = game;
                next();
                return;
            } else {
                game.board[y][x] = game.playerMarker;
                game.state = api.tictac.determineGameState(game);
                api.tictac.aiTurn(game);
                game.state = api.tictac.determineGameState(game);
                game.turn++;
                api.tictac.saveGame(game, function () {
                    action.response.game = game;
                    next();
                });
            }
        });
    }
};


exports.tictacCreate = {
    name: "tictacCreate",
    description: "Create a new tictactoe game",
    inputs: {},
    outputExample: {},
    version: 1.0,
    run: function (api, action, next) {
        var game = new api.tictac.gamePrototype();
        api.tictac.saveGame(game, function (error, result) {
            action.error = error;
            action.response.game = result;
            next();
        });
    }
};

exports.tictacCreateAndStart = {
    name: "tictacCreateAndStart",
    description: "Create a new tictactoe game with first move",
    inputs: {x:inputx,y:inputy},  
    
    outputExample:moveOutputExample,
    version: 1.0,
    run: function (api, action, next) {
        
        var x = parseInt(action.params.x);
        var y = parseInt(action.params.y);
        var game = new api.tictac.gamePrototype();
        
                
        game.board[y][x] = game.playerMarker;
        game.state = api.tictac.determineGameState(game);
        api.tictac.aiTurn(game);
        game.state = api.tictac.determineGameState(game);
        game.turn++;
        api.tictac.saveGame(game, function () {
            action.response.game = game;
            next();
            return;
        });
        next();
     }
};