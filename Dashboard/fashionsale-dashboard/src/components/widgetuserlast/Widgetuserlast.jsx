import { useState,useEffect } from 'react'
import './widgetuserlast.css'

export default function Widgetuserlast() {
  const [users,setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/users/lastOne')
    .then(res => res.json())
    .then(data => setUsers(data.data))        
    
  },[])

  return (
    <div className='widgetUser'>
        <span className="widgetUserTitle">Último Usuario!</span>
        <ul className="widgetUserList">
            <li className="widgetUserItem">
            <img src={users.avatar} alt="" className='widgetUserImg'/>
            <div className="widgetUserInfo">
                <span className="widgetUserName"> {users.firstName} {users.lastName} </span>
                <span className="widgetUserEmail">{users.email}</span>
            </div>
            </li>
        </ul>
    </div>
  )
}
