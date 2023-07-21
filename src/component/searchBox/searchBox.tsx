"use client"
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";


/**
 * 
 * @returns SearchBox component to enter data, and hit Search.
 */
export default function SearchBox() {
    function searchQuery(id: String) {
        alert(id)
    }
    const [searchData, setSearchData] = useState('');

    const handleChange = async (event: React.MouseEvent) => {
        // window.location.href = `/api/entity/${searchData}`;
        // const res = await fetch(`/api/entity/${searchData}`, {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({id: searchData})
        // })
        // if (!res.ok) {
        //     throw new Error ("hellluup")
        // };
        window.location.href = `/overview/${searchData}`
    }

  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    }}>
      <TextField id="outlined-basic" label="RFID code" variant="outlined" onChange={e=> {setSearchData(e.currentTarget.value)}}/>
      <Button variant="contained" onClick={handleChange}> Search!</Button>
    </Box>
  );
}
