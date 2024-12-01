// Función para establecer la fecha y hora actual en el campo correspondiente
function setFechaHoraActual() {
  const hoy = new Date();
  const dia = String(hoy.getDate()).padStart(2, '0');
  const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
  const año = hoy.getFullYear();
  const horas = String(hoy.getHours()).padStart(2, '0');
  const minutos = String(hoy.getMinutes()).padStart(2, '0');
  const segundos = String(hoy.getSeconds()).padStart(2, '0');

  const fechaHoraActual = `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
  document.getElementById('fecha').value = fechaHoraActual;
}

// Actualizar la fecha y hora cada segundo
function iniciarReloj() {
  setInterval(setFechaHoraActual, 1000); // Llama a la función cada 1000 ms (1 segundo)
}

// Establecer la fecha y hora actual al cargar la página
window.onload = function () {
  setFechaHoraActual(); // Establece la fecha y hora inmediatamente
  iniciarReloj(); // Comienza el reloj en tiempo real
};

// Manejo del evento de envío del formulario
document.getElementById('form').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevenir el envío por defecto del formulario

  const form = document.getElementById('form');
  const inputs = form.querySelectorAll('input, textarea, select');
  let allFilled = true;

  // Validar que todos los campos obligatorios estén llenos
  inputs.forEach(function (input) {
      if (input.hasAttribute('required') && input.value.trim() === '') {
          allFilled = false;
          alert(`El campo "${input.name || input.id}" es obligatorio. Por favor complétalo.`);
      }
  });

  if (allFilled) {
      // Si todos los campos están llenos, preparar y enviar la solicitud
      const formData = new FormData(form);
      const xhr = new XMLHttpRequest();
      xhr.open('POST', form.action);

      // Manejo de la respuesta del servidor
      xhr.onload = function () {
          console.log('Estado de la respuesta:', xhr.status); // Depurar el estado HTTP
          console.log('Respuesta del servidor:', xhr.responseText); // Depurar la respuesta del servidor

          if (xhr.status === 200) {
              alert('¡Registro exitoso!');
              form.reset(); // Limpiar los campos del formulario después de la respuesta exitosa
              setFechaHoraActual(); // Restablecer la fecha y hora actual
          } else {
              alert('Error en el servidor. Código de estado: ' + xhr.status);
          }
      };

      // Manejo de errores de red
      xhr.onerror = function () {
          console.error('Error de red. No se pudo enviar el formulario.');
          alert('Error de red. No se pudo enviar el formulario.');
      };

      // Enviar la solicitud
      console.log('Enviando datos al servidor...');
      xhr.send(formData);
  } else {
      console.log('El formulario no se envió porque hay campos vacíos.');
  }
});

// Función para verificar la contraseña de acceso
function verificarContraseña() {
  const password = document.getElementById("password").value;
  if (password === "Minsal") {
      document.getElementById("form").style.display = "block";
      document.getElementById("acceso").style.display = "none";
  } else {
      alert("Contraseña incorrecta");
  }
}
