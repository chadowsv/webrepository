import { useEffect, useState } from "react";
/*llamada al backend*/
import { getCategories, getProductsByCategory } from "../services/api";

function Category() {
  /*establecer estados memoria del componente*/
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  /*Corre cuando se carga la pantalla*/
  useEffect(() => {
    const loadData = async () => {
      /*Trae las categorias*/
      const cats = await getCategories();
      setCategories(cats);
      /*Prepara un objeto vacio*/
      const data = {};
      /*Recorre cada categoria*/
      for (let cat of cats) {
        /*trae los productos por categoria*/
        const products = await getProductsByCategory(cat.id);
        /*guarda en el objeto*/
        data[cat.id] = products;
      }
      /*Guarda los productos por categoria en el estado*/
      setProductsByCategory(data);
    };

    loadData();
  }, []);

  return (
    <div>
      {categories.map(cat => (
        <div key={cat.id}>
          <h2 className="category-title">{cat.name}</h2>

          <div className="row">
            {productsByCategory[cat.id]?.map(p => (
              <div className="card" key={p.id}>
                <img src={p.image_url} />
                <h4>{p.name}</h4>
                <p>{p.description}</p>
                <p>${p.price}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
export default Category;