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

