import React, { useEffect } from 'react'
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { BASE_URL } from '../services/baseurl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProfileAPI } from '../services/allAPI';

function Profile() {
    const [open, setOpen] = useState(false);
    const[userProfile,setUserProfile] = useState({
        username:"",
        email:"",
        password:"",
        github:"",
        linkedi:"",
        profile:""
    })
    const[isUpdate,setIsUpdate] =useState(false)
//once an image is uploaded then that image will be stored in existig image
    const[existingImage,setExistingImage] = useState("")
    //to hold the url of image
    const[preview,setPreview]=useState("")

    useEffect(()=>{
        const user = JSON.parse(sessionStorage.getItem("existingUser"))
        setUserProfile({...userProfile,username:user.username,email:user.email,
            password:user.password,github:user.github,linkedin:user.linkedin,profile:""})

            setExistingImage(user.profile)

    },[isUpdate])


    useEffect(()=>{
       if(userProfile.profile){
        setPreview(URL.createObjectURL(userProfile.profile))
       }
       else{
        setPreview("")
       }

    },[userProfile.profile])


    const handleProfileUpdate = async()=>{
        const {username,email,password,github,linkedin,profile} = userProfile

        if(!github || !linkedin){
            toast.info("Please fill completely")
        }
        else{
            const reqBody = new FormData()
            reqBody.append("username",username)
            reqBody.append("email",email)
            reqBody.append("password",password)
            reqBody.append("github",github)
            reqBody.append("linkedin",linkedin)
            preview?reqBody.append("profile",profile):reqBody.append("profile",existingImage)

        
        const token = sessionStorage.getItem("token")

        if(preview){
            const reqHeader = {
                "Content-Type":"multipart/form-data",
                "Authorization":`Bearer ${token}`
              } 
              const result = await editProfileAPI(reqBody,reqHeader)
              console.log(result);
              if(result.status ==200){
                toast.success('profile updated successfully')
                sessionStorage.setItem("existingUser",JSON.stringify(result.data))
                setIsUpdate(true)
              }
              else{
                console.log(result.response.data);
              }
        }
        else{
            const reqHeader ={
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`  
            }
            const result = await editProfileAPI(reqBody,reqHeader)
            console.log(result);
            if(result.status ==200){
              toast.success('profile updated successfully')
              sessionStorage.setItem("existingUser",JSON.stringify(result.data))
              setIsUpdate(true)
            }
            else{
              console.log(result.response.data);
            }
             
        }
    }
}

  return (
    <>
         <div className='card shadow p-5 mb-5'>
           <div className='d-flex justify-content-between'> 
                 <h1> Profile</h1>
                <button onClick={() => setOpen(!open)} className='btn btn-outline-info'><i class="fa-solid fa-angle-down"></i></button>
           </div>
           <Collapse  in={open} >
               <div className="row d-flex justify-cotent-center mt-4 ">
                <label htmlFor="profile"className='mb-5 text-center' >
                    <input type="file" style={{display:'none'}} id='profile'
                     onChange={(e)=>setUserProfile({...userProfile,profile:e.target.files[0]})} />
                    {existingImage ==""?<img src={preview?preview:"https://i.pinimg.com/564x/22/6d/1b/226d1bc90f320e5019c83eea891dc751.jpg"} alt=""
                    width={'200px'} height={'200px'} className='rounded-circle' />:
                     <img src={preview?preview:`${BASE_URL}/uploads/${existingImage}`} alt=""
                    width={'200px'} height={'200px'} className='rounded-circle' />}
                </label>
                <div className='mb-3'>
                    <input type="text" className='form-control' placeholder='Github' 
                    value={userProfile.github} onChange={(e)=>setUserProfile({...userProfile,github:e.target.value})} />
                </div>
                <div className='mb-3'>
                    <input  type="text" className='form-control' placeholder='LinkedIn'
                    value={userProfile.linkedin} onChange={(e)=>setUserProfile({...userProfile,linkedin:e.target.value})} />
                </div>
                <div className='mb-3 mt-3'>
                    <button onClick={handleProfileUpdate}  className='btn btn-success rounded w-100'>Update</button>
                </div>
               </div>
           </Collapse >
           <ToastContainer autoClose={2000} position='top-center' theme='colored'/>

        </div>
    </>
  )
}


export default Profile;