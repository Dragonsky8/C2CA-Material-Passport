import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Box, Paper } from "@mui/material";
import styles from '../app/page.module.css'


export default function Footer() {
  return (
  <Paper square variant="outlined">
    <Container maxWidth="lg">
      <Box
        sx={{
          flexGrow: 1,
          justifyContent: "center",
          display: "flex",
          my:1
        }}
      >
          <div>
          </div>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          justifyContent: "center",
          display: "flex",
          mb: 2,
        }}
      > 
      {/* <Box  sx={{
        height: '40px'
      }} component="img" alt='logo' src={"logo.jpeg"}/> */}
        <Typography variant="caption" color="initial">
          Copyright ©2023. C2CA Technologies
        </Typography>
      </Box>
    </Container>
  </Paper>
);
}
