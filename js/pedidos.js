document.addEventListener('DOMContentLoaded', () => {
    const pedidos = JSON.parse(localStorage.getItem('historialPedidos')) || [];
    const contenedor = document.getElementById('lista-pedidos');

    if (pedidos.length === 0) {
        contenedor.innerHTML = '<p class="no-pedidos">No hay pedidos registrados.</p>';
        return;
    }

    contenedor.innerHTML = pedidos.map(pedido => `
        <div class="pedido-card">
            <div class="pedido-header">
                <span>Pedido #${pedido.id}</span>
                <span class="estado ${pedido.estado.toLowerCase()}">${pedido.estado}</span>
            </div>
            <p class="fecha">${pedido.fecha}</p>
            <p class="total">${pedido.total}</p>
            <div class="productos-resumen">
                ${pedido.productos.map(p => `
                    <div class="producto-pedido">
                        <img src="${p.img}" alt="${p.title}" width="40">
                        <span>${p.title} (x${p.quantity})</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
});