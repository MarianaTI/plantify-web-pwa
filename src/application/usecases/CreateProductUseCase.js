import IProductRepo from "@/domain/repositories/IProductRepo";

class CreateProductUseCase {
  constructor(productRepo) {
    if (!(productRepo instanceof IProductRepo))
      throw new Error("productRepo must be instance of IProductRepo");
    this.productRepo = productRepo;
  }

  async run(product) {
    try {
      const createdProduct = await this.productRepo.create(product);
      return createdProduct;
    } catch (error) {
      console.log("Error creating product:", error);
      throw error;
    }
  }
}

export default CreateProductUseCase;
