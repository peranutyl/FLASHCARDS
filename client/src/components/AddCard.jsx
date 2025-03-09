import Card from '@mui/material/Card';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'


const AddCard = ({handleAddCard}) => {
    return (
            <Button variant="contained" onClick={handleAddCard}>New Card</Button>
      );
}

export default AddCard