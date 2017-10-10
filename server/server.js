const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,'../public');
const {generateMessage,generateLocationMessage} = require('./utils/message');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log("new User connected");

    socket.emit('newMessage',generateMessage('Admin','Welcome to Chat App'));

    socket.broadcast.emit('newMessage',generateMessage('Admin','New User Connected'));

    socket.on('createMessage',(createMessage,callback)=>{
        io.emit('newMessage',generateMessage(createMessage.from,createMessage.text));
        callback();
    });

    socket.on('createLocationMessage',(coords)=>{
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
    });
    
    socket.on('disconnect',(socket)=>{
        console.log("client disconnected")
    });    
});

server.listen(port,()=>{
    console.log(`Server is running on ${port}`);
});
