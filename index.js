let express = require("express");
let app = express();
let http = require("http").createServer(app); // Create http server
let io = require("socket.io")(http); // connect http server in socket.io

app.set("view engine", "ejs");

io.on("connection",(socket) => { // Create the socket.io connection

    socket.on("disconnect", () => { // when a client(socket) disconnet from server
        console.log(`${socket.id} - Discconnected from server`);
    })
    
    socket.on("sendMsg", (data) => { // whent the event "sendMsg" is captured
        io.emit("showMsg", data); // send a new event called "showMsg", using io instead of socket send the event to everyone connected in the server
        console.log(data);
    })
})

app.get("/", (req,res) => {
    res.render("index");
})



http.listen(3000,() => {
    console.log("App running on: http://localhost:3000");
})