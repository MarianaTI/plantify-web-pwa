import * as React from "react";
import { AppBar, Toolbar, IconButton, CssBaseline } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const ResponsiveNavbar = ({ children }) => {
  const theme = useTheme();
  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="menu" edge="start" sx={{ mr: 2 }}>
            <span>Plantify</span>
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
