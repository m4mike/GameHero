(function (seedData) {

    seedData.apiUsers = [
        {login:'laurent',psw:'',hash:''}
    ];

    seedData.apps = [
  {
      "_id": "app_follow",
      "counters": {
          "exp": 0,
          "level": 1
      },
      "profile": {}
  },
  {
      "_id": "app_mlg",
      "counters": {
          "exp": 0,
          "level": 1
      },
      "profile": {
          "energy": 20,
          "health": 100,
          "skillpoints": 5,
          "attack": 0,
          "defence": 0
      },
      "games": ["QUIZ", "IMAGEPUZZLE", "BOGGLE", "MEMORY", "MYLITTLEDUEL"],
      "actions": [
          {
              "id": "status",
              "counters": [
                [
                  "exp",
                  1
                ]
              ]
          },
  {
      "id": "post",
      "counters": [
        [
          "exp",
          2
        ]
      ]
  },
  {
      "id": "attack",
      "counters": [
        [
          "exp",
          3
        ]
      ]
  },
  {
      "id": "attack-win",
      "counters": [
        [
          "exp",
          5
        ]
      ]
  }
      ]
  }
    ];

    seedData.games = [{ _id: "QUIZ" }, { _id: "IMAGEPUZZLE" }, { _id: "BOGGLE" }, { _id: "MEMORY" }, { _id: "MYLITTLEDUEL" }]

    seedData.users = [
        {
            "_id": "u1",
            "apps": [
                {
                    "id_app": "app_follow",
                    "id_player": "p1"
                },
                {
                    "id_app": "app_mlg",
                    "id_player": "p10"
                }
            ],
            "interests": [
                    {
                        "l": "fr",
                        "c": "Autres",
                        "i": "Ferrari"
                    }
            ]

        },
        {
            "_id": "u2",
            "apps": [
                {
                    "id_app": "app_follow",
                    "id_player": "p2"
                },
                {
                    "id_app": "app_mlg",
                    "id_player": "p12"
                }
            ]
            , "interests": []
        },
        {
            "_id": "u3",
            "apps": [
                {
                    "id_app": "app_follow",
                    "id_player": "p3"
                }
            ], "interests": []
        }
    ];

    seedData.players = [
  {
      "_id": "p1",
      "id_user": "u1",
      "id_ext": "mlg1",
      "dispname": "Amanda",
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
      "id_ext": "mlg2",
      "dispname": "Beatrice",
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
      "id_user": "u3",
      "id_ext": "mlg3",
      "dispname": "Monica",
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
      "_id": "p11",
      "id_user": "u1",
      "id_ext": "mlg11",
      "dispname": "Amanda",
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
      "id_app": "app_mlg",
      "games": [
      {
          "_id": "game-bf",
          "attacks": "LLL",
          "defences": "UUU"
      }
      ],
      "items": [],
      "badges": [],
      "quests": []
  },
  {
      "_id": "p12",
      "id_user": "u2",
      "dispname": "Beatrice",
      "id_ext": "mlg12",
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
      "id_app": "app_mlg",
      "games": [
        {
            "_id": "game-bf",
            "attacks": "MML",
            "defences": "MMM"
        }
      ],
      "items": [],
      "badges": [],
      "quests": []
  },
  {
      "_id": "p13",
      "id_user": "u3",
      "dispname": "Clara",
      "id_ext": "mlg13",
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
      "id_app": "app_mlg",
      "games": [
        {
            "_id": "game-bf",
            "attacks": "UML",
            "defences": "UUU"
        }
      ],
      "items": [],
      "badges": [],
      "quests": []
  }
    ];

    seedData.missions = [
        {
            "_id": "mmacarons",
            "id_app": "app_mlg",
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
            "id_app": "app_mlg",
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
            "id_app": "app_mlg",
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