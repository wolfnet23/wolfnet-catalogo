/* ====== TEXTO COMPLETO EN LOOP INFINITO ====== */

const textoCompleto = 
"Bienvenidos a WOLFNET — Proveedor cuentas de Streaming España. " +
"Si buscas acceso Premium a todas las plataformas de entretenimiento, pantallas Netflix, Disney, Amazon, HBO Max con un 50% de descuento, " +
"has llegado al sitio perfecto. Nuestros clientes ahorran hasta 30€ cada mes, únete tú también.";

let index = 0;
let borrando = false;

const typingElement = document.getElementById("typing-text");

function escribirLoop() {
    if (!typingElement) return;

    if (!borrando) {
        typingElement.textContent = textoCompleto.substring(0, index + 1);
        index++;

        if (index === textoCompleto.length) {
            borrando = true;
            setTimeout(escribirLoop, 1500);
            return;
        }
    } else {
        typingElement.textContent = textoCompleto.substring(0, index - 1);
        index--;

        if (index === 0) {
            borrando = false;
        }
    }

    const velocidad = borrando ? 35 : 55;
    setTimeout(escribirLoop, velocidad);
}

escribirLoop();

/* ====== BOTONES ====== */

function irPlanes() {
    window.location.href = "index.html"; // Tu primer index
}

function irCombo() {
    window.location.href = "arma.html"; // Tu primer arma tu combo
}
