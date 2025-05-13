document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formPresupuesto");
    const totalSpan = document.getElementById("total");

    const nombre = document.getElementById("nombre");
    const apellidos = document.getElementById("apellidos");
    const telefono = document.getElementById("telefono");
    const email = document.getElementById("email");
    const producto = document.getElementById("producto");
    const plazo = document.getElementById("plazo");
    const extras = document.querySelectorAll(".extra");
    const condiciones = document.getElementById("condiciones");

    function calcularTotal() {
        let base = parseFloat(producto.value);
        let extraTotal = 0;

        extras.forEach(extra => {
            if (extra.checked) {
                extraTotal += parseFloat(extra.value);
            }
        });

        let subtotal = base + extraTotal;

        // Descuento por plazo corto
        const dias = parseInt(plazo.value);
        let descuento = 0;
        if (dias <= 15) descuento = 0.10; // 10%
        else if (dias <= 30) descuento = 0.05;

        const total = subtotal * (1 - descuento);
        totalSpan.textContent = total.toFixed(2);
    }

    producto.addEventListener("change", calcularTotal);
    plazo.addEventListener("input", calcularTotal);
    extras.forEach(extra => extra.addEventListener("change", calcularTotal));
    calcularTotal();

    function validarFormulario() {
        const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
        const soloNumeros = /^\d{9}$/;
        const emailValido = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

        if (!soloLetras.test(nombre.value) || nombre.value.length > 15) {
            alert("Nombre inválido. Solo letras y máximo 15 caracteres.");
            return false;
        }

        if (!soloLetras.test(apellidos.value) || apellidos.value.length > 40) {
            alert("Apellidos inválidos. Solo letras y máximo 40 caracteres.");
            return false;
        }

        if (!soloNumeros.test(telefono.value)) {
            alert("Teléfono inválido. Solo números y exactamente 9 dígitos.");
            return false;
        }

        if (!emailValido.test(email.value)) {
            alert("Correo electrónico inválido.");
            return false;
        }

        if (!condiciones.checked) {
            alert("Debes aceptar las condiciones de privacidad.");
            return false;
        }

        return true;
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (validarFormulario()) {
            alert("Formulario enviado con éxito. Presupuesto: " + totalSpan.textContent + " €");
            form.reset();
            calcularTotal(); // resetear el total
        }
    });
});

