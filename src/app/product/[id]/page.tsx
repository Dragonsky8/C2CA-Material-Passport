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
  title: "Product Page",
  description: "Building information",
};
const subSection = "product";

interface pageType {
  RawMaterial: string;
  Production?: string;
  Build?: string;
  Use?: string;
  Recycle?: string;
}
const pageText: pageType = {
  RawMaterial:
    "Information on the raw materials used in this product. This page will show a list of all the registered products ",
  Production: "Information on the production process and material?",
  Build: "Information regarding construction, contractors and such and such",
  Use: "Information regarding usage in building and state. To explore more, click",
  Recycle:
    "Recycling process information and how demolition should be conducted",
};

// Asynchronously fetch data
async function getEntity(id: string) {
  const res = await fetch(process.env.URL + `/api/entity/product/${id}`, {
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
  console.log(params.id);
  const entityInfo: ResObj & testProp = await getEntity(params.id);
  const entityHistory = await getEntityHistory(params.id);

  // Set the variable to display only raw materials or all sub-pages
  let materialPagetype = pageText;

  return (
    <CardBody>
      <>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: 200
          }}
        >
          <Button href={`/overview/${params.id}`}> Back to Overview</Button>

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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "15px",
              flexWrap: 'wrap',
              flexShrink: 2
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
