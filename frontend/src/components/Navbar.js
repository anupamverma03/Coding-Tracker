import {Link, useNavigate} from "react-router-dom"
import { useEffect, useState,} from "react"
import API from "../api/api"
import "../styles/Navbar.css"

function Navbar(){

    const [user,setUser] = useState(null)

    useEffect(()=>{
    const fetchProfile = async () => {
        const res = await API.get("/profile")
        setUser(res.data.user)
    }
    fetchProfile()
},[])

    const navigate = useNavigate()

    const logout = () => {

    localStorage.removeItem("token")

    navigate("/")

}
    const token = localStorage.getItem("token")

return(

<div className= "navbar">

<div className= "nav-title">
Coding Tracker
</div>

<div className= "nav-links">

<Link to="/dashboard">Dashboard</Link>
<Link to="/add">Add Problem</Link>
<Link to="/profile">Profile</Link>


{/* Hi user in Navbar , Login and Logout buttons*/}
{token ? (

<>
<span>Hi, {user?.name}</span>
<button onClick={logout} className="logout-btn">Logout</button>
</>

) : (

<>
<Link to="/">Login</Link>
<Link to="/register">Sign Up</Link>
</>

)}

</div>

</div>

)

}

export default Navbar