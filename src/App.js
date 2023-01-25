// import logo from './logo.svg';
import React from 'react';
import './App.css';
import axios from 'axios';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import PokemonCards from './PokemonCards/PokemonCards';

function App() {

  const [types, setTypes] = React.useState([]);

  const [type, setType] = React.useState();

  var [typeName, setTypeName] = React.useState();

  React.useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/type')
      .then(res => {
        setTypes(res.data.results);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  function settingType(type, url){
    setType(url);
    setTypeName(type);
  }

  return (
    <div className="App">
      <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <img src='./assets/pokeapi-logo.png' className="img-fluid" alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title={type === undefined ? 'Type': typeName} id="basic-nav-dropdown">
              {types.map((type, index) => {
                return (
                  <NavDropdown.Item key={index} onClick={() => settingType(type.name, type.url)}>{type.name}</NavDropdown.Item>
                )
              })}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Container>
      <PokemonCards type={type}/>

    </Container>
    </div>
  );
}

export default App;
