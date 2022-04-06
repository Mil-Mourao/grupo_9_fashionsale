import { Component } from 'react'
import './userList.css'
import { DataGrid } from '@mui/x-data-grid';
import Pfp from "../../assets/pfp.png"
import { ThirtyFpsSelect } from '@mui/icons-material';

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

class UserList extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount = () => {
    fetch(`http://localhost:3000/api/users`)
      .then(res => res.json())
      .then(data => {
        // this.setState({ characters: data.results, maxPage: data.info.pages })
        console.log(data);
      })
      .catch(err => console.log(err))
  }

  componentDidUpdate = () => {
    fetch(`http://localhost:3000/api/users`)
      .then(res => res.json())
      .then(data => {
        this.setState({ characters: data.results })
      })
      .catch(err => console.log(err))
  }
  render(){
  return (<>
    <div className='userList'>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
      {this.data}
    </div>
  </>)
  }
}

export default UserList;