/* ====== EFECTO TYPING LOOP EN INICIO ====== */

const frases = [
    "Bienvenidos a WOLFNET",
    "Proveedor cuentas de Streaming España",
    "Si buscas acceso Premium a Netflix, Disney, Amazon, HBO Max con 50% de descuento",
    "Nuestros clientes ahorran hasta 30€ cada mes, únete tú también"
];

let fraseIndex = 0;
let charIndex = 0;
let borrando = false;

const typingElement = document.getElementById("typing-text");

function typingLoop() {
    if (!typingElement) return;

    const fraseActual = frases[fraseIndex];

    if (!borrando) {
        // Escribiendo
        typingElement.textContent = fraseActual.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === fraseActual.length) {
            borrando = true;
            setTimeout(typingLoop, 1500); // Pausa al final de la frase
            return;
        }
    } else {
        // Borrando
        typingElement.textContent = fraseActual.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            borrando = false;
            fraseIndex = (fraseIndex + 1) % frases.length;
        }
    }

    const velocidad = borrando ? 40 : 70;
    setTimeout(typingLoop, velocidad);
}

typingLoop();

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
