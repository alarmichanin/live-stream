var socket = io();
socket.on('stream',(image)=>{
    var img = document.getElementById("play");
    img.src = image;
    // $('#logger').text(image)
})