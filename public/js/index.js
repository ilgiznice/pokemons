/**
 * Массив покемонов
 */
const pokemonIds = [1, 2, 3, 4, 5, 6, 7];

/**
 * Массив типов
 */
const types = [];

/**
 * Количество покемонов на странице
 * @type {number}
 */
const pageSize = 3;

/**
 * Генерация пагинации
 */
function generatePagination() {
  const pages = Math.ceil(pokemonIds.length / pageSize);
  for (let i = 1; i <= pages; i++) {
    const page = $('<li>', { text: i });
    $('.pagination').append(page);
  }
}

generatePagination();

/**
 * Получает ID покемона и возвращает ссылку для запроса
 * @param {number} id 
 */
function url(id) {
  return `https://pokeapi.co/api/v2/pokemon/${id}`;
}

/**
 * Получение готовых данных и вывод на страницу
 * @param id
 * @param name
 * @param height
 * @param weight
 * @param image
 * @param types
 */
function renderPokemon(id, name, height, weight, image, types) {
  const div = $('<div>', { class: 'col-sm-4 pokemon' });
  const img = $('<img>', { src: image });
  const link = $('<a>', { href: `detailed.html?id=${id}` });
  const divName = $('<div>', { text: name, class: 'name' });
  const divTypes = $('<div>', { text: types.join(', '), class: 'type' });
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
  $('.pokemon').slice(4).hide();
}

/**
 * Добавление новых уникальный опций в select
 * @param pokemonTypes
 */
function populateSelect(pokemonTypes) {
  for (let i = 0; i < pokemonTypes.length; i++) {
    const type = pokemonTypes[i];
    if (types.indexOf(type) === -1) {
      types.push(type);
      const option = $('<option>', { text: type, val: type });
      $('.types').append(option);
    }
  }
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
  populateSelect(types);
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

/**
 * Живой поиск
 */
$('.search').on('keyup', function () {
  const name = $(this).val().toLowerCase();
  const pokemonNames = $('.name');
  pokemonNames.parents('.col-sm-4').show();
  for (let i = 0; i < pokemonNames.length; i++) {
    const pokemon = $(pokemonNames[i]);
    const pokemonName = pokemon.text().toLowerCase();
    if (pokemonName.indexOf(name) === -1) {
      pokemon.parents('.col-sm-4').hide();
    }
  }
});

/**
 * Фильтрация по типам
 */
$('.types').on('change', function () {
  const type = $(this).val();
  const pokemonTypes = $('.type');
  pokemonTypes.parents('.col-sm-4').show();
  if (type === '') return;
  for (let i = 0; i < pokemonTypes.length; i++) {
    const pokemon = $(pokemonTypes[i]);
    const pokemonType = pokemon.text().split(', ');
    if (pokemonType.indexOf(type) === -1) {
      pokemon.parents('.col-sm-4').hide();
    }
  }
});

/**
 * Пагинация
 */
$('.pagination li').on('click', function () {
  const page = $(this).text();
  const start = (parseInt(page, 10) - 1) * pageSize;
  const finish = parseInt(page, 10) * pageSize;
  $('.pokemon')
    .hide()
    .slice(start, finish)
    .show();
});
