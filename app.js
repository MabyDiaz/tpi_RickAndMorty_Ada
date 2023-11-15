const root = document.getElementById("root");
const characters = document.getElementById("characters");
let page = 1;
let total = 0;

// Filtros
const allCharacters = document.getElementById("allCharacters");
const women = document.getElementById("women");
const men = document.getElementById("men");
const genderless = document.getElementById("genderless");
const unknown = document.getElementById("unknown");

//Paginado
const currentPage = document.getElementById("current-page");
const nextPage = document.getElementById("next-page");
const prevPage = document.getElementById("prev-page");
const pages = document.getElementById("pages");
const firstPage = document.getElementById("first-page");
const lastPage = document.getElementById("last-page");

const getData = async () => {
  const URL = `https://rickandmortyapi.com/api/character?page=${page}`;

  const response = await fetch(URL);
  //console.log(response);

  const json = await response.json();
  console.log(json.results);

  //1. Setear en qué página estamos
  total = json.info.pages;

  //2. Hacer una funcion que renderice las cards
  printData(json.results);

  console.log(total);
  console.log(json);
  console.log(json.results);
  console.log(json.results[0].name);

  //3. Actualizar el paginado
  updatePagination();

  data = json;
  return json;
};

getData(page);
let data = {};

const printData = (arr) => {
  //console.log(arr);
  let card = "";

  characters.innerHTML = `<span class="highlight-text">${arr.length}</span>`;
  arr.forEach((character) => {
    //console.log(character);
    card += `
      <div>
        <div class="card">
            <div class="card-image">
                <img src="${character.image}" alt="${character.name}">
            </div>
            <div class="card-content">
                <p>Nombre: ${character.name}</p>               
                <p>Género: ${
                  character.gender === "Female"
                    ? "Mujer"
                    : "" || character.gender === "Male"
                    ? "Hombre"
                    : "" || character.gender === "Genderless"
                    ? "Sin Género"
                    : "" || character.gender === "unknown"
                    ? "No se sabe"
                    : ""
                }</p>
                <p>Especies: ${character.species}</p>
                <p>Estatus: ${character.status}</p>
                <p>Origen: ${character.origin.name}</p>
                <p>Locación: ${character.location.name}</p>               
            </div>
            <div>
            <a class="card-footer" href="https://rickandmortyapi.com/api/character?id=${
              character.id
            }" target="_blank">Ver más...</a>
            </div>
        </div>
    </div>`;
  });
  root.innerHTML = card;
};

const updatePagination = () => {
  if (page <= 1) {
    prevPage.disabled = true;
    firstPage.disabled = true;
  } else {
    prevPage.disabled = false;
    firstPage.disabled = false;
  }

  if (page === total) {
    lastPage.disabled = true;
    nextPage.disabled = true;
  } else {
    lastPage.disabled = false;
    nextPage.disabled = false;
  }

  currentPage.innerHTML = page;
  pages.innerHTML = total;
};

const pagination = async () => {
  const result = await getData();

  nextPage.addEventListener("click", () => {
    page += 1;
    getData();
  });

  prevPage.addEventListener("click", () => {
    page -= 1;
    getData();
  });

  firstPage.addEventListener("click", () => {
    if (page >= 2) {
      page = 1;
      getData();
    }
  });

  lastPage.addEventListener("click", () => {
    if (page < result.info.pages) {
      page = result.info.pages;
      getData();
    }
  });

  // Ir a una página específica
  const goToPageButton = document.getElementById("go-to-page");
  const pageInput = document.getElementById("page-input");

  goToPageButton.addEventListener("click", () => {
    const pageNumber = parseInt(pageInput.value, 10);
    if (pageNumber >= 1 && pageNumber <= result.info.pages) {
      page = pageNumber;
      getData();
      pageInput.value = "";
    } else {
      alert("Por favor, ingrese un número de página válido.");
    }
  });

  updatePagination();
};

// Filtros
women.addEventListener("click", () => {
  const arr = data.results;
  const arrWomen = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].gender === "Female") {
      arrWomen.push(arr[i]);
    }
  }

  printData(arrWomen);
});

men.addEventListener("click", () => {
  const arr = data.results;
  const arrMen = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].gender === "Male") {
      arrMen.push(arr[i]);
    }
  }

  printData(arrMen);
});

genderless.addEventListener("click", () => {
  const arr = data.results;
  const arrGenderless = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].gender === "Genderless") {
      arrGenderless.push(arr[i]);
    }
  }

  printData(arrGenderless);
});

unknown.addEventListener("click", () => {
  const arr = data.results;
  const arrUnknown = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].gender === "unknown") {
      arrUnknown.push(arr[i]);
    }
  }

  printData(arrUnknown);
});

allCharacters.addEventListener("click", () => {
  const arr = data.results;

  printData(arr);
});

pagination();
