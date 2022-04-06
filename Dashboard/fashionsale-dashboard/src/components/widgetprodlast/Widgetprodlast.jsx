import React from 'react'
import './widgetprodlast.css'

export default function Widgetprodlast() {
  return (
    <div className='widgetProd'>
        <h3 className="widgetProdTitle">Último ingreso</h3>
        <ul className="widgetProdList">
            <li className="widgetProdItem">
            <img src="" alt="" className='widgetProdImg'/>
            <div className="widgetProdInfo">
                <span className="widgetProdName"> Marinero </span>
                <span className="widgetProdID">Drippy</span>
            </div>
            </li>
        </ul>
    </div>
  )
}
