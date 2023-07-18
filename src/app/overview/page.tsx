import MediaCard from "@/component/media/mediaCard";
import { Box } from "@mui/material";
import styles from "../page.module.css";
import SearchBox from "@/component/searchBox/searchBox";
import CardBody from "@/component/cardBody/cardBody";

/**
 *
 * @returns Overview page where you can search by RFID identifier
 */
export default function Overview() {
  return (
    <CardBody>
      <>
        <Box>
          <SearchBox />
        </Box>
        <Box> Hello</Box>
      </>
    </CardBody>
  );
}
