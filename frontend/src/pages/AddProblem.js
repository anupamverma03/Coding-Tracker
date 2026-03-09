import {useState} from "react"
import {useNavigate} from "react-router-dom"
import API from "../api/api"
import "../styles/AddProblem.css"

function AddProblem(){

const navigate = useNavigate()

const [title,setTitle] = useState("")
const [platform,setPlatform] = useState("")
const [difficulty,setDifficulty] = useState("")
const [tags,setTags] = useState("")

const handleSubmit = async(e)=>{

e.preventDefault()

const token = localStorage.getItem("token")

await API.post("/problems",
{
title:title,
platform:platform,
difficulty:difficulty,
tags:tags
},
{
headers:{
Authorization:`Bearer ${token}`
}
}
)

navigate("/dashboard")

}

return(

<div className="add-container">

<div className="add-box">

<h2>Add Problem</h2>

<form onSubmit={handleSubmit}>

<input
type="text"
placeholder="Problem Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
required
/>

<input
type="text"
placeholder="Platform (LeetCode, Codeforces...)"
value={platform}
onChange={(e)=>setPlatform(e.target.value)}
required
/>

<select
value={difficulty}
onChange={(e)=>setDifficulty(e.target.value)}
required
>

<option value="">Select Difficulty</option>
<option value="Easy">Easy</option>
<option value="Medium">Medium</option>
<option value="Hard">Hard</option>

</select>

<input
type="text"
placeholder="Tags (array,dp,graph...)"
value={tags}
onChange={(e)=>setTags(e.target.value)}
/>

<button type="submit">Add Problem</button>

</form>

</div>

</div>

)

}

export default AddProblem