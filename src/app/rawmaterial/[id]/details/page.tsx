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
import { AggregatesProps, UltraFinesProps } from "@/types/rawMaterialType";

export const metadata: Metadata = {
  title: "Raw Materials",
  description: "Generated by create next app",
};

// Asynchronously fetch data
async function getEntity(id: string) {
  const res = await fetch(process.env.URL + `/api/entity/rawmaterial/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("hellluup");
  }
  return res.json();
}
async function getRawMaterialType(id: string) {
  const res = await fetch(process.env.URL + `/api/entity/rawmaterial/${id}`, {
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
  if (session?.user.role === ("admin") || session?.user.role === ("rawproducer")) {
    isAdmin = true;
  }
  const entityInfo: UltraFinesProps & AggregatesProps = await getEntity(
    params.id
  );
  const entityHistory = await getEntityHistory(params.id);

  const overviewInfo: ResObj = await getRawMaterialType(params.id);
  console.log(overviewInfo);

  const rawMaterial = overviewInfo.materialType;
  var filteredRawMaterial;
  if (rawMaterial === ("Fine Aggregates" || "Coarse Aggregates")) {
    let temp: AggregatesProps = {
      id: entityInfo.id,
      particleSize: entityInfo.particleSize,
      grading: entityInfo.grading,
      tolerance: entityInfo.tolerance,
      granularShape: entityInfo.granularShape,
      grainShape: entityInfo.grainShape,
      shellContent: entityInfo.shellContent,
      grainDensity: entityInfo.grainDensity,
      amountFineParts: entityInfo.amountFineParts,
      qualityFineParts: entityInfo.qualityFineParts,
      roundAndBrokenPieces: entityInfo.roundAndBrokenPieces,
      resistanceToCrushing: entityInfo.resistanceToCrushing,
      waterAbsorption: entityInfo.waterAbsorption,
      classification: entityInfo.classification,
      chloride: entityInfo.chloride,
      contentOfAcidSolubleSulfate: entityInfo.contentOfAcidSolubleSulfate,
      contentOfWaterSolubleSulfate: entityInfo.contentOfWaterSolubleSulfate,
      totalSulfur: entityInfo.totalSulfur,
      affectBindingTime: entityInfo.affectBindingTime,
      humusOrOrganicMatterContent: entityInfo.humusOrOrganicMatterContent,
      alkaliSilicaActivity: entityInfo.alkaliSilicaActivity,
      resistanceToWear: entityInfo.resistanceToWear,
      emissionOfRadioactivity: entityInfo.emissionOfRadioactivity,
      leachingOfHeavyMetals: entityInfo.leachingOfHeavyMetals,
      asbestos: entityInfo.asbestos,
      chimicalComposition: entityInfo.chimicalComposition,
      leachingAnions: entityInfo.leachingAnions,
      freezeThawSensitivity: entityInfo.freezeThawSensitivity,
    };
    filteredRawMaterial = temp;
  } else if (rawMaterial === "Ultra-fine Aggregates") {
    let temp: UltraFinesProps = {
      id: entityInfo.id,
      particleSize: entityInfo.particleSize,
      grading: entityInfo.grading,
      grainDensity: entityInfo.grainDensity,
      fallThrough2mm: entityInfo.fallThrough2mm,
      fallThrough0125mm: entityInfo.fallThrough0125mm,
      fallThrough0063mm: entityInfo.fallThrough0063mm,
      vormVastheid: entityInfo.vormVastheid,
      emissionOfHazardousSubstances: entityInfo.emissionOfHazardousSubstances,
    };
    filteredRawMaterial = temp;
  } else {
    filteredRawMaterial = entityInfo;
  }
  // console.log(filteredRawMaterial)

  return (
    <CardBody>
      <>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {/* <Button href={`/overview/${params.id}`}> Back to Overview</Button> */}
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
          >
            <Typography variant="h5">Raw Materials</Typography>
          </Box>
          <BasicTable
            // @ts-ignore
            props={filteredRawMaterial}
            editable={isAdmin}
            subSection="rawmaterial"
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
