import ICategoryRepo from "@/domain/repositories/ICategoryRepo";

class GetAllCategoryUseCase {
  constructor(categoryRepo) {
    if (!(categoryRepo instanceof ICategoryRepo))
      throw new Error("CategoryRepo must be instance of ICategoryRepo");
    this.categoryRepo = categoryRepo;
  }

  async run() {
    const getCategory = this.categoryRepo.getAll();
    return getCategory;
  }
}

export default GetAllCategoryUseCase;
