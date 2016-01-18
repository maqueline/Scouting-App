var persist = {
    users: "hi",
    user: {
        name: "",
        id: "27",
        lastbet: "RED"
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
    var ID = "i" + String(form.inputID.value);

    if (persist.users.ID) {
        persist.user.name = persist.users.ID; // logindata.get(ID); or something

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
        loadJSON(function(response) {
            persist.users = JSON.parse(response);
        });
        console.log(persist.users);
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
