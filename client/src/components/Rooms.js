import React, { Component } from 'react';

class Rooms extends Component {

    constructor() {
        super();
        this.state = {
            rooms: []
        }
    }

    componentWillMount() {
        this.props.socket.emit('get all rooms');
        this.props.socket.on('update all rooms', (rooms) => {
            console.log('updated rooms received', rooms);
            this.setState({
                rooms: rooms
            })
        });
        this.props.socket.on('refresh all rooms', () => {
            console.log('getting updated rooms');
            this.props.socket.emit('get all rooms');
        });
    }

    removeAllRooms = () => {
        this.props.socket.emit('remove all rooms', this.props.socket.id);
    }

    render() {
        return (
            <div className="rooms">
                <h1>Available Rooms</h1>
                <ul>
                    {this.state.rooms.map((room, index) => {
                        return <li key={index}>{room.roomName}</li>;
                    })}
                </ul>
                <button onClick={this.removeAllRooms}>Remove all rooms</button>
            </div>
        );
    }
}

export default Rooms;