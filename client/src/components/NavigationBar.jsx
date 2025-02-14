import {Link} from 'react-router-dom'
const NavigationBar = ({}) => {
    return(
        <div style={{display:"flex"}}>
            <Link to="/">CreateCards</Link>
            <Link to="/Revise">Revise</Link>
        </div>
    )
}

export default NavigationBar