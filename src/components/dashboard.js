import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { logOut, getData } from '../config/firebase'

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userDetails: [],
        }
        this.logOutNow = this.logOutNow.bind(this);
    }

    componentDidMount() {
        this.getUserDetails()
    }

    async getUserDetails() {
        try {
            const result = await getData()
            console.log('result => ', result)
            this.setState({
                userDetails: result,
            })
        } catch (error) {
            console.log('Error in getData => ', error)
        }
    }

    logOutNow() {
        const showDashboard = this.props.showDashboard;
        logOut(showDashboard)
    }

    render() {
        const { userDetails } = this.state;
        return (
            <div className="container my-4">
                <div className="mx-auto col-lg-8 col-md-8 py-3 shadow">
                    <div className="row">
                        <div className="col-lg-8 col-md-8 col-12">
                            <span className="h2">Login Counter</span>
                        </div>
                        <div className="col-lg-4 col-md-4 col-12 text-lg-right text-md-right">
                            <button type="button" onClick={this.logOutNow} className="btn btn-primary btn-sm ml-auto mt-3 ">Log Out</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mt-3">
                            <p className="my-1"><span className="mr-2"><strong>Email:</strong></span>&quot;{userDetails.userEmail}&quot;</p>
                            <p className="my-1"><span className="mr-2"><strong>Login Count:</strong></span>&quot;{userDetails.userLogin}&quot;</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
