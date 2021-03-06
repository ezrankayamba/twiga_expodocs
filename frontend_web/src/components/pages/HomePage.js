import React, {Component} from 'react';
import {connect} from "react-redux";

@connect((state) => {
    return {
        user: state.auth.user,
        loggedIn: state.auth.loggedIn
    }
})
class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {file: null}
        this.onChange = this.onChange.bind(this)
    }

    onSubmit(data) {
        console.log("Submitted data: ", data)
    }

    onChange(e) {
        this.setState({file: e.target.files[0]})
    }

    render() {
        const {user, loggedIn} = this.props
        return (
            <div className="pt-3 row">
                <div className="col">
                    <h6>Dashboard here ...</h6>
                </div>
            </div>
        );
    }
}

export default HomePage;
