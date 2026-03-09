import { useEffect, useState } from "react"
import API from "../api/api"
import "../styles/Dashboard.css"
import { FaTrash } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

function Dashboard() {

const [problems,setProblems] = useState([])
const navigate = useNavigate()

useEffect(()=>{

const token = localStorage.getItem("token")

if(!token){
navigate("/")
return
}

API.get("/problems",{
headers:{
Authorization:`Bearer ${token}`
}
})
.then(res=>{
setProblems(res.data)
})
.catch(err=>{

if(err.response && err.response.status===401){
localStorage.removeItem("token")
navigate("/")
}else{
console.log(err)
}

})

},[navigate])


const deleteProblem = async(id)=>{

if(!window.confirm("Delete this problem?")) return

const token = localStorage.getItem("token")

try{

await API.delete(`/problems/${id}`,{
headers:{
Authorization:`Bearer ${token}`
}
})

setProblems(problems.filter(p=>p.id!==id))

}catch(err){

if(err.response && err.response.status===401){
localStorage.removeItem("token")
navigate("/")
}else{
console.log(err)
}

}

}


const easyCount = problems.filter(p=>p.difficulty==="Easy").length
const mediumCount = problems.filter(p=>p.difficulty==="Medium").length
const hardCount = problems.filter(p=>p.difficulty==="Hard").length


return(

<div className="container">

<h2>Difficulty Stats</h2>

<div className="stats">

<div className="card easy-card">
Easy: {easyCount}
</div>

<div className="card medium-card">
Medium: {mediumCount}
</div>

<div className="card hard-card">
Hard: {hardCount}
</div>

</div>

<h2>Problems</h2>

<table>

<thead>
<tr>
<th>ID</th>
<th>Title</th>
<th>Platform</th>
<th>Difficulty</th>
<th>Tags</th>
<th>Date</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{problems.map(p=>(
<tr key={p.id}>

<td>{p.id}</td>
<td>{p.title}</td>
<td>{p.platform}</td>

<td className={
p.difficulty==="Easy" ? "easy" :
p.difficulty==="Medium" ? "medium" :
"hard"
}>
{p.difficulty}
</td>

<td>{p.tags}</td>

<td>
{new Date(p.date_solved).toLocaleDateString()}
</td>

<td>
<button
className="delete-btn"
onClick={()=>deleteProblem(p.id)}
>
<FaTrash/>
</button>
</td>

</tr>
))}

</tbody>

</table>

</div>

)

}

export default Dashboard