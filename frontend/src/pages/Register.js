import { useState } from "react"
import API from "../api/api"
import "../styles/Register.css"

function Register() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    await API.post("/register", {
      email: email,
      password: password
    })

    alert("User registered")
  }

  return (
    <div className="register-container">

      <h2 className="register-title">Register</h2>

      <form className="register-form" onSubmit={handleSubmit}>

        <input
          className="register-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          className="register-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button className="register-button" type="submit">
          Register
        </button>

      </form>

    </div>
  )
}

export default Register