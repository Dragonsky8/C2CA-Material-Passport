import MediaCard from "@/component/media/mediaCard";
import { Box } from "@mui/material";
import styles from "../page.module.css";
import SearchBox from "@/component/searchBox/searchBox";
import CardBody from "@/component/cardBody/cardBody";
import BasicTable from "@/component/dataTable/dataTable";

type ResObj = {
  id: string,
  dateOfProduction: Date,
  name: string,
  mixture: string,
  producer: string,
}
// Asynchronously fetch data
async function getEntity(id: string) {
  const res = await fetch(process.env.URL + `/api/entity/${id}`, {next: {revalidate: 2}});
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
  params
}: {
  params: { id: string };
}) {
  // Get current search ID from params
  console.log(params.id);
  const entityInfo: ResObj = await getEntity(params.id)

  return (
    <CardBody>
      <>
        <Box>
          <SearchBox />
        </Box>
        <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1vh'
            }}>
          {" "}
          Hello. you are viewing {entityInfo["name"]}
      <BasicTable props={entityInfo}/>
        </Box>
        
      </>
    </CardBody>
  );
}
