import React,{useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';
//
// import {PythonShell} from 'python-shell';
const Register = () => {
  const navigate=useNavigate();
  const [user,setUser]=useState({
    name:"",gender:"",dob:"",age:"",address:"",phone:"",email:"",password:"",profileImg:""
  })
  let name,value;
  const handleInput=(e)=>{
    name=e.target.name;
    value=e.target.value;
    setUser({...user,[name]:value})
  }
  const onFileChange=((e) =>{
    setUser({...user, profileImg: e.target.files[0] })
})
  // const PostData=async (e)=>{
  //   e.preventDefault();
  //   const {name,gender,age,address,phone,email,password}=user;
  //   console.log(user);
  //   const res= await fetch("/register",{
  //     method:"POST",
  //     headers:{
  //       "Content-Type":"application/json"
  //     },
  //     body:JSON.stringify({
  //       name,gender,age,address,phone,email,password
  //     })
  //   });
  //   console.log(res);
  //   const data=await res.json();
  //   console.log(data);
  //   if(res.status===422 || !data){
  //     window.alert("Failed registration");
  //     console.log("Invalid Registration");
  //   }
  //   else{
  //     window.alert("Registration successful");
  //     console.log("Registration successful");
  //     history("/login");
  //   }
  // }
  const onSubmit=async(e) =>{
    e.preventDefault()
    console.log("user",user);
    const formData = new FormData();
    formData.append('name', user.name)
    formData.append('gender', user.gender)
    formData.append('dob', user.dob)
    formData.append('age', user.age)
    formData.append('address', user.address)
    formData.append('phone', user.phone)
    formData.append('email', user.email)
    formData.append('password', user.password)
    formData.append('profileImg', user.profileImg)
    console.log("name",formData.get("name"));
    console.log("trying th reach backend");
    await axios.post("http://localhost:5000/register", formData).then(res => {
        console.log(res);
        window.alert("Registration  Successful");
        navigate("/login");
    }).catch((err)=>{
      window.alert("Failed Registration(Duplicates not allowed/Fill all fields");
      console.log("Hello world");
      console.log(err);
    })
    //
    // PythonShell.run('my_script.py', null, function (err) {
    //   if (err) throw err;
    //   console.log('finished');
    // });
}
  return (
    <>
    <section className="signup">
      <div className=' container mt-5'>
        <div className='signup-content'>
          <div className='signup-form'>
            <h2 className='form-title'>REGISTER</h2>
            <form method="POST" className="register-form" id="register-form" encType='multipart/form-data'>
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
                <label htmlFor='dob'>
                <i class="zmdi zmdi-male-female material-icons-gender"></i>
                </label>
                <input type="date" name="dob" id="dob" autoComplete='off' value={user.dob} onChange={handleInput}  ></input>
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
              <div className='form-group'>
                <label htmlFor='profileImg'>
                <i class="zmdi zmdi-upload"></i>
                </label>
                <input type="file" name="profileImg" id="profileImg" autoComplete='off'  onChange={onFileChange} ></input>
              </div>
              <div className='form-group form-button'>
                <input type="submit" name="register" id="register" className='form-submit' value="Register" onClick={onSubmit}/>
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