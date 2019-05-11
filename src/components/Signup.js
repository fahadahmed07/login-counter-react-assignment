import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { signUp } from '../config/firebase'

export default class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
        }
        this.signUpNow = this.signUpNow.bind(this);
    }

    signUpNow() {
        const { email, password } = this.state
        const showDashboard = this.props.showDashboard
        signUp(email, password, showDashboard)
    }

    render() {
        return (
            <div className="container my-4">
                <div className="mx-auto col-lg-6 col-md-6 py-3 shadow border">
                    <h2 className="h2">Sign Up</h2>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" onChange={(e) => this.setState({ email: e.target.value })} className="form-control" id="signUpEmail" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" onChange={(e) => this.setState({ password: e.target.value })} className="form-control" id="signUpPassword" placeholder="Password" />
                    </div>
                    <button type="button" onClick={this.signUpNow} className="btn btn-primary">Sign Up</button>
                </div>
            </div>
        );
    }
}
