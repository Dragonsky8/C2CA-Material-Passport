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
  RawMaterial: string;
  Product?: string;
}
const pageText: pageType = {
  RawMaterial:
    "Information on the raw materials. Depending on the type of the scanned RFID, this will only show " +
    "information about the raw materials, or the complete concrete production process.",
  Product:
    "Information on the production process and where this RFID tag is currently in the production stage. This link will lead to the product page",
};
const pageTextRaw: pageType = {
  RawMaterial:
    "Information on the raw materials. Depending on the type of the scanned RFID, this will only show " +
    "information about the raw materials, or the complete concrete production process.",
};
// Asynchronously fetch data
async function getEntity(id: string) {
  const res = await fetch(process.env.URL + `/api/entity/${id}`, {
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
  if (session?.user.role === "admin") {
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
          You are on the RFID overview page
          <BasicTable props={entityInfo} editable={isAdmin} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "15px",
            }}
          >
            {/* Render the sub-pages */}
            {/* {Object.keys(materialPagetype).map((pageName: string) => (
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
                  link={`/${pageName.toLowerCase()}/${params.id}`}
                />
              </Box>
            ))} */}
            <Box
              sx={{
                display: "flex",
                flexGrow: 1,
                flexShrink: 1,
                flexBasis: 0,
              }}
            >
              <MediaCard
                title="RawMaterial"
                cardText={materialPagetype.RawMaterial as string}
                link={`/rawmaterial/${entityInfo.materialId}`}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexGrow: 1,
                flexShrink: 1,
                flexBasis: 0,
              }}
            >
              <MediaCard
                title="Product"
                cardText={materialPagetype.Product as string}
                link={`/product/${entityInfo.productId}`}
              />
            </Box>
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
