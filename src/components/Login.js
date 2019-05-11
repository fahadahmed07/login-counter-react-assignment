import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { login } from '../config/firebase'

export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
        }
        this.login = this.login.bind(this);
    }

    login() {
        const { email, password } = this.state;
        const showDashboard = this.props.showDashboard;
        login(email, password, showDashboard)
    }

    render() {
        return (
            <div className="container my-4">
                <div className="mx-auto col-lg-6 col-md-6 py-3 shadow border">
                    <h2 className="h2">Log In</h2>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" onChange={(e) => this.setState({ email: e.target.value })} className="form-control" id="email" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" onChange={(e) => this.setState({ password: e.target.value })} className="form-control" id="password" placeholder="Password" />
                    </div>
                    <button type="button" onClick={this.login} className="btn btn-primary">Login</button>
                </div>
            </div>
        );
    }
}
