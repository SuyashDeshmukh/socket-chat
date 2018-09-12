const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io').listen(http);

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/views/page.html')
})

io.on('connection', (socket) => {
    console.log('Client connected!');

    socket.on('chat message', (msg) => {
        console.log('message: '+ msg);
        io.emit('chat message', msg);
    })
    socket.on('disconnect',() => {
        console.log('Client Disconnected.')
    })
});

http.listen(7000, () => {
    console.log('Listening on 7000!');
})