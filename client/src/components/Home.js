import React,{useEffect,useContext} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { userContext } from '../App';



const Home = () => {
  const navigate=useNavigate();
  const {state,dispatch}=useContext(userContext);
  function Sync() {
    navigate("/Sync");
  }
  return (
    <div className='home'>
      
      <h1 >Welcome</h1>
      {/* <form>
      <input type="submit" name="manualSync" id="manualSync" value="manualSync" onClick={Sync}/>
      </form> */}
      
    </div>
  )
}

export default Home