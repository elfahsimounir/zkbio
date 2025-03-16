import { InvoiceTemplate } from '@/types/Invoice';
import { nanoid } from 'nanoid';

// Helper function to create unique IDs for all elements
const createId = () => nanoid();

export const defaultTemplates: InvoiceTemplate[] | any = [
  {
    "id": "miT-BEjC5PienhspWRYBD",
    "name": "Beige",
    style:{
      width: 210, 
      height: 297,
      backgroundColor: '#fffff', 
    },
    "layout": {
      "header": 93.98251488095241,
      "body": 183.0174851190476,
      "footer": 20
    },
    "elements": [
      {
        "id": "qu3U4JoYkqHG7bIAY67WN",
        "type": "table",
        "position": {
          "x": 49.9296875,
          "y": 369.44140625
        },
        "content": {
          "rows": [
            {
              "id": "Ibe6rl5RyDoWZyQVt6uTb",
              "cells": [
                {
                  "id": "rg5nySITOfBJR7DyIBMvP",
                  "content": "Designation",
                  "key": "designation",
                  "style": {
                    "textAlign": "center",
                    "backgroundColor": "#e5e7eb",
                    "borderColor": "#e5e7eb"
                  }
                },
                {
                  "id": "ns03JnfmYB2T-hhO5B2AC",
                  "content": "Unite",
                  "key": "unite",
                  "style": {
                    "textAlign": "center",
                    "backgroundColor": "#e5e7eb",
                    "borderColor": "#e5e7eb"
                  }
                },
                {
                  "id": "e1f1-2E4uBHBueqBP3UlV",
                  "content": "HT",
                  "style": {
                    "backgroundColor": "#e5e7eb",
                    "borderColor": "#e5e7eb"
                  },
                  "key": "prixBrut"
                },
                {
                  "id": "FQwJeWTn2KwPEVxEVMNuS",
                  "content": "Remise",
                  "style": {
                    "backgroundColor": "#e5e7eb",
                    "borderColor": "#e5e7eb"
                  },
                  "key": "rem"
                },
                {
                  "id": "dLYxH-HvzbA47Qa6-Dccc",
                  "content": "Total",
                  "style": {
                    "backgroundColor": "#e5e7eb",
                    "borderColor": "#e5e7eb"
                  },
                  "key": "total"
                }
              ]
            },
            {
              "id": "dQ4JGSn7_txBm1G8fmssK",
              "cells": [
                {
                  "id": "BFFA7YUK6OtANBWNexMjZ",
                  "content": "test",
                  "key": "",
                  "style": {
                    "textAlign": "center",
                    "borderColor": "#e5e7eb"
                  }
                },
                {
                  "id": "Ea1bkc-nj6APtBJ4RTHK1",
                  "content": "test",
                  "key": "",
                  "style": {
                    "textAlign": "center",
                    "borderColor": "#e5e7eb"
                  }
                },
                {
                  "id": "3XaOJaWrmytcag_LFS9Ld",
                  "content": "test",
                  "style": {
                    "borderColor": "#e5e7eb"
                  }
                },
                {
                  "id": "xDgKFjPUZMxcrcxIVwSZw",
                  "content": "test",
                  "style": {
                    "borderColor": "#e5e7eb"
                  }
                },
                {
                  "id": "zkT49k2BwUxRlKpERJoVW",
                  "content": "test",
                  "style": {
                    "borderColor": "#e5e7eb"
                  }
                }
              ]
            }
          ],
          "columns": 5
        },
        "style": {
          "width": 700,
          "borderColor": "#e5e7eb",
          "color": "#6e6e6e",
          "textAlign": "center",
          "fontSize": 14
        },
        "status": "dynamic",
        "key": "mainTable",
        "zIndex": 0,
        "scale": {
          "x": 1,
          "y": 1
        }
      },
      {
        "id": "eMuZS4xzH1xvXxvRW6VAS",
        "type": "text",
        "position": {
          "x": 57.49609375,
          "y": 168.15625
        },
        "content": "Facture",
        "style": {
          "width": "auto",
          "fontSize": 36,
          "color": "#5c5c5c"
        },
        "status": "static",
        "key": null,
        "zIndex": 2,
        "scale": {
          "x": 1,
          "y": 1
        }
      },
      {
        "id": "LXxsRGp2f-2tTYtuAAUEM",
        "type": "text",
        "position": {
          "x": 49.584208170572914,
          "y": 248.45355902777777
        },
        "content": "Hay chbar nr 2, Martil\nICE : 27637820394653245\nEmail : contact@empoverse.ma",
        "style": {
          "width": 240,
          "height": 100,
          "backgroundColor": "#e5e7eb",
          "color": "#6e6e6e",
          "padding": 13,
          "letterSpacing": 0.5,
          opacity: 1,
          "borderRadius": 5,
          "fontSize": 14
        },
        "status": "static",
        "key": null,
        "zIndex": 3,
        "scale": {
          "x": 1,
          "y": 1
        }
      },
      {
        "id": "AkcLvs8x7e5RX4NFDXYzR",
        "type": "text",
        "position": {
          "x": 508.8168674045139,
          "y": 247.24392361111111
        },
        "content": "",
        "style": {
          "width": 240,
          "height": 100,
          "backgroundColor": "#e5e7eb",
          "color": "#6e6e6e",
          "padding": 13,
          "fontSize": 14
        },
        "status": "static",
        "key": null,
        "zIndex": 4,
        "scale": {
          "x": 1,
          "y": 1
        }
      },
      {
        "id": "qlEXTvMnvztSVjz5VP343",
        "type": "text",
        "position": {
          "x": 526,
          "y": 260.6875
        },
        "content": "Text Element",
        "style": {
          "width": "auto",
          "color": "#727272",
          "fontSize": 14
        },
        "status": "dynamic",
        "key": "clientAddress",
        "zIndex": 5,
        "scale": {
          "x": 1,
          "y": 1
        }
      },
      {
        "id": "iaj1LUj6ZQGTn-NMhcwCa",
        "type": "text",
        "position": {
          "x": 557,
          "y": 283
        },
        "content": "Text Element",
        "style": {
          "width": "auto",
          "color": "#727272",
          "fontSize": 14
        },
        "status": "dynamic",
        "key": "clientVat",
        "zIndex": 6,
        "scale": {
          "x": 1,
          "y": 1
        }
      },
      {
        "id": "NvlPrnWheVg_y5V_uwbCU",
        "type": "text",
        "position": {
          "x": 574,
          "y": 307
        },
        "content": "Text Element",
        "style": {
          "width": "auto",
          "color": "#727272",
          "fontSize": 14
        },
        "status": "dynamic",
        "key": "clientEmail",
        "zIndex": 7,
        "scale": {
          "x": 1,
          "y": 1
        }
      },
      {
        "id": "D8YmP_9eBRviy4GiLu8Qs",
        "type": "text",
        "position": {
          "x": 33.95220947265625,
          "y": 1080.6158854166667
        },
        "content": "An invoice footer message is when invoice notes are written in the invoice’s footer (which is at the very bottom section of the invoice.) ",
        "style": {
          "width": 719,
          "height": 30,
          "fontSize": 12,
          "color": "#727272",
          "textAlign": "center"
        },
        "status": "static",
        "key": null,
        "zIndex": 8,
        "scale": {
          "x": 1,
          "y": 1
        }
      },
      {
        "id": "xw6og7luTGs5OzCQPUATi",
        "type": "image",
        "position": {
          "x": 55.07378472222222,
          "y": 67.07111952039932
        },
        "content": "data:image/png;base64,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",
        "style": {
          "width": 150,
          "height": "auto"
        },
        "status": "static",
        "key": null,
        "zIndex": 9,
        "scale": {
          "x": 1,
          "y": 1
        }
      },
      {
        "id": "3hNLOdo-edfghjk",
        "type": "table",
        "position": {
          "x": 380.5390625,
          "y": 536.1328125
        },
        "content": {
          "rows": [
            {
              "id": "Ibe6rl5RyDoWZyQVt6uTb",
              "cells": [
                {
                  "id": "rg5nySITOfBJR7DyIBMvP",
                  "content": "Montant HT",
                  "key": "ht",
                  "style": {
                    "textAlign": "center",
                    "backgroundColor": "#e5e7eb",
                    "borderColor": "#e5e7eb"
                  }
                },
                {
                  "id": "ns03JnfmYB2T-hhO5B2AC",
                  "content": "Remise",
                  "key": "totalRem",
                  "style": {
                    "textAlign": "center",
                    "backgroundColor": "#e5e7eb",
                    "borderColor": "#e5e7eb"
                  }
                },
                {
                  "id": "e1f1-2E4uBHBueqBP3UlV",
                  "content": "Total TTC",
                  "style": {
                    "backgroundColor": "#e5e7eb",
                    "borderColor": "#e5e7eb"
                  },
                  "key": "total"
                }
              ]
            },
            {
              "id": "dQ4JGSn7_txBm1G8fmssK",
              "cells": [
                {
                  "id": "BFFA7YUK6OtANBWNexMjZ",
                  "content": "test",
                  "key": "",
                  "style": {
                    "textAlign": "center",
                    "borderColor": "#e5e7eb"
                  }
                },
                {
                  "id": "Ea1bkc-nj6APtBJ4RTHK1",
                  "content": "test",
                  "key": "",
                  "style": {
                    "textAlign": "center",
                    "borderColor": "#e5e7eb"
                  }
                },
                {
                  "id": "3XaOJaWrmytcag_LFS9Ld",
                  "content": "test",
                  "style": {
                    "borderColor": "#e5e7eb"
                  }
                }
              ]
            }
          ],
          "columns": 3
        },
        "style": {
          "width": 360,
          "borderColor": "#e5e7eb",
          "color": "#6e6e6e",
          "textAlign": "center",
          "fontSize": 12
        },
        "status": "dynamic",
        "key": "tableResume",
        "zIndex": 9,
        "scale": {
          "x": 1,
          "y": 1
        }
      },
      {
        "id": "crV5ggKaoSVDrUKHU5fTe",
        "type": "text",
        "position": {
          "x": 646.3046875,
          "y": 72.46875
        },
        "content": "15/03/2025",
        "style": {
          "width": 100,
          "fontSize": 15,
          "height": 30,
          "textAlign": "center",
          "borderWidth": 1,
          "borderColor": "#e5e7eb",
          "color": "#6e6e6e"
        },
        "status": "static",
        "key": null,
        "zIndex": 10,
        "scale": {
          "x": 1,
          "y": 1
        }
      },
      {
        "id": "G3cU-Dx5lAfiKXumqoTz-",
        "type": "text",
        "position": {
          "x": 526,
          "y": 283
        },
        "content": "ICE :",
        "style": {
          "width": "auto",
          "color": "#727272",
          "fontSize": 14
        },
        "status": "static",
        "key": "clientVat",
        "zIndex": 11,
        "scale": {
          "x": 1,
          "y": 1
        }
      },
      {
        "id": "y4BubdIjoeyXjklIwlfF4",
        "type": "text",
        "position": {
          "x": 526,
          "y": 307
        },
        "content": "Email :",
        "style": {
          "width": "auto",
          "color": "#727272",
          "fontSize": 14
        },
        "status": "static",
        "key": "clientVat",
        "zIndex": 12,
        "scale": {
          "x": 1,
          "y": 1
        }
      }
    ]
  },
  {
    "id": "Ajo6_omyluG2hjkfghj",
    "name": "Sky Blue",
    "layout": {
      "header": 106.48892195767196,
      "body": 170.51107804232805,
      "footer": 20
    },
    style:{
      width: 210, 
      height: 297,
      backgroundColor: '#fffff', 
    },
    "elements": [
      {
        "id": "pX8RgdbsGF8vL4aTgb1r4",
        "type": "text",
        "status": "static",
        "key": null,
        "position": {
          "x": 50.2647705078125,
          "y": 165.412353515625
        },
        "content": "INVOICE",
        "style": {
          "fontFamily": "Helvetica, sans-serif",
          "fontSize": 32,
          "fontWeight": "bold",
          "color": "#063f77"
        },
        "zIndex": 0,
        "scale": {
          "x": 1,
          "y": 1
        }
      },
      {
        "id": "oDoqhj8tLfwO-KxLMQWmj",
        "type": "text",
        "status": "static",
        "key": null,
        "position": {
          "x": 632.790771484375,
          "y": 49.10590744018555
        },
        "content": "#INV-2025-001",
        "style": {
          "fontFamily": "Helvetica, sans-serif",
          "fontSize": 14,
          "color": "#64748b"
        },
        "zIndex": 1,
        "scale": {
          "x": 1,
          "y": 1
        }
      },
      {
        "id": "XNtmg1ug1syvl3QRUZfam",
        "type": "text",
        "status": "static",
        "key": null,
        "position": {
          "x": 49.80902099609375,
          "y": 229.74826049804688
        },
        "content": "FROM",
        "style": {
          "fontFamily": "Helvetica, sans-serif",
          "fontSize": 12,
          "fontWeight": "bold",
          "color": "#09adff"
        },
        "zIndex": 2,
        "scale": {
          "x": 1,
          "y": 1
        }
      },
      {
        "id": "Qc6mTyHxJf7bx0uTPMqsB",
        "type": "text",
        "status": "static",
        "key": null,
        "position": {
          "x": 47.80816650390625,
          "y": 250.85067749023438
        },
        "content": "Your Company Name\n123 Business Street\nCity, State 12345\ncontact@yourcompany.com",
        "style": {
          "fontFamily": "Verdana, sans-serif",
          "fontSize": 12,
          "color": "#1e293b",
          "padding": 4,
          "backgroundColor": "#ebf7ff",
          "width": 175,
          "height": 80
        },
        "zIndex": 3,
        "scale": {
          "x": 1,
          "y": 1
        }
      },
      {
        "id": "lDJwnWlAj01xNtidIUwco",
        "type": "text",
        "status": "static",
        "key": null,
        "position": {
          "x": 581.326416015625,
          "y": 225.5811767578125
        },
        "content": "BILL TO",
        "style": {
          "fontFamily": "Helvetica, sans-serif",
          "fontSize": 12,
          "fontWeight": "bold",
          "color": "#023c76"
        },
        "zIndex": 4,
        "scale": {
          "x": 1,
          "y": 1
        }
      },
      {
        "id": "r9ga2hKgNV9i6OZZcagjV",
        "type": "text",
        "status": "static",
        "key": null,
        "position": {
          "x": 578.439208984375,
          "y": 249.41317749023438
        },
        "content": "",
        "style": {
          "fontFamily": "Helvetica, sans-serif",
          "fontSize": 12,
          "color": "#1e293b",
          "padding": 4,
          "backgroundColor": "#ebf7ff",
          "width": 175,
          "height": 80
        },
        "zIndex": 5,
        "scale": {
          "x": 1,
          "y": 1
        }
      },
      {
        "id": "4e8PQDwjYBdepT_U0uO_l",
        "type": "text",
        "status": "static",
        "key": null,
        "position": {
          "x": 57.73870849609375,
          "y": 367.09637451171875
        },
        "content": "INVOICE DETAILS",
        "style": {
          "fontFamily": "Helvetica, sans-serif",
          "fontSize": 14,
          "fontWeight": "bold",
          "color": "#09adff",
          "borderBottomWidth": 2,
          "borderBottomColor": "#2563eb",
          "borderBottomStyle": "solid",
          "padding": 5,
          "width": 680,
          "borderColor": "#09adff"
        },
        "zIndex": 6,
        "scale": {
          "x": 1,
          "y": 1
        }
      },
      {
        "id": "oYaEePavzi5CR13QdTHkr",
        "type": "table",
        "status": "dynamic",
        "key": "mainTable",
        "position": {
          "x": 27.7052001953125,
          "y": 425.8194580078125
        },
        "content": {
          "columns": 7,
          "rows": [
            {
              "id": "PtVGvHTBtJNZ7-pmmHibm",
              "cells": [
                {
                  "id": "nWc_lnYdHsYxK1UTsNUXg",
                  "content": "Ref",
                  "key": "ref",
                  "style": {
                    "fontWeight": "bold",
                    "backgroundColor": "#38b4fe",
                    "textAlign": "left",
                    "width": "111px"
                  }
                },
                {
                  "id": "nkhNsj7kY3Hzi-lfr-vKE",
                  "content": "Designation",
                  "key": "designation",
                  "style": {
                    "fontWeight": "bold",
                    "backgroundColor": "#38b4fe",
                    "textAlign": "left",
                    "width": "229px"
                  }
                },
                {
                  "id": "_9OzGroPuuxEgVtoGoG-m",
                  "content": "Qte",
                  "key": "qte",
                  "style": {
                    "fontWeight": "bold",
                    "backgroundColor": "#38b4fe",
                    "textAlign": "center"
                  }
                },
                {
                  "id": "IYm19XJoJrAZ5suBzdmQa",
                  "content": "Unite",
                  "key": "unite",
                  "style": {
                    "fontWeight": "bold",
                    "backgroundColor": "#38b4fe",
                    "textAlign": "center"
                  }
                },
                {
                  "id": "41zm0mcD4h-THwZQQedMr",
                  "content": "Prix brut",
                  "key": "prixBrut",
                  "style": {
                    "fontWeight": "bold",
                    "backgroundColor": "#38b4fe",
                    "textAlign": "center"
                  }
                },
                {
                  "id": "32HJdXBK1txpH1EIQEErE",
                  "content": "Rem %",
                  "key": "rem",
                  "style": {
                    "backgroundColor": "#38b4fe",
                    "textAlign": "center"
                  }
                },
                {
                  "id": "X4Ui-90m-mfdyVS1bFqlJ",
                  "content": "Total",
                  "key": "total",
                  "style": {
                    "backgroundColor": "#38b4fe",
                    "textAlign": "center"
                  }
                }
              ],
              "style": {
                "height": "30px"
              }
            },
            {
              "id": "-41iWx0-wpYH64B_a2Q6L",
              "cells": [
                {
                  "id": "Xk2sS8i50s99jTIAd75Uh",
                  "content": "Web Design",
                  "key": null,
                  "style": {
                    "textAlign": "left",
                    "width": "111px",
                    "backgroundColor": "#e5f5ff"
                  }
                },
                {
                  "id": "gODVDuINfw9j-xsheElM-",
                  "content": "Homepage redesign",
                  "key": null,
                  "style": {
                    "textAlign": "left",
                    "width": "229px",
                    "backgroundColor": "#e5f5ff"
                  }
                },
                {
                  "id": "iwQnF5TYS5iXC8zKp5Krx",
                  "key": null,
                  "content": "10",
                  "style": {
                    "textAlign": "center",
                    "backgroundColor": "#e5f5ff"
                  }
                },
                {
                  "id": "nuBsmP1UVcgajkrDW4dEL",
                  "key": null,
                  "content": "85.00",
                  "style": {
                    "textAlign": "center",
                    "backgroundColor": "#e5f5ff"
                  }
                },
                {
                  "id": "FbTYzDQLoMTFDBMA9lxsy",
                  "key": null,
                  "content": "85.00",
                  "style": {
                    "textAlign": "center",
                    "backgroundColor": "#e5f5ff"
                  }
                },
                {
                  "id": "sss75lVJQf06mpPVVOhST",
                  "key": null,
                  "content": "2.5",
                  "style": {
                    "textAlign": "center",
                    "backgroundColor": "#e5f5ff"
                  }
                },
                {
                  "id": "7HPUPKrcBASCbHXLqXJvZ",
                  "key": null,
                  "content": "116",
                  "style": {
                    "textAlign": "center",
                    "backgroundColor": "#e5f5ff"
                  }
                }
              ]
            }
          ]
        },
        "style": {
          "width": 714,
          "fontFamily": "Verdana, sans-serif",
          "fontSize": 13,
          "borderWidth": 0,
          "borderColor": "#e5e5e5",
          "textAlign": "left",
          "color": "#023c78",
          "fontStyle": "normal"
        },
        "zIndex": 7,
        "scale": {
          "x": 1,
          "y": 1
        }
      },
      {
        "id": "pky89W-e0JIlJbHxbPOUb",
        "status": "static",
        "key": null,
        "type": "text",
        "position": {
          "x": 60.753885904947914,
          "y": 1062.8724009195964
        },
        "content": "PAYMENT INFORMATION",
        "style": {
          "fontFamily": "Helvetica, sans-serif",
          "fontSize": 11,
          "fontWeight": "bold",
          "color": "#2563eb"
        },
        "zIndex": 9,
        "scale": {
          "x": 1,
          "y": 1
        }
      },
      {
        "id": "WaBlTaM9RYVkaxAr347Rn",
        "status": "static",
        "key": null,
        "type": "text",
        "position": {
          "x": 40.010009765625,
          "y": 1081.8880310058594
        },
        "content": "Bank: National Bank  Account Name: Your Company Name. Account Number: XXXX-XXXX-XXXX-1234 Routing: 123456789",
        "style": {
          "fontFamily": "Helvetica, sans-serif",
          "fontSize": 12,
          "color": "#b3b3b3",
          "width": 700,
          "textAlign": "center"
        },
        "zIndex": 10,
        "scale": {
          "x": 1,
          "y": 1
        }
      },
      {
        "id": "LHQ5iZFr90OYHIUFfeTm7",
        "type": "text",
        "status": "static",
        "key": null,
        "position": {
          "x": 647.510009765625,
          "y": 84.22267150878906
        },
        "content": "01/03/2025",
        "style": {
          "color": "#64758b",
          "fontSize": 14
        },
        "zIndex": 13,
        "scale": {
          "x": 1,
          "y": 1
        }
      },
      {
        "id": "UtkrYM3mOlWIlIMwcFG4W",
        "type": "table",
        "position": {
          "x": 290,
          "y": 588.125
        },
        "content": {
          "rows": [
            {
              "id": "n_bXzg_jWfLpFlII0z_xb",
              "cells": [
                {
                  "id": "d1RegVM45_s0Cz7YOE4Xm",
                  "content": "Montant HT",
                  "key": "ht",
                  "style": {
                    "textAlign": "left",
                    "backgroundColor": "#38b4fe"
                  }
                },
                {
                  "id": "PcT0lblR58igWCA9kgvla",
                  "content": "TVA",
                  "key": "tva",
                  "style": {
                    "textAlign": "left",
                    "backgroundColor": "#38b4fe"
                  }
                },
                {
                  "id": "3GTbWuTku65i2H_QMiB-h",
                  "content": "Total Remise",
                  "style": {
                    "backgroundColor": "#38b4fe"
                  },
                  "key": "totalRem"
                },
                {
                  "id": "4S1pWvVPmP9EmOgIxJBAW",
                  "content": "Total TTC",
                  "style": {
                    "backgroundColor": "#38b4fe"
                  },
                  "key": "total"
                }
              ],
              "style": {
                "height": "20px"
              }
            },
            {
              "id": "-iiOx-azBApWiXfRUBaSB",
              "cells": [
                {
                  "id": "RtSjus8GdCFaUbNf1U1qg",
                  "content": "",
                  "key": "",
                  "style": {
                    "textAlign": "left"
                  }
                },
                {
                  "id": "aBedHxeN03-b8Dxk_eNqQ",
                  "content": "",
                  "key": "",
                  "style": {
                    "textAlign": "left"
                  }
                },
                {
                  "id": "0fF75xSp9zJtfrV2uA-z4",
                  "content": "",
                  "style": {}
                },
                {
                  "id": "TU3nksF_w1_8OSAhuC4to",
                  "content": "",
                  "style": {}
                }
              ]
            }
          ],
          "columns": 4
        },
        "style": {
          "width": 450,
          "fontSize": 13,
          "color": "#023c78",
          "fontFamily": "Verdana, sans-serif"
        },
        "status": "dynamic",
        "key": "tableResume",
        "zIndex": 13,
        "scale": {
          "x": 1,
          "y": 1
        }
      },
      {
        "id": "LU2pG_oH8K0C0EY-vvajD",
        "type": "text",
        "status": "static",
        "key": null,
        "position": {
          "x": 622.83984375,
          "y": 54.6922607421875
        },
        "content": "______________",
        "style": {
          "color": "#ededed"
        },
        "zIndex": 14,
        "scale": {
          "x": 1,
          "y": 1
        }
      },
      {
        "id": "bZcAQNqTvw32v1WYaE3xc",
        "type": "text",
        "position": {
          "x": 588.0234375,
          "y": 255.25
        },
        "content": "Client Name",
        "style": {
          "width": "auto",
          "fontSize": 12,
          "fontFamily": "Verdana, sans-serif"
        },
        "status": "dynamic",
        "key": "clientName",
        "zIndex": 15,
        "scale": {
          "x": 1,
          "y": 1
        }
      },
      {
        "id": "V7mUdYADnbK471ZBPkzzd",
        "type": "text",
        "position": {
          "x": 589,
          "y": 273
        },
        "content": "Client adress",
        "style": {
          "width": 129,
          "fontSize": 12,
          "fontFamily": "Verdana, sans-serif"
        },
        "status": "dynamic",
        "key": "clientAddress",
        "zIndex": 15,
        "scale": {
          "x": 1,
          "y": 1
        }
      },
      {
        "id": "TULL0_tj4w-nvDQpu1qh5",
        "type": "text",
        "position": {
          "x": 590,
          "y": 301
        },
        "content": "Client Email",
        "style": {
          "width": "auto",
          "fontSize": 12,
          "fontFamily": "Verdana, sans-serif"
        },
        "status": "dynamic",
        "key": "clientEmail",
        "zIndex": 16,
        "scale": {
          "x": 1,
          "y": 1
        }
      },
      {
        "id": "FhNU4z74VP6rFiOuBAg_B",
        "type": "image",
        "position": {
          "x": 50,
          "y": 50
        },
        "content": "data:image/webp;base64,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",
        "style": {
          "width": 86,
          "height": "auto"
        },
        "status": "static",
        "key": null,
        "zIndex": 16,
        "scale": {
          "x": 1,
          "y": 1
        }
      }
    ]
  },
  {
    id: createId(),
    name: "Basic Invoice",
        style:{
      width: 210, 
      height: 297,
      backgroundColor: '#fffff', 
    },
    elements: [
      {
        id: createId(),
        type: "text",
        position: { x: 40, y: 40 },
        content: "INVOICE",
        style: {
          fontFamily: "Arial, sans-serif",
          fontSize: 28,
          fontWeight: "bold",
          color: "#333333",
        },
        zIndex: 0,
        scale: { x: 1, y: 1 }
      },
      {
        id: createId(),
        type: "text",
        position: { x: 40, y: 80 },
        content: "Invoice #: INV-001\nDate: January 1, 2025\nDue Date: January 15, 2025",
        style: {
          fontFamily: "Arial, sans-serif",
          fontSize: 12,
          color: "#555555",
        },
        zIndex: 1,
        scale: { x: 1, y: 1 }
      },
      {
        id: createId(),
        type: "text",
        position: { x: 40, y: 150 },
        content: "Bill To:\nClient Name\nClient Address\nCity, State, ZIP\nPhone: (123) 456-7890\nEmail: client@example.com",
        style: {
          fontFamily: "Arial, sans-serif",
          fontSize: 12,
          color: "#555555",
        },
        zIndex: 2,
        scale: { x: 1, y: 1 }
      },
      {
        id: createId(),
        type: "text",
        position: { x: 350, y: 150 },
        content: "From:\nYour Company Name\nYour Address\nCity, State, ZIP\nPhone: (123) 456-7890\nEmail: company@example.com",
        style: {
          fontFamily: "Arial, sans-serif",
          fontSize: 12,
          color: "#555555",
        },
        zIndex: 3,
        scale: { x: 1, y: 1 }
      },
      {
        id: createId(),
        type: "table",
        position: { x: 40, y: 280 },
        content: {
          columns: 4,
          rows: [
            {
              id: createId(),
              cells: [
                {
                  id: createId(),
                  content: "Item",
                  style: {
                    fontWeight: "bold",
                    backgroundColor: "#f0f0f0",
                  }
                },
                {
                  id: createId(),
                  content: "Description",
                  style: {
                    fontWeight: "bold",
                    backgroundColor: "#f0f0f0",
                  }
                },
                {
                  id: createId(),
                  content: "Quantity",
                  style: {
                    fontWeight: "bold",
                    backgroundColor: "#f0f0f0",
                    textAlign: "center",
                  }
                },
                {
                  id: createId(),
                  content: "Price",
                  style: {
                    fontWeight: "bold",
                    backgroundColor: "#f0f0f0",
                    textAlign: "right",
                  }
                }
              ]
            },
            {
              id: createId(),
              cells: [
                {
                  id: createId(),
                  content: "Item 1",
                  style: {}
                },
                {
                  id: createId(),
                  content: "Description of item 1",
                  style: {}
                },
                {
                  id: createId(),
                  content: "1",
                  style: {
                    textAlign: "center",
                  }
                },
                {
                  id: createId(),
                  content: "$100.00",
                  style: {
                    textAlign: "right",
                  }
                }
              ]
            },
            {
              id: createId(),
              cells: [
                {
                  id: createId(),
                  content: "Item 2",
                  style: {}
                },
                {
                  id: createId(),
                  content: "Description of item 2",
                  style: {}
                },
                {
                  id: createId(),
                  content: "2",
                  style: {
                    textAlign: "center",
                  }
                },
                {
                  id: createId(),
                  content: "$75.00",
                  style: {
                    textAlign: "right",
                  }
                }
              ]
            }
          ]
        },
        style: {
          width: 520,
          fontFamily: "Arial, sans-serif",
          fontSize: 12,
          borderWidth: 1,
          borderColor: "#cccccc",
        },
        zIndex: 4,
        scale: { x: 1, y: 1 }
      },
      {
        id: createId(),
        type: "text",
        position: { x: 400, y: 400 },
        content: "Subtotal: $250.00\nTax (10%): $25.00\nTotal: $275.00",
        style: {
          fontFamily: "Arial, sans-serif",
          fontSize: 12,
          fontWeight: "bold",
          textAlign: "right",
        },
        zIndex: 5,
        scale: { x: 1, y: 1 }
      },
      {
        id: createId(),
        type: "text",
        position: { x: 40, y: 500 },
        content: "Payment Terms: Net 15\nPlease make checks payable to Your Company Name\nThank you for your business!",
        style: {
          fontFamily: "Arial, sans-serif",
          fontSize: 12,
          color: "#555555",
        },
        zIndex: 6,
        scale: { x: 1, y: 1 }
      }
    ]
  },
  {
    id: createId(),
    name: "Modern Invoice",
    style:{
      width: 210, 
      height: 297,
      backgroundColor: '#fffff', 
    },
    elements: [
      {
        id: createId(),
        type: "text",
        position: { x: 40, y: 40 },
        content: "INVOICE",
        style: {
          fontFamily: "Helvetica, sans-serif",
          fontSize: 32,
          fontWeight: "bold",
          color: "#2563eb",
        },
        zIndex: 0,
        scale: { x: 1, y: 1 }
      },
      {
        id: createId(),
        type: "text",
        position: { x: 450, y: 50 },
        content: "#INV-2025-001",
        style: {
          fontFamily: "Helvetica, sans-serif",
          fontSize: 16,
          color: "#64748b",
        },
        zIndex: 1,
        scale: { x: 1, y: 1 }
      },
      {
        id: createId(),
        type: "text",
        position: { x: 40, y: 100 },
        content: "FROM",
        style: {
          fontFamily: "Helvetica, sans-serif",
          fontSize: 12,
          fontWeight: "bold",
          color: "#64748b",
        },
        zIndex: 2,
        scale: { x: 1, y: 1 }
      },
      {
        id: createId(),
        type: "text",
        position: { x: 40, y: 120 },
        content: "Your Company Name\n123 Business Street\nCity, State 12345\ncontact@yourcompany.com",
        style: {
          fontFamily: "Helvetica, sans-serif",
          fontSize: 12,
          color: "#1e293b",
        },
        zIndex: 3,
        scale: { x: 1, y: 1 }
      },
      {
        id: createId(),
        type: "text",
        position: { x: 350, y: 100 },
        content: "BILL TO",
        style: {
          fontFamily: "Helvetica, sans-serif",
          fontSize: 12,
          fontWeight: "bold",
          color: "#64748b",
        },
        zIndex: 4,
        scale: { x: 1, y: 1 }
      },
      {
        id: createId(),
        type: "text",
        position: { x: 350, y: 120 },
        content: "Client Name\n456 Client Avenue\nCity, State 67890\nclient@example.com",
        style: {
          fontFamily: "Helvetica, sans-serif",
          fontSize: 12,
          color: "#1e293b",
        },
        zIndex: 5,
        scale: { x: 1, y: 1 }
      },
      {
        id: createId(),
        type: "text",
        position: { x: 40, y: 200 },
        content: "INVOICE DETAILS",
        style: {
          fontFamily: "Helvetica, sans-serif",
          fontSize: 14,
          fontWeight: "bold",
          color: "#2563eb",
          borderBottomWidth: 2,
          borderBottomColor: "#2563eb",
          borderBottomStyle: "solid",
          padding: 5,
          width: 680,
        },
        zIndex: 6,
        scale: { x: 1, y: 1 }
      },
      {
        id: createId(),
        type: "table",
        position: { x: 40, y: 240 },
        content: {
          columns: 5,
          rows: [
            {
              id: createId(),
              cells: [
                {
                  id: createId(),
                  content: "Service",
                  style: {
                    fontWeight: "bold",
                    backgroundColor: "#f1f5f9",
                  }
                },
                {
                  id: createId(),
                  content: "Description",
                  style: {
                    fontWeight: "bold",
                    backgroundColor: "#f1f5f9",
                  }
                },
                {
                  id: createId(),
                  content: "Hours",
                  style: {
                    fontWeight: "bold",
                    backgroundColor: "#f1f5f9",
                    textAlign: "center",
                  }
                },
                {
                  id: createId(),
                  content: "Rate",
                  style: {
                    fontWeight: "bold",
                    backgroundColor: "#f1f5f9",
                    textAlign: "right",
                  }
                },
                {
                  id: createId(),
                  content: "Total",
                  style: {
                    fontWeight: "bold",
                    backgroundColor: "#f1f5f9",
                    textAlign: "right",
                  }
                }
              ]
            },
            {
              id: createId(),
              cells: [
                {
                  id: createId(),
                  content: "Web Design",
                  style: {}
                },
                {
                  id: createId(),
                  content: "Homepage redesign",
                  style: {}
                },
                {
                  id: createId(),
                  content: "10",
                  style: {
                    textAlign: "center",
                  }
                },
                {
                  id: createId(),
                  content: "$85.00",
                  style: {
                    textAlign: "right",
                  }
                },
                {
                  id: createId(),
                  content: "$85.00",
                  style: {
                    textAlign: "right",
                  }
                }
              ]
            },
            {
              id: createId(),
              cells: [
                {
                  id: createId(),
                  content: "Development",
                  style: {}
                },
                {
                  id: createId(),
                  content: "E-commerce integration",
                  style: {}
                },
                {
                  id: createId(),
                  content: "15",
                  style: {
                    textAlign: "center",
                  }
                },
                {
                  id: createId(),
                  content: "$95.00",
                  style: {
                    textAlign: "right",
                  }
                },
                {
                  id: createId(),
                  content: "$85.00",
                  style: {
                    textAlign: "right",
                  }
                }
              ]
            },
            {
              id: createId(),
              cells: [
                {
                  id: createId(),
                  content: "Development",
                  style: {}
                },
                {
                  id: createId(),
                  content: "E-commerce integration",
                  style: {}
                },
                {
                  id: createId(),
                  content: "15",
                  style: {
                    textAlign: "center",
                  }
                },
                {
                  id: createId(),
                  content: "$95.00",
                  style: {
                    textAlign: "right",
                  }
                },
                {
                  id: createId(),
                  content: "$85.00",
                  style: {
                    textAlign: "right",
                  }
                }
              ]
            }
            ,
            {
              id: createId(),
              cells: [
                {
                  id: createId(),
                  content: "Development",
                  style: {}
                },
                {
                  id: createId(),
                  content: "E-commerce integration",
                  style: {}
                },
                {
                  id: createId(),
                  content: "15",
                  style: {
                    textAlign: "center",
                  }
                },
                {
                  id: createId(),
                  content: "$95.00",
                  style: {
                    textAlign: "right",
                  }
                },
                {
                  id: createId(),
                  content: "$85.00",
                  style: {
                    textAlign: "right",
                  }
                }
              ]
            }
            ,
            {
              id: createId(),
              cells: [
                {
                  id: createId(),
                  content: "Development",
                  style: {}
                },
                {
                  id: createId(),
                  content: "E-commerce integration",
                  style: {}
                },
                {
                  id: createId(),
                  content: "15",
                  style: {
                    textAlign: "center",
                  }
                },
                {
                  id: createId(),
                  content: "$95.00",
                  style: {
                    textAlign: "right",
                  }
                },
                {
                  id: createId(),
                  content: "$85.00",
                  style: {
                    textAlign: "right",
                  }
                }
              ]
            }
            ,
            {
              id: createId(),
              cells: [
                {
                  id: createId(),
                  content: "Development",
                  style: {}
                },
                {
                  id: createId(),
                  content: "E-commerce integration",
                  style: {}
                },
                {
                  id: createId(),
                  content: "15",
                  style: {
                    textAlign: "center",
                  }
                },
                {
                  id: createId(),
                  content: "$95.00",
                  style: {
                    textAlign: "right",
                  }
                },
                {
                  id: createId(),
                  content: "$85.00",
                  style: {
                    textAlign: "right",
                  }
                }
              ]
            }
            ,
            {
              id: createId(),
              cells: [
                {
                  id: createId(),
                  content: "Development",
                  style: {}
                },
                {
                  id: createId(),
                  content: "E-commerce integration",
                  style: {}
                },
                {
                  id: createId(),
                  content: "15",
                  style: {
                    textAlign: "center",
                  }
                },
                {
                  id: createId(),
                  content: "$95.00",
                  style: {
                    textAlign: "right",
                  }
                },
                {
                  id: createId(),
                  content: "$85.00",
                  style: {
                    textAlign: "right",
                  }
                }
              ]
            }
          ]
        },
        style: {
          width: 680,
          fontFamily: "Helvetica, sans-serif",
          fontSize: 12,
          borderWidth: 1,
          borderColor: "#e2e8f0",
        },
        zIndex: 7,
        scale: { x: 1, y: 1 }
      },
      {
        id: createId(),
        type: "text",
        position: { x: 350, y: 350 },
        content: "Subtotal: $2,275.00\nTax (7%): $159.25\nTotal Due: $2,434.25",
        style: {
          fontFamily: "Helvetica, sans-serif",
          fontSize: 14,
          textAlign: "right",
          fontWeight: "bold",
        },
        zIndex: 8,
        scale: { x: 1, y: 1 }
      },
      {
        id: createId(),
        type: "text",
        position: { x: 40, y: 450 },
        content: "PAYMENT INFORMATION",
        style: {
          fontFamily: "Helvetica, sans-serif",
          fontSize: 14,
          fontWeight: "bold",
          color: "#2563eb",
        },
        zIndex: 9,
        scale: { x: 1, y: 1 }
      },
      {
        id: createId(),
        type: "text",
        position: { x: 40, y: 480 },
        content: "Bank: National Bank\nAccount Name: Your Company Name\nAccount Number: XXXX-XXXX-XXXX-1234\nRouting: 123456789",
        style: {
          fontFamily: "Helvetica, sans-serif",
          fontSize: 12,
          color: "#1e293b",
        },
        zIndex: 10,
        scale: { x: 1, y: 1 }
      },
      {
        id: createId(),
        type: "text",
        position: { x: 40, y: 560 },
        content: "Thank you for your business! Payment is due within 15 days.",
        style: {
          fontFamily: "Helvetica, sans-serif",
          fontSize: 12,
          fontStyle: "italic",
          color: "#64748b",
        },
        zIndex: 11,
        scale: { x: 1, y: 1 }
      }
    ]
  },
  {
    id: createId(),
    name: "Minimalist Invoice",
    style:{
      width: 210, 
      height: 297,
      backgroundColor: '#fffff', 
    },
    elements: [
      {
        id: createId(),
        type: "text",
        position: { x: 40, y: 40 },
        content: "INVOICE",
        style: {
          fontFamily: "Georgia, serif",
          fontSize: 24,
          fontWeight: "normal",
          color: "#333333",
        },
        zIndex: 0,
        scale: { x: 1, y: 1 }
      },
      {
        id: createId(),
        type: "text",
        position: { x: 40, y: 80 },
        content: "Invoice Number: 2025-003\nDate Issued: March 15, 2025\nDue Date: April 15, 2025",
        style: {
          fontFamily: "Georgia, serif",
          fontSize: 12,
          color: "#666666",
        },
        zIndex: 1,
        scale: { x: 1, y: 1 }
      },
      {
        id: createId(),
        type: "text",
        position: { x: 40, y: 160 },
        content: "Billed To",
        style: {
          fontFamily: "Georgia, serif",
          fontSize: 14,
          fontWeight: "bold",
          color: "#333333",
        },
        zIndex: 2,
        scale: { x: 1, y: 1 }
      },
      {
        id: createId(),
        type: "text",
        position: { x: 40, y: 185 },
        content: "Client Name\nClient Company\n123 Client Street\nCity, State 12345",
        style: {
          fontFamily: "Georgia, serif",
          fontSize: 12,
          color: "#666666",
        },
        zIndex: 3,
        scale: { x: 1, y: 1 }
      },
      {
        id: createId(),
        type: "text",
        position: { x: 350, y: 160 },
        content: "From",
        style: {
          fontFamily: "Georgia, serif",
          fontSize: 14,
          fontWeight: "bold",
          color: "#333333",
        },
        zIndex: 4,
        scale: { x: 1, y: 1 }
      },
      {
        id: createId(),
        type: "text",
        position: { x: 350, y: 185 },
        content: "Your Name\nYour Company\n456 Business Avenue\nCity, State 67890",
        style: {
          fontFamily: "Georgia, serif",
          fontSize: 12,
          color: "#666666",
        },
        zIndex: 5,
        scale: { x: 1, y: 1 }
      },
      {
        id: createId(),
        type: "table",
        position: { x: 40, y: 280 },
        content: {
          columns: 3,
          rows: [
            {
              id: createId(),
              cells: [
                {
                  id: createId(),
                  content: "Description",
                  style: {
                    fontWeight: "bold",
                    borderBottomWidth: 1,
                    borderBottomColor: "#cccccc",
                    borderBottomStyle: "solid",
                    padding: 8,
                  }
                },
                {
                  id: createId(),
                  content: "Quantity",
                  style: {
                    fontWeight: "bold",
                    borderBottomWidth: 1,
                    borderBottomColor: "#cccccc",
                    borderBottomStyle: "solid",
                    padding: 8,
                    textAlign: "center",
                  }
                },
                {
                  id: createId(),
                  content: "Amount",
                  style: {
                    fontWeight: "bold",
                    borderBottomWidth: 1,
                    borderBottomColor: "#cccccc",
                    borderBottomStyle: "solid",
                    padding: 8,
                    textAlign: "right",
                  }
                }
              ]
            },
            {
              id: createId(),
              cells: [
                {
                  id: createId(),
                  content: "Professional Consultation",
                  style: {
                    padding: 8,
                  }
                },
                {
                  id: createId(),
                  content: "5 hours",
                  style: {
                    padding: 8,
                    textAlign: "center",
                  }
                },
                {
                  id: createId(),
                  content: "$750.00",
                  style: {
                    padding: 8,
                    textAlign: "right",
                  }
                }
              ]
            },
            {
              id: createId(),
              cells: [
                {
                  id: createId(),
                  content: "Project Management",
                  style: {
                    padding: 8,
                  }
                },
                {
                  id: createId(),
                  content: "10 hours",
                  style: {
                    padding: 8,
                    textAlign: "center",
                  }
                },
                {
                  id: createId(),
                  content: "$1,250.00",
                  style: {
                    padding: 8,
                    textAlign: "right",
                  }
                }
              ]
            }
          ]
        },
        style: {
          width: 520,
          fontFamily: "Georgia, serif",
          fontSize: 12,
          borderWidth: 0,
          color: "#666666",
        },
        zIndex: 6,
        scale: { x: 1, y: 1 }
      },
      {
        id: createId(),
        type: "text",
        position: { x: 40, y: 380 },
        content: "_______________________________________________________________",
        style: {
          fontFamily: "Georgia, serif",
          fontSize: 12,
          color: "#cccccc",
        },
        zIndex: 7,
        scale: { x: 1, y: 1 }
      },
      {
        id: createId(),
        type: "text",
        position: { x: 350, y: 410 },
        content: "Subtotal: $2,000.00\nTax (5%): $100.00\nTotal: $2,100.00",
        style: {
          fontFamily: "Georgia, serif",
          fontSize: 12,
          color: "#333333",
          textAlign: "right",
        },
        zIndex: 8,
        scale: { x: 1, y: 1 }
      },
      {
        id: createId(),
        type: "text",
        position: { x: 40, y: 500 },
        content: "Payment Terms",
        style: {
          fontFamily: "Georgia, serif",
          fontSize: 14,
          fontWeight: "bold",
          color: "#333333",
        },
        zIndex: 9,
        scale: { x: 1, y: 1 }
      },
      {
        id: createId(),
        type: "text",
        position: { x: 40, y: 525 },
        content: "Payment is due within 30 days. Please make checks payable to Your Company or send electronic payment to the account details provided separately.",
        style: {
          fontFamily: "Georgia, serif",
          fontSize: 12,
          color: "#666666",
        },
        zIndex: 10,
        scale: { x: 1, y: 1 }
      },
      {
        id: createId(),
        type: "text",
        position: { x: 40, y: 580 },
        content: "Thank you for your business.",
        style: {
          fontFamily: "Georgia, serif",
          fontSize: 12,
          fontStyle: "italic",
          color: "#666666",
        },
        zIndex: 11,
        scale: { x: 1, y: 1 }
      }
    ]
  }
];

