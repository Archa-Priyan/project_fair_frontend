import React, { useEffect } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { allProjectAPI } from '../services/allAPI'
import { useState } from 'react'
import { Link } from 'react-router-dom'



function Project() {

  const[allProject , setAllProject] = useState([])
  const[searchKey,setSearchKey] = useState("")
  const[isToken , setIsToken] = useState(false)



  const getAllProject = async ()=>{

    if(sessionStorage.getItem("token")){

      const token = sessionStorage.getItem("token")

      const reqHeader ={
        
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        
      }

     const result = await allProjectAPI(searchKey ,reqHeader)
     console.log(result.data);
     setAllProject(result.data)

    }
    
  }
  console.log(searchKey);

  useEffect(()=>{
    getAllProject()

  },[searchKey])

 useEffect(()=>{
  if(sessionStorage.getItem("token")){
      setIsToken(true)
  }
 },[])


  console.log(isToken);
  return (
    <>
    <Header/>



    <div className='d-flex justify-content-center align-items-center flex-column mt-5'>
      <h1>All Project</h1>
      <div className='d-flex mt-5 w-25'>
        <input type="text" className='form-control' value={searchKey} onChange={e=>setSearchKey(e.target.value)}
         placeholder =' Search the project using Technologies' />
        <i style={{marginLeft:'-45px ',color:'gray'}} class='fa-solid fa-magnifying-glass fa-rotate-90 '></i>
      </div>
      <Row className='mt-5 mb-5 container-fluid'>
        {
        allProject?.length>0?
        allProject.map((item)=>(<Col sm={12} md={6} lg={4} >
          <ProjectCard project={item}/> 
         </Col>))
          : <div>
             {isToken? <p className='text-center text-danger fs-3'>Sorry no project currently Available</p>:
              <div className='d-flex justify-content-center align-items-center flex-column'>
              <img className='rounded' src="https://i.pinimg.com/originals/85/fb/60/85fb60daa91e7c122531fb5a0677cb82.gif" 
               alt="" height={'200px'} width={'200px'} />
              <p className=' fs-3 mt-4 text-danger'>Please 
              <Link style={{textDecoration:'none',color:"blue"}}  to={'/login'}> login </Link> to view more Projects</p>
            </div> }
           </div>
          }
      </Row>
    </div>
    </>
  )
}

export default Project