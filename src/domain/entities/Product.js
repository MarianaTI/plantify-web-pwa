class Product {
    constructor(_id, name, description, price, stars, id_category, image) {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stars = stars;
        this.id_category = id_category;
        this.image = image; 
    }
}

export default Product;