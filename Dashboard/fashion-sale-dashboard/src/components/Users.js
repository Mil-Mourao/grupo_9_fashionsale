import { Component } from 'react';
import './App.css';
import { Avatar, Switch, Button } from '@mui/material/';


//label para el switch
const label = { inputProps: { 'aria-label': 'Switch demo' } };

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'dark',
      page: 1,
      characters: [],
      maxPage: 0
    }
  }
  //Función para pasar de modo día a modo noche
  changeTheme = () => {
    return this.state.theme === 'default' ? this.setState({ theme: 'dark' }) : this.setState({ theme: 'default' })
  }

  //Invocamos a la api
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

  //función para pasar a la siguiente página
  nextPage() {
    this.state.page < this.state.maxPage ? this.setState({ page: this.state.page + 1 }) : this.setState({ page: 1 })
  }

  //función para pasar a la anterior página
  previousPage() {
    this.state.page > 1 ? this.setState({ page: this.state.page - 1 }) : this.setState({ page: 42 })
  }
  render() {
    return (<>
      <div className={`theme-${this.state.theme}`} >
        <h1>{this.props.title}</h1>
        <p>page: {this.state.page}</p>
        <Switch {...label} defaultChecked onClick={() => this.changeTheme()} />
        <ul className={'userBox'}>
          {this.state.characters && this.state.characters.map(character => (
            <li key={character.id} className={'userRow'}>
              <Avatar className={'userName'} alt={character.name} src={character.image} />
              <p className={'userName'}>{character.name}</p>
              <p className={'userName'}>{character.species}</p>
              <p className={'userName'}>{character.status}</p>
              <a href={character.origin.url} className={'userName'}>Origin</a>
            </li>
          ))}
        </ul>
        <div className={'paginator'}>
          <Button variant="contained" onClick={() => this.previousPage()}>Anterior</Button>
          <Button variant="contained" onClick={() => this.nextPage()}>Siguiente</Button>
        </div>
      </div>
    </>);
  }
}

export default Users;