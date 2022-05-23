import React, { useEffect,useState,useContext } from 'react'
import { userContext } from '../App';
import 'bootstrap/dist/css/bootstrap.css'
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import {useNavigate} from "react-router-dom";
const About = () => {
  const {state,dispatch}=useContext(userContext);
  // const [imagepath , setpath] = useState();
  const navigate=useNavigate();
  const [userData,setUserData]=useState({});
  const callAboutPage=async ()=>{
    try{
      const res=await fetch('/about',{
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      });
      const data=await res.json();
      console.log("data",data);
      setUserData(data);
      console.log("Profile Img: ",userData.profileImg);
      // setpath('../public/uploads/');
      dispatch({type:"USER",payload:true})
      //console.log("{`../server/public/${userData.profileImg}`}");
      if(!res.status===200){
        const error=new Error(res.error);
        throw error;
      }
    }
    catch(err){
      console.log(err);
      navigate('/login');
    }
  }
  useEffect(()=>{
    callAboutPage();
  },[]);
  // const getImageName = ( url ) => {
  //   if(userData.profileImg) {
  //     let imgUrl = url.split("\\")
  //     return imgUrl[imgUrl.length-1]
  //   }
  // }
  return (
    <>
    <div className='container emp-profile'>
      <form method="GET">
        <div className='field'>
            <h4>Details: </h4><br/>
          <div className='about-info'>
            
          <MDBRow>
              <MDBCol md='12' className='col-example'>
              {/* <p>{userData.profileImg}</p> */}
              <img src = {`./public/uploads/${userData.profileImg}`} width="300px" height="250px" />
            
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md='6' className='col-example'>
                <label>User ID  </label>
              </MDBCol>
              <MDBCol md='6' className='col-example'>
                {userData._id}
              </MDBCol>
            </MDBRow>
            <br/>
            <MDBRow>
              <MDBCol md='6' className='col-example'>
                <label>Name  </label>
              </MDBCol>
              <MDBCol md='6' className='col-example'>
                {userData.name}
              </MDBCol>
            </MDBRow>
            <br/>
            <MDBRow>
              <MDBCol md='6' className='col-example'>
                <label>Gender  </label>
              </MDBCol>
              <MDBCol md='6' className='col-example'>
                {userData.gender}
              </MDBCol>
            </MDBRow>
            <br/>
            <MDBRow>
              <MDBCol md='6' className='col-example'>
                <label>Address  </label>
              </MDBCol>
              <MDBCol md='6' className='col-example'>
                {userData.address}
              </MDBCol>
            </MDBRow>
            <br/>
            <MDBRow>
              <MDBCol md='6' className='col-example'>
                <label>Phone  </label>
              </MDBCol>
              <MDBCol md='6' className='col-example'>
                {userData.phone}
              </MDBCol>
            </MDBRow>
            <br/>
            <MDBRow>
              <MDBCol md='6' className='col-example'>
                <label>Email  </label>
              </MDBCol>
              <MDBCol md='6' className='col-example'>
                {userData.email}
              </MDBCol>
            </MDBRow>
            <br/>
          </div>
          <input type="submit" className='profile-edit-btn' name="btnAddMore" value="Edit profile"/>
        </div>
      </form>
    </div>
    </>
  )
}

export default About