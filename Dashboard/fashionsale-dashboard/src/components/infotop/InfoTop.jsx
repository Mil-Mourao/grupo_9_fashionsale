import { useState,useEffect } from 'react'
import "./infotop.css"
import {PeopleOutlineRounded, ArrowUpwardOutlined, CategoryOutlined} from '@mui/icons-material';

export default function UserTotal() {
    const [products ,setProducts] = useState([]);
    const [users ,setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/products')
        .then(res => res.json())
        .then(data => setProducts(data))        
    },[])

    useEffect(() => {
        fetch('http://localhost:3000/api/users')
        .then(res => res.json())
        .then(data => setUsers(data))        
        
      },[])
    
  return (
    <div className="infoTop">
        {users ? 
        <div className="infoItem">
            <span className="infoTitulo">Cantidad de Usuarios</span>
            <div className="containerNumero">
                <span className="infoNumero"> {users.totalUsers} <PeopleOutlineRounded/></span>
            </div>
        </div> : null}

        {products ?  
          
        <div className="infoItem">
            <span className="infoTitulo">Cantidad de Productos</span>
            <div className="containerNumero">
                <span className="infoNumero">{products.totalProducts} <ArrowUpwardOutlined/></span>
            </div>
        </div>
        : null}

        {products.countByCategory ? 
         <div className="infoItem">
            <span className="infoTitulo">Cantidad por Categorías</span>
            <div className="containerNumero">
                <span className="infoNumero">Hombre {products.countByCategory.hombre} <CategoryOutlined/></span>
                
            </div>
            <div className="containerNumero">
            <span className="infoNumero">Mujer {products.countByCategory.mujer}<CategoryOutlined/></span>
                
            </div>
            <div className="containerNumero">
            <span className="infoNumero">Accesorios {products.countByCategory.accesorio}<CategoryOutlined/></span>
            </div>
        </div> : null }
        
    </div> 
  )
}
