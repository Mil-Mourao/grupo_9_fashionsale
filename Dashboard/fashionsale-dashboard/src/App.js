import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Topbar from "./components/topbar/Topbar"
import Sidebar from "./components/sidebar/Sidebar"
import Home from "./pages/home/Home"
import './App.css'
import UserList from './pages/userList/UserList'
import ProductList from './pages/productList/ProductList'

function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          <Route exact path="/"> <Home /> </Route>
          <Route path="/users"> <UserList /> </Route>
          <Route path="/products"> <ProductList /> </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
