// We need http because we dont have express
const http = require('http');
const socketio = require('socket.io');

// We make http server with node
const server = http.createServer((req, res) => {
    res.end('I am connected')
});

const io = socketio(server);

io.on('connection', (socket, req)=>{
    socket.emit('welcome', 'Welcome to the server!');
    socket.on('message', msg => {
        console.log(msg.data);
    });
});

server.listen(8800);