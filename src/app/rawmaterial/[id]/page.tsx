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
import testProp, { ResObj } from "@/types/dataType";

export const metadata: Metadata = {
  title: "Overview",
  description: "Generated by create next app",
};

interface pageType {
  Details: string;
  ProductList?: string;
}
const pageText: pageType = {
  Details:
    "Information on the raw materials. Depending on the type of the scanned RFID, this will only show " +
    "information about the raw materials, or the complete concrete production process.",
  ProductList: 
  "Show a list of where this material has been used in different products."

};
const pageTextRaw: pageType = {
  Details:
    "Information on the raw materials. Depending on the type of the scanned RFID, this will only show " +
    "information about the raw materials, or the complete concrete production process.",
};
// Asynchronously fetch data
async function getEntity(id: string) {
  const res = await fetch(process.env.URL + `/api/entity/material/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Something went wrong in the backend");
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
  const entityInfo: ResObj & testProp = await getEntity(params.id);
  const entityHistory = await getEntityHistory(params.id);

  // Set the variable to display only raw materials or all sub-pages
  let materialPagetype = pageText;
  if (entityInfo.materialType === "Raw") {
    materialPagetype = pageTextRaw;
  }

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
          Hello. you are viewing {entityInfo["name"]}
          <BasicTable props={entityInfo} editable={isAdmin} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "15px",
            }}
          >
            {/* Render the sub-pages */}
            {Object.keys(materialPagetype).map((pageName: string) => (
              <Box
                sx={{
                  display: "flex",
                  flexGrow: 1,
                  flexShrink: 1,
                  flexBasis: 0,
                }}
              >
                <MediaCard
                  title={pageName}
                  cardText={
                    materialPagetype[
                      pageName as keyof typeof materialPagetype
                    ] as string
                  }
                  link={`${params.id}/${pageName.toLowerCase()}`}
                />
              </Box>
            ))}
          </Box>
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
