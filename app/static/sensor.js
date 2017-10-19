var z=0;
$(function() {
    // When we're using HTTPS, use WSS too.
    var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
    var chatsock = new ReconnectingWebSocket(ws_scheme + '://' + window.location.host + "/sensor/");
    var x=0;
    chatsock.onopen = function() {
           console.log("Connected!");
           chatsock.send('hola');
           $('#sensor').text("Connected!");
    };

    chatsock.onmessage = function(message) {
        $('#sensor').text(message.data);
        console.log(message.data);
        console.log($('#btn').prop("checked"));
        if (z==0) {
             $('#btn').prop( "checked",false );
             console.log(z);
        }
        if (z==1) {
            $('#btn').prop( "checked",true );
            console.log(z);
        }
    };

});
$(document).ready(function() {
    $('#btn').change(function() {
    // this will contain a reference to the checkbox
    if (this.checked) {
        console.log(z);
        z=1;
    } else {
        console.log(z);
        z=0;
    }
});
});
