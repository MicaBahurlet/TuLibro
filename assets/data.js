const librosData =[
    {
        id: 1,
        name: "Padre Rico, Padre Pobre",
        bid: 10000,
        category: "Crecimiento",
        img: "./img/PadreRicoPadrePobre.png"
    },
    { 
        id: 2,
        name: "Los Cuatro Acuerdos",
        bid: 5000,
        category:"Crecimiento",
        img: "./img/LosCuatroAcuerdos.png"
    },
    {
        id: 3,
        name: "¿Quién se ha llevado mi queso?",
        bid: 4000,
        category: "Crecimiento",
        img: "./img/QuienSeHaLLevadoMiQueso.png"
    },
    {
        id: 4,
        name: "1Q84",
        bid: 8000,
        category: "Ficción",
        img: "./img/HarukiMurakami.png"
    },
    {
        id: 5,
        name: "1984",
        bid: 7000,
        category: "Ficción",
        img: "./img/1984.png"
    },
    {
        id: 6,
        name: "Un Mundo Feliz",
        bid: 10000,
        category: "Ficción",
        img: "./img/UnMundoFeliz.png",
    },
    {
        id: 7,
        name: "Don Quijote de la Mancha",
        bid: 9000,
        category: "Clásicos",
        img: "./img/Quijote.png",
    },
    {
        id: 8,
        name: "Cien años de Soledad",
        bid: 10000,
        category: "Clásicos",
        img: "./img/CienAños.png",
    },
    {
        id: 9,
        name: "Ensayo sobre la ceguera",
        bid: 11000,
        category: "Clásicos",
        img: "./img/Ensayo.png",
    },
    {
        id: 10,
        name: "Hábitos Atómicos",
        bid: 15000,
        category: "Crecimiento",
        img: "./img/HabitosAtomicos.png",
    },
    {
        id: 11,
        name: "Nuestra parte de noche",
        bid: 6789,
        category: "Ficción",
        img: "./img/NuestraParteDeNoche.png",
    },
    {
        id: 12,
        name: "El Principito",
        bid: 9500,
        category: "Clásicos",
        img: "./img/ElPrincipito.png",
    },
    {
        id: 13,
        name: "Platero y yo",
        bid: 8900,
        category: "Clásicos",
        img: "./img/Platero.png",
    },
    {
        id: 14,
        name: "La Caza del Carnero Salvaje",
        bid: 6700,
        category: "Ficción",
        img: "./img/Murakami.png",
    }

]

// Quiero dividir de a 4 

const DivideLibrosInParts = (size) => {
    let librosListados = [];

    for (let i=0; i < librosData.length; i+=size) {
        librosListados.push(librosData.slice(i, i+size)); // de 0 a lo que yo quiero
    }
    return librosListados;
    
}

// AppState

const AppState = {
    libros: DivideLibrosInParts(4), // ver si después quiero sumas más Atención con usar : y no =
    currentLibrosIndex: 0, // Quiero saber el índice actual del producto, el idice del array que dividí
    librosLimit: DivideLibrosInParts(4).length, // me va a devolver el límite del array 
    activeFilter: null, // en un inicio arranca null. 
}

