
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

const successModal = document.querySelector(".addModal"); // mensaje que agregue al carrito




let cart = JSON.parse(localStorage.getItem("cart")) || []; // 1° ARRAY VACIO, cuando seteé el JS, necesito decirle que pase de lo que hay en el Ls de csrt O sino array vacío
// funcion para setear el LS
const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
}




// -------------- Function para crear el html dinámico de los libros ------------ //

// También podría desestructurar para uno usar "libro.img"

// AGREGAR DATA-SET AL BUTTON 

createProductTemplate = (libro) => {
    return `
        <div class="libroCard">
            <img src="${libro.img}" alt="${libro.name}">
            <h3>${libro.name}</h3>
            <p>$${libro.bid}</p>
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


// -------------- lógica agregar productos al carrito  ------------ //
// -------------- lógica agregar productos al carrito  ------------ //

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
            <span class="quantity-handler menos" data-id="${id}">-</span>
            <span class="item-quantity">${quantity}</span>
            <span class="quantity-handler mas" data-id="${id}">+</span>
        </div>
        

        </div>    
    `
}

// render carrito
const renderCart = () => {
    if (!cart.length){
        librosCart.innerHTML = `<p class="emptyCart">Agregá un libro para comenzar con tu compra.</p>`;
        return;
    }

    librosCart.innerHTML = cart.map(createCartLibroTemplate).join("");
}

// function para saber el total de la compra
const getTotalCart = () => {
    return cart.reduce( (total, libro) => total + Number(libro.bid)  * libro.quantity, 0); // inicio en 0  // acc: aumulador y cur: producto a recorrer
}

// function para mostrar el total
const mostrarTotal = () => {
    total.innerHTML = `${getTotalCart().toFixed(2)} USD`; // despues cambiar la moneda si es que quiero
}

// function sumar en la burbuja
const sumarBurbuja = () => { //reduce pero con acc y cur para acostumbrarme
    cartBurbuja.textContent = cart.reduce( (acc, cur) => acc + cur.quantity, 0);
}

// function para quitar o sumar btn si no tengo o tengo libros en el carro 
const quitarBtn = (btn) => {
    if(!cart.length){
        btn.classList.add("deshabilitar"); // si no tengo productos agregame .deshabilitar
    }else{
        btn.classList.remove("deshabilitar"); // si tengo productos quitame la class.
    }
}

// funcion para ejecutar fuctions del estado del carro

const updateCartState = () => {
    saveCart();
    renderCart();
    mostrarTotal();
    sumarBurbuja();
    quitarBtn (btnDelete);
    quitarBtn (btnComprar);
}

// Functiom para agregar libro al carrito

const agregarLibros = (e) =>{
  if (!e.target.classList.contains("btnComprarLibro")) return; 
  const libros = e.target.dataset; //string del libro.   
  
  if (siExisteLibro(libros.id)) {  // si el libro ya existe en el carrito sumale uno, sino, else, creame el libro. 
        addLibroToCart(libros)
        showMensajeModal("Se agregó una unidad del libro");
    }else {
        createCartLibro(libros);
        showMensajeModal("¡Buena elección!, ¡Libro agregado al carrito!");
    }
  
    updateCartState();
    
}


// function para agregar un libro al carrito
const addLibroToCart = (libros) => {
    cart = cart.map((cartLibro) =>
        cartLibro.id === libros.id
            ? { ...cartLibro, quantity: cartLibro.quantity + 1 }
            : cartLibro
    );
    renderCart();
    mostrarTotal();
    sumarBurbuja();
}

// function para verificar si el libro ya esta en el carrito

const siExisteLibro = (libroId) => {
    return cart.find ((libro) => libro.id === libroId);
}

// Function para crear un object con la info del libro
const createCartLibro = (libros) =>{
    cart = [...cart, {...libros, quantity: 1}]; 
}

// function para mostrar mensaje después de sumar un libro al carrito

const showMensajeModal = (mensaje)=>{
    successModal.classList.add("activeModal");
    successModal.textContent= mensaje;

    setTimeout(()=>{
        successModal.classList.remove("activeModal");
    }, 2500);
}



// function incrementar libro +

const handleMasBtn = (id) => {
    const existingLibro = cart.find((libro) => libro.id === id);
    if (existingLibro) {
        addLibroToCart(existingLibro);
    }
}

// funcion para restar libro -
const handlemenosBtn = (id) => {
    const existingLibro = cart.find((libro) => libro.id === id);

    if (existingLibro.quantity === 1){
        if(window.confirm("¿Queres eliminar éste libro?")){
            removeLibroFromCart(existingLibro);
        }
        return;  
    }
    subtractLibro(existingLibro);
}

const subtractLibro= (existingLibro) =>{
    cart = cart.map ((libro) =>{
        return libro.id === existingLibro.id // acá estaba el bug, yo tengo que comparar cosas iguales 
        ? {...libro, quantity: libro.quantity - 1}
        : libro
    })
}

// funcion para remover un libro del carro 
const removeLibroFromCart = (existingLibro) =>{
    cart = cart.filter((libro) => libro.id !== existingLibro.id);
    updateCartState();
}


// funcion del handle del carrito, para manejar los libros
const handleQuantity= (e) =>{
    if(e.target.classList.contains("mas")){
        handleMasBtn(e.target.dataset.id);
    }else if (e.target.classList.contains("menos")){
        handlemenosBtn(e.target.dataset.id);

    }
    updateCartState();
}

// -------------- Comprar carrito  ------------ //
// -------------- Comprar carrito ------------ //

const resetCarritoLibros = () =>{
    cart = [];
    updateCartState();
}

const completeCartAction = (confirmarMensaje, successMensaje) =>{
    if(!cart.length) return
    if(window.confirm(confirmarMensaje)){
        resetCarritoLibros(); 
        alert(successMensaje);
    }
}

const completarCompra = () =>{
    completeCartAction ("¿Deseas completar la compra?", "¡Gracias por elegirnos! TU LIBRO prontamente en tus manos.");
    
}

const vaciarCarrito = () =>{
    completeCartAction ("¿Seguro queres vaciar el carrito?", "Tu carrito está vacío.");
}

// -------------- Function innit------------ //
const init = () => {
    renderLibros(AppState.libros [0]);
    btnVerMas.addEventListener("click", ShowMoreBooks)
    categoriesContainer.addEventListener("click", appplyFilter)
    carritoBtn.addEventListener("click", MostrarCarrito)

    librosContainer.addEventListener("click", agregarLibros) // tengo que llamar a Libro container!
    librosCart.addEventListener("click", handleQuantity)
    document.addEventListener("DOMContentLoaded", renderCart)

    btnComprar.addEventListener("click", completarCompra)
    btnDelete.addEventListener("click", vaciarCarrito)

    quitarBtn (btnDelete); // ni bien cargue yo quiero deshabilitar los btn porque se supone que no tengo nada en el cart
    quitarBtn (btnComprar);
    sumarBurbuja(cart); // para que el LS me renderice también la bubble del cart
};

init();