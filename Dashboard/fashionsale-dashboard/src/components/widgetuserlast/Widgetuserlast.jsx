import React from 'react'
import './widgetuserlast.css'

export default function Widgetuserlast() {
  return (
    <div className='widgetUser'>
        <span className="widgetUserTitle">Último Usuario!</span>
        <ul className="widgetUserList">
            <li className="widgetUserItem">
            <img src="" alt="" className='widgetUserImg'/>
            <div className="widgetUserInfo">
                <span className="widgetUserName"> Boaty McBoatFace </span>
                <span className="widgetUserEmail">Boats!@lancha.com</span>
            </div>
            </li>
        </ul>
    </div>
  )
}
