import React, { Component } from 'react';
import NewRoom from './components/NewRoom.js';
import Rooms from './components/Rooms.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NewRoom />
        <Rooms />
      </div>
    );
  }
}

export default App;
