// * Modules
// ! Every Application Use This Modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
// ! Mongo ORM
const mongoose = require('mongoose');
// ! Session
const session = require('express-session');
const mongoDbStore = require('connect-mongodb-session')(session);
// ! Upload Image
const multer = require('multer');
// ! Socket
const http = require('http')
const server = http.createServer(app);
const io = require('socket.io')(server)

// * Connection String
const ConnectionString = 'mongodb+srv://berkaykanca:12345@cluster0-tm5ct.mongodb.net/dashboard?retryWrites=true';

// * View Engine - Pug
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({
    extended: false
}));

// * Sessions Name Stores in MongoDb
const store = new mongoDbStore({
    uri: ConnectionString,
    collection: 'mySessions'
});
app.use(session({
    secret: 'angarabebesi',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000
    },
    store: store
}));

// * Uploaded Image Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
app.use(multer({
    storage: storage
}).single('image'));

// * Public Files
app.use(express.static(path.join(__dirname, 'public')));

// * Routes
require('./routes/routeManager')(app);

// * Sockets Connection
io.sockets.on('connection', (socket) => {
    console.log('User Connected');
    socket.on('disconnect', () => {
        console.log('User Disconnected');
    });
});

// * Namespace Connection
const nsp = io.of('/messages');
nsp.on('connection', (socket) => {
    socket.on('username', (data) => {
        nsp.emit('con', data.username + ' is join.');
        socket.on('disconnect', () => {
            nsp.emit('dis', data.username + ' is leave.');
        });
    });
    socket.on('chat', function (data) {
        nsp.emit('chat', data);
    });
    socket.on('typing', function (data) {
        socket.broadcast.emit('typing', data);
    });
});

// * MongoDb Connection
mongoose.connect(ConnectionString, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log("Successfully connected to MongoDb.");
        server.listen(3000, function () {
            console.log('Socket is running on port 3000');
        });
    })
    .catch(err => {
        console.log(err);
    });