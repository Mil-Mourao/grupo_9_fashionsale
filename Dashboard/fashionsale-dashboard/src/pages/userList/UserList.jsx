import React from 'react'
import './userList.css'
import { DataGrid } from '@mui/x-data-grid';
import Pfp from "../../assets/pfp.png"

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'user', headerName: 'First name', width: 130, renderCell: (params)=> {
    return (
      <div className='userListUser'>
        <img src={params.row.avatar} alt="" className='userListImg'/>
        {params.row.firstName}
      </div>
    )
  }},
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'email', headerName: 'Email', width: 180 },
  { field: 'admin', headerName: 'Admin', width: 130 },
];

const rows = [
  { id: 1, avatar: Pfp, lastName: 'Mourao', firstName: 'Milton', email: 'Milton@fashionsale.com', admin: true},
  { id: 2, avatar: Pfp, lastName: 'Wourao', firstName: 'Wilton', email: 'Wilton@elasnoihsaf.com', admin: false},
];

export default function UserList() {
  return (
    <div className='userList'>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  )
}
