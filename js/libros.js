document.addEventListener('DOMContentLoaded', () => {

    // Función para crear título
    const createTitulo = (texto) => {
        const tituloH1 = document.createElement("h1");
        tituloH1.id = "titulo";
        tituloH1.textContent = texto;
        document.body.appendChild(tituloH1);
    };

    // Función para crear párrafo
    const createParrafo = (texto) => {
        const parrafo = document.createElement("p");
        parrafo.textContent = texto;
        return parrafo; // Retorna el párrafo para añadirlo
    };

    // Función para crear imágenes con sus clases
    const crearImagen = (src, alt, clase) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = alt;
        if (clase) {
            img.classList.add(clase);
        }
        return img;
    };

    // HEADER
    const Encabezado = (texto) => {
        const header = document.createElement('header');

        const div1 = document.createElement('div');
        div1.classList.add('div1');

        const img1 = crearImagen('../assets/logo3.png', 'Logo', 'logo3');
        const h1 = document.createElement('h1');
        h1.textContent = texto;

        const img2 = crearImagen('../assets/logo3.png', 'Logo', 'logo3');

        div1.appendChild(img1);
        div1.appendChild(h1);
        div1.appendChild(img2);

        header.appendChild(div1);
        document.body.prepend(header);
    }

    Encabezado('ESCARAMUZA');

})

document.addEventListener('DOMContentLoaded', () => {
    let botones = document.querySelectorAll('.btn.btn-primary'); 
    
    botones.forEach(boton => {
        boton.addEventListener('click', (event) => {
            event.preventDefault(); 
        });
    });
});


// Empiezo a comprar
const modalContainer = document.getElementById("modal-container");
const verCarrito = document.getElementById("vercarrito");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


const guardarCarrito = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};


const agregarAlCarrito = (producto) => {
    const productoExistente = carrito.some(item => item.id === producto.id);

    if (productoExistente) {
        
        carrito = carrito.map(item => {
            if (item.id === producto.id) item.cantidad++;
            return item;
        });
    } else {
        
        carrito.push({...producto, cantidad: 1});
    }

    
    guardarCarrito();
    carritoCounter();
};


const vincularBotones = (productos) => {
    const botonesComprar = document.querySelectorAll('.btn.btn-primary');

    botonesComprar.forEach(boton => {
        boton.addEventListener('click', (event) => {
            event.preventDefault(); 
            const idProducto = boton.getAttribute('data-id');
            const productoSeleccionado = productos.find(producto => producto.id == idProducto);

            if (productoSeleccionado) {
                agregarAlCarrito(productoSeleccionado);
                console.log('Agregaste un libro:', productoSeleccionado);
            } else {
                console.error('Producto no encontrado');
            }
        });
    });
};


const getProducts = async () => {
    try {
        const response = await fetch("../js/data.json");
        const productos = await response.json();
        console.log("Productos cargados:", productos);

        vincularBotones(productos);
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
};


document.addEventListener('DOMContentLoaded', () => {
    getProducts();
});


