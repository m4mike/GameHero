var utils = require('../utils');
module.exports = {
    
    initialize: function (api, next) {
       
        
        api.tictac = {
            gamePrototype: function (data) {
                if (data == null) {
                    this.board = [
                        [null, null, null],
                        [null, null, null],
                        [null, null, null],
                    ];
                    this.turn = 0;
                    this.state = "playing";
                    this.playerMarker = "X";
                    this.computerMarker = "O";
                    this.id = 'tic:' + utils.randomId(5);
                } else {
                    for (var i in data) {
                        this[i] = data[i];
                    }
                }
            },
            
            loadGame: function (gameId, callback) {
               
                api.cache.load(gameId, function (error, data) {
                    callback(error, new api.tictac.gamePrototype(data));
                });
            },
            
            saveGame: function ( game, callback) {
                var key = game.id;
                var gamedata = {
                    board: game.board,
                    turn: game.turn,
                    state: game.state,
                    playerMarker: game.playerMarker,
                    computerMarker: game.computerMarker,
                    id:key
                }
                api.cache.save(key, gamedata, function (error) {
                    if(error != null) callback(error);
                });
                callback(null,gamedata)
            },
            
            determineGameState: function (game) {
                // horizontal win
                for (var i in game.board) {
                    var row = game.board[i]
                    if (row[0] != null && row[0] == row[1] && row[0] == row[2]) {
                        return api.tictac.determineWinningState(game, row[0]);
                    }
                }                ;
                // vertical win
                var i = 0;
                while (i <= 2) {
                    if (game.board[0][i] != null && game.board[0][i] == game.board[1][i] && game.board[0][i] == game.board[2][i]) {
                        return api.tictac.determineWinningState(game, game.board[0][i]);
                    }
                    i++;
                }
                // diagonal win
                if (
             (game.board[1][1] != null && game.board[0][0] == game.board[1][1] && game.board[0][0] == game.board[2][2]) 
          || (game.board[1][1] != null && game.board[0][2] == game.board[1][1] && game.board[0][2] == game.board[2][0])
        ) {
                    return api.tictac.determineWinningState(game, game.board[1][1]);
                }
                // tie
                var tied = true;
                game.board.forEach(function (row) {
                    row.forEach(function (square) {
                        if (square == null) {
                            tied = false;
                        }
                    });
                });
                if (tied == true) {
                    return "tied";
                } else {
                    return "playing"
                }
            },
            
            determineWinningState: function (game, symbol) {
                if (symbol == game.playerMarker) {
                    return "you won"
                } else {
                    return "you lost"
                }
            },
            
            aiTurn: function (game) {
                var options = [
                    [], [], []
                ];
                var bestMove = [null, null];
                var bestScore = null;
                var y = -1;
                game.board.forEach(function (row) {
                    y++;
                    x = -1;
                    row.forEach(function (square) {
                        x++;
                        if (square != null) {
                            options[y][x] = null
                        } else {
                            var proposedGameAi = api.utils.objClone(game);
                            var proposedGamePlayer = api.utils.objClone(game);
                            proposedGameAi.board = JSON.parse(JSON.stringify(game.board));
                            proposedGamePlayer.board = JSON.parse(JSON.stringify(game.board));
                            proposedGameAi.board[y][x] = game.computerMarker;
                            proposedGamePlayer.board[y][x] = game.playerMarker;
                            
                            if (api.tictac.determineGameState(proposedGameAi) == "you lost") {
                                options[y][x] = 1 // I win
                                if (1 > bestScore || bestScore == null) {
                                    bestScore = 1;
                                    bestMove = [y, x]
                                }
                            } else if (api.tictac.determineGameState(proposedGamePlayer) == "you won") {
                                options[y][x] = 0.5 // I blocked a player win
                                if (0.5 > bestScore || bestScore == null) {
                                    bestScore = 0.5;
                                    bestMove = [y, x]
                                }
                            } else {
                                options[y][x] = 0
                                if (0 > bestScore || bestScore == null) {
                                    bestScore = 0;
                                    bestMove = [y, x]
                                }
                            }
                        }
                    });
                });
                if (bestScore != null) {
                    game.board[bestMove[0]][bestMove[1]] = game.computerMarker;
                }
            },

        }; //api.tictac=
        
        next();
    } //initialise

};