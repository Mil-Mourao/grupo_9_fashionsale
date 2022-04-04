import { Component } from 'react';
import { useParams } from 'react-router-dom'

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <>
                <h1>User {id}</h1>
            </>
        )
    }
}

export default User;