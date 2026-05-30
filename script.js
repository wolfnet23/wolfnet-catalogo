// =======================================
// ========== SISTEMA DE COMBOS ==========
// =======================================

// ===== VARIABLES =====
let total = 0;
let serviciosSeleccionados = [];

// ===== AGREGAR / QUITAR SERVICIOS =====
function toggleServicio(nombre, precio) {

    const index = serviciosSeleccionados.findIndex(s => s.nombre === nombre);

    if (index === -1) {
        // Agregar servicio
        serviciosSeleccionados.push({ nombre, precio });
        total += precio;
    } else {
        // Quitar servicio
        total -= serviciosSeleccionados[index].precio;
        serviciosSeleccionados.splice(index, 1);
    }

    actualizarUI();
}

// ===== ACTUALIZAR INTERFAZ =====
function actualizarUI() {
    document.getElementById("total").textContent = total + "€";

    // Cambiar color de tarjetas seleccionadas
    document.querySelectorAll(".combo-card").forEach(card => {
        const texto = card.textContent.trim();
        const nombre = texto.split("–")[0].trim();

        const seleccionado = serviciosSeleccionados.some(s => s.nombre === nombre);

        card.style.background = seleccionado ? "#00ff7f" : "#ffffff";
        card.style.color = "#000000";
        card.style.fontWeight = seleccionado ? "800" : "600";
    });
}

// ===== ENVIAR COMBO A WHATSAPP =====
function comprarCombo() {
    if (serviciosSeleccionados.length === 0) {
        alert("Debes seleccionar al menos un servicio.");
        return;
    }

    const lista = serviciosSeleccionados
        .map(s => `• ${s.nombre} (${s.precio}€)`)
        .join("%0A");

    const mensaje = 
        `Hola, quiero comprar este combo:%0A%0A${lista}%0A%0ATotal: ${total}€`;

    const numero = "34624063991";

    window.open(`https://wa.me/${numero}?text=${mensaje}`, "_blank");
}



// =======================================
// ===== SISTEMA DE PLANES POR SERVICIO ===
// =======================================

const planes = {
    netflix: [
        { meses: 1, precio: 6 },
        { meses: 3, precio: 16 },
        { meses: 6, precio: 30 },
        { meses: 12, precio: 55 }
    ],
    disney: [
        { meses: 1, precio: 6 },
        { meses: 3, precio: 15 },
        { meses: 6, precio: 25 },
        { meses: 12, precio: 45 }
    ],
    hbo: [
        { meses: 1, precio: 6 },
        { meses: 3, precio: 15 },
        { meses: 6, precio: 25 },
        { meses: 12, precio: 45 }
    ],
    prime: [
        { meses: 1, precio: 5 },
        { meses: 3, precio: 14 },
        { meses: 6, precio: 25 },
        { meses: 12, precio: 40 }
    ],
    crunchy: [
        { meses: 1, precio: 6 }
    ],
    iptv: [
        { meses: 1, precio: 10 },
        { meses: 3, precio: 24 },
        { meses: 6, precio: 35 },
        { meses: 12, precio: 55 }
    ],
    flujo: [
        { meses: 1, precio: 10 },
        { meses: 3, precio: 25 },
        { meses: 6, precio: 40 },
        { meses: 12, precio: 60 }
    ],
    spotify: [
        { meses: 1, precio: 7 },
        { meses: 3, precio: 20 }
    ],
    youtube: [
        { meses: 3, precio: 20 }
    ]
};


// ===== MOSTRAR TABLA DE PLANES =====
function mostrarPlanes(servicio) {
    const contenedor = document.getElementById("planes-container");
    const lista = planes[servicio];

    let html = `
        <h2 style="text-align:center; margin-top:20px;">Planes de ${servicio.toUpperCase()}</h2>
        <table class="tabla-planes">
            <tr><th>Duración</th><th>Precio</th><th>Acción</th></tr>
    `;

    lista.forEach(p => {
        html += `
            <tr>
                <td>${p.meses} meses</td>
                <td>${p.precio}€</td>
                <td><button class="btn-wsp" onclick="comprar(${p.precio}, ${p.meses})">Comprar</button></td>
            </tr>
        `;
    });

    html += `</table>`;
    contenedor.innerHTML = html;
}


// ===== COMPRAR PLAN INDIVIDUAL =====
function comprar(precio, meses) {
    const numero = "34624063991";

    window.location.href =
        `https://wa.me/${numero}?text=Hola,%20quiero%20comprar%20el%20plan%20de%20${meses}%20mes(es)%20por%20${precio}€`;
}
