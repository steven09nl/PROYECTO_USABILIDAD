# Caso de uso: Realizar pedido
**Actor:** cliente_restaurante
**Resumen:** El cliente selecciona los platos que desea y confirma su pedido.
**Precondición:** El cliente debe haber seleccionado al menos un plato disponible.
**Postcondición:** El pedido queda registrado con los platos, cantidades y valor total, y el sistema muestra una confirmación.

## Secuencia base
1. El cliente selecciona los platos desde el menú.
2. El sistema muestra el resumen del pedido en la misma pantalla.
3. El cliente verifica los platos y cantidades.
4. El sistema calcula y muestra el valor total.
5. El cliente selecciona la opción de confirmar pedido.
6. El sistema muestra una ventana emergente de confirmación.
7. El cliente confirma el pedido.
8. El sistema registra el pedido.
9. El sistema muestra una ventana emergente indicando que el pedido fue realizado correctamente.

## Secuencias alternas
- 1.1 Puede agregar diferentes platos al pedido.
- 2.1 Puede modificar las cantidades desde el resumen.
- 3.1 Puede retirar un plato antes de confirmar.
- 4.1 Puede cancelar el pedido desde la ventana de confirmación.

## Excepciones
- 1.1 Si un plato deja de estar disponible, el sistema muestra un aviso.
- 2.1 Si la cantidad solicitada no está disponible, el sistema solicita modificarla.
- 3.1 Si no se puede calcular el total, el sistema muestra un mensaje de error.
- 4.1 Si ocurre un error al registrar el pedido, el sistema muestra una ventana emergente informando que no fue posible realizarlo.

**Nota:** El proceso debe ser sencillo y rápido para evitar que el cliente abandone el pedido.
