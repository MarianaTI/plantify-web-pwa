import ProductRepo from "@/infraestructure/implementation/httpRequest/axios/ProductRepo";
import GetAllProductUseCase from "@/application/usecases/GetAllProductUseCase";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import StarsComponent from "@/components/Stars";
import UpdateProductUseCase from "@/application/usecases/UpdateProductUseCase";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    stars: 0,
  });

  const productRepo = new ProductRepo();
  const getAllProductsUseCase = new GetAllProductUseCase(productRepo);

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stars: product.stars,
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "category") {
      console.log("ID de categoría seleccionada:", value);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await getAllProductsUseCase.run();
      setProducts(response.response.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const onSubmitUpdate = async (event) => {
    event.preventDefault();

    const updatedProduct = {
      _id: selectedProduct._id,
      ...formData,
    };

    const updateProductUseCase = new UpdateProductUseCase(productRepo);

    try {
      const response = await updateProductUseCase.run(updatedProduct);
      console.log("Editado: ", response);
      fetchProducts();
      handleClose();
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div>{/* <Button onClick={handleOpen}>Open modal</Button> */}</div>
      <div>
        {products.map((product, index) => (
          <Card key={index}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {product.description}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                $ {product.price}.00
              </Typography>
              <StarsComponent rating={product.stars} />
            </CardContent>
            <CardActions>
              <Button size="small">Eliminar</Button>
              <Button size="small" onClick={() => handleOpen(product)}>
                Editar
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-product-title"
        aria-describedby="modal-product-description"
      >
        <Box sx={style}>
          <form onSubmit={onSubmitUpdate}>
            {selectedProduct && (
              <>
                <Typography
                  id="modal-product-title"
                  variant="h6"
                  component="h2"
                >
                  Editar Producto
                </Typography>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  sx={{ mt: 2 }}
                />
                <TextField
                  fullWidth
                  label="Descripción"
                  name="description"
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  sx={{ mt: 2 }}
                />
                <TextField
                  fullWidth
                  label="Precio"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  sx={{ mt: 2 }}
                />
                <TextField
                  fullWidth
                  label="Estrellas"
                  name="stars"
                  type="number"
                  value={formData.stars}
                  onChange={handleChange}
                  sx={{ mt: 2 }}
                />
                <Button sx={{ mt: 2 }} type="submit">
                  Guardar
                </Button>
                <Button sx={{ mt: 2 }}>Cancelar</Button>
              </>
            )}
          </form>
        </Box>
      </Modal>
    </div>
  );
}
