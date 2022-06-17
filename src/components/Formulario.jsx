import React, { Fragment, useState } from "react";
import { v4 as uuid } from "uuid";

const Formulario = ({ crearCita }) => {
  //Crear state de citas
  const [cita, actualizarCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });

  //Crear state para errores
  const [error, ActualizarError] = useState(false);

  const actualizarState = (e) => {
    actualizarCita({
      ...cita,
      [e.target.name]: e.target.value,
    });
  };

  //Extraer los valores;

  const { mascota, propietario, fecha, hora, sintomas } = cita;

  // Cuando envia el formulario
  const submitCita = (e) => {
    e.preventDefault();

    if (
      !mascota.trim() ||
      !propietario.trim() ||
      !fecha.trim() ||
      !hora.trim() ||
      !sintomas.trim()
    ) {
      ActualizarError(true);
      return;
    }

    // Eliminar el mensaje previo
    ActualizarError(false);

    //Asignar el id
    cita.id = uuid();

    //Crear un cita
    crearCita(cita);

    //Reiniciar el formulario
    actualizarCita({
      mascota: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: "",
    });
  };

  return (
    <Fragment>
      <h2>Crear Cita</h2>

      {error ? (
        <p className="alerta-error">Todos los campos son obligatorio</p>
      ) : null}

      <form onSubmit={submitCita}>
        <label>Mascota</label>
        <input
          onChange={actualizarState}
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          value={mascota}
        />

        <label>Nombre del Dueño</label>
        <input
          onChange={actualizarState}
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre del propetario"
          value={propietario}
        />

        <label>Fecha</label>
        <input
          onChange={actualizarState}
          type="date"
          name="fecha"
          className="u-full-width"
          value={fecha}
        />

        <label>Hora</label>
        <input
          onChange={actualizarState}
          type="time"
          name="hora"
          className="u-full-width"
          value={hora}
        />

        <label>Sintomas</label>
        <textarea
          onChange={actualizarState}
          className="u-full-width"
          name="sintomas"
          style={{ resize: "none" }}
          value={sintomas}
        ></textarea>

        <button type="submit" className=" u-full-width button-primary">
          Agregar cita
        </button>
      </form>
    </Fragment>
  );
};

export default Formulario;
