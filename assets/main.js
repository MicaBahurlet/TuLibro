
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

// -------------- Carrito   ------------ //

const carritoBtn = document.querySelector(".cartIcon"); 

const cartLibros = document.querySelector(".cart");


//--------------- html colection para agregar al carrito -----------------------//

const cartBurbuja = document.querySelector(".cartIndicadorBurbuja"); // el número de la burbuja

const total = document.querySelector(".total"); // total precio

const btnComprar = document.querySelector(".btn-comprar"); // btn comprar

const btnDelete = document.querySelector(".btn-delete"); // btn vaciar carrito

const librosCart = document.querySelector(".cart-container"); // contenedor de carrito




let cart = []; // array vacio del carrito para guardar los libros comprados. 






// -------------- Function para crear el html dinámico de los libros ------------ //

// También podría desestructurar para uno usar "libro.img"

// AGREGAR DATA-SET AL BUTTON 

createProductTemplate = (libro) => {
    return `
        <div class="libroCard">
            <img src="${libro.img}" alt="${libro.name}">
            <h3>${libro.name}</h3>
            <p>${libro.bid}€</p>
            <button class="btnComprarLibro"
                data-id="${libro.id}"
                data-name="${libro.name}"
                data-bid="${libro.bid}"
                data-img="${libro.img}"
            >Comprar</button>
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

// -------------- Function para mostrar el carrito ------------ //

const MostrarCarrito = () => {
    cartLibros.classList.toggle("abrirCarrito"); // toggle para que se prenda y se apague/// NO LLEVA .
    // acá después podría traer un overlay para un lindo efecto al abir el carrito. 
};


// -------------- lógica agregar productos ------------ //

// crear template del libro en el cart

const createCartLibroTemplate =  (cartLibro) =>{
   const {id, name, bid, img, quantity} = cartLibro; // desestructurar ésta vez
   
    return `
        <div class="cart-item">
            <img src="${img}" alt="${name}">
            <div class="item-info">
                <h3 class="item-title">${name}</h3>
                <p class="item-bid">${bid}€</p>
            </div>
            <div class="item-handler">
                <span class="quantity-handler menos" data.id="${id}" >-</span>
                <span class="item-quantity">${quantity}</span>
                <span class="quantity-handler mas" data.id="${id}" >+</span>
            </div>

        </div>    
    `
}


// render carrito
const renderCart = () => {
    if (!cart.length){
        librosCart.innerHTML = `<p class="emptyCart">COMPARLOOO!</p>`;
        return;
    }

    librosCart.innerHTML = cart.map(createCartLibroTemplate).join("");
}



// Functiom para agregar libro al carrito

const agregarLibros = (e) =>{
  if (!e.target.classList.contains("btnComprarLibro")) return; 
  const libros = e.target.dataset; //string del libro. 
  
  
  if (siExisteLibro(libros.id)) {  // si el libro ya existe en el carrito sumale uno, sino, else, creame el libro. 
        addLibroToCart(libros)
    }else {
        createCartLibro(libros);
    }
  
    renderCart();

    console.log(cart);
}

// function para agregar un libro al carrito
const addLibroToCart = (libros) => {
    cart = cart.map ((cartLibro) =>
        cartLibro.id === libros.id ? {...cartLibro, quantity: cartLibro.quantity + 1} : cartLibro 
    );
}

// function para verificar si el libro ya esta en el carrito

const siExisteLibro = (libroId) => {
    return cart.find ((libro) => libro.id === libroId);
}


// Function para crear un object con la info del libro

const createCartLibro = (libros) =>{
    cart = [...cart, {...libros, quantity: 1}]; 
}

// -------------- Function innit------------ //
const init = () => {
    renderLibros(AppState.libros [0]);
    btnVerMas.addEventListener("click", ShowMoreBooks)
    categoriesContainer.addEventListener("click", appplyFilter)
    carritoBtn.addEventListener("click", MostrarCarrito)

    librosContainer.addEventListener("click", agregarLibros) // tengo que llamar a Libro container!
    document.addEventListener("DOMContentLoaded", renderCart)

};

init();