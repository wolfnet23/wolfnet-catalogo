// =======================================
// ========== SISTEMA DE COMBOS ==========
// =======================================

// ===== VARIABLES =====
let serviciosSeleccionados = [];

// ===== AGREGAR / QUITAR SERVICIOS =====
function toggleServicio(nombre, precio) {

    const index = serviciosSeleccionados.findIndex(s => s.nombre === nombre);

    if (index === -1) {
        serviciosSeleccionados.push({ nombre, precio });
    } else {
        serviciosSeleccionados.splice(index, 1);
    }

    actualizarUI();
}

// ===== ACTUALIZAR INTERFAZ (LÓGICA COMPLETA) =====
function actualizarUI() {

    const plataformasBase = ["Netflix", "Disney+", "HBO Max", "Prime Video", "Crunchyroll"];
    const premium = ["Spotify", "YouTube Premium"];
    const individuales = ["IPTV", "FlujoTV"];

    let baseSeleccionadas = serviciosSeleccionados.filter(s => plataformasBase.includes(s.nombre));
    let premiumSeleccionados = serviciosSeleccionados.filter(s => premium.includes(s.nombre));
    let individualesSeleccionados = serviciosSeleccionados.filter(s => individuales.includes(s.nombre));

    let totalFinal = 0;

    // ============================
    // 1. CALCULAR COMBO BASE
    // ============================
    const cantidadBase = baseSeleccionadas.length;

    if (cantidadBase === 1) {
        const nombre = baseSeleccionadas[0].nombre;

        if (["Netflix", "Disney+", "HBO Max"].includes(nombre)) {
            totalFinal += 6;
        } else if (nombre === "Prime Video") {
            totalFinal += 5;
        } else {
            totalFinal += baseSeleccionadas[0].precio;
        }
    }

    if (cantidadBase === 2) totalFinal += 10;
    if (cantidadBase === 3) totalFinal += 14;
    if (cantidadBase === 4) totalFinal += 18;
    if (cantidadBase === 5) totalFinal += 22;

    // ============================
    // 2. PREMIUM (20€)
    // ============================
    totalFinal += premiumSeleccionados.length * 20;

    // ============================
    // 3. INDIVIDUALES (10€)
    // ============================
    totalFinal += individualesSeleccionados.length * 10;

    // ============================
    // 4. DESCUENTOS
    // ============================

    // Premium + combo base → -2€
    if (premiumSeleccionados.length > 0 && cantidadBase > 0) {
        totalFinal -= 2;
    }

    // IPTV o FlujoTV + cualquier otro servicio → -2€
    if (individualesSeleccionados.length > 0 && serviciosSeleccionados.length > 1) {
        totalFinal -= 2;
    }

    // ============================
    // 5. MOSTRAR TOTAL
    // ============================
    document.getElementById("total").textContent = totalFinal + "€";

    const totalElemento = document.getElementById("total");
    if (totalFinal > 0) {
        totalElemento.classList.remove("total-zero");
        totalElemento.classList.add("total-activo");
    } else {
        totalElemento.classList.remove("total-activo");
        totalElemento.classList.add("total-zero");
    }

    // ============================
    // 6. ILUMINAR TARJETAS
    // ============================
    document.querySelectorAll(".combo-card").forEach(card => {
        const nombre = card.querySelector(".combo-name").textContent.trim();
        const seleccionado = serviciosSeleccionados.some(s => s.nombre === nombre);

        if (seleccionado) {
            card.classList.add("selected");
        } else {
            card.classList.remove("selected");
        }
    });
}

// ===== ENVIAR COMBO A WHATSAPP =====
function comprarCombo() {
    if (serviciosSeleccionados.length === 0) {
        alert("Debes seleccionar al menos un servicio.");
        return;
    }

    const lista = serviciosSeleccionados
        .map(s => `• ${s.nombre}`)
        .join("%0A");

    const total = document.getElementById("total").textContent;

    const mensaje = 
        `Hola, quiero comprar este combo:%0A%0A${lista}%0A%0ATotal: ${total}`;

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
                <td><button class="btn-wsp" onclick="comprar('${servicio}', ${p.precio}, ${p.meses})">Comprar</button></td>
            </tr>
        `;
    });

    html += `</table>`;
    contenedor.innerHTML = html;
}



// =======================================
// ===== FUNCIÓN COMPRAR PROFESIONAL =====
// =======================================

function comprar(servicio, precio, meses) {
    const numero = "34624063991";

    const mensaje = 
`Plan seleccionado: ${servicio.toUpperCase()} – ${meses} mes(es) – ${precio}€
Métodos de pago disponibles:

💳 Bizum:
• 624 06 39 91
• 624 74 89 28

🏦 Transferencia bancaria:
• IBAN: ES03 6893 0001 7000 0015 4710
• Titular: Wolffan Jiménez
• Concepto permitido: amigo, salida, café o merienda (elige solo uno)

📸 Envíame la captura del pago y te activo tu cuenta en menos de 5 minutos.`;

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
}
