import ProductRepo from "@/infraestructure/implementation/httpRequest/axios/ProductRepo";
import GetAllProductUseCase from "@/application/usecases/GetAllProductUseCase";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  createTheme,
  Fab,
  Grid,
  Modal,
  Pagination,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Badge from "@mui/material/Badge";
import StarsComponent from "@/components/Stars";
import UpdateProductUseCase from "@/application/usecases/UpdateProductUseCase";
import CreateProductUseCase from "@/application/usecases/CreateProductUseCase";
import DeleteProductUseCase from "@/application/usecases/DeleteProductUseCase";
import AddIcon from "@mui/icons-material/Add";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Loader from "@/components/Loader";
import {
  DescriptionStyled,
  NotificationContainer,
  RowStyled,
} from "@/styles/Index.style";
import GetTotalProductUseCase from "@/application/usecases/GetTotalProductUseCase";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "12px",
};

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
    h5: {
      color: "#1f1f1f",
      fontSize: "22px",
      fontWeight: 600,
    },
    body2: {
      color: "#1f1f1f",
      fontSize: "14px",
      fontWeight: 500,
    },
  },
});

export default function Home() {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    stars: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const [notifications, setNotifications] = useState(0);

  const productRepo = new ProductRepo();
  const getAllProductsUseCase = new GetAllProductUseCase(productRepo);
  const getTotalProductUseCase = new GetTotalProductUseCase(productRepo);
  const deleteProductUseCase = new DeleteProductUseCase(productRepo);

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
      console.log("productos: ", response.response.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchTotalProducts = async () => {
    try {
      const response = await getTotalProductUseCase.run();
      setTotalProducts(response);
      console.log("Total de productos: ", response);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
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

  const [openCreate, setOpenCreate] = useState(false);
  const [newProductData, setNewProductData] = useState({
    name: "",
    description: "",
    price: 0,
    stars: 0,
  });

  const handleOpenCreate = () => {
    setNewProductData({
      name: "",
      description: "",
      price: 0,
      stars: 0,
    });
    setOpenCreate(true);
  };

  const handleCloseCreate = () => setOpenCreate(false);

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProductData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitCreate = async (event) => {
    event.preventDefault();

    const createProductUseCase = new CreateProductUseCase(productRepo);

    try {
      const response = await createProductUseCase.run(newProductData);
      console.log("Producto creado:", response);
      await fetchProducts();
      await fetchTotalProducts();
      setNotifications((prev) => prev + 1);
      handleCloseCreate();
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProductUseCase.run(productId);
      console.log(`Producto con ID ${productId} eliminado`);
      fetchProducts();
    } catch (error) {
      console.error("Error al eliminar el producto: ", error);
    }
  };

  const clearNotifications = () => {
    setNotifications(0); 
  };

  useEffect(() => {
    fetchProducts();
    fetchTotalProducts();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Loader />
        </div>
      ) : (
        <ThemeProvider theme={theme}>
          <RowStyled>
            <h1>Bienvenido a Platify 🪴</h1>
            <NotificationContainer>
              <Badge
                badgeContent={notifications}
                color="secondary"
                onClick={clearNotifications}
                style={{ cursor: "pointer" }}
              >
                <NotificationsIcon />
              </Badge>
            </NotificationContainer>
          </RowStyled>
          <Grid container spacing={2}>
            {currentProducts.length === 0 ? (
              <Grid item xs={12}>
                <Typography variant="h6" align="center" color="#bebebe">
                  No hay productos disponibles.
                </Typography>
              </Grid>
            ) : (
              currentProducts.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                      </Typography>
                      <DescriptionStyled>
                        {product.description}
                      </DescriptionStyled>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        $ {product.price}
                      </Typography>
                      <StarsComponent rating={product.stars} />
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => handleDeleteProduct(product._id)}
                        sx={{
                          color: "#388636",
                          "&:hover": {
                            backgroundColor: "#e6f0e6",
                          },
                        }}
                      >
                        Eliminar
                      </Button>
                      <Button
                        size="small"
                        onClick={() => handleOpen(product)}
                        sx={{
                          color: "#388636",
                          "&:hover": {
                            backgroundColor: "#e6f0e6",
                          },
                        }}
                      >
                        Editar
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={Math.ceil(products.length / productsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              sx={{
                "& .Mui-selected": {
                  backgroundColor: "#1A5319",
                },
              }}
            />
          </Box>
          <Fab
            color="#1A5319"
            aria-label="add"
            onClick={handleOpenCreate}
            sx={{
              position: "fixed",
              bottom: 16,
              right: 16,
              backgroundColor: "#388636",
              color: "#FFFFFF",
              "&:hover": {
                backgroundColor: "#1A5319",
              },
            }}
          >
            <AddIcon />
          </Fab>
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
                      sx={{
                        mt: 2,
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "green",
                          },
                          "&:hover fieldset": {
                            borderColor: "green",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          "&.Mui-focused": {
                            color: "green",
                          },
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Descripción"
                      name="description"
                      multiline
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      sx={{
                        mt: 2,
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "green",
                          },
                          "&:hover fieldset": {
                            borderColor: "green",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          "&.Mui-focused": {
                            color: "green",
                          },
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Precio"
                      name="price"
                      type="number"
                      inputProps={{
                        min: 0,
                        max: 1000,
                        step: 0.01,
                      }}
                      value={formData.price}
                      onChange={handleChange}
                      sx={{
                        mt: 2,
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "green",
                          },
                          "&:hover fieldset": {
                            borderColor: "green",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          "&.Mui-focused": {
                            color: "green",
                          },
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Estrellas"
                      name="stars"
                      type="number"
                      inputProps={{
                        min: 0,
                        max: 5,
                      }}
                      value={formData.stars}
                      onChange={handleChange}
                      sx={{
                        mt: 2,
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "green",
                          },
                          "&:hover fieldset": {
                            borderColor: "green",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          "&.Mui-focused": {
                            color: "green",
                          },
                        },
                      }}
                    />
                    <Button
                      sx={{
                        mt: 2,
                        color: "#388636",
                        "&:hover": {
                          backgroundColor: "#e6f0e6",
                        },
                      }}
                      type="submit"
                    >
                      Guardar
                    </Button>
                    <Button
                      sx={{
                        mt: 2,
                        color: "#388636",
                        "&:hover": {
                          backgroundColor: "#e6f0e6",
                        },
                      }}
                      onClick={handleClose}
                    >
                      Cancelar
                    </Button>
                  </>
                )}
              </form>
            </Box>
          </Modal>
          <Modal
            open={openCreate}
            onClose={handleCloseCreate}
            aria-labelledby="modal-create-product-title"
            aria-describedby="modal-create-product-description"
          >
            <Box sx={style}>
              <form onSubmit={onSubmitCreate}>
                <Typography
                  id="modal-create-product-title"
                  variant="h6"
                  component="h2"
                >
                  Crear Nuevo Producto
                </Typography>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="name"
                  value={newProductData.name}
                  onChange={handleNewProductChange}
                  sx={{
                    mt: 2,
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "green",
                      },
                      "&:hover fieldset": {
                        borderColor: "green",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      "&.Mui-focused": {
                        color: "green",
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Descripción"
                  name="description"
                  multiline
                  rows={4}
                  value={newProductData.description}
                  onChange={handleNewProductChange}
                  sx={{
                    mt: 2,
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "green",
                      },
                      "&:hover fieldset": {
                        borderColor: "green",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      "&.Mui-focused": {
                        color: "green",
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Precio"
                  name="price"
                  type="number"
                  inputProps={{
                    min: 0,
                    max: 1000,
                    step: 0.01,
                  }}
                  value={newProductData.price}
                  onChange={handleNewProductChange}
                  sx={{
                    mt: 2,
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "green",
                      },
                      "&:hover fieldset": {
                        borderColor: "green",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      "&.Mui-focused": {
                        color: "green",
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Estrellas"
                  name="stars"
                  type="number"
                  inputProps={{
                    min: 0,
                    max: 5,
                  }}
                  value={newProductData.stars}
                  onChange={handleNewProductChange}
                  sx={{
                    mt: 2,
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "green",
                      },
                      "&:hover fieldset": {
                        borderColor: "green",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      "&.Mui-focused": {
                        color: "green",
                      },
                    },
                  }}
                />
                <Button
                  sx={{
                    mt: 2,
                    color: "#388636",
                    "&:hover": {
                      backgroundColor: "#e6f0e6",
                    },
                  }}
                  type="submit"
                >
                  Guardar
                </Button>
                <Button
                  sx={{
                    mt: 2,
                    color: "#388636",
                    "&:hover": {
                      backgroundColor: "#e6f0e6",
                    },
                  }}
                  onClick={handleCloseCreate}
                >
                  Cancelar
                </Button>
              </form>
            </Box>
          </Modal>
        </ThemeProvider>
      )}
    </div>
  );
}
