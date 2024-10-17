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

  async update(product) {
    try {
      const formData = new FormData();
      formData.append("name", blog.name);
      formData.append("description", blog.description);
      formData.append("price", blog.price);
      formData.append("stars", blog.stars);
      formData.append("id_category", blog.id_category);
      formData.append("image", blog.image);
      const response = await axios.put(
        `${this.url}/update/${product._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      throw error;
    }
  }
}

export default ProductRepo;
