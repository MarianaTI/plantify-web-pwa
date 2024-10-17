import IProductRepo from "@/domain/repositories/IProductRepo";

class UpdateProductUseCase {
  constructor(productRepo) {
    if (!(productRepo instanceof IProductRepo))
      throw new Error("productRepo must be instance of IProductRepo");
    this.productRepo = productRepo;
  }

  async run(product) {
    try {
        const updateProduct = this.productRepo.update(product);
        return updateProduct;
    } catch (error) {
      console.log("Error al actualizar el producto:", error);
      throw error;
    }
  }
}

export default UpdateProductUseCase;