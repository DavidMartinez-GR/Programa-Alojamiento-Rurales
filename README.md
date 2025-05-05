# Proyecto Gestión de Reservas en Alojamientos Rurales

## Descripción

Este proyecto es una aplicación básica para gestionar reservas en alojamientos rurales. Está desarrollado en JavaScript utilizando características avanzadas de programación orientada a objetos (POO), incluyendo herencia, encapsulamiento, sobrescritura de métodos, y uso de modificadores para controlar la herencia.

La interfaz de usuario está construida con HTML y Bootstrap para facilitar la interacción y visualización de las reservas.

## Estructura del Proyecto

- `index.html`: Página principal con la interfaz de usuario para crear y listar reservas.
- `main.js`: Contiene las clases `Reserva`, `ReservaPremium`, `ReservaConDesayuno` y la lógica para manejar la interacción con la UI.
- `utils.js`: Archivo para funciones de utilidad (actualmente vacío, puede extenderse).
- `style/style.css`: Estilos personalizados para la aplicación.
- `images/`: Carpeta para imágenes (vacía o con imágenes si se desea).
- `README.md`: Este archivo con la explicación y guía del proyecto.

## Funcionalidades

- Creación de reservas estándar, premium y con desayuno.
- Cálculo del número de noches entre fechas.
- Cálculo del precio total según el tipo de reserva.
- Uso de encapsulamiento con campos privados y getters/setters.
- Restricción de herencia en la clase `ReservaPremium` usando `Object.freeze()`.
- Documentación con JSDoc y comentarios explicativos en el código.
- Interfaz amigable y responsiva usando Bootstrap.

## Uso

1. Abrir el archivo `index.html` en un navegador web moderno.
2. Completar el formulario para crear una reserva:
   - Ingresar nombre del cliente.
   - Seleccionar fecha de entrada y salida.
   - Elegir tipo de reserva (Normal, Premium, Con Desayuno).
   - Ingresar tarifas según el tipo seleccionado.
3. Hacer clic en "Crear Reserva".
4. Las reservas creadas se mostrarán en la lista inferior con detalles y precio total calculado.

## Notas

- La clase `ReservaPremium` está bloqueada para herencia para simular el modificador `final` de Java.
- Se utilizan campos privados para proteger los datos sensibles de las reservas.
- El código está documentado para facilitar su comprensión y mantenimiento.

## Requisitos

- Navegador web moderno con soporte para ES6+ y campos privados en clases.
- Conexión a internet para cargar Bootstrap desde CDN (o descargar Bootstrap localmente si se prefiere).

## Autor

Desarrollado como ejercicio para el aprendizaje de características avanzadas de POO en JavaScript.
