import React, { createContext, useReducer } from "react";
import Navbar from "./components/Navbar";
import Home from './components/Home'
import About  from "./components/About";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import SignUp from "./components/SignUp"
import Sync from "./components/Sync";
import ErrorPage from "./components/ErrorPage";
import {Routes,Route} from "react-router-dom"
import { initialState,reducer } from "./reducer/useReducer";
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

export const userContext=createContext();
const Router=()=>{
  return(
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/register" element={<SignUp/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/logout" element={<Logout/>}/>
    <Route path="/Sync" element={<Sync/>}/>
    <Route path="*" element={<ErrorPage/>}/>
    </Routes>
  )
}
function App() {
  const [state,dispatch]=useReducer(reducer,initialState);
  return (
    <>
    <userContext.Provider value={{state,dispatch}}>
    <Navbar/>
    <Router/>
    </userContext.Provider>
    </>
  );
}

export default App;
