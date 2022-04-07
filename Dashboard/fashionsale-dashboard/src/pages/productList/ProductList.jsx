import { useState,useEffect,Fragment } from 'react'
import './productList.css'


export default function ProductList() {
  const [products,setProducts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/products/')
    .then(res => res.json())
    .then(data => setProducts(data.data))        
    
  },[])


  return (
    <Fragment>
    <div className='userList'>
        <ul className='userRowContainer'>
          { products && products.map((product, i) => 
            <li key={i} className='userRow'>               
                <span className='userId'> {product.id} </span>
                <span className='userLN'> {product.name} </span>
                <span className='userFN'> {product.price} </span>
                <span className='userEmail'> {product.description} </span>
                <span><a href={product.detail} className='userDetail'> Detalle </a></span>
            </li>
              )}  
        </ul> 
      </div>
    </Fragment>
  )
}