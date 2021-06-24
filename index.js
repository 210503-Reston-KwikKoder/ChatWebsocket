// these import the express module
const express = require('express')
const app = express();
// 

// creates the serve from the express module
const http = require('http');
const server = http.Server(app);
// 

// creates the websocket namespace
// thnk of it as a cluster of sockets
// each user gets a socket from the io server
const { Server } = require('socket.io');
const io = new Server(server, {
    // defines the cors policy
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
});
// 

// sets the port to use
// process.env.PORT finds a port in the environmental vairables
// if not use 3000
const port = process.env.PORT || 3000;


//starts listening for activity on the port
server.listen(port, () => {
    console.log(`started on port: ${port}`);
});

// triggers when a user connects to the socket
io.on('connection', (socket) => {
    // sets an event listener for the "new-message" event
    
    socket.on('new-message', (message, id) => {
        console.log("new message recived: "+message)
        // sends back an event of "new-message" 
        io.to(id).emit("new-message",message);
    });


    socket.on('comp-key', (letter, id, playerNum) => {
        io.to(id).emit('comp-key', letter, playerNum)
    })

    // need the room id from the front end
    socket.on('join-comp-room', (id) => {
        socket.join(id)
    })
});
