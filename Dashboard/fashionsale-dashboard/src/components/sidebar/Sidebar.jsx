import './sidebar.css'

export default function Sidebar() {
  return (
    <div className='sidebar'>
        <div className="sidebarWrapper">
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Dashboard</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        Inicio
                    </li>
                    <li className="sidebarListItem">
                        Usuarios
                    </li>
                    <li className="sidebarListItem">
                        Productos
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}
