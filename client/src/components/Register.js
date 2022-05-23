import React,{useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
const Register = () => {
  const history=useNavigate();
  const [user,setUser]=useState({
    name:"",gender:"",age:"",address:"",phone:"",email:"",password:""
  })
  let name,value;
  const handleInput=(e)=>{
    name=e.target.name;
    value=e.target.value;
    setUser({...user,[name]:value})
  }
  const PostData=async (e)=>{
    e.preventDefault();
    const {name,gender,age,address,phone,email,password}=user;
    console.log(user);
    const res= await fetch("/register",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,gender,age,address,phone,email,password
      })
    });
    console.log(res);
    const data=await res.json();
    console.log(data);
    if(res.status===422 || !data){
      window.alert("Failed registration");
      console.log("Invalid Registration");
    }
    else{
      window.alert("Registration successful");
      console.log("Registration successful");
      history("/login");
    }
  }
  return (
    <>
    <section className="signup">
      <div className=' container mt-5'>
        <div className='signup-content'>
          <div className='signup-form'>
            <h2 className='form-title'>REGISTER</h2>
            <form method="POST" className="register-form" id="register-form">
              <div className='form-group'>
                <label htmlFor='name'>
                <i class="zmdi zmdi-account material-icons-name"></i>
                </label>
                <input type="text" name="name" id="name" autoComplete='off' value={user.name} onChange={handleInput} placeholder='Your name' ></input>
              </div>
              <div className='form-group'>
                <label htmlFor='gender'>
                <i class="zmdi zmdi-male-female material-icons-gender"></i>
                </label>
                <input type="text" name="gender" id="gender" autoComplete='off' value={user.gender} onChange={handleInput} placeholder='Your gender' ></input>
              </div>
              <div className='form-group'>
                <label htmlFor='age'>
                <i class="zmdi zmdi-account-calendar material-icons-phone"></i>
                </label>
                <input type="number" name="age" id="age" autoComplete='off' value={user.age} onChange={handleInput} placeholder='Your age' ></input>
              </div>
              <div className='form-group'>
                <label htmlFor='address'>
                <i class="zmdi zmdi-pin material-icons-address"></i>
                </label>
                <input type="text" name="address" id="address" autoComplete='off' value={user.address} onChange={handleInput} placeholder='Your address' ></input>
              </div>
              <div className='form-group'>
                <label htmlFor='phone'>
                <i class="zmdi zmdi-phone material-icons-phone"></i>
                </label>
                <input type="number" name="phone" id="phone" autoComplete='off' value={user.phone} onChange={handleInput} placeholder='Your phone' ></input>
              </div>
              <div className='form-group'>
                <label htmlFor='email'>
                <i class="zmdi zmdi-email material-icons-email"></i>
                </label>
                <input type="email" name="email" id="email" autoComplete='off' value={user.email} onChange={handleInput} placeholder='Your email' ></input>
              </div>
              <div className='form-group'>
                <label htmlFor='password'>
                <i class="zmdi zmdi-lock material-icons-password"></i>
                </label>
                <input type="password" name="password" id="password" autoComplete='off' value={user.password} onChange={handleInput} placeholder='Your password' ></input>
              </div>
              <div className='form-group form-button'>
                <input type="submit" name="register" id="register" className='form-submit' value="Register" onClick={PostData}/>
              </div>
            </form>
            <NavLink to="/login" className="signup-image-link"> Already Registered</NavLink>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Register