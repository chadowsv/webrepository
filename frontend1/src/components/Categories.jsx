import { useEffect, useState } from "react";
import { getCategories, getProductsByCategory } from "../services/api";

function Categories({ user, onChangeUser }) {
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const cats = await getCategories();
      setCategories(cats);

      const data = {};
      for (let cat of cats) {
        const products = await getProductsByCategory(cat.id);
        data[cat.id] = products;
      }
      setProductsByCategory(data);
    };

    loadData();
  }, []);

  const allProducts = Object.values(productsByCategory).flat();

  const filteredProducts =
    selectedCategory === "all"
      ? allProducts
      : productsByCategory[selectedCategory] || [];

  return (
    <div className="layout-container">
      <div className="left-panel">
        <h2 className="panel-title">Categorías</h2>

        <button
          className={`category-button ${selectedCategory === "all" ? "active" : ""}`}
          onClick={() => setSelectedCategory("all")}
        >
          Todos
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-button ${selectedCategory === cat.id ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="center-panel">
        <h2 className="panel-title">Contenido</h2>

        <div className="products-grid">
          {filteredProducts.map((p) => (
            <div
              className="product-card"
              key={p.id}
              onClick={() => setSelectedProduct(p)}
            >
              <img src={p.image_url} alt={p.name} />
              <div className="product-overlay">
                <h4>{p.name}</h4>
                <p>{p.description}</p>
                <p>${p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="right-panel">
        <div className="profile-box">
          <h2 className="panel-title">Perfil</h2>

          {user && (
            <>
              <img className="profile-avatar" src={user.avatar_url} alt={user.nombre} />
              <h3>{user.nombre}</h3>
              <p>{user.email}</p>
              <button onClick={onChangeUser}>Cambiar perfil</button>
            </>
          )}
        </div>

        <div className="detail-box">
          <h2 className="panel-title">Detalle</h2>

          {selectedProduct ? (
            <>
              <img
                className="detail-image"
                src={selectedProduct.image_url}
                alt={selectedProduct.name}
              />
              <h3>{selectedProduct.name}</h3>
              <p>{selectedProduct.description}</p>
              <p><strong>Precio:</strong> ${selectedProduct.price}</p>
              <p><strong>Stock:</strong> {selectedProduct.stock}</p>
            </>
          ) : (
            <p>Selecciona un producto para ver más información.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Categories;