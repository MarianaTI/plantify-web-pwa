import GetAllCategoryUseCase from "@/application/usecases/category/GetAllCategoryUseCase";
import CategoryRepo from "@/infraestructure/implementation/httpRequest/axios/CategoryRepo";
import { useEffect, useState } from "react";

export default function Home() {
  const [category, setCategory] = useState([]);

  const categoryRepo = new CategoryRepo();
  const getAllCategoryUseCase = new GetAllCategoryUseCase(categoryRepo);

  const fetchCategories = async () => {
    try {
      const response = await getAllCategoryUseCase.run();
      setCategory(response.categories);
      console.log(category);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <h1>Página de Inicio</h1>
      <p>Contenido estático aquí.</p>
    </div>
  );
}
