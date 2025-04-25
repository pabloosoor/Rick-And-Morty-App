const characterList = document.getElementById("character-list");
const searchInput = document.getElementById("search"); 

let characters = [];

// Función para obtener personajes desde la API
async function fetchCharacters() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character/");
    const data = await response.json();
    characters = data.results;
    displayCharacters(characters);
  } catch (error) {
    characterList.innerHTML = "<p>Error al cargar los personajes.</p>";
    console.error("Error al obtener personajes:", error);
  }
}

// Función para mostrar personajes en el HTML
function displayCharacters(personajes) {
  characterList.innerHTML = ""; 
  personajes.forEach((personaje) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${personaje.image}" alt="${personaje.name}" />
      <h3>${personaje.name}</h3>
      <p><strong>Especie:</strong> ${personaje.species}</p>
      <p><strong>Estado:</strong> ${personaje.status}</p>
      <p><strong>Género:</strong> ${personaje.gender}</p>
      <p><strong>Origen:</strong> ${personaje.origin.name}</p>
      <p><strong>Ubicación actual:</strong> ${personaje.location.name}</p>
      <p><strong>Episodios:</strong> ${personaje.episode.length}</p>
    `;

    characterList.appendChild(card);
  });
}

// Función de búsqueda (filtrar personajes)
function searchCharacters(event) {
  const query = event.target.value.toLowerCase();  
  const filteredCharacters = characters.filter(personaje =>
    personaje.name.toLowerCase().includes(query)  
  );
  displayCharacters(filteredCharacters);  
}

// Cargar personajes al inicio
fetchCharacters();

// Agregar el evento de búsqueda en tiempo real
searchInput.addEventListener("input", searchCharacters);
