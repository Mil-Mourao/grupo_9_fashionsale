import { useState,useEffect } from 'react'
import './widgetprodlast.css'

export default function Widgetprodlast() {
  const [products,setProducts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/products/lastOne')
    .then(res => res.json())
    .then(data => setProducts(data.data))        
  },[])

  return (
    <div className='widgetProd'>
        <h3 className="widgetProdTitle">Último ingreso</h3>
        <ul className="widgetProdList">
            <li className="widgetProdItem">
            <img src={products.images} alt="" className='widgetProdImg'/>
            <div className="widgetProdInfo">
                <span className="widgetProdName"> ID: {products.id} </span>
                <span className="widgetProdID"> Nombre: {products.name} </span>
                <span className="widgetProdID"> Precio: ${products.price} </span>
            </div>
            </li>
        </ul>
    </div>
  )
}
