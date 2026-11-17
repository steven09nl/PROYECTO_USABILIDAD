# Caso de uso: Consultar menú
**Actor:** cliente_restaurante
**Resumen:** El cliente consulta los platos disponibles, sus precios, fotografías e información.
**Precondición:** El cliente ingresó a la página del restaurante y el menú está disponible en el sistema.
**Postcondición:** El cliente visualiza categorías, platos, precios, fotografías e información y puede seleccionar un plato.

## Secuencia base
1. El cliente ingresa a "Menú" desde la barra de navegación (misma ventana).
2. El sistema muestra las categorías mediante botones: Entrada, Arroz chino, Chop suey, Chau Mien, Lomin, Espaguetis, Agridulce, Curry, Mariscos.
3. El cliente selecciona una categoría.
4. El sistema muestra los productos de la categoría en la misma ventana.
5. Cada producto se muestra con fotografía, nombre y precio.
6. El cliente selecciona el nombre/hipervínculo del producto.
7. El sistema abre la información detallada en la misma ventana.
8. Se muestran fotografía, nombre, precio, cantidad y descripción.
9. El cliente revisa la información.

## Secuencias alternas
- 2.1 Si el cliente selecciona otra categoría, cambian los productos mostrados.
- 3.1 Si selecciona una categoría, se muestran sus productos en la misma pantalla.
- 5.1 Puede seleccionar otro producto mediante el hipervínculo del nombre.
- 7.1 La información detallada se muestra en la misma ventana, sin abrir pestaña nueva.

## Excepciones
- 3.1 Categoría sin productos: no se muestran productos.
- 7.1 Producto no disponible: ventana modal "¡El producto no se encuentra disponible!" con botón Aceptar y botón X.

**Nota:** El menú debe presentar la información de forma clara y organizada.
