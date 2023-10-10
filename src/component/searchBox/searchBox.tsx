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

    const handleChange = async (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            window.location.href = `/overview/${searchData}`
        }
    }
    const handleClick = async () => {
        window.location.href = `/overview/${searchData}`
    }

  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    }}>
      <TextField type="text" id="outlined-basic" label="RFID code" variant="outlined" onKeyDown={handleChange} onChange={e=> {setSearchData(e.currentTarget.value)}}/>
      <Button variant="contained" onClick={handleClick}> Search!</Button>
    </Box>
  );
}
