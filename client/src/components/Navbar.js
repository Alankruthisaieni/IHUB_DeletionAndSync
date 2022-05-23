import React,{useContext} from 'react'
import { userContext } from '../App';
import {Link} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.css"
const Navbar = () => {
  const {state,dispatch}=useContext(userContext);
  const RenderMenu=()=>{
    if(state){
      return(
        <>
        <li class="nav-item active">
        <Link className="nav-link" to="/">Home </Link>
        </li>
        <li class="nav-item">
        <Link className="nav-link" to="/about">About</Link>
        </li>
        <li class="nav-item">
        <Link className="nav-link" to="/logout">Logout&nbsp;&nbsp;&nbsp;</Link>
        </li>
        <li class="nav-item">
        <Link className="nav-link" to="/Sync">Sync&nbsp;&nbsp;&nbsp;</Link>
        </li>
        </>
      )
    }
    else{
      return(
        <>
        <li class="nav-item active">
        <Link className="nav-link" to="/">Home </Link>
        </li>
        <li class="nav-item">
        <Link className="nav-link" to="/about">About</Link>
        </li>
        <li class="nav-item">
        <Link className="nav-link" to="/register">Register</Link>
        </li>
        <li class="nav-item">
        <Link className="nav-link" to="/login">Login&nbsp;&nbsp;&nbsp;</Link>
        </li>
        <li class="nav-item">
        <Link className="nav-link" to="/Sync">Sync&nbsp;&nbsp;&nbsp;</Link>
        </li>
      </>
      )
    }
  }
  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#"><h4>&nbsp;&nbsp;&nbsp;Anemia</h4></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ms-auto">
      <RenderMenu/>
    </ul>
  </div>
</nav>
    </>
  )
}

export default Navbar