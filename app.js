const express = require('express');
const bodyParser = require('body-parser');
const sockets = require('./sockets');
const config = require('./config/web');
const path = require('path');

const base = require('./routes/base');

const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', base);

server.listen(config.port, config.ip, () => console.log(`Server listening on ${config.ip}:${config.port}`));

