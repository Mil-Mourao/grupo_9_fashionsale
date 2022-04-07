import { useState,useEffect,Fragment } from 'react'
import './userList.css'


export default function ProductList() {
  const [users,setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/users/')
    .then(res => res.json())
    .then(data => setUsers(data.data))        
    
  },[])


  return (
    <Fragment>
    <div className='userList'>
        <ul className='userRowContainer'>
          { users && users.map((user, i) => 
            <li key={i} className='userRow'>               
                <span className='userId'> {user.id} </span>
                <span className='userLN'> {user.lastName} </span>
                <span className='userFN'> {user.firstName} </span>
                <span className='userEmail'> {user.email} </span>
                <span><a href={user.detail} className='userDetail'> Detalle </a></span>
            </li>
              )}  
        </ul> 
      </div>
    </Fragment>
  )
}