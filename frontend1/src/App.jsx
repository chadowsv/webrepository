/*useState guarda los datos en el componente y createUser es la funcion que llama a laa API*/
import { useState } from "react";
import { createUser } from "./services/api";
/*Pantalla de creacion de usuario*/
function Users({ onUserCreated }) {
    /*Aqui se guardan los datos escritos del usuario*/
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
    /*Imagenes establecidas desde S3*/
const avatars = [
  {
    name: "Bill Cipher",
    img: "https://archivosgravityfalls.s3.us-west-1.amazonaws.com/avatars/Bill.jpeg",
    desc: "Misterioso, manipulador y ama el caos"
  },
  {
    name: "Dipper Pines",
    img: "https://archivosgravityfalls.s3.us-west-1.amazonaws.com/avatars/Dipper.jpeg",
    desc: "Curioso, inteligente y obsesionado con lo paranormal"
  },
  {
    name: "Mabel Pines",
    img: "https://archivosgravityfalls.s3.us-west-1.amazonaws.com/avatars/Mabel.jpeg",
    desc: "Creativa, divertida y llena de energía"
  },
  {
    name: "Soos",
    img: "https://archivosgravityfalls.s3.us-west-1.amazonaws.com/avatars/Sous.jpeg",
    desc: "Leal, relajado y siempre buena onda"
  },
  {
    name: "Stan Pines",
    img: "https://archivosgravityfalls.s3.us-west-1.amazonaws.com/avatars/Stan.jpeg",
    desc: "Astuto, gracioso y con secretos"
  }
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
      <h1 className="title">¿Quién eres en Gravity Falls?</h1>

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

      <div className="avatars-container">
        {avatars.map((a, index) => (
  <div
    key={index}
    onClick={() => setAvatar(a.img)}
    className="avatar-card"
  >
    <img src={a.img}/>

    <h4>{a.name}</h4>

    <p style={{ fontSize: "12px" }}>{a.desc}</p>
  </div>
))}
      </div>

      <button onClick={handleSubmit}>Crear</button>
    </div>
  );
}

export default Users;