const API_URL = "http://54.193.193.147:8000";

export const getUsers = async () => {
  const res = await fetch(`${API_URL}/users/`);
  if (!res.ok) throw new Error("Error al obtener usuarios");
  return await res.json();
};

export const createUser = async (user) => {
  const res = await fetch(`${API_URL}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) throw new Error("Error al crear usuario");
  return await res.json();
};

export const getCategories = async () => {
  const res = await fetch(`${API_URL}/categories/`);
  if (!res.ok) throw new Error("Error al obtener categorías");
  return await res.json();
};

export const getProductsByCategory = async (id) => {
  const res = await fetch(`${API_URL}/categories/${id}/products`);
  if (!res.ok) throw new Error("Error al obtener productos por categoría");
  return await res.json();
};