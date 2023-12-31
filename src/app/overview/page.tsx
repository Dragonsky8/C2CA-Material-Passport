import MediaCard from "@/component/media/mediaCard";
import { Box } from "@mui/material";
import styles from "../page.module.css";
import SearchBox from "@/component/searchBox/searchBox";
import CardBody from "@/component/cardBody/cardBody";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import {authOptions} from "../utils/authOptions";

export const metadata: Metadata = {
  title: "Overview",
  description: "Generated by create next app",
};
/**
 *
 * @returns Overview page where you can search by RFID identifier
 */
export default async function Overview() {
  const session = await getServerSession(authOptions);
  // console.log(session)

  return (
    <CardBody>
      <>
        <Box>
          <SearchBox />
        </Box>
        <Box>
          Hello {session?.user?.username}. Here you can find an overview on the material properties!
        </Box>
      </>
    </CardBody>
  );
}
