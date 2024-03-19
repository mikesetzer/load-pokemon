// You can retrieve the pokemons by calling the following API
// Make sure to replace limit and offset with the appropriate values
// https://pokeapi.co/api/v2/pokemon?limit=5&offset=0
import React, {useState, useEffect} from 'react';

const PokemonList = () => {
  const [displayedPokemon, setDisplayedPokemon] = useState([]);
  const [pokemonOffset, setPokemonOffset] = useState(0);
  const [limit, setLimit] = useState(0);

  const getPokemon = () => {
      fetch(`https://pokeapi.co/api/v2/pokemon?limit=5&offset=${pokemonOffset}`)
        .then(res => res.json())
        .then(data => {
          setDisplayedPokemon(prev => [...prev, ...data.results])
          setPokemonOffset(prevOffset => prevOffset + data.results.length); //Inc offset
          setLimit(prev => data.count)
          console.log(displayedPokemon);
        })

  }
  useEffect(() => {  
    getPokemon();
  }, []);
  
  

  return (
    <div>
      <ul>
        {displayedPokemon.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
      <p>Displaying {pokemonOffset} of {limit} results</p>
      {(pokemonOffset < limit) ? <button onClick={getPokemon}>Load more</button> : ''}
        
    </div>
  )
};

export default PokemonList;
