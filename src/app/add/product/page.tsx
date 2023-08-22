"use client";
import MediaCard from "@/component/media/mediaCard";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import styles from "../page.module.css";
import SearchBox from "@/component/searchBox/searchBox";
import CardBody from "@/component/cardBody/cardBody";
import { ChangeEventHandler, useState } from "react";
import { getSession, useSession } from "next-auth/react";

interface FieldType {
  name: string;
  value: string;
}

interface materialProperties {
  name: string;
  producer: string;
  mixture: string;
}

/**
 *
 * @returns Add page where you can Add new raw material entries
 */
export default function AddPage() {
  // Get the current user cookie data
  const { data: session, status } = useSession();
  const userId = session?.user.id;
  // Object of FieldTypes
  const [inputValues, setInputValues] = useState<{ [x: string]: string }>();
  // Store the input fields in the inputValues state
  const handleInputChange = (e: any) => {
    const fieldInfo: FieldType = {
      name: e.currentTarget.id,
      value: e.currentTarget.value,
    };
    setInputValues((prevState) => ({
      ...prevState,
      [fieldInfo.name]: fieldInfo.value,
    }));
  };
  const handleMaterialChange = (e: any) => {
    const fieldInfo: FieldType = {
      name: "materialType",
      value: e.target.value,
    };
    setInputValues((prevState) => ({
      ...prevState,
      [fieldInfo.name]: fieldInfo.value,
    }));
  };
  const handleSubmit = () => {
    for (let entry in inputValues) {
      console.log(inputValues[entry]);
    }
  };
  const handleChange = async (event: React.MouseEvent) => {
    // window.location.href = `/api/entity/${searchData}`;
    const bodyPatch = { userId: session?.user.id, data: inputValues };

    const res = await fetch(`/api/entity/${2}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyPatch),
    });
    if (!res.ok) {
      throw new Error("hellluup");
    }
    window.location.href = res.url;
  };
  const handleProductChange = async (event: React.MouseEvent) => {
    // window.location.href = `/api/entity/${searchData}`;
    const bodyPatch = { userId: 1, data: inputValues };

    const res = await fetch(`/api/entity/product/${2}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyPatch),
    });
    if (!res.ok) {
      throw new Error("hellluup");
    }
    window.location.href = res.url;
  };
  const handleLinkChange = async (event: React.MouseEvent) => {
    // window.location.href = `/api/entity/${searchData}`;
    const bodyPatch = { userId: 1, data: inputValues };

    const res = await fetch(`/api/entity/addlink/${2}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyPatch),
    });
    if (!res.ok) {
      throw new Error("hellluup");
    }
    window.location.href = res.url;
  };

  return (
    <CardBody>
      <>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "40vw",
          }}
        >
          <Typography variant="h6">
            Create a new product, by scanning the raw material ID tags
          </Typography>

          <TextField
            id="rawMaterials1"
            label="RawMaterials1"
            variant="filled"
            onChange={handleInputChange}
          />
          <TextField
            id="rawMaterials2"
            label="RawMaterials2"
            variant="filled"
            onChange={handleInputChange}
          />
          <TextField
            id="rawMaterials3"
            label="RawMaterials3"
            variant="filled"
            onChange={handleInputChange}
          />
        </Box>
        <Box>
          <Button variant="contained" onClick={handleProductChange}>
            Add product
          </Button>
          <Button variant="contained" onClick={handleLinkChange}>
            Add new link
          </Button>
        </Box>
      </>
    </CardBody>
  );
}
