import React,{useEffect,useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../App';
const Sync = () => {
  const {state,dispatch}=useContext(userContext);
  // const Navigate=useNavigate();
  const doSync=async (e)=>{
    e.preventDefault();
    console.log("Hello");
    await fetch (`http://localhost:5000/syncButton`,{
      method:"GET"
    });
    console.log("World");
    // const data=res.json();
    // if(res.status===400 || !data){
    //   window.alert("Invalid credentials");
    // }
    // else{
    //   dispatch({type:"USER",payload:true})
    //   window.alert("Login Successful");
    // }
  }
  return (
    <form>
      <input type="submit" value="ManualSync" onClick={doSync}/>
    </form>
  )
}

export default Sync