//requiriendo dependencias 
const cors = require('cors')
const express = require('express');
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const http = require('http')
// const io = require('socket.io-client');
const socketio = require('socket.io')
const config = require('./Config/config')
const Sequelize = require('sequelize');
//instancia de express
const app = express()
// const server = http.createServer(app)

// var net = require("net")

// Cargar ficheros rutas
var paradoxRoutes = require('./Routes/paradoxRoutes');


app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));


app.use(cors())

var net = require('net');

var HOST = '127.0.0.1';
var PORT = 4020;

const server = net.createServer();
server.listen(PORT, HOST, () => {
    console.log('TCP Server is running on port ' + PORT +'.');
});

let sockets = [];

server.on('connection', function(sock) {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    sockets.push(sock);

    sock.on('data', function(data) {
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        // Write the data back to all the connected, the client will receive it as data from the server
        sockets.forEach(function(sock, index, array) {
            sock.write(sock.remoteAddress + ':' + sock.remotePort + " said " + data + '\n');
        });
    });


        // Add a 'close' event handler to this instance of socket
        sock.on('close', function(data) {
            let index = sockets.findIndex(function(o) {
                return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
            })
            if (index !== -1) sockets.splice(index, 1);
            console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
        });

});

