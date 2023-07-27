import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { getServerSession } from "next-auth";
import { signOut, getSession } from "next-auth/react"


export default async function ButtonAppBar() {
  const session = await getServerSession();

  function renderLogin() {
    if (session) {
      return (
        <Button color="inherit" href="/api/auth/signout">
          Logout
        </Button>
      );
    } else {
      return (
        <Button color="inherit" href="logintest">
          Login
        </Button>
      );
    }
  }

  return (
    <Box sx={{ flexGrow: 1, top: 0, overflow: "hidden", height: "2vh" }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            C2CA Material Passport
          </Typography>
          <Button color="inherit" href="/add">
            Add
          </Button>
          <Button color="inherit" href="/overview">
            Overview
          </Button>
          <Button color="inherit" href="/">
            Home
          </Button>
          {renderLogin()}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
