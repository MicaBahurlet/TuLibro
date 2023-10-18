
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

// -------------- Btn Ver más ------------ //

const btnVerMas = document.querySelector(".btnVerMas");

// -------------- Function para crear el html dinámico de los libros ------------ //

// También podría desestructurar para uno usar "libro.img"

// AGREGAR DATA-SET AL BUTTON 

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

// -------------- Function renderLibros ----------------------------------------- //

const renderLibros = (librosList) => {
    librosContainer.innerHTML += librosList.map(createProductTemplate).join(""); // usar + = para agregar a lo que ya esta con el btn ver más
}

// -------------- Function ShowMoreBooks -------------------------------------- //
// al apretar el boton me tengo que traer el siguiente array, pero tengo que ir desde el curren index
const ShowMoreBooks = () => {
   AppState.currentLibrosIndex+=1;
   
   let {libros, currentLibrosIndex} = AppState; // desestructuro para dejar de usar AppState.currentLibrosIndex por ejemplo

   renderLibros(libros[currentLibrosIndex]);

   if(currentLibrosIndex === AppState.librosLimit - 1){ // -1 porque nos devuelve el final. 
       btnVerMas.classList.add("hidden"); // ya tengo la classe desde css
       
   }
}




// -------------- Function innit------------ //
const init = () => {
    console.log(AppState.libros[0]);
    renderLibros(AppState.libros [0]);
    btnVerMas.addEventListener("click", ShowMoreBooks)
};

init();