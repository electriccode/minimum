import React, { Component } from 'react';

class NewRoom extends Component {
    render() {
        return (
            <div className="new-room">
                <h1>New Room</h1>
                <input type="text" />
                <button>Create</button>
            </div>
        );
    }
}

export default NewRoom;