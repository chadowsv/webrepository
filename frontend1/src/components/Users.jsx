import { useEffect, useState } from "react";
import { getUsers } from "../services/api";

function SelectUser({ onSelect, onCreate }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadUsers();
  }, []);

  return (
    <div className="select-user-container">
      <h1 className="select-title">¿Quién está viendo?</h1>

      <div className="profiles-grid">
        {users.map((u) => (
          <div
            key={u.id}
            className="profile-card-select"
            onClick={() => onSelect(u)}
          >
            <img
              src={u.avatar_url}
              alt={u.nombre}
              className="profile-image-select"
            />
            <p>{u.nombre}</p>
          </div>
        ))}
      </div>

      <button className="create-profile-btn" onClick={onCreate}>
        + Crear perfil
      </button>
    </div>
  );
}

export default SelectUser;