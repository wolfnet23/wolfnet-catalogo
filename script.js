/* ====== PANTALLA DE PLANES ====== */

const params = new URLSearchParams(window.location.search);
const servicio = params.get("servicio");

if (document.getElementById("titulo-servicio")) {
    document.getElementById("titulo-servicio").innerText = servicio;
}

function comprar(precio, meses) {
    const mensaje = `Me interesa comprar ${servicio} de ${meses} meses por ${precio}€`;
    window.location.href = `https://wa.me/624063991?text=${encodeURIComponent(mensaje)}`;
}

/* ====== PANTALLA ARMA TU COMBO ====== */

let total = 0;
let combo = [];

function toggleServicio(nombre, precio) {
    const card = event.target;

    if (card.classList.contains("active")) {
        // Quitar servicio
        card.classList.remove("active");
        total -= precio;
        combo = combo.filter(item => item !== nombre);
    } else {
        // Agregar servicio
        card.classList.add("active");
        total += precio;
        combo.push(nombre);
    }

    document.getElementById("total").innerText = total + "€";
}

function comprarCombo() {
    if (combo.length === 0) {
        alert("Selecciona al menos un servicio.");
        return;
    }

    const mensaje = `Me interesa comprar el combo: ${combo.join(", ")} por ${total}€`;
    window.location.href = `https://wa.me/624063991?text=${encodeURIComponent(mensaje)}`;
}
