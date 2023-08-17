"use client";
import MediaCard from "@/component/media/mediaCard";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import styles from "../page.module.css";
import SearchBox from "@/component/searchBox/searchBox";
import CardBody from "@/component/cardBody/cardBody";
import { ChangeEventHandler, useState } from "react";

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
 * @returns Add page where you can Add new material blocks
 */
export default function AddPage() {
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
  }
  const handleSubmit = () => {
    for (let entry in inputValues) {
      console.log(inputValues[entry]);
    }
  };
  const handleChange = async (event: React.MouseEvent) => {
    // window.location.href = `/api/entity/${searchData}`;
    const res = await fetch(`/api/entity/${2}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputValues),
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
          <TextField
            id="name"
            label="Name"
            variant="filled"
            onChange={handleInputChange}
          />
          <TextField
            id="producer"
            label="Producer"
            variant="filled"
            onChange={handleInputChange}
          />
          <FormControl fullWidth>
            <InputLabel id="test">MaterialType</InputLabel>
            <Select
              id="test"
              label="Age"
              onChange={handleMaterialChange}
            >
              <MenuItem id="materialType" value={"Raw"}>Raw</MenuItem>
              <MenuItem id="materialType" value={"Processed"}>Processed</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <Button variant="contained" onClick={handleChange}>
            Add!
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            TestForm
          </Button>
        </Box>
      </>
    </CardBody>
  );
}
