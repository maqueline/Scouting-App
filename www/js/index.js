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
        key: "secret", //this is the secret key that is included...
        matches: [ //there can be multiple of these, the app may not have comms to connect every match
            {
                matchNumber: 1,
                role: "R1", //R1, R2, R3, B1, B2, B3 are options
                teamNumber: "1540",
                bettingPick: "RED", //RED or BLUE
                scout: "27", //the scout's id number
                
                notes: "", //the optional scout notes box
                
                //AUTO:
                auto: {
                    startingPosition: "SPYBOX", //should probably be a pulldown for these, SPYBOX, PORTCULLIS, CHIVAL, MOAT, RAMPARTS, DRAWBRIDGE, SALLY, ROCKWALL, TERRAIN, LOWBAR
                    defense: "PORTCULLIS", //should probably be a pulldown for these, PORTCULLIS, CHIVAL, MOAT, RAMPARTS, DRAWBRIDGE, SALLY, ROCKWALL, TERRAIN, LOWBAR, or NONE
                    defenseCross: "REACH", //REACH, CROSS, or NONE
                    score: "NONE", //LOW, HIGH, NONE
                },

                defenses: ["LOWBAR", "PORTCULLIS", "DRAWBRIDGE", "MOAT", "TERRAIN"], //the defenses on the teams side of the field (the ones that they breach)

                //TELE
                teleop: {
                    crosses: { //number of times they cross towards lé non-middle
                        PORTCULLIS: -1,
                        CHIVAL: 3,
                        MOAT: 0,
                        RAMPARTS: 0,
                        DRAWBRIDGE: 1,
                        SALLY: 2,
                        ROCKWALL: 0,
                        TERRAIN: 0,
                        LOWBAR: 0
                    },
                    scores: { //total scores for each defense
                        PORTCULLIS: -1,
                        CHIVAL: 3,
                        MOAT: 2.5,
                        RAMPARTS: 0,
                        DRAWBRIDGE: 1,
                        SALLY: 2,
                        ROCKWALL: 0,
                        TERRAIN: 0,
                        LOWBAR: 0
                    },
                    lowGoalsMade: 3, //number of low goals
                    highGoalsMade: 1, //number of high goals
                    lowGoalsMissed: 1,  //
                    highGoalsMissed: 0, //
                    challenged: true, //did they get onto the little base platform??
                    scaled: false,  //did they lift up??
                },

                misc : {
                    brokenDown: true, //true or false if the robot fell over, broke down, or was disabled during the match
                }
            }
        ]
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