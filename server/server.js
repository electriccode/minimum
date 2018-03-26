var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017';
var dbName = 'minimum';
var db = null;
var rooms = {};

MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    db = client.db(dbName);
    // client.close();
});

io.on('connection', function(socket){

    console.log('a new user connected', socket.id);

    socket.on('get all rooms', function() {
        console.log('getting all sessions', socket.id);
        db.collection('rooms').find({}).toArray(function(err, rooms) {
            console.log('rooms requested from ', socket.id);
            socket.emit('update all rooms', rooms);
        })
    });

    socket.on('remove all rooms', function() {
        db.collection('rooms').drop(function(err, deleteOK) {
            err ? console.log('error deleting rooms') : console.log('all rooms deleted') ; io.emit('refresh all rooms');
        });
    });
    
    socket.on('disconnect', function() {
        var sessionId = this.id;
        console.log('someone disconnected', sessionId);
        db.collection('rooms').findOneAndDelete({sessionId: sessionId}, function(err, r) {
            err ? console.log('error cleaning up session', sessionId) : console.log('successfully cleaned up session', sessionId) ;  io.emit('refresh all rooms');
        });
    });

    socket.on('create room', function(roomName, sessionId) {
        var roomName = roomName.trim();
        db.collection('rooms')
        .find({roomName: roomName}).toArray(function(err, docs) {
            if(docs.length === 0) {
                db.collection('rooms')
                .findOneAndDelete({sessionId: sessionId}, function(err, r) {
                    db.collection('rooms').insertOne({roomName: roomName, sessionId: sessionId}, function(err, r) {
                        console.log('room created', roomName, sessionId);
                        db.collection('rooms').find({}).toArray(function(err, rooms) {
                            console.log('event broadcasted to everyone');
                            io.emit('update all rooms', rooms);
                            socket.emit('room ok');
                        })
                    });
                });
            } else {
                socket.emit('duplicate room');
            }
        });
        
    });
});

http.listen(9000, function(){
  console.log('listening on *:9000');
});
