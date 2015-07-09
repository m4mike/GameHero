(function (seedData) {

    seedData.apps = [
        {
            "_id": "app_follow",
            "profile": {}
        },
        {
            "_id": "app_mlb",
            "profile": {
                "energy": 20,
                "health": 100,
                "skillpoints": 5,
                "attack": 0,
                "defence": 0
            }
        }
    ];

    seedData.users = [
        { _id: "u1" }, { _id: "u2" }
    ];

    seedData.players = [
        {
            "_id": "p1",
            "id_user": "u1",
            "id_external": "an external id,ex authentication",
            "counters": {
                "exp": 100,
                "level": 1
            },
            "profile": {},
            "id_app": "app_follow",
            "items": [
                {
                    "id_item": 1,
                    "amount": 1
                }
            ],
            "badges": [
                {
                    "id_badge": 1,
                    "display": "Starter"
                },
                {
                    "id_badge": 3,
                    "display": "Starter"
                }
            ],
            "quests": [
                {
                    "id_quest": "qfollow1",
                    "display": "follow1",
                    "mastering": null
                }
            ]
        },
        {
            "_id": "p2",
            "id_user": "u2",
            "id_external": "an external id,ex authentication",
            "counters": {
                "exp": 2100,
                "level": 1
            },
            "profile": {},
            "apps": "app_follow",
            "items": [
                {
                    "id_item": 1,
                    "amount": 1
                }
            ],
            "badges": [
                {
                    "id_badge": 1,
                    "display": "Starter"
                },
                {
                    "id_badge": 3,
                    "display": "Starter"
                }
            ],
            "quests": [
                {
                    "display": "follow1",
                    "mastering": null
                },
                {
                    "id_quest": "qfollow2",
                    "display": "follow2",
                    "mastering": null
                }
            ]
        },
        {
            "_id": "p3",
            "id_user": "u1",
            "id_external": "an external id,ex authentication",
            "counters": {
                "exp": 3100,
                "level": 3
            },
            "profile": {},
            "apps": "app_follow",
            "items": [
                {
                    "id_item": 1,
                    "amount": 1
                }
            ],
            "badges": [
                {
                    "id_badge": 1,
                    "display": "Starter"
                },
                {
                    "id_badge": 3,
                    "display": "Starter"
                }
            ],
            "quests": [
                {
                    "id_quest": "qfollow1",
                    "display": "follow1",
                    "mastering": null
                },
                {
                    "id_quest": "qfollow2",
                    "display": "follow2",
                    "mastering": null
                }
            ]
        },
        {
            "_id": "p10",
            "id_user": "u1",
            "id_external": "an external id,ex authentication",
            "counters": {
                "diamonds": 10,
                "exp": 100,
                "level": 1,
                "energy": 0,
                "money": 0,
                "health": 0
            },
            "profile": {
                "energy": 20,
                "health": 100,
                "skillpoints": 1,
                "attack": 0,
                "defence": 0
            },
            "id_app": "app_mlb",
            "items": [],
            "badges": [],
            "quests": []
        },
        {
            "_id": "p12",
            "id_user": "u2",
            "id_external": "an external id,ex authentication",
            "counters": {
                "diamonds": 10,
                "exp": 2100,
                "level": 1,
                "energy": 0,
                "money": 0,
                "health": 0
            },
            "profile": {
                "energy": 20,
                "health": 110,
                "skillpoints": 0,
                "attack": 0,
                "defence": 0
            },
            "apps": "app_mlb",
            "items": [],
            "badges": [],
            "quests": []
        }
    ];
    seedData.missions = [
        {
            "_id": "mmacarons",
            "id_app": "app_mlb",
            "name": "Visitéz 5 lieux de macarons de Paris",
            "slug": ",mmacarons,",
            "timing": "10d",
            "needed": {
                "counters": [
                    {
                        "level": "1"
                    }
                ]
            }
        },
        {
            "_id": "mfollowers",
            "id_app": "app_follow",
            "name": "3 quests 1 after another",
            "slug": ",mfollowers,",
            "timing": null,
            "needed": null
        }
    ];
    seedData.quests = [
        {
            "_id": "qmacarons1",
            "id_app": "app_mlb",
            "display": "Les macarons de Dalloyau",
            "data": {
                "adress": "Dalloyau. 101, rue du Faubourg Saint-Honoré, VIIIe.",
                "loc": "48.872339,2.3117785"
            },
            "id_mission": "mmacarons",
            "slug": ",mmacarons,qmacarons1,",
            "mastering": null,
            "timing": "2d",
            "needed": null,
            "wins": {
                "counters": [
                    [
                        "exp",
                        100
                    ]
                ],
                "items": [
                    {
                        "item_id": "cdalloyau",
                        "disp": "Coupon 10% Dalloyau",
                        "prob": "0.5"
                    }
                ]
            }
        },
        {
            "_id": "qmacarons2",
            "id_app": "app_mlb",
            "display": "Les macarons de Pierre Hermé",
            "data": {
                "adress": "Jean-Paul Hévin. 231, rue Saint-Honoré, Ier",
                "loc": "48.8662327,2.3290466"
            },
            "id_mission": "mmacarons",
            "slug": ",mmacarons,qmacarons2,",
            "mastering": null,
            "timing": "2d",
            "needed": null,
            "wins": {
                "counters": [
                    [
                        "exp",
                        100
                    ]
                ],
                "items": [
                    {
                        "item_id": "cjph",
                        "disp": "Coupon 10% Jean-Paul Hévin",
                        "prob": "0.5"
                    }
                ]
            }
        },
        {
            "_id": "qfollow1",
            "id_app": "app_follow",
            "display": "quest1",
            "id_mission": "mfollowers",
            "slug": ",mfollowers,qfollow1,",
            "mastering": null,
            "timing": null,
            "needed": null,
            "wins": {
                "counters": [
                    [
                        "exp",
                        100
                    ]
                ],
                "items": null
            }
        },
        {
            "_id": "qfollow2",
            "id_app": "app_follow",
            "display": "quest2",
            "id_mission": "mfollowers",
            "slug": ",mfollowers,qfollow2,",
            "mastering": null,
            "timing": null,
            "needed": {
                "quests": [
                    "qfollow1"
                ]
            },
            "wins": {
                "counters": [
                    [
                        "exp",
                        100
                    ]
                ],
                "items": null
            }
        },
        {
            "_id": "qfollow3",
            "id_app": "app_follow",
            "display": "quest3",
            "id_mission": "mfollowers",
            "slug": ",mfollowers,qfollow3,",
            "mastering": null,
            "timing": null,
            "needed": {
                "quests": [
                    "qfollow2"
                ]
            },
            "wins": {
                "counters": [
                    [
                        "exp",
                        100
                    ]
                ],
                "items": null
            }
        },
        {
            "_id": "qfollow4",
            "id_app": "app_follow",
            "display": "quest4",
            "id_mission": "mfollowers",
            "slug": ",mfollowers,qfollow4,",
            "mastering": null,
            "timing": null,
            "needed": {
                "quests": [
                    "qfollow2"
                ],
                "counters": [
                    [
                        "level",
                        2
                    ]
                ]
            },
            "wins": {
                "counters": [
                    [
                        "exp",
                        100
                    ]
                ],
                "items": null
            }
        }
    ];

})(module.exports);