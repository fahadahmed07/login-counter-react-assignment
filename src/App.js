import React, { Component } from 'react';
import Login from './components/Login'
import SignUp from './components/Signup';
import Dashboard from './components/dashboard';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLogin: false
    }
    this.showDashboard = this.showDashboard.bind(this)
  }

  showDashboard(isLogin) {
    this.setState({ isLogin: isLogin });
  }

  render() {
    const { isLogin } = this.state
    return (
      <div className="container">
        {!isLogin ? <div> <Login showDashboard={this.showDashboard} /> <SignUp showDashboard={this.showDashboard} /> </div> : <Dashboard  showDashboard={this.showDashboard}/>}
      </div>
    );
  }
}

export default App;
