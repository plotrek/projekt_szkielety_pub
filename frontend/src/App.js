import {Route, Routes, Navigate} from "react-router-dom"
import Main from "./components/Main"
import Signup from "./components/Signup"
import Login from "./components/Login"
import Modify from "./components/Modify"
import Add from "./components/Add"
import Details from "./components/Details"

function App() {
    const user = localStorage.getItem("token")
    return (
        <Routes>
            {user && <Route path="/" exact element={<Main/>}/>}
            <Route path="/signup" exact element={<Signup/>}/>
            <Route path="/login" exact element={<Login/>}/>
            {user && <Route path="/modify/:type/:name" exact element={<Modify/>}/>}
            {user && <Route path="/add/:type" exact element={<Add/>}/>}
            {user && <Route path="/details/:type/:name" exact element={<Details/>}/>}
            <Route path="/" element={<Navigate replace to="/login"/>}/>
            <Route path="/modify/:type/:name" element={<Navigate replace to="/"/>}/>
            <Route path="/add/:type" element={<Navigate replace to="/"/>}/>
            <Route path="/details/:type/:name" element={<Navigate replace to="/"/>}/>
        </Routes>
    )
}

export default App
