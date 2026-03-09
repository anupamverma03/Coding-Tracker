import {useEffect,useState} from "react"
import API from "../api/api"
import "../styles/ProfilePage.css"

function ProfilePage(){

const [user,setUser] = useState(null)
const [stats,setStats] = useState({
easy:0,
medium:0,
hard:0,
total:0
})

useEffect(()=>{

const token = localStorage.getItem("token")

API.get("/profile",{
headers:{
Authorization:`Bearer ${token}`
}
})
.then(res=>{

setUser(res.data.user)
setStats(res.data.stats)

})
.catch(err=>{
console.log("Profile error:",err)
})

},[])

if(!user) return <p>Loading...</p>

return(

<div className="profile-container">

<h2>Profile</h2>

<div className="profile-card">

<p><strong>Email:</strong> {user.email}</p>
<p><strong>Total Problems:</strong> {stats.total}</p>
<p className="easy">Easy: {stats.easy}</p>
<p className="medium">Medium: {stats.medium}</p>
<p className="hard">Hard: {stats.hard}</p>

</div>

</div>

)

}

export default ProfilePage