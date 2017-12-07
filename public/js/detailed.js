const id = window.location.search.slice(1).split('=')[1];

const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

/**
 * Получение готовых данных и вывод на страницу
 * @param {Object} data 
 */
function renderPokemon(id, name, height, weight, image, types, stats) {
  const div = $('<div>', { class: 'col-sm-12' });
  const img = $('<img>', { src: image });
  const divName = $('<div>', { text: name });
  const divTypes = $('<div>', { text: types.join(', ') });
  const spanHeight = $('<span>', { text: height });
  const spanWeight = $('<span>', { text: weight });
  const divHeightWeight = $('<div>');
  divHeightWeight.append(spanHeight).append('; ').append(spanWeight);
  //
  const divSpeed = $('<div>', { text: stats.speed });
  const divSpecialDefense = $('<div>', { text: stats.specialDefense });
  const divSpecialAttack = $('<div>', { text: stats.specialAttack });
  const divDefense = $('<div>', { text: stats.defense });
  const divAttack = $('<div>', { text: `Атака РАВНА ${stats.attack}` });
  const divHp = $('<div>', { text: stats.hp });
  //
  div
    .append(img)
    .append(divName)
    .append(divTypes)
    .append(divHeightWeight)
    .append(divAttack)
    .append(divDefense)
    .append(divHp)
    .append(divSpeed)
    .append(divSpecialAttack)
    .append(divSpecialDefense);
  $('.pokemon').append(div);
}

/**
 * Получение покемона и парсинг данных
 * @param {Object} pokemon 
 */
function handleRequest(pokemon) {
  const id = pokemon.id;
  const name = pokemon.name;
  const height = pokemon.height;
  const weight = pokemon.weight;
  const image = pokemon.sprites.front_default;
  const types = [];
  for (let i = 0; i < pokemon.types.length; i++) {
    const type = pokemon.types[i];
    types.push(type.type.name);
  }
  const speed = pokemon.stats[0].base_stat;
  const specialDefense = pokemon.stats[1].base_stat;
  const specialAttack = pokemon.stats[2].base_stat;
  const defense = pokemon.stats[3].base_stat;
  const attack = pokemon.stats[4].base_stat;
  const hp = pokemon.stats[5].base_stat;
  const stats = {
    speed,
    specialDefense,
    specialAttack,
    defense,
    attack,
    hp
  };
  console.log(id, name, height, weight, image, types, stats);
  renderPokemon(id, name, height, weight, image, types, stats);
}

$.ajax({
  url: url,
  method: 'GET',
  success: function (response) {
    console.log(response);
    handleRequest(response);
  },
  error: function (err) {
    console.log(err);
  }
})
