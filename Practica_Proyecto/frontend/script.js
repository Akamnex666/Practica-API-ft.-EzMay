function cambiarVista(id) {
      document.querySelectorAll('.vista').forEach(v => v.classList.add('oculto'));
      document.getElementById(id).classList.remove('oculto');

      if (id === 'tablaEstudiantes') {
        cargarEstudiantes();
      }
      if (id === 'tablaCursos') {
        cargarCursos();
      }
    }

    function cargarEstudiantes() {
      fetch('http://localhost:3000/api/estudiantes/estudiante')
        .then(res => res.json())
        .then(data => {
          const tbody = document.getElementById('tablaEstudiantesBody');
          tbody.innerHTML = '';
          data.forEach(est => {
            const fila = `<tr>
              <td>${est.nombre}</td>
              <td>${est.email}</td>
              <td>${est.cedula}</td>
              <td>${est.curso}</td>
            </tr>`;
            tbody.innerHTML += fila;
          });
        })
        .catch(err => console.error('Error cargando estudiantes:', err));
    }

    function cargarCursos() {
      fetch('http://localhost:3000/api/cursos/curso')
        .then(res => res.json())
        .then(data => {
          const tbody = document.getElementById('tablaCursosBody');
          tbody.innerHTML = '';
          data.forEach(curso => {
            const fila = `<tr>
              <td>${curso.nombre}</td>
              <td>${curso.descripcion}</td>
            </tr>`;
            tbody.innerHTML += fila;
          });
        })
        .catch(err => console.error('Error cargando cursos:', err));
    }
    // Cargar cursos en el select (al abrir vista de estudiantes)
function cargarCursosEnFormulario() {
  fetch('http://localhost:3000/api/cursos/curso')
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById('cursoSelect');
      select.innerHTML = `<option disabled selected value="">Selecciona un curso</option>`;
      data.forEach(curso => {
        const option = document.createElement('option');
        option.value = curso.id; // Asegúrate que el backend retorne el ID
        option.textContent = curso.nombre;
        select.appendChild(option);
      });
    })
    .catch(err => console.error('Error cargando cursos en el formulario:', err));
}

// Escuchar envío del formulario
document.getElementById('formEstudiante').addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const cedula = document.getElementById('cedula').value;
  const cursoId = document.getElementById('cursoSelect').value;

  fetch('http://localhost:3000/api/estudiantes/estudiante', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, cedula, cursoId: parseInt(cursoId) })
  })
    .then(res => {
      if (!res.ok) throw new Error('Error al guardar estudiante');
      alert('Estudiante registrado con éxito');
      document.getElementById('formEstudiante').reset();
    })
    .catch(err => {
      console.error(err);
      alert('Error al guardar estudiante');
    });
});

// Cargar cursos al mostrar formulario de estudiantes
function cambiarVista(id) {
  document.querySelectorAll('.vista').forEach(v => v.classList.add('oculto'));
  document.getElementById(id).classList.remove('oculto');

  if (id === 'tablaEstudiantes') {
    cargarEstudiantes();
  } else if (id === 'tablaCursos') {
    cargarCursos();
  } else if (id === 'estudiantes') {
    cargarCursosEnFormulario();
  }
}

// Escuchar envío del formulario de cursos
document.getElementById('formCurso').addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = document.getElementById('nombreCurso').value;
  const descripcion = document.getElementById('descripcionCurso').value;

  fetch('http://localhost:3000/api/cursos/curso', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, descripcion })
  })
    .then(res => {
      if (!res.ok) throw new Error('Error al guardar curso');
      alert('Curso registrado con éxito');
      document.getElementById('formCurso').reset();
    })
    .catch(err => {
      console.error(err);
      alert('Error al guardar curso');
    });
});
