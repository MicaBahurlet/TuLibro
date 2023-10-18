
// -------------- MENÚ HAMBURGUESA ------------ //

const nav = document.getElementById ("NavBar");
const abrir = document.getElementById ("abrir");
const cerrar = document.getElementById ("cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
});

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})

// -------------- Libros container ------------ //

const librosContainer = document.querySelector(".librosContainer");

// -------------- Function para crear el html de los libros ------------ //

createProductTemplate = (libro) => {
    return `
        <div class="libroCard">
            <img src="${libro.img}" alt="${libro.name}">
            <h3>${libro.name}</h3>
            <p>${libro.bid}€</p>
            <button class="btn-categoria">Comprar</button>
        </div>
    `
    
}

// -------------- Function renderLibros ------------ //

const renderLibros = (librosList) => {
    librosContainer.innerHTML = librosList.map(createProductTemplate).join("");
}


// -------------- Function innit------------ //
const init = () => {
    renderLibros(librosData);
};

init();