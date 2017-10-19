$(document).ready(function() {
    socket = new WebSocket("ws://" + window.location.host + "/chat/");
    socket.onmessage = function(e) {
        console.log(e.data);
        if (e.data=="boton-1") {
            if ($("#btn").prop("checked")==false) {
                $("#btn").prop("checked",true);
            }
        }
        else {
            if (e.data=="boton-2") {
                if ($("#btn").prop("checked")==true) {
                    $("#btn").prop("checked",false);
                }
            }

        }

    }
    $('#btn').change(function() {
    // this will contain a reference to the checkbox
        if (this.checked) {
          // connection gets bumped over to WebSocket consumers
              socket.onopen = function() {
                socket.send("1");
              }
              if (socket.readyState == WebSocket.OPEN) socket.onopen();
        }
        else {
                  socket.send("2");
              }
          // Call onopen directly if socket is already open
      });
});
