const io = require('socket.io')(3000);
const uuid = require('uuid/v1');

const blindSockets = new Map();
const helperSockets = new Map();

const video  = io
    .of('/video')
    .on('connection', socket => {

        socket.on('register', data => {
            if (data.type === 'helper') {
                initHelperSocket(socket);
            } else if (data.type === 'blind') {
                initBlindSocket(socket);
            } else {
                socket.emit('error', { message: 'Please provide if you are a helper or a blind person' });
                socket.close();
            }
        })
    });

function initHelperSocket(socket) {
    const id = uuid();
    helperSockets.set(id, socket);

    console.log('Helper Connected');

    socket.on('accept', data => {
        const blind = blindSockets.get(data.id);
        if (blind === null) {
            // socket.emit('error', {message: 'No person found!'});
        }

        console.log('init video call.... with' + data.id);
    });
}

function initBlindSocket(socket) {
    const id = uuid();
    blindSockets.set(socket, id);

    console.log('Blind Person Connected');

    socket.on('request',  data => {
        data = data || {};
        data.id = blindSockets.get(socket);
        sendBlindRequest(data)
    });
}

function sendBlindRequest(data) {
    helperSockets.forEach((val, key, map) => val.emit('request', {id: data.id}))
}
