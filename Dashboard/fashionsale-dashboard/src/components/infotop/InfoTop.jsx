import { useState,useEffect } from 'react'
import "./infotop.css"
import {PeopleOutlineRounded, ArrowUpwardOutlined, CategoryOutlined} from '@material-ui/icons';

export default function UserTotal() {
    const [products ,setProducts] = useState([]);
    const [users ,setUsers] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/api/products')
        .then(res => res.json())
        .then(data => setProducts(data))        
        ;
    },[])

    useEffect(() => {
        fetch('http://localhost:3000/api/users')
        .then(res => res.json())
        .then(data => setUsers(data))        
        
      },[])
    
  return (
    <div className="infoTop">
        <div className="infoItem">
            <span className="infoTitulo">Cantidad de Usuarios</span>
            <div className="containerNumero">
                <span className="infoNumero"> {users.meta.totalUsers} <PeopleOutlineRounded/></span>
            </div>
        </div>
        <div className="infoItem">
            <span className="infoTitulo">Cantidad de Productos</span>
            <div className="containerNumero">
                <span className="infoNumero">{products.meta.totalProducts} <ArrowUpwardOutlined/></span>
            </div>
        </div>
        <div className="infoItem">
            <span className="infoTitulo">Cantidad por Categorías</span>
            <div className="containerNumero">
                <span className="infoNumero">Hombre {products.meta.countByCategory.hombre} <CategoryOutlined/></span>
                
            </div>
            <div className="containerNumero">
            <span className="infoNumero">Mujer {products.meta.countByCategory.mujer}<CategoryOutlined/></span>
                
            </div>
            <div className="containerNumero">
            <span className="infoNumero">Accesorios {products.meta.countByCategory.accesorio}<CategoryOutlined/></span>
            </div>
        </div>        
    </div>
  )
}
