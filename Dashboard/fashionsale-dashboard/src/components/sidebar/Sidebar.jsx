import './sidebar.css'
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import Home from '../../pages/home/Home'

export default function Sidebar() {
  return (
    <div className='sidebar'>
        <div className="sidebarWrapper">
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Dashboard</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="sidebarListItem">
                        <Link to="/users">Usuarios</Link>
                    </li>
                    <li className="sidebarListItem">
                        <Link to="/products">Productos</Link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}
