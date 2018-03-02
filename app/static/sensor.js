var z=0;
$(function() {
    // When we're using HTTPS, use WSS too.
    var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
    var chatsock = new ReconnectingWebSocket(ws_scheme + '://' + window.location.host + "/sensor/");
    console.log(chatsock);
    var x=0;
    chatsock.onopen = function() {
           console.log("Connected!");
           chatsock.send('status');
    };

    chatsock.onmessage = function(message) {
        console.log(message.data);

        if (message.data.localeCompare("false")==0) {
            console.log("false");
            $('#btn').prop( "checked",false );
        }
        else if (message.data.localeCompare("true")==0) {
            console.log("true");
            $('#btn').prop( "checked",true);
        }
        else {
            var object = JSON.parse(message.data)
            console.log(object);
        }
    };
    $('#btn').change(function() {
    // this will contain a reference to the checkbox
    if (this.checked) {
        chatsock.send("btn_checked");
    } else {
        chatsock.send("btn_no_checked");
    }
    });
});
