//Should work, final


// device APIs are available
//

/*
DOM should have
<div id="writerFileName">path/to/foo.bar</div>
and 
<div id="writerFileContent">CONTENT</div>
*/

function finalWriteGo() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, wgotFS, wfail);
}

function wgotFS(fileSystem) {
	filename = document.getElementById("writerFileName").innerHTML;
	console.log("Writing "+filename);
    fileSystem.root.getFile(filename, {create: true, exclusive: false}, wgotFileEntry, wfail);
}

function wgotFileEntry(fileEntry) {
    fileEntry.createWriter(wgotFileWriter, wfail);
}

function wgotFileWriter(writer) {
	content = document.getElementById("writerFileContent").innerHTML;
    writer.write(content);
    //console.log("Wrote: "+content);
}

function wfail(error) {
    console.log(error.code);
    alert("Got Error:");
    alert(error.code);
}