import { useEffect, useState } from "react";
import { getUsers } from "../../../frontend/src/services/api";

function SelectUser({ onSelect, onCreate }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(data => setUsers(data));
  }, []);

  return (
    <div>
      <h2>¿Quién está viendo?</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        {users.map(u => (
          <div key={u.id} onClick={() => onSelect(u)}>
            <img src={u.avatar_url} width="80" />
            <p>{u.nombre}</p>
          </div>
        ))}
      </div>

      <button onClick={onCreate}>+ Crear perfil</button>
    </div>
  );
}

export default SelectUser;