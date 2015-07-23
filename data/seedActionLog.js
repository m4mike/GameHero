module.exports.logs =
[
    {
        "_id": "log1",
        "a": "status",
        "ts": "2015-07-15T13-00-00Z",
        "id_app": "app_mlg",
        "from": {
            "id_player": "p11",
            "id_user": "u1",
            "id_ext": "mlg11",
            "name": "Amanda"
        },
        "post": {
            "msg": "Je me sens bien"
        }
    },
    {
        "_id": "log2",
        "a": "post",
        "ts": "2015-07-15T13-00-00Z",
        "id_app": "app_mlg",
        "from": {
            "id": "p11",
            "id_ext": "mlg11",
            "name": "Amanda"
        },
        "to": {
            "id": "p12",
            "id_ext": "mlg12",
            "name": "Beatrice"
        },
        "post": {
            "msg": "Tu es prês de moi?"
        }
    },

    {
        "_id": "log3",
        "a": "attack",
        "ts": "2015-07-15T13-00-00Z",
        "id_app": "app_mlg",
        "from": {
            "id": "p11",
            "id_ext": "mlg11",
            "name": "Amanda"
        },
        "to": {
            "id": "p12",
            "id_ext": "mlg12",
            "name": "Beatrice"
        },
        
        "detail": {
            "winner": "from",
            "game": "bitchfight",
            "difficulty": "3",
            "a_health": "10",
            "d_health": "8",
            "a_score": "6",
            "d_score": "0",
            "item_transfer": {
                "id_ext_item": "--MLG id of item -",
                "name": "name of item to display"
            }
        },
        "post": {
            "msg": "voila pour ta poire"
        }
    }
]


module.exports.walls = [
    {
        _id: 'wall_p11_201507',
        id_player: "p11",
        id_user: "u1",
        id_ext:"mlg11",
        "id_app": "app_mlg",
        month: 201507,
        items: [

            {
                "id_log": "log0001",
                "a": "status",
                "ts": "2015-07-15T13-10-00Z",
                "post": {
                    "msg": "Je me sens bien"
                }
            },

            {
                "id_log": "log002",
                "a": "post",
                "ts": "2015-07-15T13-01-00Z",
                "from": {
                    "id": "p12",
                    "id_ext": "mlg12",
                    "name": "Beatrice"
                   
                },
                "to": {
                    "id": "p11",
                    "id_ext": "mlg11",
                    "name": "Amanda"
                },
                "post": {
                    "msg": "Oui, je suis prês de toi"
                }
            }

            ,
           
            {
                "idLog": "log3",
                "a": "attack",
                "ts": "2015-07-15T13-00-00Z",
                "from": {
                    "id": "p11",
                    "id_ext": "mlg11",
                    "name": "Amanda"
                },
                "to": {
                    "id": "p12",
                    "id_ext": "mlg12",
                    "name": "Beatrice"
                },
                "winner": "from",
                "detail": {
                    "game": "bitchfight",
                    "difficulty": "3",
                    "a_health": "10",
                    "d_health": "8",
                    "a_score": "6",
                    "d_score": "0",
                    "item_transfer": {
                        "id_ext_item": "--MLG id of item -",
                        "name": "name of item to display"
                    }
                },
                "post": {
                    "msg": "voila pour ta poire"
                }
            }
        ]
    },
    {
        _id: 'wall_p12_201507',
        id_player: "p12",
        id_user: "u2",
        id_ext:"mlg12",
        "id_app": "app_mlg",
        month: 201507,
        items: [
            {
                "id_log": "log002",
                "a": "post",
                "ts": "2015-07-15T13-00-00Z",
                "from": {
                    "id": "p11",
                    "id_ext": "mlg11",
                    "name": "Amanda"
                },
                "to": {
                    "id": "p12",
                    "id_ext": "mlg12",
                    "name": "Beatrice"
                },
                "post": {
                    "msg": "Tu es prês de moi?"
                }
            },

            {
                "idLog": "log3",
                "a": "attack",
                "ts": "2015-07-15T13-00-00Z",
                "from": {
                    "id": "p11",
                    "id_ext": "mlg11",
                    "name": "Amanda"
                },
                "to": {
                    "id": "p12",
                    "id_ext": "mlg12",
                    "name": "Beatrice"
                },
                "winner": "from",
                "detail": {
                    "game": "bitchfight",
                    "difficulty": "3",
                    "a_health": "10",
                    "d_health": "8",
                    "a_score": "6",
                    "d_score": "0",
                    "item_transfer": {
                        "id_ext_item": "--MLG id of item -",
                        "name": "name of item to display"
                    }
                },
                "post": {
                    "msg": "voila pour ta poire"
                }
            }
        ]
    }
]