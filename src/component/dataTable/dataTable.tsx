import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

type ResObj = {
  id: string;
  dateOfProduction: Date;
  name: string;
  mixture: string;
  producer: string;
};

export default function BasicTable({ props }: { props: ResObj }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{
                backgroundColor: "pink"
            }}>
            <TableCell >Property </TableCell>
            <TableCell align="left">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(props).map((key) => {
            return (
              <TableRow
                key={key.toString()}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell> {key.toString()}</TableCell>
                <TableCell> {props[key]}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
