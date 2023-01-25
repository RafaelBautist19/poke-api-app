import React from "react";
import axios from "axios";
import { Col, Row, Card } from "react-bootstrap";
import "./PokemonCards.css";
import { Modal } from "react-bootstrap";

function PokemonCards(props){

    const [pokemons, setPokemons] = React.useState([]);

    const [show, setShow] = React.useState(false);

    const [pokemon, setPokemon] = React.useState([]);

    const [pokemonInfo, setPokemonInfo] = React.useState([]);

    const [pokemonSpecies, setPokemonSpecies] = React.useState([]);

    const [pokeSpecieInfo, setpokeSpecieInfo] = React.useState([]);


    function handleShow(pokemon){
        setPokemon(pokemon);
        setShow(true);
    }

    const handleClose = () => setShow(false);

    React.useEffect(() => {
        axios.get(props.type)
        .then(res => {
            setPokemons(res.data.pokemon);
            console.log(pokemons);
        })
        .catch(err => {
            console.log(err);
        })
    }, [props.type]);

    React.useEffect(() => {
        axios.get(pokemon)
        .then(res => {
            setPokemonInfo(res.data);
            setPokemonSpecies(res.data.species.url);
        })
        .catch(err => {
            console.log(err);
        })
    }, [pokemon]);

    React.useEffect(() => {
        axios.get(pokemonSpecies)
        .then(res => {
            setpokeSpecieInfo(res.data);
            console.log(res.data.flavor_text_entries[1].flavor_text);
        })
        .catch(err => {
            console.log(err);
        })
    }, [pokemonSpecies]);





    return(
    <div>
        <Row className="my-3">
            {pokemons.map((pokemon, index) => {
                return(
                    <Col key={index} xs={11} md={6} lg={4} xl={3}>
                        <Card className="my-3" onClick={() => handleShow(pokemon.pokemon.url)}>
                            <Card.Header className="text-center">
                                <Card.Img className="img-fluid" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokemon.url.split('/')[pokemon.pokemon.url.split('/').length - 2]}.png`}/>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title className="text-center">{pokemon.pokemon.name}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                )
            })}
        </Row>
        <Modal show={show} onHide={handleClose} size="xl" >
        
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <Row className="g-0">
                {/* Pokedex */}
                    <Col xs={11} md={6} className="pokedexLeft">
                        <Card className="pokeName">
                            <Card.Body className="p-0">
                                <Row>
                                    <Col xs={{offset:1, span:6}} lg={{offset:1, span:6}}>{pokemonInfo.name}</Col>
                                    <Col xs={{offset:1, span:4}} lg={{offset:1, span:4}}>no.{pokemonInfo.id}</Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        <Card className="pokeImage">
                            <Card.Body className="p-0">
                                <Card.Img className="" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonInfo.id}.png`}/>
                            </Card.Body>
                        </Card>
                        <Card className="pokeName">
                            <Card.Body className="pokeSpecie">
                                <p>
                                    {pokeSpecieInfo.flavor_text_entries && pokeSpecieInfo.flavor_text_entries[1].flavor_text}
                                </p>
                            </Card.Body>
                        </Card> 
                    </Col>
                    {/* Pokemon Info */}
                    <Col xs={11} md={6} className="pokedexRight">
                        <Card>
                                <Row className="g-0">
                                    <Col xs={11} md={6} lg={6} className="text-center">
                                        <Card className="pokeStats">
                                            <Card.Body style={{paddingLeft:0, marginTop:0}}>
                                                {pokemonInfo.stats && pokemonInfo.stats.map((stat, index) => {
                                                    return(
                                                        <ul className="leaders">
                                                            <li><span>{stat.stat.name}</span> <span>{stat.base_stat}</span></li>
                                                        </ul>
                                                    )
                                                })}
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col xs={11} md={6} lg={5} className="text-center" style={{height:'auto'}}>
                                        <Card className="pokeType">
                                            <Card.Header>
                                                Types
                                            </Card.Header>
                                            <Card.Body style={{paddingLeft:0, marginTop:0}}>
                                                {pokemonInfo.types && pokemonInfo.types.map((type, index) => {
                                                        return(
                                                            <Card>
                                                            {/* Change Background color by type */}
                                                                <Card.Body className="pokeTypeInfo" style={{backgroundColor: type.type.name === "grass" ? "#78C850" : type.type.name === "fire" ? "#F08030" : type.type.name === "water" ? "#6890F0" : type.type.name === "bug" ? "#A8B820" : type.type.name === "normal" ? "#A8A878" : type.type.name === "poison" ? "#A040A0" : type.type.name === "electric" ? "#F8D030" : type.type.name === "ground" ? "#E0C068" : type.type.name === "fairy" ? "#EE99AC" : type.type.name === "fighting" ? "#C03028" : type.type.name === "psychic" ? "#F85888" : type.type.name === "rock" ? "#B8A038" : type.type.name === "ghost" ? "#705898" : type.type.name === "ice" ? "#98D8D8" : type.type.name === "dragon" ? "#7038F8" : type.type.name === "dark" ? "#705848" : type.type.name === "steel" ? "#B8B8D0" : type.type.name === "flying" ? "#A890F0" : "white"}}>
                                                                    {type.type.name}
                                                                </Card.Body>
                                                            </Card>
                                                        )
                                                    })}
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                        </Card>
                    </Col>

                </Row>
            </Modal.Body>
        </Modal>
    </div>
    )
}

export default PokemonCards;