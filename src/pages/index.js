import ProductRepo from "@/infraestructure/implementation/httpRequest/axios/ProductRepo";
import GetAllProductUseCase from "@/application/usecases/product/GetAllProductUseCase";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Modal,
  Typography,
} from "@mui/material";
import StarsComponent from "@/components/Stars";

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

  const handleOpen = (product) => {
    setSelectedProduct(product); 
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const productRepo = new ProductRepo();
  const getAllProductsUseCase = new GetAllProductUseCase(productRepo);

  const fetchProducts = async () => {
    try {
      const response = await getAllProductsUseCase.run();
      setProducts(response.response.products);
    } catch (error) {
      console.error("Error fetching products:", error);
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
            <CardMedia
              sx={{ height: 200 }}
              image={product.image.secureUrl}
              title="green iguana"
            />
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
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {product.category}
              </Typography>
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
          {selectedProduct && (
            <>
              <Typography id="modal-product-title" variant="h6" component="h2">
                {selectedProduct.name}
              </Typography>
              <CardMedia
                sx={{ height: 200, marginTop: "10px" }}
                image={selectedProduct.image.secureUrl}
                title={selectedProduct.name}
              />
              <Typography
                id="modal-product-description"
                sx={{ mt: 2 }}
                variant="body2"
              >
                {selectedProduct.description}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                Price: $ {selectedProduct.price}.00
              </Typography>
              <StarsComponent rating={selectedProduct.stars} />
              <Typography sx={{ mt: 2 }}>
                Category: {selectedProduct.category}
              </Typography>
              <Button onClick={handleClose} sx={{ mt: 2 }}>
                Cerrar
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
