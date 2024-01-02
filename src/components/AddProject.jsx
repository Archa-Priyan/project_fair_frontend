import React, { useContext, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { addProjectAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectResponseContext } from '../Contexts/ContextShare';

function AddProject() {
  //useContext hook is used to access the context api
  const{addProjectResponse , setAddProjectResponse} = useContext(addProjectResponseContext)
  // state to hold the value from the input box
  const [projectDetails,setProjectDetails] = useState({
    title:'',
    language:'',
    github:'',
    website:'',
    overview:'',
    projectImage:''
  })
  
  const [token , setToken] = useState("")

  const [show, setShow] = useState(false);

  // to hold the url  of img
  const [preview ,setPreview] = useState("")

  console.log(projectDetails);

  useEffect(()=>{
     if(projectDetails.projectImage){
    //  javascript predefined method - url - createObjectURL - files will be converted into url
     setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  },[projectDetails.projectImage])

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
    else{
      setToken("")
    }
  },[])
  console.log(token);
  console.log(preview);

  const handleClose = () => {
    setShow(false);
    handleClose1()
  }
  const handleShow = () => setShow(true);

  const handleClose1 =()=>{
    setProjectDetails({
    title:'',
    language:'',
    github:'',
    website:'',
    overview:'',
    projectImage:''
    })
    setPreview("")
  }

  const handleAdd = async(e)=>{
    e.preventDefault()

    const {title,language,github,website,overview,projectImage} = projectDetails

    if(!title || !language || !github || !website || !overview || !projectImage){
      alert("Please fill the form completely")
    }
    else{
      // reqBody
      // if there is any uploading content from the system. we should send the body in the form of formdata.
      // 1) create object for the class from the data
      const reqBody = new FormData()
      // 2) add value to the formData - append()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      reqBody.append("projectImage",projectImage)

      if(token){const reqHeader = {
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }

      const result = await addProjectAPI(reqBody,reqHeader)
      console.log(result);
      if(result.status===200){
        toast.success("Project Successfully added")
        handleClose()
        setAddProjectResponse(result.data)
      }
      else{
        console.log(result);
        alert(result.response.data)
      }
    }}
  }
  return (
    <div>
       <>
      <Button className='m-3' variant="primary" onClick={handleShow}>
        Add Project
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-lg-6'>
              <label>
                <input type='file' style={{display:'none'}} onChange={(e)=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})}/>
                <img className='img-fluid' src={preview?preview:'https://cdn-icons-png.flaticon.com/512/2972/2972113.png'} alt="no-img"/>
              </label>
            </div>

            <div className='col-lg-6 d-flex justify-content-center align-items-center flex-column'>
                <div className='mb-3 mt-3 w-100'>
                  <input type='text' className='form-control' placeholder='project Title' value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})}/>
                </div>
                <div className='mb-3 w-100'>
                  <input type='text' className='form-control' placeholder='Language used' value={projectDetails.language} onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})}/>
                </div>
                <div className='mb-3 w-100'>
                  <input type='text' className='form-control' placeholder='Github Link' value={projectDetails.github} onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})}/>
                </div>
                <div className='mb-3 w-100'>
                  <input type='text' className='form-control' placeholder='Website Link' value={projectDetails.website} onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})}/>
                </div>
                <div className='mb-3 w-100'>
                  <textarea type='text' className='form-control' placeholder='Project Overview' value={projectDetails.overview} onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})}/>
                </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd}>Add</Button>
        </Modal.Footer>
      </Modal>
    </>
    <ToastContainer autoClose={2000} position='top-center' theme='colored'/>
    </div>
  )
}

export default AddProject
