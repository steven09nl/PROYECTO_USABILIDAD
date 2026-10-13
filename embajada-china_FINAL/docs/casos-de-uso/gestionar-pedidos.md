# Caso de uso: Gestionar pedidos restaurante
**Actor:** Vendedor_restaurante
**Resumen:** El vendedor consulta y actualiza los pedidos realizados por los clientes.
**Precondición:** Consultar: deben existir pedidos registrados y el vendedor debe tener acceso al módulo de pedidos. Actualizar: debe existir un pedido registrado y el vendedor debe tener permisos para modificar su información.
**Postcondición:** Consultar: el vendedor obtiene la información del pedido (platos, cantidades y estado). Actualizar: la información modificada queda guardada.

## Consultar - secuencia base
1. El vendedor ingresa al módulo de pedidos.
2. El sistema muestra los pedidos registrados en la misma pantalla.
3. El vendedor selecciona un pedido.
4. El sistema busca la información correspondiente.
5. El sistema muestra los platos, cantidades y estado del pedido en la misma pantalla.
6. El vendedor revisa la información.

## Actualizar - secuencia base
1. El vendedor selecciona el pedido que desea actualizar.
2. El sistema muestra la información actual.
3. El vendedor selecciona "Actualizar estado".
4. El sistema muestra una ventana emergente con los estados disponibles.
5. El vendedor selecciona el nuevo estado.
6. El vendedor confirma el cambio.
7. El sistema valida la información.
8. El sistema guarda la actualización.
9. El sistema muestra una ventana emergente confirmando el cambio.

## Secuencias alternas
- Consultar 1.1 Puede consultar un pedido específico por número, cliente o estado.
- Consultar 2.1 Puede consultar diferentes pedidos desde la misma pantalla.
- Actualizar 1.1 Puede cambiar el estado a pendiente, en preparación o listo.
- Actualizar 2.1 Puede cancelar la actualización antes de confirmar.

## Excepciones
- Consultar 1.1 Si no existen pedidos, se indica que no hay pedidos registrados.
- Consultar 2.1 Si el pedido seleccionado no existe, se informa que no fue encontrado.
- Actualizar 1.1 Si el pedido no puede modificarse, el sistema informa al vendedor.
- Actualizar 2.1 Si el estado seleccionado no es válido, se solicita seleccionar otro.
- Actualizar 3.1 Si ocurre un error al guardar, se informa que la actualización no fue realizada.

**Nota:** Permite al vendedor consultar los pedidos y mantener actualizado su estado durante la preparación.
