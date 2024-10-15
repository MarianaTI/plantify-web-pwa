// components/ResponsiveDrawer.js
import * as React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router"; // Importar el hook useRouter

const drawerWidth = 240;

const ResponsiveDrawer = ({ window, children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getPageTitle = () => {
    switch (router.pathname) {
      case "/":
        return "Inicio";
      case "/products":
        return "Productos";
      default:
        return "Página";
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {["Home", "Productos"].map((text) => (
          <ListItem
            button={true}
            key={text}
            onClick={() => {
              const newPath = text === "Home" ? "/" : "/products";
              if (router.pathname !== newPath) {
                router.push(newPath);
              }
            }}
          >
            <ListItemText primary={text} sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: 700 }}/>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div">
            {getPageTitle()}
          </Typography>
        </Toolbar>
      </AppBar>

      <nav style={{ width: isMobile ? "auto" : drawerWidth, flexShrink: 0 }}>
        <Drawer
          container={container}
          variant={isMobile ? "temporary" : "permanent"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>

      <main style={{ flexGrow: 1, padding: theme.spacing(3) }}>
        <Toolbar />
        {children}
      </main>
    </div>
  );
};

export default ResponsiveDrawer;
