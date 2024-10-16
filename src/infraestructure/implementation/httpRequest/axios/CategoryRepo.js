import ICategoryRepo from "@/domain/repositories/ICategoryRepo";
import axios from "axios";

class CategoryRepo extends ICategoryRepo {
  constructor() {
    super();
    this.url = "http://localhost:3002/api/categories/getAll";
  }

  async getAll() {
    try {
      const response = await axios.get(this.url);
      return response.data;
    } catch (error) {
      console.error("Error fetching las categorias:", error.message);
      throw error;
    }
  }
}

export default CategoryRepo;