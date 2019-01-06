import React, { Component } from 'react';
import './App.css';
import Community from './containers/Community';
import Admin from './components/Admin';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Community/>
        {/* <Admin/> */}
      </div>
    );
  }
}

export default App;
