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

export default function BasicTable({
  props,
  editable,
}: {
  props: ResObj;
  editable: boolean;
}) {
  const [isEditable, setIsEditable] = useState(false);
  var bgColor = "transparent";
  function showEdit() {
    if (editable) {
      setIsEditable(!isEditable);
    }
  }
  const editButton = () => {
    if (isEditable) {
      bgColor = "lightGray";
      return <Button variant="contained" onClick={showEdit}> Save</Button>;
    } else {
      bgColor = "transparent";
      return <Button variant="contained" onClick={showEdit}> Edit me</Button>;
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: "2vh",
      }}
    >
      {editButton()}
      {Object.keys(props).map((key) => {
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: 'center',
              minWidth: "40vh",
              columnGap: "2vw",
            }}
          >
            <Box>
              <Typography variant="h6"> {key.toString()}</Typography>
            </Box>
            <Box>
              <TextField
                disabled={!isEditable}
                label={key.toString()}
                defaultValue={props[key]}
                sx={{
                  backgroundColor: bgColor,
                  minWidth: "60vh",
                }}
              />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
