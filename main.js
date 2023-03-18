const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=40';

const pokemonList = document.getElementById('pokemon-list');
const pokemonInfo = document.getElementById('pokemon-info');

//Списак пакемонов
fetch(apiUrl)
	.then(response => response.json())
	.then(data => {
		data.results.forEach(pokemon => {
			const pokemonItem = document.createElement('div');
			pokemonItem.classList.add('pokemon-item');
			pokemonItem.textContent = pokemon.name;
			pokemonItem.addEventListener('click', () => {
				// Загрузка информации о выбранном покемоне
				fetch(pokemon.url)
					.then(response => response.json())
					.then(data => {
						const pokemonDetails = document.createElement('div');
						pokemonDetails.classList.add('pokemon-details');
						pokemonDetails.innerHTML = `
							<img src="${data.sprites.front_default}">
							<h2>${data.name}</h2>
							<p>Height: ${data.height / 10} m</p>
							<p>Weight: ${data.weight / 10} kg</p>
              <p>Type: ${data.types.map(type => type.type.name).join(', ')}</p>
              <p>Abilities: ${data.abilities.map(ability => ability.ability.name).join(', ')}</p>
						`;
						pokemonInfo.innerHTML = '';
						pokemonInfo.appendChild(pokemonDetails);
					});
			});
			pokemonList.appendChild(pokemonItem);
		});
	});
