const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io")
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname+"/index.html");
});

io.on("connection", socket => {
    socket.broadcast.emit("connection", "A user just connected!")
    socket.on("disconnect", () => {
        socket.broadcast.emit("disconnection", "A user disconnected!")
    })
    socket.on("chat message", message => {
        socket.broadcast.emit("chat message", message)
    })
    socket.on("user input", message => {
      socket.broadcast.emit("user input", message)
    })
    socket.on("user inputstop", () => {
      socket.broadcast.emit("user inputstop")
    })
})

server.listen(3000, () => {
  console.log('listening on *:3000');
});