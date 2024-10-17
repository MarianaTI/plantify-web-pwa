import IProductRepo from "@/domain/repositories/IProductRepo";

class GetAllProductUseCase {
    constructor(productRepo) {
        if (!(productRepo instanceof IProductRepo)) {
            throw new Error("ProductRepo must be instance of IProductRepo");
        }
        this.productRepo = productRepo;
    }

    async run() {
        const getProduct = await this.productRepo.getAll();
        return getProduct;
    }
}

export default GetAllProductUseCase;
