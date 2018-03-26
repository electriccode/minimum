import React, { Component } from 'react';

class NewRoom extends Component {

    constructor() {
        super();
        this.state = {
            duplicateRoom: false
        }
    }

    componentWillMount() {
        this.props.socket.on('duplicate room', () => {
            this.setState({
                duplicateRoom: true
            });
        })

        this.props.socket.on('room ok', () => {
            this.setState({
                duplicateRoom: false
            });
        })
    }

    createRoom = () => {
        this.props.socket.emit('create room', this.state.roomName, this.props.socketId);
    }

    updateRoom = (event) => {
        this.setState({
            roomName: event.target.value
        });
    }

    render() {
        var errorStyle = {
            fontSize: "10px",
            padding: "10px",
            color: "red"
        }
        return (
            <div className="new-room">
                <h1>New Room</h1>
                <input onChange={this.updateRoom} type="text" />
                <button onClick={this.createRoom}>Create</button>
                {this.state.duplicateRoom ? <div style={errorStyle}>Room name exists, try another room name.</div> : null}
            </div>
        );
    }
}

export default NewRoom;