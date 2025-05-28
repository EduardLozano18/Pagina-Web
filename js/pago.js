document.addEventListener('DOMContentLoaded', () => {
    // Cargar productos del carrito
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const resumenContainer = document.getElementById('resumen-productos');
    const totalContainer = document.getElementById('total-pagar');

    // Mostrar productos
    if (products.length === 0) {
        resumenContainer.innerHTML = '<p>No hay productos en el carrito.</p>';
    } else {
        let html = '';
        let total = 0;

        products.forEach(product => {
            const subtotal = product.price * product.quantity;
            total += subtotal;

            html += `
                <div class="product-item">
                    <img src="${product.img}" alt="${product.title}">
                    <div class="product-info">
                        <h3>${product.title}</h3>
                        <p>Cantidad: ${product.quantity}</p>
                        <p class="product-price">$${subtotal.toFixed(2)}</p>
                    </div>
                </div>
            `;
        });

        resumenContainer.innerHTML = html;
        totalContainer.textContent = `$${total.toFixed(2)}`;
    }

    // Cambiar método de pago
    document.querySelectorAll('input[name="metodo-pago"]').forEach(radio => {
        radio.addEventListener('change', function() {
            document.querySelectorAll('.payment-method').forEach(method => {
                method.classList.remove('active');
            });
            this.closest('.payment-method').classList.add('active');
        });
    });

    // Confirmar pago
    document.getElementById('confirmar-pago').addEventListener('click', function(e) {
        e.preventDefault();
        
        // Validar formulario
        const nombre = document.getElementById('nombre').value;
        const direccion = document.getElementById('direccion').value;
        
        if (!nombre || !direccion) {
            alert('Por favor completa todos los campos obligatorios.');
            return;
        }

        // Simular pago exitoso
        alert('¡Pago exitoso! Gracias por tu compra.');
        localStorage.removeItem('products');
        window.location.href = 'index.html';
    });
});


document.getElementById('confirmar-pago').addEventListener('click', (e) => {
    e.preventDefault();
    
    // 1. Crear objeto del pedido
    const pedido = {
        id: Date.now(),
        fecha: new Date().toLocaleDateString('es-MX'),
        productos: JSON.parse(localStorage.getItem('products')),
        total: document.getElementById('total-pagar').textContent,
        estado: "Completado"
    };

    // 2. Guardar en historial
    const historialPedidos = JSON.parse(localStorage.getItem('historialPedidos')) || [];
    localStorage.setItem('historialPedidos', JSON.stringify([...historialPedidos, pedido]));

    // 3. Limpiar carrito y redirigir
    localStorage.removeItem('products');
    window.location.href = 'index.html?pedido_exitoso=true';
});