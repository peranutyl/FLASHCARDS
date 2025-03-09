import Card from '@mui/material/Card';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const InputCard = ({handleChange, handleDeleteCard, cardID}) => {
    return (
            <Card>

                <Box display="grid" gridTemplateColumns="repeat(12, 1fr)">
                    <Box gridColumn="span 3" display="flex" alignItems="center" justifyContent="center"> 
                        <h4 >Front</h4>
                    </Box>
                    <Box gridColumn="span 8" > 
                        <TextField sx={{ width: "90%" }}  id="standard-basic" variant="outlined" onChange={(event) => handleChange(event, cardID, "Front")}/>
                    </Box>
                    <IconButton sx={{gridColumn:"span 1"}} aria-label="delete" onClick={handleDeleteCard}>
                        <DeleteOutlineIcon />
                    </IconButton>
                    <Box gridColumn="span 3" display="flex" alignItems="center" justifyContent="center"> 
                        <h4>Back</h4>
                    </Box>
                    <Box gridColumn="span 8" > 
                        <TextField sx={{ width: "90%" }} id="outlined-basic" variant="outlined"  onChange={(event) => handleChange(event, cardID, "Back")} />
                    </Box>
                </Box>
            </Card>

      )
}

export default InputCard