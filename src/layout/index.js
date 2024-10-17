import * as React from "react";
import { AppBar, Toolbar, IconButton, CssBaseline } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const ResponsiveNavbar = ({ children }) => {
  const theme = useTheme();
  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: theme.zIndex.drawer + 1, backgroundColor: "#1A5319" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="menu"
            edge="start"
            sx={{ mr: 2 }}
          >
            <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>Plantify</span>
          </IconButton>
        </Toolbar>
      </AppBar>
      <main style={{ flexGrow: 1, padding: theme.spacing(3) }}>
        <Toolbar />
        {children}
      </main>
    </div>
  );
};

export default ResponsiveNavbar;
