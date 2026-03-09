import {BrowserRouter,Routes,Route} from "react-router-dom"
import PrivateRoute from "./pages/PrivateRoutes"

import Navbar from "./components/Navbar"
import LoginPage from "./pages/LoginPage"
import Dashboard from "./pages/Dashboard"
import AddProblem from "./pages/AddProblem"
import ProfilePage from "./pages/ProfilePage"
import Register from "./pages/Register"

function App(){

return(

<BrowserRouter>

<Navbar/>

<Routes>
{/* public pages */}
<Route path="/" element={<LoginPage/>}/>
<Route path="/register" element={<Register/>}/>

{/* login protected pages */}
<Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
<Route path="/add" element={<PrivateRoute><AddProblem/></PrivateRoute>}/>
<Route path="/profile" element={<PrivateRoute><ProfilePage/></PrivateRoute>}/>


</Routes>

</BrowserRouter>

)

}

export default App