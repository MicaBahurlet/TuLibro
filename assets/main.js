
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

// -------------- contenedor de categorias ------------ //

const categoriesContainer = document.querySelector(".categorias");

// -------------- Html collection------------ //

const categoriesList = document.querySelectorAll(".category");

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


// Function para ocultar el btn Ver mas si no hay categoria seleccionada

const setShowMoreVisibility = () => {
    if(!AppState.activeFilter){
        btnVerMas.classList.remove("hidden");
    }
    btnVerMas.classList.add("hidden");
}





//-------------- FILTROS -------------------------------------- //

// Function para cambiar el estado de los botones de las categorias a active cuando selecciono
const cambiarBtnEstadoActivo = (selectedCategory) => {
    const categories = [...categoriesList];
    

    categories.forEach((categoryBtn) => {
        if(categoryBtn.dataset.category !== selectedCategory){
            categoryBtn.classList.remove("btnActive");
            return
        }
        categoryBtn.classList.add("btnActive"); // al btn que no cumple esta condicion agregale la clase btnActive
        
    })
}


//Function para cambiar el estado de filtro activo
const cambiarFiltroActivo = (btn) => {
    AppState.activeFilter = btn.dataset.category;
    cambiarBtnEstadoActivo(AppState.activeFilter);
    setShowMoreVisibility(AppState.activeFilter);
    
}

// Function Filtrar libros

const renderFilteredBooks = () => {
    const filteredBooks = librosData.filter(
        (libro) => libro.category === AppState.activeFilter
    );

    renderLibros(filteredBooks);
}

// Function para aplicar filtro
const appplyFilter = ({target}) => { //desestructurando la función del objeto dentro del parametro es más facil
    if(!isInactiveFilterBtn(target)) return;
    cambiarFiltroActivo(target);
    librosContainer.innerHTML = ""; // vaciar el contenedor para que se vuelva a renderizar. 
    if(AppState.activeFilter){
        renderFilteredBooks()
        AppState.currentLibrosIndex = 0;
        return;
    }
    renderLibros(AppState.libros[0]);
    
}

// -------------- Function para saber si el elemento que aprieto contiene .category y no esta activo------------ //

const isInactiveFilterBtn = (element) => {
    return (element.classList.contains("category") && !element.classList.contains("btnActive"));
}

// -------------- Function innit------------ //
const init = () => {
    renderLibros(AppState.libros [0]);
    btnVerMas.addEventListener("click", ShowMoreBooks)
    categoriesContainer.addEventListener("click", appplyFilter)
};

init();