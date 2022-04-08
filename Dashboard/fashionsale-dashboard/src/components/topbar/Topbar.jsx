import React from 'react'
import "./topbar.css"
import {NotificationsNone, Language, Settings} from '@mui/icons-material'
import Logo from "../../assets/logoDesktop.png"

export default function Topbar() {
  return (
    <div className='topbar'>
        <div className="topbarWrapper">
            <div className="topLeft">
                <img src={Logo} alt="Logo Fashion Sale" className='logo' />
            </div>
            <div className="topRight">
                <div className="topbarIconContainer">
                    <NotificationsNone/>
                    <span className="topIconBadge">2</span>
                </div>
                <div className="topbarIconContainer">
                    <Language/>
                    <span className="topIconBadge">2</span>
                </div>
                <div className="topbarIconContainer">
                    <Settings/>
                </div>
                <img src="" alt="" className="topAvatar" />
            </div>
        </div>
    </div>
  )
}
