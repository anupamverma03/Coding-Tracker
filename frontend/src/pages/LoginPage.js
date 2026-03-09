import {useState} from "react"
import {useNavigate, useLocation, Link} from "react-router-dom"
import API from "../api/api"
import "../styles/LoginPage.css"

function LoginPage(){

const navigate = useNavigate()
const location = useLocation()
const message = location.state?.message

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [error,setError] = useState("")

const handleSubmit = async(e)=>{

e.preventDefault()

try{

const res = await API.post("/login",{
email:email,
password:password
})

localStorage.setItem("token",res.data.access_token)

navigate("/dashboard")

}catch(err){

setError("Invalid email or password")

}

}

return(

<div className="login-container">

<div className="login-box">

<div>
    {message && (
        <p className="login-warning">
    Please login first
</p>)}
</div>

<h2>Coding Tracker</h2>

<form onSubmit={handleSubmit}>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<button type="submit">Login</button>

</form>

<p className="signup-text">
    New user? <Link to= "/register">Sign up here</Link></p>

{error && <p className="error">{error}</p>}

</div>

</div>

)

}

export default LoginPage