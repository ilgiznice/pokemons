/**
 * Массив покемонов
 */
const pokemonIds = [1, 4, 7];

/**
 * Получает ID покемона и возвращает ссылку для запроса
 * @param {number} id 
 */
function url(id) {
  return `https://pokeapi.co/api/v2/pokemon/${id}`;
}

/**
 * Получение готовых данных и вывод на страницу
 * @param {Object} data 
 */
function renderPokemon(id, name, height, weight, image, types) {
  const div = $('<div>', { class: 'col-sm-4' });
  const img = $('<img>', { src: image });
  const link = $('<a>', { href: `detailed.html?id=${id}` });
  const divName = $('<div>', { text: name });
  const divTypes = $('<div>', { text: types.join(', ') });
  const spanHeight = $('<span>', { text: height });
  const spanWeight = $('<span>', { text: weight });
  const divHeightWeight = $('<div>');
  divHeightWeight.append(spanHeight).append('; ').append(spanWeight);
  link.append(divName);
  div
    .append(img)
    .append(link)
    .append(divTypes)
    .append(divHeightWeight);
  $('.pokemons').append(div);
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
  console.log(id, name, height, weight, image, types);
  renderPokemon(id, name, height, weight, image, types);
}

/**
 * Цикл по ID покемонов, запрос на получение данных
 */
for (let i = 0; i < pokemonIds.length; i++) {
  const id = pokemonIds[i];
  $.ajax({
    url: url(id),
    method: 'GET',
    success: function (response) {
      console.log(response);
      handleRequest(response);
    },
    error: function (err) {
      console.log(err);
    }
  })
}
