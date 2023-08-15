import MediaCard from "@/component/media/mediaCard";
import { Box, Typography } from "@mui/material";
import styles from "../page.module.css";
import SearchBox from "@/component/searchBox/searchBox";
import CardBody from "@/component/cardBody/cardBody";
import BasicTable from "@/component/dataTable/dataTable";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import NestedList from "@/component/nestedList/nestedList";

export const metadata: Metadata = {
  title: "Use phase",
  description: "Usage information",
};
const subSection = "use"

type ResObj = {
  id: string;
  dateOfProduction: Date;
  name: string;
  mixture: string;
  producer: string;
};
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
  if (session?.user?.role === "admin") {
    isAdmin = true;
  }
  const entityInfo: ResObj = await getEntity(params.id);
  const entityHistory = await getEntityHistory(params.id);
  // console.log(entityInfo);

  return (
    <CardBody>
      <>
        <Box sx={{
            display: "flex",
            flexDirection: "column",
          }}>
          <SearchBox />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1vh",
            minWidth: "30vw",
            flexGrow: 2
          }}
        >
          Hello. you are viewing properties of {entityInfo["name"]}
          <BasicTable props={entityInfo} editable={isAdmin} subSection={subSection} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            minWidth: '20vw'
          }}
        >
          <Typography variant="h6"> Maybe History</Typography>
          <NestedList />
        </Box>
      </>
    </CardBody>
  );
}