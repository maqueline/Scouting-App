//Should work, final


/*
DOM should have
<div id="readerFileName">path/to/foo.bar</div>
and 
<div id="readerFileContent">(will be written to)</div>
*/
  
function readGo() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, rgotFS, rfail);
}

function rgotFS(fileSystem) {
    filename = document.getElementById("readerFileName").innerHTML;
    console.log("Reading "+filename);
    fileSystem.root.getFile(filename, null, rgotFileEntry, rfail);
}

function rgotFileEntry(fileEntry) {
    fileEntry.file(rgotFile, rfail);
}

function rgotFile(file){
    rreadAsText(file);
}

function rreadAsText(file) {
    var reader = new FileReader();
    reader.onloadend = function(evt) {
        resultText = evt.target.result;
        console.log("Got text: "+resultText);
        document.getElementById("readerFileContent").innerHTML = resultText;
        //console.log(document.getElementById("readASFile").innerHTML);
        //console.log("above was text recieved");
    };
    reader.readAsText(file);
}

function rfail(error) {
    console.log(error.code);
    //alert(error.code);
}