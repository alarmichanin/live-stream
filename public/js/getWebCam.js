// var video = document.querySelector("#videoElement");

// if (navigator.mediaDevices.getUserMedia) {
//   navigator.mediaDevices.getUserMedia({ video: true })
//     .then(function (stream) {
//       video.srcObject = stream;
//     })
//     .catch(function (err0r) {
//       console.log("Something went wrong!");
//     });
// }


var canvas = document.getElementById("preview");
var context = canvas.getContext("2d");
context.width = canvas.width;
context.height = canvas.height;
var video = document.getElementById("videoElement");
var socket = io();
function logger(msg) {
  $("#logger").text(msg);
}
function loadCam(stream) {
  video.src = window.URL.createObjectURL(stream);
  logger("Camera is ok!");
}
function loadFail() {
  logger("Camera doesnt find, turn it on!");
}
function viewVideo(video, context) {
  context.drawImage(video, 0, 0, context.width, context.height);
  socket.emit("stream", canvas.toDataURL('image/webp'));
}
$(function () {
  console.log("aaaa")
  let navMedia =
    navigator.mediaDevices.getUserMedia ||
    navigator.mediaDevices.webkitGetUserMedia ||
    navigator.mediaDevices.mozGetUserMedia ||
    navigator.mediaDevices.msgGetUserMedia;
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        video.srcObject = stream;
      })
      .catch(function (err0r) {
        loadFail();
        console.log(`Something went wrong!\n\n${err0r}`);
      });
  }

  setInterval(() => {
    viewVideo(video, context);
  }, 70);
});