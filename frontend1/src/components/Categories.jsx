import { useEffect, useState } from "react";
import { getCategories, getProductsByCategory } from "../services/api";

function Categories({ user, onChangeUser }) {
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const cats = await getCategories();
        setCategories(cats);

        const data = {};
        for (const cat of cats) {
          const products = await getProductsByCategory(cat.id);
          data[cat.id] = products;
        }

        setProductsByCategory(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  const getMediaType = (url) => {
    if (!url) return "unknown";

    const cleanUrl = url.split("?")[0].toLowerCase();

    const videoExtensions = [".mp4", ".webm", ".ogg", ".mov"];
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

    if (videoExtensions.some((ext) => cleanUrl.endsWith(ext))) return "video";
    if (imageExtensions.some((ext) => cleanUrl.endsWith(ext))) return "image";

    return "unknown";
  };

  const allProducts = Object.values(productsByCategory).flat();

  const filteredProducts =
    selectedCategory === "all"
      ? allProducts
      : productsByCategory[selectedCategory] || [];

  return (
    <div className="layout-container">
      <aside className="left-panel">
        <h2 className="panel-title">Categorías</h2>

        <button
          className={`category-button ${selectedCategory === "all" ? "active" : ""}`}
          onClick={() => {
            setSelectedCategory("all");
            setSelectedProduct(null);
          }}
        >
          General
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-button ${selectedCategory === cat.id ? "active" : ""}`}
            onClick={() => {
              setSelectedCategory(cat.id);
              setSelectedProduct(null);
            }}
          >
            {cat.name}
          </button>
        ))}
      </aside>

      <main className="center-panel">
        <h2 className="main-title">
          {selectedCategory === "all"
            ? "Contenido"
            : categories.find((c) => c.id === selectedCategory)?.name}
        </h2>

        <div className="products-grid">
          {filteredProducts.map((p) => {
            const mediaType = getMediaType(p.image_url);

            return (
              <div
                className="product-card"
                key={p.id}
                onClick={() => setSelectedProduct(p)}
              >
                {mediaType === "video" ? (
                  <video className="product-media" src={p.image_url} controls>
                    Tu navegador no soporta video.
                  </video>
                ) : (
                  <img className="product-media" src={p.image_url} alt={p.name} />
                )}

                <div className="product-overlay">
                  <h4>{p.name}</h4>
                  <p>{p.description}</p>
                  <span>${p.price}</span>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <aside className="right-panel">
        <div className="profile-box">
          <h2 className="panel-title">Perfil</h2>

          {user && (
            <>
              <img
                className="profile-avatar"
                src={user.avatar_url}
                alt={user.nombre}
              />
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
              {getMediaType(selectedProduct.image_url) === "video" ? (
                <video
                  className="detail-media"
                  src={selectedProduct.image_url}
                  controls
                >
                  Tu navegador no soporta video.
                </video>
              ) : (
                <img
                  className="detail-media"
                  src={selectedProduct.image_url}
                  alt={selectedProduct.name}
                />
              )}

              <h3>{selectedProduct.name}</h3>
              <p>{selectedProduct.description}</p>
              <p><strong>Precio:</strong> ${selectedProduct.price}</p>
              <p><strong>Stock:</strong> {selectedProduct.stock}</p>
            </>
          ) : (
            <p>Selecciona un elemento para ver más información.</p>
          )}
        </div>
      </aside>
    </div>
  );
}

export default Categories;