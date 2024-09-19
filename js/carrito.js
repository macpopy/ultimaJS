const pintarCarrito = () => {
    console.log("Clickeaste la bolsa");
    console.log(carrito); // Verifica el contenido del carrito en la consola

    
    modalContainer.innerHTML = "";

    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
        <h1 class="modal-header-title">Carrito</h1>
        `;
    modalContainer.appendChild(modalHeader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerHTML = "  ❌";
    modalbutton.className = "modal-header-button";
    modalbutton.addEventListener('click', () => {
        modalContainer.innerHTML = ""; 
    });

    modalHeader.append(modalbutton);

    carrito.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
            <img src="${product.img}">
            <h3>${product.nombre}</h3>
            <p>Precio: ${product.precio} UYU</p>
            <span class="restar"> - </span>
            <p>Cantidad: ${product.cantidad}</p>
            <span class="sumar"> + </span>
            <p>Total: ${product.cantidad * product.precio} UYU</p>
        `;

        modalContainer.append(carritoContent);

        let restar = carritoContent.querySelector(".restar");
        restar.addEventListener("click", () => {
            if (product.cantidad > 1) {
                product.cantidad--;
            }
            pintarCarrito();
            guardarCarrito();
        });

        let sumar = carritoContent.querySelector(".sumar");
        sumar.addEventListener("click", () => {
            product.cantidad++;
            pintarCarrito();
            guardarCarrito();
        });

        let eliminar = document.createElement("span");
        eliminar.innerText = "❌";
        eliminar.className = "delete-product";
        carritoContent.append(eliminar);

        eliminar.addEventListener("click", () => eliminarProducto(product.id));
    });

    const total = carrito.reduce((acc, el) => acc + (el.precio * el.cantidad), 0);

    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `Total a pagar: ${total} UYU`;
    modalContainer.append(totalBuying);

    
    const botonVaciar = document.createElement("button");
    botonVaciar.innerText = "Vaciar Carrito";
    botonVaciar.className = "btn-vaciar";
    modalContainer.append(botonVaciar);

    
    botonVaciar.addEventListener("click", vaciarCarrito);
};


const eliminarProducto = (id) => {
    carrito = carrito.filter((product) => product.id !== id);
    pintarCarrito();
    carritoCounter();
    guardarCarrito();
};

const carritoCounter = () => {
    cantidadCarrito.style.display = "block";
    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

verCarrito.addEventListener("click", pintarCarrito);
carritoCounter();

const vaciarCarrito = () => {
    carrito = [];
    pintarCarrito();
    carritoCounter();

    // Vaciar el localStorage
    localStorage.clear();
};
