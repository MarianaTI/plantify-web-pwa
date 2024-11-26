import IProductRepo from "@/domain/repositories/IProductRepo";

class GetTotalProductUseCase {
    constructor(productRepo) {
        if (!(productRepo instanceof IProductRepo)) {
            throw new Error("ProductRepo must be instance of IProductRepo");
        }
        this.productRepo = productRepo;
    }

    async run() {
        const getTotalProduct = await this.productRepo.getTotal();
        return getTotalProduct;
    }
}

export default GetTotalProductUseCase;