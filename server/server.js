const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,'../public');
const {generateMessage} = require('./utils/message');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log("new User connected");

    socket.emit('newMessage',generateMessage('Admin','Welcome to Chat App'));

    socket.broadcast.emit('newMessage',generateMessage('Admin','New User Connected'));

    socket.on('createMessage',(createMessage,callback)=>{
        console.log('createMessage',createMessage);
        
        //for broadcasting
        // socket.broadcast.emit('newMessage',{
        //     from: createMessage.from,
        //     text:createMessage.text,
        //     createAt : new Date().getTime()
        // });

        io.emit('newMessage',generateMessage(createMessage.from,createMessage.text));
        callback();
    });

    socket.on('disconnect',(socket)=>{
        console.log("client disconnected")
    });    
});

server.listen(port,()=>{
    console.log(`Server is running on ${port}`);
});
