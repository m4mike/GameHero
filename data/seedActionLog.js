module.exports.logs =
[
    {
        "_id": "log0001",
        "a": "status",
        "ts": "2015-07-15T13-00-00Z",
        "app": "app_mlg",
        "from": {
            "id_player": "p1",
            "id_user": "u1",
            "ext_id": "mlg1",
            "name": "Angelica"
        },
        "post": {
            "msg": "Je me sens bien"
        }
    },
    {
        "_id": "log002",
        "a": "post",
        "ts": "2015-07-15T13-00-00Z",
        "app": "app_mlg",
        "from": {
            "id": "p1",
            "ext_id": "mlg1",
            "name": "Angelica"
        },
        "to": {
            "id": "p2",
            "ext_id": "mlg2",
            "name": "Jessica"
        },
        "post": {
            "msg": "Tu es prês de moi?"
        }
    },

    {
        "_id": "log3",
        "a": "attack",
        "ts": "2015-07-15T13-00-00Z",
        "app": "app_mlg",
        "from": {
            "id": "p1",
            "ext_id": "mlg1",
            "name": "Angelica"
        },
        "to": {
            "id": "p2",
            "ext_id": "mlg2",
            "name": "Jessica"
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
                "ext_id_item": "--MLG id of item -",
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
        _id: null,
        id_player: "p1",
        id_user: "u1",
        "id_app": "app_mlg",
        month: 201507,
        items: [

            {
                "id_log": "log0001",
                "a": "status",
                "ts": "2015-07-15T13-00-00Z",
                "post": {
                    "msg": "Je me sens bien"
                }
            },


            {
                "id_log": "log002",
                "a": "post",
                "ts": "2015-07-15T13-00-00Z",
                "from": {
                    "id": "p1",
                    "ext_id": "mlg1",
                    "name": "Angelica"
                },
                "to": {
                    "id": "p2",
                    "ext_id": "mlg2",
                    "name": "Jessica"
                },
                "post": {
                    "msg": "Tu es prês de moi?"
                }
            }

            ,
            {
                "idLog": "log3",
                "a": "attack",
                "ts": "2015-07-15T13-00-00Z",
                "from": {
                    "id": "p1",
                    "ext_id": "mlg1",
                    "name": "Angelica"
                },
                "to": {
                    "id": "p2",
                    "ext_id": "mlg2",
                    "name": "Jessica"
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
                        "ext_id_item": "--MLG id of item -",
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
        _id: null,
        id_player: "p2",
        id_user: "u2",
        "id_app": "app_mlg2",
        month: 201507,
        items: [
            {
                "id_log": "log002",
                "a": "post",
                "ts": "2015-07-15T13-00-00Z",
                "from": {
                    "id": "p1",
                    "ext_id": "mlg1",
                    "name": "Angelica"
                },
                "to": {
                    "id": "p2",
                    "ext_id": "mlg2",
                    "name": "Jessica"
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
                    "id": "p1",
                    "ext_id": "mlg1",
                    "name": "Angelica"
                },
                "to": {
                    "id": "p2",
                    "ext_id": "mlg2",
                    "name": "Jessica"
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
                        "ext_id_item": "--MLG id of item -",
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