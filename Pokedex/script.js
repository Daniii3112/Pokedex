const pokemonName = document.querySelector(".pokemon-name");
const pokemonNumber = document.querySelector(".pokemon-number");
const pokemonImage = document.querySelector(".pokemon-img");
const form = document.querySelector(".form");
const input = document.querySelector(".input-search");
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const pokemonStats = document.getElementById("pokemon-stats");

let searchPokemon = 258;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  
  if(APIResponse.status === 200) { 
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading ...';
  
  const data = await fetchPokemon(pokemon);
  
  if (data) { 
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = `ID: ${data.id}`;
    pokemonImage.src = data.sprites.front_default;
    input.value = '';
    searchPokemon = data.id;

    // Mostrar estadísticas
    pokemonStats.innerHTML = `
      <p>Weight: ${data.weight}</p>
      <p>Height: ${data.height}</p>
      <p>HP: ${data.stats[0].base_stat}</p>
      <p>Attack: ${data.stats[1].base_stat}</p>
      <p>Defense: ${data.stats[2].base_stat}</p>
      <p>Special Attack: ${data.stats[3].base_stat}</p>
      <p>Special Defense: ${data.stats[4].base_stat}</p>
      <p>Speed: ${data.stats[5].base_stat}</p>
    `;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not Found :c';
    pokemonNumber.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

renderPokemon(searchPokemon);
