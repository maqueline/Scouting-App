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
    "i42": "Cel Skeggs",
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

function onDeviceReady() { //request the persistent file system
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFSSuccess, onError);
    logit("hello");
}

function init() {
    document.addEventListener("deviceready", onDeviceReady, true);
    logit("hi");
}

function onFSSuccess(fs) { 
    fileSystem = fs;
    getById("#dirListingButton").addEventListener("touchstart", doDirectoryListing);
    getById("#addFileButton").addEventListener("touchstart", doAppendFile);
    getById("#readFileButton").addEventListener("touchstart", doReadFile);
    getById("#metadataFileButton").addEventListener("touchstart", doMetadataFile);
    getById("#deleteFileButton").addEventListener("touchstart", doDeleteFile);
    logit("Got the file system: "+fileSystem.name +"<br/>" + "root entry name is "+fileSystem.root.name + "<p/>");
    doDirectoryListing();
}

function gotFiles(entries) {
    var s = "";
    for (var i = 0, len = entries.length; i < len; i++) { 
        //entry objects include: isFile, isDirectory, name, fullPath
        s += entries[i].fullPath;
        if (entries[i].isFile) {
            s += " [F]";
        } else { 
            s += " [D]";
        } 
        s += "<br/>";
    } 
    s += "<p/>";
    logit(s);
} 

function doDirectoryListing(e) { 
    //get a directory reader from our FS 
    var dirReader = fileSystem.root.createReader();
    dirReader.readEntries(gotFiles,onError);
}