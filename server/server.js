const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,'../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log("new User connected");

    socket.on('createMessage',(createMessage)=>{
        console.log('createMessage',createMessage);
        io.emit('newMessage',{
            form:createMessage.form,
            text:createMessage.text,
            createAt:new Date().getTime()
        });
    });

    socket.on('disconnect',(socket)=>{
        console.log("client disconnected")
    });    
});

server.listen(port,()=>{
    console.log(`Server is running on ${port}`);
});
