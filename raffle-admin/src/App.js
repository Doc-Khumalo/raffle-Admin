import React, { Component } from 'react';
import CompetitionTime from '../src/CompetitionTime/CompetitionTime.component';
import logo from './logo.svg';
import './App.css';
import Login from './Login/Login.component';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">DailyChoppins Form & Results Scheduling</h1>
        </header>
        <Login />
      </div>
    );
  }
}

export default App;
