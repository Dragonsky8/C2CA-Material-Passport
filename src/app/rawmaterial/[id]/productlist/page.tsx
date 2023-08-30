import MediaCard from "@/component/media/mediaCard";
import { Box, Button, CardMedia, Typography } from "@mui/material";
import styles from "../page.module.css";
import SearchBox from "@/component/searchBox/searchBox";
import CardBody from "@/component/cardBody/cardBody";
import BasicTable from "@/component/dataTable/dataTable";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import NestedList from "@/component/nestedList/nestedList";
import testProp, { MaterialProps, ResObj } from "@/types/dataType";

// Asynchronously fetch data
async function getEntity(id: string) {
  const res = await fetch(process.env.URL + `/api/entity/allproducts/${id}`, {
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

export const metadata: Metadata = {
  title: "Product List",
  description: "Usage information",
};
const subSection = "productList";

/**
 *
 * @returns Page to see where this material is being used
 */
export default async function productList({
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
  const entityInfo: [ResObj & testProp] = await getEntity(params.id);
  const entityHistory = await getEntityHistory(params.id);
  console.log(entityInfo);

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
          <Button href={`/overview/${params.id}`}>Back to Overview</Button>
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
          <Typography variant="h5">
            Showing all products that use material X{" "}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "15px",
              flexWrap: "wrap",
              flexShrink: 2,
            }}
          >
            {/* Render the sub-pages */}
            {entityInfo.map((entry) => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    flexGrow: 1,
                    flexShrink: 1,
                    flexBasis: 0,
                  }}
                >
                  <MediaCard
                    title={entry.name}
                    cardText="This product is used in location X, at building Z"
                    link={`/product/${entry.id}`}
                    useDefaultImage
                  />
                </Box>
              );
            })}
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
