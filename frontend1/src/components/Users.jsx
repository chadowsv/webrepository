/*useState guarda los datos en el componente y createUser es la funcion que llama a laa API*/
import { useState } from "react";
import { createUser } from "../../../frontend/src/services/api";
/*Pantalla de creacion de usuario*/
function Users({ onUserCreated }) {
    /*Aqui se guardan los datos escritos del usuario*/
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
    /*Imagenes establecidas desde S3*/
  const avatars = [
    "https://archivosgravityfalls.s3.us-west-1.amazonaws.com/avatars/Bill.jpeg",
    "https://archivosgravityfalls.s3.us-west-1.amazonaws.com/avatars/Dipper.jpeg",
    "https://archivosgravityfalls.s3.us-west-1.amazonaws.com/avatars/Mabel.jpeg",
    "https://archivosgravityfalls.s3.us-west-1.amazonaws.com/avatars/Sous.jpeg",
    "https://archivosgravityfalls.s3.us-west-1.amazonaws.com/avatars/Stan.jpeg",
  ];
  /*Funcion para manejar el envío del formulario, creacion del usuario*/
  const handleSubmit = async () => {
    /*Preparacion de los datos para enviar a la API*/
    const user = {
      nombre,
      email,
      avatar_url: avatar
    };
    /*Llamada a la API para crear el usuario*/
    const nuevoUser = await createUser(user);

    // guardar en localStorage la sesion
    localStorage.setItem("user", JSON.stringify(nuevoUser));

    // avisar a App que ya hay usuario
    onUserCreated(nuevoUser);
  };

  return (
    <div>
      <h2>Crear perfil</h2>

      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <h3>Elige un avatar</h3>

      <div style={{ display: "flex", gap: "10px" }}>
        {avatars.map((a, index) => (
          <img
            key={index}
            src={a}
            width="80"
            style={{
              border: avatar === a ? "3px solid blue" : "1px solid gray",
              cursor: "pointer"
            }}
            onClick={() => setAvatar(a)}
          />
        ))}
      </div>

      <button onClick={handleSubmit}>Crear</button>
    </div>
  );
}

export default Users;