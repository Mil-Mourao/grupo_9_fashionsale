import { React, Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import SideBar from './SideBar'
import './App.css';
import Home from './Home'
import Users from './Users'
import User from './User'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (<>
      <div id="wrapper">

        <SideBar />
      </div>
    </>);
  }
}

export default App;