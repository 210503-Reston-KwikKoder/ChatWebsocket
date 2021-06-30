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
        origin: "*",
        methods: ["GET", "POST"]
    }
});
// 

// sets the port to use
// process.env.PORT finds a port in the environmental vairables
// if not use 3000
const port = 3000;


//starts listening for activity on the port
server.listen(port, () => {
    console.log(`started on port: ${port}`);
});

// triggers when a user connects to the socket
io.on('connection', (socket) => {
    // sets an event listener for the "new-message" event
    
    socket.on('new-message', (message, roomId) => {
        console.log("new message recived: "+message, "room id: "+roomId)
        // sends back an event of "new-message" 
        io.to(roomId).emit("new-message",message);
    })


    socket.on('comp-key', (letter, roomId, playerNum) => {
        io.to(roomId).emit('comp-key', letter, playerNum)
    })

    // puts users in to a que
    socket.on('updated-que', ( roomId) => {
        io.to(roomId).emit('enter-que')
    })

    // need the room id from the front end
    socket.on('join-comp-room', (roomId) => {
        socket.join(roomId)
    })

    // winner sends the next challengers id to the room so the next challanger knows who they are
    socket.on('new-challenger', (challengerId, roomId) => {
        socket.to(roomId).emit('new-challenger', challengerId)
    })
});
