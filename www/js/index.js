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
    "i0":"Systest - Ryan Selden",
    "i00":"Systest - Ryan Selden",
    "i1":"SystestMain",
    "i2":"Systest - Evë Maquelin",
    "i3":"Systest - Gregor Peach",
    "i4":"Systest - David Vollum",
    "i11":"Jake Springer",
    "i12":"Solomon Olshin",
    "i13":"Evë Maquelin",
    "i14":"Ben Balden",
    "i15":"Jake Hansen",
    "i16":"Ben Johnson",
    "i17":"Adolfo Apolloni",
    "i18":"Ryan Selden",
    "i19":"Culla Galaher",
    "i21":"Tyler Nguyen",
    "i22":"Robin Attey",
    "i23":"Hammad Khan",
    "i24":"David Liu",
    "i25":"Josephine Evans",
    "i27":"Jacob Bendicksen",
    "i32":"Mathus Leungpathomaram",
    "i33":"Alexander Mackworth",
    "i37":"Kobi Saha",
    "i42":"Cel Skeggs",
    "i44":"Hannah Fisher",
    "i45":"Noor Wahle",
    "i47":"Iris Ellenberg",
    "i48":"Natalie Dodson",
    "i51":"Claire Rosenfeld",
    "i52":"Nicolas Springer",
    "i58":"Quinn Okabayashi",
    "i61":"Calissa Spooner",
    "i66":"Anna Dodson",
    "i68":"Jasper Gordon",
    "i69":"Stop Wasting Time. Go scout!!!",
    "i73":"Fin Hoyer",
    "i77":"Gregor Peach",
    "i86":"Amber Merrill",
    "i96":"Liam Bendicksen",
    "i97":"David Vollum",
    "i98":"Iman Wahle",
    "i99":"Aidan Smith"
}`

    persist.people = JSON.parse(json);
    //persist.people = json;

    var ID = "i" + String(form.inputID.value);
    console.log(ID);

    if (typeof persist.people[ID] == "string") {
        console.log("hello");
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

function init() {
    cd('root/sdcard').write('myText.txt','My foobar is great.');
    document.getElementById("blip").innerHTML = cordova.file.dataDirectory;
    document.addEventListener("deviceready", onDeviceReady, true);
}