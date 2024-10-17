import IProductRepo from "@/domain/repositories/IProductRepo"

class DeleteProductUseCase {
    constructor(productRepo) {
        if(!(productRepo instanceof IProductRepo))
            throw new Error("productRepo must be instance of IProductRepo");
        this.productRepo = productRepo;
    }

    async run(_id) {
        const product = await this.productRepo.delete(_id);
        if (!product) {
            throw new Error(`Product with Id ${_id} not found`);
        }
        return {messege: `Product with Id ${_id} has been delete`}
    }
}

export default DeleteProductUseCase;