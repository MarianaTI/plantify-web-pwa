import IProductRepo from "@/domain/repositories/IProductRepo";
import axios from "axios";

class ProductRepo extends IProductRepo {
  constructor() {
    super();
    this.url = "http://localhost:3002/api/product";
  }

  async getAll() {
    try {
      const response = await axios.get(this.url);
      return response.data;
    } catch (error) {
      console.error("Error fetching los productos:", error.message);
      throw error;
    }
  }
}

export default ProductRepo;