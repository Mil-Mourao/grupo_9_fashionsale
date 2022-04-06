import React from 'react'
import "./infotop.css"
import {PeopleOutlineRounded, ArrowUpwardOutlined, CategoryOutlined} from '@material-ui/icons';

export default function UserTotal() {
  return (
    <div className="infoTop">
        <div className="infoItem">
            <span className="infoTitulo">Cantidad de Usuarios</span>
            <div className="containerNumero">
                <span className="infoNumero">500 <PeopleOutlineRounded/></span>
            </div>
        </div>
        <div className="infoItem">
            <span className="infoTitulo">Cantidad de Productos</span>
            <div className="containerNumero">
                <span className="infoNumero">500 <ArrowUpwardOutlined/></span>
            </div>
        </div>
        <div className="infoItem">
            <span className="infoTitulo">Cantidad de Categorías</span>
            <div className="containerNumero">
                <span className="infoNumero">500 <CategoryOutlined/></span>
            </div>
        </div>        
    </div>
  )
}
