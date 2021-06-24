const express = require('express')
const app = express();

const http = require('http');
const server = http.Server(app);

const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
});

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('new-message', (message) => {
        console.log(message)
        io.emit("new-message",message);
    });
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});

