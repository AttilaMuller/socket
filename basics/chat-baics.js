const express = require('express');
const app = express();
const socketio = require('socket.io');

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000);
const io = socketio(expressServer);

// fired upon a connection from client -> can be used with namespace -> (same as connect)
// without namespace we check for the connections at the main namespace
io.on('connection', socket => {
    // we emit an event to the socket identified by string name
    socket.emit('messageFromServer', { data: 'Welcome to the server' });
    // we register a new handler for a given event
    socket.on('dataToServer', dataFromClient => {
        console.log(dataFromClient);
    });
    // we check the reason of disconnect
    socket.on('disconnect', reason => {
        console.log(reason);
    });
});