(function (seedData) {

    seedData.apiUsers = [
        {
            "_id": "apilaurent",
            "login": "laurent",
            "hash": "$2a$10$nn9oiNpZ2bb0A2Y3d59m0O62BtaPSw6cXfSSWeMtTPiHyxW3IoZXS",
            "deleted": null
        },
        {
            "_id": "apiAdmin",
            "login": "admin",
            "hash": "$2a$10$MBBGwaui.lIqpprafZy4b.sXsP5.e72UW5vq.ma/IqoM85w7QxMrK",
            "deleted": null
        },
        {
            "_id": "apidemo",
            "login": "demo",
            "hash": "$2a$10$OT/OhwfxwKdnHe0ydEd4bepIG5V9ekdoKg3DzgY18XgVhqFG6pija",
            "deleted": null
        }
    ];

    seedData.apps = [
    {
        "_id": "app_demo",
        "api_user": "apidemo",
        "counters": {
            "exp": 0,
            "level": 1
        },
        "profile": {},
        "actions": [
            {
                "id": "createPlayer",
                "counters": [
                  [
                    "exp",
                    1
                  ]
                ]
            }
        ]
    },
    {
        "_id": "app_follow",
        "api_user": "apiAdmin",
        "counters": {
            "exp": 0,
            "level": 1
        },
        "profile": {}
    },
  {
      "_id": "app_mlg",
      "api_user": "apilaurent",
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
      "games": ["QUIZ", "IMAGEPUZZLE", "BOGGLE", "MEMORY", "g_mld"],
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


    seedData.games = [
        { _id: "g_quiz", "api_user": "apilaurent", type: "outside" },
        { _id: "g_ipuz", "api_user": "apilaurent", type: "outside" },
        { _id: "g_boggle", "api_user": "apilaurent", type: "outside" },
        { _id: "g_mem", "api_user": "apilaurent", type: 'outside' },
        { _id: "g_mld", "api_user": "apilaurent", name: 'My Little Duel', type: 'single' }
    ]
    seedData.gamedata = [
        { _id: 'g_mld_p11', id_app: 'app_mlg', id_player: 'p11', id_game: 'g_mld', data: { "defence": "LMH", "attack": "HHH" } },
        { _id: 'g_mld_p12', id_app: 'app_mlg', id_player: 'p12', id_game: 'g_mld', data: { "defence": "LLMH", "attack": "HHLMHHH" } }
    ];

    seedData.users = [
        {
            "_id": "u1",
            "api_user": "apilaurent",
            "apps": [
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
            "api_user": "apilaurent",
            "apps": [

                {
                    "id_app": "app_mlg",
                    "id_player": "p12"
                }
            ]
            , "interests": []
        },
        {
            "_id": "u3",
            "api_user": "apilaurent",
            "apps": [
                {
                    "id_app": "app_follow",
                    "id_player": "p3"
                }
            ], "interests": []
        },
        {
            "_id": "udemo1",
            "api_user": "apidemo",
            "apps": [
                {
                    "id_app": "app_demo",
                    "id_player": "pdemo1"
                }
            ], "interests": []
        }
    ];

    seedData.players = [
  {
      "_id": "p1",
      "api_user": "apiAdmin",
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
      "api_user": "apiAdmin",
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
      "api_user": "apiAdmin",
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
      "api_user": "apilaurent",
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

      "items": [],
      "badges": [],
      "quests": []
  },
  {
      "_id": "p12",
      "api_user": "apilaurent",
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

      "items": [],
      "badges": [],
      "quests": []
  },
  {
      "_id": "p13",
      "api_user": "apilaurent",
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

      "items": [],
      "badges": [],
      "quests": []
  },
  {
      "_id": "pdemo1",
      "api_user": "apidemo",
      "id_user": "udemo1",
      "dispname": "GameHero",
      "id_ext": "",
      "id_app": "app_demo",
      "counters": {
          "diamonds": 10,
          "exp": 2100,
          "level": 10,
          "energy": 20,
          "money": 100,
          "health": 10
      },
      "profile": {
          "energy": 20,
          "health": 10,
          "skillpoints": 0,
          "attack": 0,
          "defence": 0
      },

      "items": [],
      "badges": [],
      "quests": []
  }
    ];

    seedData.missions = [
        {
            "_id": "mmacarons",
            "id_app": "app_mlg",
            "api_user": "apilaurent",
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
            "api_user": "apilaurent",
            "name": "3 quests 1 after another",
            "slug": ",mfollowers,",
            "timing": null,
            "needed": null
        },
         {
             "_id": "mapidemo",
             "id_app": "app_demo",
             "api_user": "apidemo",
             "name": "Quests to learn about Gamehero",
             "slug": ",mapidemo,",
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
        },
        {
            "_id": "qdemostart",
            "id_app": "app_demo",
            "display": "Lear about apps and players",
            "id_mission": "mapidemo",
            "slug": ",mapidemo,qdemostart,",
            "mastering": null,
            "timing": null,
            "needed": null,
            "wins": {
                "counters": [
                    [
                        "exp",
                        10
                    ]
                ],
                "items": null
            }
        },
        {
            "_id": "qdemomissions",
            "id_app": "app_demo",
            "display": "Lear about missions and quests",
            "id_mission": "mapidemo",
            "slug": ",mapidemo,qdemomissions,",
            "mastering": 1,
            "timing": null,
            "needed": null,
            "wins": {
                "counters": [
                    [
                        "exp",
                        10
                    ]
                ],
                "items": null
            }
        }
    ];

})(module.exports);