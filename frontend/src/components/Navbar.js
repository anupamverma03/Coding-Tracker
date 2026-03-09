import {Link} from "react-router-dom"
import "../styles/Navbar.css"

function Navbar(){

return(

<div className= "navbar">

<div className= "nav-title">
Coding Tracker
</div>

<div className= "nav-links">

<Link to="/">Login</Link>
<Link to="/dashboard">Dashboard</Link>
<Link to="/add">Add Problem</Link>
<Link to="/profile">Profile</Link>
<Link to="/register">Register</Link>

</div>

</div>

)

}

export default Navbar