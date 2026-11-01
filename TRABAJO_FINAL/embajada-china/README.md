# Embajada China - Sitio web del restaurante

Sitio estático (HTML, CSS y JavaScript, sin dependencias) construido a partir de los prototipos y de los 4 casos de uso:
**Consultar menú**, **Realizar reserva**, **Realizar pedido** y **Gestionar pedidos restaurante**.

## Estructura
```
embajada-china/
├── index.html                  Inicio
├── pages/
│   ├── menu.html               Categorías (botones con hipervínculo)
│   ├── categoria.html          Productos de una categoría  (?c=entrada)
│   ├── producto.html           Detalle + agregar al carro   (?id=lumpia)
│   ├── pedido.html             Realizar pedido (cliente): datos de entrega, total y confirmación
│   ├── mis-pedidos.html        Mis pedidos: el cliente consulta su pedido y su estado
│   ├── reservas.html           Realizar reserva
│   ├── contacto.html           Contacto
│   └── vendedor.html           Gestionar pedidos (vendedor)
├── assets/
│   ├── css/                    base, layout, components, pages
│   ├── js/
│   │   ├── core/               util, almacen (localStorage), layout
│   │   ├── data/               menu.js y reservas.js  <- el contenido se edita aquí
│   │   ├── components/         modal, carrito, pedidos, busqueda
│   │   └── pages/              lógica de cada página
│   └── img/                    favicon e imágenes de productos (3 por plato)
└── docs/
    ├── prototipos/             prototipos dibujados
    └── casos-de-uso/           tablas de los 4 casos de uso (imagen y texto)
```

## Qué hace cada caso de uso
**Consultar menú**: 9 categorías, 45 platos con imagen, descripción y precio; detalle en la misma ventana; modales de
producto agregado (Seguir comprando / Ver carrito / X) y de producto no disponible (Aceptar / X); categoría vacía.

**Realizar reserva**: fecha, hora y personas (de 1 a 6) > Consultar disponibilidad > mesas (2, 4 y 6 personas) > Confirmar reserva >
modal con los datos. Excepciones: horario no disponible, cantidad no disponible y error al confirmar.

**Realizar pedido**: carrito > resumen con cantidades modificables y retiro de platos > valor total calculado > nombre del cliente >
ventana de confirmación (Confirmar / Cancelar pedido) > pedido registrado con número. Excepciones: plato no disponible,
cantidad no disponible (existencias del día), error al calcular el total y error al registrar.

**Gestionar pedidos**: `pages/vendedor.html` (enlace "Acceso vendedor" en el pie de página).
Usuario `vendedor`, contraseña `embajada2026` (cámbiala en `assets/js/data/reservas.js`).
Consulta con filtro por número, cliente o estado; detalle con platos, cantidades y estado; "Actualizar estado" en ventana emergente
(Pendiente, En preparación, Listo) con confirmación o cancelación. Excepciones: sin pedidos, pedido no encontrado,
pedido que no puede modificarse (los "Listo"), estado no válido y error al guardar.

## Para probar el flujo completo
1. Menú > elige platos > "Agregar al carro" > Ver carrito > Realizar pedido > escribe tu nombre > Confirmar.
2. Pie de página > Acceso vendedor > ingresa > el pedido aparece en la lista > Actualizar estado.

## Notas importantes
- Los precios, descripciones y existencias (40 por plato al día) son valores de referencia: ajústalos a los reales en `assets/js/data/menu.js`.
- Las imágenes son ilustraciones generadas (no fotos). Para usar fotos reales, reemplaza los archivos de `assets/img/productos/`
  (`<id>-1`, `-2`, `-3`) y, si son .jpg, cambia la extensión en `EC.imagen` (`assets/js/core/util.js`).
- No hay servidor ni base de datos: carrito, pedidos y reservas se guardan en el navegador (localStorage), por eso el vendedor
  ve los pedidos hechos en el mismo navegador. El acceso del vendedor es una simulación del lado del cliente, no seguridad real.
- Para probar el aviso de "plato no disponible", pon `disponible: false` en un producto de `menu.js`.
- Los datos de contacto están como "Por completar" en `assets/js/data/reservas.js`.

## Diseño
Apariencia inspirada en restauranteembajadachina.com: cabecera oscura fija con el menú en una sola fila, portada con plato
destacado, sección "Recomendados", banners oscuros en las páginas internas, tarjetas de producto y pie de página con
"Llámanos" y "Dirección". Solo cambió la apariencia; los contenidos y funciones son los de este proyecto.

## Logo, fondo y fotos
- Logo: `assets/img/logo.png` (cabecera, portada, pie y favicon).
- Fondo de restaurante chino: enrejado de ventana, faroles rojos y greca dorada (`assets/img/decor/`).
- **Fotos de los platos**: `assets/img/fotos/<id>.jpg` (42 fotos tomadas de PLATOS.docx, recortadas en cuadrado). Para cambiar una foto,
  reemplaza el archivo conservando el nombre (.jpg, .png o .webp). Fotos adicionales: `<id>-2.jpg`, `<id>-3.jpg` (miniaturas).
  La lista de platos y el estado de cada foto está en `docs/fotos-necesarias.md`.
- Pendientes: Curry de cerdo (sin foto) y dos platos (Chau Mien especial y Pollo agridulce) que enlazan fotos de restauranteembajadachina.com;
  para guardarlas dentro del proyecto, con internet ejecuta `python herramientas/descargar-fotos.py`.
- Mientras un plato no tenga foto se muestra `assets/img/sin-foto.jpg`.

## Pedidos, entrega y contacto
- Al confirmar un pedido se piden: nombre, teléfono, correo (opcional), tipo de entrega (domicilio o recoger), dirección y barrio
  (si es domicilio), indicaciones, forma de pago y observaciones.
- Al terminar aparece "Ver mi pedido": la página **Mis pedidos** muestra el estado (Pendiente, En preparación, Listo), los platos, el total y los datos
  de entrega, y se actualiza sola cuando el vendedor cambia el estado. También se puede consultar un pedido con su número y teléfono.
- El vendedor ve en su módulo el teléfono, la dirección, la forma de pago y las indicaciones de cada pedido.
- Datos de contacto (dirección, teléfono, WhatsApp, correo y horarios) son **inventados**; cámbialos en `assets/js/data/reservas.js` (`EC.restaurante`).
- El menú superior despliega submenús al pasar el cursor (en el celular, con la flecha de cada opción).
- Carrito, pedidos y reservas se guardan en el navegador; no hay servidor.
