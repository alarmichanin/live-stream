let express = require("express");
let app = express();
let http = require("http").Server(app);
let io = require("socket.io")(http);

let log = require("log");

let port = process.env.PORT || 3030;

app.use(express.static(__dirname + "/public"));



app.get('/', (req, res) => {
    res.sendFile('/index.html')
})



io.on('connection', (socket) => {
    socket.on('stream', (image) => {
        socket.broadcast.emit("stream", image);
    });
});




http.listen(port, () => {
    log.debug(`Server has been started on ${port}`)
})