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


REDISEÑO PROFESIONAL (referencia: velez.com.co)
- Nueva cabecera: barra de mensajes, buscador, logo centrado, cuenta, carrito y navegación por categorías; menú lateral en celular.
- Inicio: banner principal con la foto del modelo, franja de beneficios (envíos, pago contra entrega), categorías, prendas destacadas, nosotros y suscripción a novedades.
- Catálogo: contador de productos, orden por precio o nombre, etiqueta "Pocas unidades" (10 o menos en inventario).
- Detalle de producto: foto grande, tallas, envío y pago, y sección "También te puede gustar".
- Carrito y compra: indicador de pasos y miniaturas en el resumen.
- Estado del pedido: línea de seguimiento (recibido, en preparación, enviado, entregado).
- Vendedor: indicadores (productos, unidades, pocas unidades, pedidos) y pestañas.
- Accesibilidad: enlace "Saltar al contenido", foco visible, tecla Esc para cerrar ventanas y respeto de "reducir movimiento".
- Archivos nuevos: assets/img/hero-modelo.jpg (recorte del banner original sin el texto incrustado).
- La suscripción a novedades guarda el correo en localStorage (ecom_newsletter), igual que el resto de datos.
- La tipografía (Archivo) se descarga de Google Fonts; sin internet se usa Helvetica/Arial automáticamente.


ACTUALIZACIÓN: LOGO, MÁS COLOR Y MÁS PRENDAS
- Logotipo de URBANO MEN en la cabecera, el menú móvil, "Nosotros", el registro y el pie de página, más favicon (assets/img/logo-*.png y favicon.png). El logo es plateado, por eso se usa sobre fondos oscuros.
- Cabecera oscura, barra superior dorada, carrusel con 3 diapositivas (la 1 es el banner original), banda en movimiento y sección "Compra por color".
- Categorías: al pasar el cursor cambian a otra foto de la misma categoría.
- Catálogo: filtro por color (también con ?color=Negro en la dirección) y etiqueta "Nuevo".
- 9 prendas nuevas en js/data.js (C03, C04, C05, P03, P04, CH03, CH04, B02, B03). Sus fotos son variantes de color de las fotos originales; para usar fotos reales basta reemplazar los archivos de assets/img con el mismo nombre (ver el campo image de cada producto en data.js).
- Las fotos del pantalón recto se igualaron en el tono del fondo para que se vean parejas con el resto del catálogo.
