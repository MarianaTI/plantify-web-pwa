import ProductRepo from "@/infraestructure/implementation/httpRequest/axios/ProductRepo";
import GetAllProductUseCase from "@/application/usecases/product/GetAllProductUseCase";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]); 

  const productRepo = new ProductRepo(); 
  const getAllProductsUseCase = new GetAllProductUseCase(productRepo); 

  const fetchProducts = async () => {
    try {
      const response = await getAllProductsUseCase.run();
      setProducts(response.response.products);   
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  
  useEffect(() => {
    fetchProducts();  
  }, []);

  return (
    <div>
      <h1>Página de Inicio</h1>
      <p>Contenido estático aquí.</p>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {product.name} - {product.price}$
          </li>
        ))}
      </ul>
    </div>
  );
}
