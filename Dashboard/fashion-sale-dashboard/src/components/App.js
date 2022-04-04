import { Component } from 'react';
import './App.css';
import { Link, Switch, Route } from 'react-router-dom';
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
      <Link to="/">Home</Link>
      <Link to="/users">Usuarios</Link>
      <Link to="/user/1">Usuario</Link>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
      </Switch>
    </>);
  }
}

export default App;