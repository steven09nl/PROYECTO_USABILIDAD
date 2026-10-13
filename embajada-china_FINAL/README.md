# Embajada China - Sitio web del restaurante

Sitio estático (HTML, CSS y JavaScript, sin dependencias) construido a partir de los prototipos y de los 4 casos de uso:
**Consultar menú**, **Realizar reserva**, **Realizar pedido** y **Gestionar pedidos restaurante**.

## Cómo abrirlo
Descomprime y abre `index.html` en el navegador. No necesita servidor ni instalación.
(Las fuentes vienen de Google Fonts; sin internet se usan fuentes del sistema.)

## Estructura
```
embajada-china/
├── index.html                  Inicio
├── pages/
│   ├── menu.html               Categorías (botones con hipervínculo)
│   ├── categoria.html          Productos de una categoría  (?c=entrada)
│   ├── producto.html           Detalle + agregar al carro   (?id=lumpia)
│   ├── pedido.html             Realizar pedido (cliente)
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
