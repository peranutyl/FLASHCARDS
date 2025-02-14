import Card from '@mui/material/Card';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const InputCard = ({handleChange, handleDeleteCard, cardID}) => {
    return (
        <Box sx={{p:2}}>
            <Card sx={{ width: 1000 , height: 250}}>
                <IconButton aria-label="delete" onClick={handleDeleteCard}>
                    <DeleteOutlineIcon />
                </IconButton>
                <Grid container spacing={1} sx={{display: "flex", justifyContent: 'space-evenly'}}>
                <TextField sx={{p:2 , width:950}} id="standard-basic" variant="outlined" onChange={(event) => handleChange(event, cardID, "Front")}/>
                <TextField sx={{p:2, width:950}} id="outlined-basic" variant="outlined"  onChange={(event) => handleChange(event, cardID, "Back")} />
                </Grid>
            </Card>
        </Box>

      )
}

export default InputCard