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

function onDeviceReady() { //request the persistent file system
    function readFromFile(fileName, cb) {
        var pathToFile = cordova.file.dataDirectory + fileName;
        window.resolveLocalFileSystemURL(pathToFile, function (fileEntry) {
            fileEntry.file(function (file) {
                var reader = new FileReader();

                reader.onloadend = function (e) {
                    cb(JSON.parse(this.result));
                };

                reader.readAsText(file);
            }, errorHandler.bind(null, fileName));
        }, errorHandler.bind(null, fileName));
    }

    var fileData;
    readFromFile('data.json', function (data) {
        fileData = data;
        console.log(fileData);
    });

    function writeToFile(fileName, data) {
        data = JSON.stringify(data, null, '\t');
        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (directoryEntry) {
            directoryEntry.getFile(fileName, { create: true }, function (fileEntry) {
                fileEntry.createWriter(function (fileWriter) {
                    fileWriter.onwriteend = function (e) {
                        // for real-world usage, you might consider passing a success callback
                        console.log('Write of file "' + fileName + '"" completed.');
                    };

                    fileWriter.onerror = function (e) {
                        // you could hook this up with our global error handler, or pass in an error callback
                        console.log('Write failed: ' + e.toString());
                    };

                    var blob = new Blob([data], { type: 'text/plain' });
                    fileWriter.write(blob);
                }, errorHandler.bind(null, fileName));
            }, errorHandler.bind(null, fileName));
        }, errorHandler.bind(null, fileName));
    }

    writeToFile('beebalm.json', { foo: 'bar' });

    var errorHandler = function (fileName, e) {  
        var msg = '';

        switch (e.code) {
            case FileError.QUOTA_EXCEEDED_ERR:
                msg = 'Storage quota exceeded';
                break;
            case FileError.NOT_FOUND_ERR:
                msg = 'File not found';
                break;
            case FileError.SECURITY_ERR:
                msg = 'Security error';
                break;
            case FileError.INVALID_MODIFICATION_ERR:
                msg = 'Invalid modification';
                break;
            case FileError.INVALID_STATE_ERR:
                msg = 'Invalid state';
                break;
            default:
                msg = 'Unknown error';
                break;
        };

        console.log('Error (' + fileName + '): ' + msg);
    }
}

function init() {
    document.addEventListener("deviceready", onDeviceReady, true);
    writeToFile('ininin.json', { foo: 'bar' });
}