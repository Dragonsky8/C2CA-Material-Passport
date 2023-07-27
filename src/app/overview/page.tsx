import MediaCard from "@/component/media/mediaCard";
import { Box } from "@mui/material";
import styles from "../page.module.css";
import SearchBox from "@/component/searchBox/searchBox";
import CardBody from "@/component/cardBody/cardBody";
import { Metadata } from "next";
import {getServerSession} from 'next-auth'
import {redirect} from 'next/navigation'
export const metadata: Metadata = {
    title: 'Overview',
    description: 'Generated by create next app',
  }
/**
 *
 * @returns Overview page where you can search by RFID identifier
 */
export default async function Overview() {
  const session  = await getServerSession()

    if (!session) {
        redirect("/api/auth/signin")
    }
  return (
    <CardBody>
      <>
        <Box>
          <SearchBox />
        </Box>
        <Box> Hello. Here you can find an overview on the material properties!</Box>
      </>
    </CardBody>
  );
}
