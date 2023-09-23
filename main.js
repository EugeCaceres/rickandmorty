//Variables
const container = document.getElementById("container")
const firstBtn = document.getElementById("first");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const lastBtn = document.getElementById("last");
const totalChr = document.getElementById("totalChr");
const genderFilterSelect = document.getElementById("genderFilter");
const selectedCard = document.querySelector('.card.selected');
const pageInfo = document.getElementById("currentPageInfo");

let currentPage = 1;
let totalPages = 42;
let currentGFilter = "all";



const renderChr = (characters) => {
  container.innerHTML = "";
  characters.forEach((character) => {
    container.innerHTML += `
            <div class="card">
             
              <div>
                <img src="${character.image}" alt="${character.name}">
              </div>
              <h2>${character.name}</h2>
              <div class="see-btn"> 
                <button class="btn-see" onclick="seeDetails('${character.url}')">Ver más</button>
              </div>
            </div>
          `;
  });
};
const seeDetails = (characterUrl) => {
  if (selectedCard) {
    selectedCard.classList.remove('selected');
  }
  fetch(characterUrl)
    .then((res) => res.json())
    .then((character) => {
      container.innerHTML = `
            <div class="card description-card">
                <h2>${character.name}</h2>
                <div class="imgDetails">
                  <img src="${character.image}" alt="${character.name}">
                </div>
                <div class="chrDetails">
                  <p>Status: ${character.status}</p>
                  <p>Especie: ${character.species}</p>
                  <p>Origen: ${character.origin.name}</p>
                  <p>Episode: ${character.episode.length}</p>
                </div>
                <div class="see-btn"> 
                <button class="btn-see" onclick="returnChr()">Volver</button>
                
                </div>
              </div>
            `;
    });
};
const returnChr = () => {
  getChr(currentPage, currentGFilter)
}
const updatePageInfo = () => {
    pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
  };
const updateButtons = () => {
  firstBtn.disabled = currentPage === 1;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
  lastBtn.disabled = currentPage === totalPages;
};

const getChr = (pageNumber, genderFilter) => {
  container.innerHTML = "";

  if (genderFilter && genderFilter !== "all") {
    genderFilter = `&gender=${genderFilter}`;
  }
  else {
    genderFilter = "";
  }
  fetch(`https://rickandmortyapi.com/api/character/?page=${pageNumber}${genderFilter}`)
    .then(res => res.json())
    .then((data) => {
      totalPages = data.info.pages;
      totalChr.textContent = data.info.count;
      renderChr(data.results);
      updateButtons();
      updatePageInfo()
    })
}

//Eventos btn y filtro
firstBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage = 1;
    getChr(currentPage, currentGFilter);
  }
});
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    getChr(currentPage, currentGFilter);
  }
});
nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    getChr(currentPage, currentGFilter);
  }
});
lastBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage = totalPages;
    getChr(currentPage, currentGFilter);
  }
});
genderFilterSelect.addEventListener("change", () => {
  currentGFilter = genderFilterSelect.value;
  getChr(currentPage, currentGFilter)
});

getChr(currentPage, currentGFilter);
updatePageInfo();   
