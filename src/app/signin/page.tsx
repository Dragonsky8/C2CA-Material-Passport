import MediaCard from "@/component/media/mediaCard";
import { Box } from "@mui/material";

export default function Signin () {
    return (
       <Box sx={{
        backgroundColor: '#d5e6dc',
        mineight: '80vh',
        margin: '68px 4vh 4vh 4vh',
        padding: '1vh',
        borderRadius: '20px',
        border: 'solid #c2c2c2 2px'
       }}>
        hello fellas
        <MediaCard/>
        <MediaCard/>
        <MediaCard/>
        <MediaCard/>

       </Box>
    )
}