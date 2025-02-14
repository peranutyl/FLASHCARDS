import Card from '@mui/material/Card';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'


const AddCard = ({handleAddCard}) => {
    return (
        <Box sx={{p:2}}>
            <Card sx={{ width: 1000 , height: 200 ,justifyContent: 'center' }}>
                <Button variant="contained" onClick={handleAddCard}>New Card</Button>
            </Card>
        </Box>
      );
}

export default AddCard