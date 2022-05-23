import React,{useContext, useState} from 'react'
import { NavLink ,useNavigate} from 'react-router-dom'
import { userContext } from '../App';
const Login = () => {
  const {state,dispatch}=useContext(userContext);
  const navigate=useNavigate();
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const loginUser=async (e)=>{
    e.preventDefault();
    const res=await fetch("/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,password
      })
    });
    const data=res.json();
    if(res.status===400 || !data){
      window.alert("Invalid credentials");
    }
    else{
      dispatch({type:"USER",payload:true})
      window.alert("Login Successful");
      navigate("/");
    }
  }
  return (
    <>
    <section className="signup">
      <div className=' container mt-5'>
        <div className='signup-content'>
          <div className='signup-form'>
            <h2 className='form-title'>LOGIN</h2>
            <form method="POST" className="register-form" id="register-form">
              <div className='form-group'>
                <label htmlFor='email'>
                <i class="zmdi zmdi-email material-icons-email"></i>
                </label>
                <input type="email" name="email" id="email" autoComplete='off' placeholder='Your email' value={email} onChange={(e)=>{setEmail(e.target.value)}} ></input>
              </div>
              <div className='form-group'>
                <label htmlFor='password'>
                <i class="zmdi zmdi-lock material-icons-password"></i>
                </label>
                <input type="password" name="password" id="password" autoComplete='off' placeholder='Your password' value={password} onChange={(e)=>{setPassword(e.target.value)}} ></input>
              </div>
              <div className='form-group form-button'>
                <input type="submit" name="register" id="register" className='form-submit' value="Login" onClick={loginUser}/>
              </div>
            </form>
            <NavLink to="/register" className="signin-image-link"> Create an Account</NavLink>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Login