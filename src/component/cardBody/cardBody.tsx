import { Box } from "@mui/material";
import { ReactElement } from "react";
import styles from "../../app/page.module.css";

type PageProps = {
  children: JSX.Element;
};

export default function CardBody({ children }: PageProps) {
  return (
    <main className={styles.main}>
      <Box
        sx={{
          display: 'flex',
          backgroundColor: "#d5e6dc",
          // minHeight: '80vh',
          // margin: '68px 4vh 4vh 4vh',
          padding: "2vh",
          borderRadius: "20px",
          border: "solid #c2c2c2 2px",
          width: "100%",
          gap: '20px'
        }}
      >
        {children}
      </Box>
    </main>
  );
}
