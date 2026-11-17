# Caso de uso: Realizar reserva
**Actor:** cliente_restaurante
**Resumen:** El cliente selecciona fecha, hora y cantidad de personas para reservar una mesa.
**Precondición:** El cliente ingresó a "Reservas" y debe proporcionar fecha, hora y cantidad de personas.
**Postcondición:** La reserva queda registrada con fecha, hora y cantidad de personas, y el cliente recibe una confirmación.

## Secuencia base
1. Ingresa a "Reservas" desde la barra de navegación (misma ventana).
2. El sistema muestra el formulario de reserva.
3-8. El cliente selecciona fecha, hora e indica la cantidad de personas.
9. Presiona "Consultar disponibilidad".
10-11. El sistema muestra las mesas disponibles con su capacidad.
12. El cliente selecciona una mesa.
13. Presiona "Confirmar reserva".
14. El sistema registra la reserva.
15-17. Abre una ventana modal de confirmación con fecha, hora, cantidad de personas y mesa, y los botones "Aceptar" y X.
18. El cliente presiona "Aceptar".

## Secuencias alternas
- 3.1 / 5.1 / 7.1 El cliente puede cambiar la fecha, la hora o la cantidad de personas.
- 9.1 Al consultar, se muestran las mesas disponibles en la misma pantalla.
- 11.1 Puede seleccionar una de las mesas mostradas.
- 13.1 Al confirmar, se procesa la reserva y se abre la ventana de confirmación.
- 17.1 Puede cerrar la confirmación con X o con "Aceptar".

## Excepciones
- 9.1 Horario no disponible: modal "¡El horario seleccionado no se encuentra disponible! Por favor seleccionar otro." (botón X).
- 9.2 Cantidad no disponible: modal "¡Cantidad no disponible! Por favor modificarla." (botón X).
- 13.1 Error al confirmar: modal indicando que la reserva no fue posible.

**Nota:** La reserva debe mostrar claramente fecha, hora y cantidad de personas para evitar errores.
