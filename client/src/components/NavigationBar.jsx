import { Box } from '@mui/material'
import {Link} from 'react-router-dom'
const NavigationBar = ({}) => {
    return(
        <Box display="flex" flexDirection="column">
            <Link to="/">CreateCards</Link>
            <Link to="/revise">Revise</Link>
        </Box>
    )
}

export default NavigationBar