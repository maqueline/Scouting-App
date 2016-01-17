function login(form) {
    document.getElementById("formContainer").style.visibility = "hidden";
    document.getElementById("formContainer").style.height = 0;

    var ID = form.inputID.value;
    var PIN = form.inputPIN.value;
    // Verify that they're a legitimate user, and then do all this stuff below but better:
    
    document.getElementById("welcome").style.visibility = "visible";
    document.getElementById("name").innerHTML = "Welcome, " + "Evë Maquelin";
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
