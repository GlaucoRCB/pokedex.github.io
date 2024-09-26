const pokemonName = document.querySelector('.pokemon_name');
const pokemonImage = document.querySelector('.pokemon_image');
const pokemonType = document.querySelector('.pokemon_type');
const pokemonHeight = document.querySelector('.pokemon_height');
const pokemonWeight = document.querySelector('.pokemon_weight');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const btnPesquisar = document.querySelector('.pesquisar');
const buttonNext = document.querySelector('.btn-prev');
const buttonPrev = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        const types = data.types.map(typeInfo => typeInfo.type.name).join(', ');
        pokemonType.innerHTML = `Types: ${types}`;
        pokemonHeight.innerHTML = `Height: ${data.height / 10} M`;
        pokemonWeight.innerHTML = `Weight: ${data.weight / 10} KG`;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    }

    else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = "Not found!";
        pokemonType.innerHTML = "Not found!";
        pokemonHeight.innerHTML = "Not found!";
        pokemonWeight.innerHTML = "Not found!";
    }
}

btnPesquisar.addEventListener('click', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

buttonNext.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

renderPokemon(searchPokemon);
