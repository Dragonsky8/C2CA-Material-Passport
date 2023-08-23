"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import testProp, {ResObj} from "@/types/dataType";



interface FieldType {
  name: string;
  value: string;
}

export default function BasicTable({
  props,
  editable,
  subSection = "",
}: {
  props: ResObj & testProp ; // testProp is a prop implemented in a seperate file
  editable: boolean;
  subSection?: string;
}) {
  const [isEditable, setIsEditable] = useState(false);
  var bgColor = "transparent";
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
  // Custom material handler
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
  // Create the fetch call, to update via the API endpoint
  const handleSubmit = async () => {
    // If nothing changed, do not reload page. Saves load on the server.
    if (!inputValues) {
      return;
    }
    console.log(subSection)
    const bodyPatch = { userId: 1 ,data:{ id: props.id, ...inputValues }};
    const res = await fetch(`/api/entity/${subSection}/${2}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyPatch),
    });
    if (!res.ok) {
      throw new Error("hellluup");
    }
    window.location.reload();
  };

  function showEdit() {
    if (editable) {
      setIsEditable(!isEditable);
    }
  }
  const editButton = () => {
    if (isEditable) {
      bgColor = "lightGray";
      return (
        <Button
          variant="contained"
          onClick={() => {
            showEdit();
            handleSubmit();
          }}
        >
          Save
        </Button>
      );
    } else {
      bgColor = "transparent";
      return (
        <Button variant="contained" onClick={showEdit}>
          Edit me
        </Button>
      );
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: "2vh",
      }}
    >
      {editButton()}
      {/* Render each individual fieldname. */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          rowGap: "2vh",
          columnGap: "2vw",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            rowGap: "2vh",
          }}
        >
          {Object.keys(props).map((key) => {
            // Check and ensure that some fields remain uneditable, Use a list checker or something
            return (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "3.5em",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100%",
                    justifyContent: "center",
                  }}
                >
                  {" "}
                  {key.toString()}
                </Typography>
              </Box>
            );
          })}
        </Box>
        {/* Render each individual value. */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "2vh",
            flexGrow: 1,
          }}
        >
          {Object.keys(props).map((key) => {
            // Check and ensure that some fields remain uneditable, Use a list checker or something
            if (key === "id" || key === 'dateOfProduction') {
              return (
                <Box>
                  <TextField
                    disabled
                    label={key.toString()}
                    defaultValue={props[key]}
                    type={typeof(key)}
                    sx={{
                      backgroundColor: "transparent",
                      width: "100%",
                    }}
                  />
                </Box>
              );
            } else if (key === "materialType") {
              return (
                <Box>
                  <FormControl fullWidth disabled={!isEditable} sx={{
                      backgroundColor: bgColor,
                      width: "100%",
                    }}>
                    <InputLabel id="test">MaterialType</InputLabel>
                    <Select
                      id="test"
                      label="Age"
                      defaultValue={props[key]}
                      onChange={handleMaterialChange}
                    >
                      <MenuItem id="materialType" value={"Coarse Aggregates"}>
                      Coarse Aggregates
                      </MenuItem>
                      <MenuItem id="materialType" value={"Fine Aggregates"}>
                      Fine Aggregates
                      </MenuItem>
                      <MenuItem id="materialType" value={"Ultra-fine Aggregates"}>
                      Ultra-fine Aggregates
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              );
            } else {
              return (
                <Box>
                  <TextField
                    id={key}
                    disabled={!isEditable}
                    label={key.toString()}
                    type={typeof(key)}
                    defaultValue={props[key as keyof typeof props]}
                    sx={{
                      backgroundColor: bgColor,
                      width: "100%",
                    }}
                    onChange={handleInputChange}
                  />
                </Box>
              );
            }
          })}
        </Box>
      </Box>
    </Box>
  );
}
