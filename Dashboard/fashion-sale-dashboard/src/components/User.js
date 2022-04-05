import { Component } from 'react';


class User extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        console.log(this.props);
        return (
            <>
                <h1>User {
                    this.props.matches.params.id
                }</h1>
            </>
        )
    }
}

export default User;