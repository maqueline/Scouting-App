var persist = {
    people: {},
    user: {
        name: "",
        id: "",
        lastbet: ""
    },
    match: {
        robot: "1540",
        number: "1",
    },
    spec: {
        serialId: "get from device plugin",
        batteryLevel: 100.0,
        matches: [{
            matchNumber: "12",
            role: "R1",
            teamNumber: "1540",
            bettingPick: "RED",
            scout: "27",

            auto: {
                startingLocation: "zone",
                defense: "ramparts",
                score: "none",
            },

            teleop: {
                crosses_forward: {
                    PORTCULLIS: 0,
                    CHIVAL: 0,
                    MOAT: 0,
                    RAMPARTS: 0,
                    DRAWBRIDGE: 0,
                    SALLY: 0,
                    ROCKWALL: 0,
                    TERRAIN: 0,
                    LOWBAR: 0,
                },
                crosses_reverse: {
                    PORTCULLIS: 0,
                    CHIVAL: 0,
                    MOAT: 0,
                    RAMPARTS: 0,
                    DRAWBRIDGE: 0,
                    SALLY: 0,
                    ROCKWALL: 0,
                    TERRAIN: 0,
                    LOWBAR: 0,
                },
                scores: {
                    PORTCULLIS: 0,
                    CHIVAL: 0,
                    MOAT: 0,
                    RAMPARTS: 0,
                    DRAWBRIDGE: 0,
                    SALLY: 0,
                    ROCKWALL: 0,
                    TERRAIN: 0,
                    LOWBAR: 0,
                },

                lowGoals: 0,
                lowGoalType: "ALL",
                lowGoalShotCoordinates: [[]],
                highGoals: 0,
                highGoalType: "ALL",
                highGoalShotCoordinates: [[]],
                challenged: false,
                scaled: false,
            },

            misc: {
                brokenDown: false,
            }
        }]
    }
};

function login(form) {
    // loadJSON(function(response) {
    //     persist.users = JSON.parse(response);
    // });
    // console.log(persist.users);
    var json = `{
    "i1": "Ross Geller",
    "i2": "Monica Geller-Bing",
    "i3": "Chandler Bing",
    "i11": "Jake Springer",
    "i13": "Evë Maquelin",
    "i17": "Adolfo Apolloni",
    "i18": "Ryan Selden",
    "i21": "Tyler Nguyen",
    "i22": "Robin Attey",
    "i33": "Alexander Mackworth",
    "i37": "Kobi Saha",
    "i42": "Colby Skeggs",
    "i96": "Liam Bendicksen",
    "i98": "Iman Wahle",
    "i99": "Aidan Smith"
}`;

    persist.people = JSON.parse(json);

    var ID = "i" + String(form.inputID.value);
    console.log(ID);

    if (typeof persist.people[ID] == "string") {
        persist.user.name = persist.people[ID]; // logindata.get(ID); or something
        persist.user.id = String(form.inputID.value);

        window.name = JSON.stringify(persist);
        window.location.href = "portal.html";
    } else {
        alert("Invalid User ID");
        window.location.href = "login.html";
    }
}

function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();

    xobj.overrideMimeType("application/json");
    xobj.open('GET', '../DATA_DIRECTORY/scouts.json', true);

    xobj.onreadystatechange = function() {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };

    xobj.send(null);  
 }

function sendOff(spec) {
    console.log(spec);
}

var app = {
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
