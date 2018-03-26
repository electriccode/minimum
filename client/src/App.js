import React, { Component } from 'react';
import NewRoom from './components/NewRoom.js';
import Rooms from './components/Rooms.js';
import openSocket from 'socket.io-client';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    var socket = openSocket('http://localhost:9000');
    var socketId = null;
    socket.on('connect', () => {
      console.log('got the socket id', socket.id);
      this.setState({socketId: socket.id});
    });

    this.state = {
      socket,
      socketId
    }
  }

  render() {
    return (
      <div className="App">
        <NewRoom socket={this.state.socket} socketId={this.state.socketId} />
        <Rooms socket={this.state.socket} socketId={this.state.socketId} />
      </div>
    );
  }
}

export default App;
