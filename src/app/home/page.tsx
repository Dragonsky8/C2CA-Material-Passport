import Image from "next/image";
import styles from "../page.module.css";
import CardBody from "@/component/cardBody/cardBody";
import SearchBox from "@/component/searchBox/searchBox";
import { Box, Button, Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  const renderLinkButtons = () => {
    if (role === "producer") {
      return (
        <>
          <Button variant="contained" href="/overview">
            Search product passport
          </Button>
          <Button variant="contained" href="/add/product">
            Register product passport
          </Button>
        </>
      );
    }
    if (role === "viewer") {
      return (
        <>
          <Button variant="contained" href="/overview">
            Search passport
          </Button>
        </>
      );
    }
    return;
  };

  return (
    <main className={styles.main}>
      <CardBody>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            height: "200px",
          }}
        >
          {/* <Box  sx={{
            height: '100px'
          }} component="img" alt='logo' src={"logo.jpeg"}/> */}
          <Typography variant="h4">
            {" "}
            Welcome to C2CA product passport
          </Typography>
        </Box>
      </CardBody>
      <CardBody>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
            gap: "15px",
          }}
        >
          {renderLinkButtons()}
        </Box>
      </CardBody>
    </main>
  );
}
