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
        card.style.color = seleccionado ? "#000000" : "#000000";
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

    // Cambia el número por el tuyo
    const numero = "34624063991";

    window.open(`https://wa.me/${numero}?text=${mensaje}`, "_blank");
}
