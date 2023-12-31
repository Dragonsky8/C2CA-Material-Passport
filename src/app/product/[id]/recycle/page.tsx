import MediaCard from "@/component/media/mediaCard";
import { Box, Button, Typography } from "@mui/material";
import styles from "../page.module.css";
import SearchBox from "@/component/searchBox/searchBox";
import CardBody from "@/component/cardBody/cardBody";
import BasicTable from "@/component/dataTable/dataTable";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import NestedList from "@/component/nestedList/nestedList";
import testProp, { ResObj } from "@/types/dataType";

export const metadata: Metadata = {
  title: "Recycle",
  description: "Recycle information",
};
const subSection = "recycle";

// Asynchronously fetch data
async function getEntity(id: string) {
  const res = await fetch(process.env.URL + `/api/entity/${subSection}/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("hellluup");
  }
  return res.json();
}
async function getEntityHistory(id: string) {
  const res = await fetch(process.env.URL + `/api/entity/history/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("hellluup");
  }
  return res.json();
}
/**
 *
 * @returns Overview page where you can search by RFID identifier
 */
export default async function specificOverview({
  params,
}: {
  params: { id: string };
}) {
  // Get current search ID from params
  const session = await getServerSession(authOptions);
  let isAdmin = false;
  if (session?.user.role === ("admin") || session?.user.role === ("productproducer")) {
    isAdmin = true;
  }
  const entityInfo: ResObj & testProp = await getEntity(params.id);
  const entityHistory = await getEntityHistory(params.id);
  // console.log(entityInfo);

  return (
    <CardBody>
      <>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: 200,
          }}
        >
          <Button href={`/product/${params.id}`}> Back to Product Page</Button>
          <SearchBox />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1vh",
            minWidth: "30vw",
            flexGrow: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexGrow: 0,
            }}
          ></Box>
          <BasicTable
            props={entityInfo}
            editable={isAdmin}
            subSection={subSection}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            minWidth: "20vw",
          }}
        >
          <Typography variant="h6"> Maybe History</Typography>
          <NestedList />
        </Box>
      </>
    </CardBody>
  );
}
