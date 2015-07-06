(function (seedData) {
    seedData.users = [
        {
            "_id": "u1",
            "id_external": "an external id,ex authentication",
            "counters": {
                "diamonds": 10,
                "exp": 100,
                "level": 1,
                "energy": 0,
                "money": 0,
                "health": 0
            },
            "apps": ["app_mlb", "app_follow","app_tictac"],
            "items": [
                {
                    "app": "app_mlb",
                    "item_id": 1,
                    "amount": 1
                }
            ],
            "badges": [
                {
                    "app": "app_mlb",
                    "badge_id": 1,
                    "display": "Starter"
                },
                {
                    "app": "app_mlb",
                    "badge_id": 3,
                    "display": "Starter"
                }
            ],
            "quests": [
                {
                    "app": "app_follow",
                    "quest_id": "qfollow1",
                    "display": "follow1",
                    "mastering": null
                }
            ]
        }, {
            "_id": "u2",
            "id_external": "an external id,ex authentication",
            "counters": {
                "diamonds": 10,
                "exp": 2100,
                "level": 1,
                "energy": 0,
                "money": 0,
                "health": 0
            },
            "apps": ["app_mlb", "app_follow", "app_tictac"],
            "items": [
                {
                    "app": "app_mlb",
                    "item_id": 1,
                    "amount": 1
                }
            ],
            "badges": [
                {
                    "app": "app_mlb",
                    "badge_id": 1,
                    "display": "Starter"
                },
                {
                    "app": "app_mlb",
                    "badge_id": 3,
                    "display": "Starter"
                }
            ],
            "quests": [
                {
                    "app": "app_follow",
                    "quest_id": "qfollow1",
                    "display": "follow1",
                    "mastering": null
                }, {
                    "app": "app_follow",
                    "quest_id": "qfollow2",
                    "display": "follow2",
                    "mastering": null
                }
            ]
        }, {
            "_id": "u3",
            "id_external": "an external id,ex authentication",
            "counters": {
                "diamonds": 10,
                "exp": 3100,
                "level": 3,
                "energy": 0,
                "money": 0,
                "health": 0
            },
            "apps": ["app_mlb", "app_follow", "app_tictac"],
            "items": [
                {
                    "app": "app_mlb",
                    "item_id": 1,
                    "amount": 1
                }
            ],
            "badges": [
                {
                    "app": "app_mlb",
                    "badge_id": 1,
                    "display": "Starter"
                },
                {
                    "app": "app_mlb",
                    "badge_id": 3,
                    "display": "Starter"
                }
            ],
            "quests": [
                {
                    "app": "app_follow",
                    "quest_id": "qfollow1",
                    "display": "follow1",
                    "mastering": null
                }, {
                    "app": "app_follow",
                    "quest_id": "qfollow2",
                    "display": "follow2",
                    "mastering": null
                }
            ]
        }

];
    seedData.missions = [
        {
            "_id": "mmacarons",
            "app": "app_mlb",
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
            "app": "app_follow",
            "name": "3 quests 1 after another",
            "slug": ",mfollowers,",
            "timing": null,
            "needed": null
        }
    ];
    seedData.quests = [
        {
            "_id": "qmacarons1",
            "app": "app_mlb",
            "display": "Les macarons de Dalloyau",
            "data": {
                "adress": "Dalloyau. 101, rue du Faubourg Saint-Honoré, VIIIe.",
                "loc": "48.872339,2.3117785"
            },
            "mission_id": "mmacarons",
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
            "app": "app_mlb",
            "display": "Les macarons de Pierre Hermé",
            "data": {
                "adress": "Jean-Paul Hévin. 231, rue Saint-Honoré, Ier",
                "loc": "48.8662327,2.3290466"
            },
            "mission_id": "mmacarons",
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
            "app": "app_follow",
            "display": "quest1",
            "mission_id": "mfollowers",
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
            "app": "app_follow",
            "display": "quest2",
            "mission_id": "mfollowers",
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
            "app": "app_follow",
            "display": "quest3",
            "mission_id": "mfollowers",
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
            "app": "app_follow",
            "display": "quest4",
            "mission_id": "mfollowers",
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