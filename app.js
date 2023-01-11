let express = require("express");
let app = express();
let http = require("http").Server(app);
let io = require("socket.io")(http);
let path = require('path');

let log = require("log");
const e = require("express");

let port = process.env.PORT || 3030;

app.use(express.static("public"));

app.get('/',(req, res) => {
    var fileName = '/index.html';
    res.sendFile(path.join(__dirname, `public/${fileName}`));
})

app.get('/streamer/general', (req, res) => {
    var fileName = '/streamer.html';
    res.sendFile(path.join(__dirname, `public/${fileName}`));
})

app.get('/stream/streamLive', (req, res) => {
    var fileName = '/visualizer.html';
    res.sendFile(path.join(__dirname, `public/${fileName}`));
})


io.on('connection', (socket) => {
    socket.on('stream', (image) => {
        socket.broadcast.emit("stream", image);
    });
});




http.listen(port, () => {
    log.debug(`Server has been started on ${port}`)
})