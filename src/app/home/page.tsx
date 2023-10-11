import Image from "next/image";
import styles from "../page.module.css";
import CardBody from "@/component/cardBody/cardBody";
import SearchBox from "@/component/searchBox/searchBox";
import { Box, Button, Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const role = session?.user.role;

  const renderLinkButtons = () => {
    if (role === ("productproducer")) {
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
    if (role === ("rawproducer")) {
      return (
        <>
          <Button variant="contained" href="/overview">
            Search raw material passport
          </Button>
          <Button variant="contained" href="/add/raw">
            Register raw material passport
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
            height: "150px",
          }}
        >
          {/* <Box  sx={{
            height: '100px'
          }} component="img" alt='logo' src={"logo.jpeg"}/> */}
          <Typography variant="h4">
            {" "}
            Welcome to C2CA passport database.
          </Typography>
        </Box>
      </CardBody>
      <CardBody>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Typography variant="h4"> Material Passport</Typography>

          <Typography variant="h6">
            A material passport is a document that serves as a comprehensive
            record of essential information about a specific batch or type of
            concrete. Similar to a passport for a person, it provides vital
            details and history that facilitate transparency, quality control,
            and traceability throughout the product's lifecycle
          </Typography>
        </Box>
      </CardBody>
      <CardBody>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Typography variant="h4"> Product Passport</Typography>

          <Typography variant="h6">
            A product passport is a document that serves as a comprehensive
            record of essential information about a specific batch or type of
            concrete. Similar to a passport for a person, it provides vital
            details and history that facilitate transparency, quality control,
            and traceability throughout the product's lifecycle
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
