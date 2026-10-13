ECOMMERCE ROPA PARA CABALLERO — PROTOTIPO FUNCIONAL

Estructura:
- index.html: inicio.
- pages/catalogo/catalogo.html: consultar productos por categoría.
- pages/catalogo/producto.html: detalle, talla, color, cantidad y agregar al carrito.
- pages/cliente/registro.html: registro y validaciones.
- pages/cliente/estado-pedido.html: consulta del estado del pedido.
- pages/compra/carrito.html: resumen, cantidades, eliminar y total.
- pages/compra/realizar-compra.html: datos de entrega, contra entrega y confirmación.
- pages/vendedor/productos.html: consultar y actualizar información del producto.
- pages/vendedor/inventario.html: consultar y actualizar cantidades.
- pages/vendedor/pedidos.html: consultar pedidos, detalle y actualizar estado.
- css/styles.css: estilos adaptables.
- js/data.js: productos iniciales.
- js/layout.js: navegación compartida.
- js/app.js: lógica, validaciones, modales y persistencia local.

Ejecución:
1. Descomprime el archivo ZIP.
2. Abre index.html en un navegador actualizado.
3. Usa el enlace "Vendedor" para acceder a las pantallas de gestión.
4. Las compras y los registros se guardan en localStorage del navegador.

Nota: es un prototipo del lado del navegador, sin servidor ni base de datos remota. El método de pago es contra entrega, tal como indica el prototipo. Los productos y precios son datos de demostración que pueden modificarse en js/data.js.

ACTUALIZACIÓN VISUAL
- Identidad URBANO MEN con paleta negra, marfil y dorado cálido.
- Fotografías de prendas generadas para el prototipo y banner de colección.
- Icono de usuario en la parte superior derecha con menú de registro, inicio de sesión y mis pedidos.
- Inicio con categorías y productos destacados.
