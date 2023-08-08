"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

type ResObj = {
  id: string;
  dateOfProduction: Date;
  name: string;
  mixture: string;
  producer: string;
};

interface FieldType {
  name: string;
  value: string;
}

export default function BasicTable({
  props,
  editable,
  subSection = "",
}: {
  props: ResObj;  
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
  // Create the fetch call, to update via the API endpoint
  const handleSubmit = async () => {
    const bodyPatch = { id: props.id, ...inputValues };
    console.log("i am pushing for ", subSection);
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
            if (key === "id") {
              return (
                <Box>
                  <TextField
                    disabled
                    label={key.toString()}
                    defaultValue={props[key]}
                    sx={{
                      backgroundColor: "transparent",
                      width: "100%",
                    }}
                  />
                </Box>
              );
            } else {
              return (
                <Box>
                  <TextField
                    id={key}
                    disabled={!isEditable}
                    label={key.toString()}
                    defaultValue={props[key]}
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
