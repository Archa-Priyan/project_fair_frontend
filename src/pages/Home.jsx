import React, { useEffect, useState } from 'react'
import {Row , Col} from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import titleImage from '../Assests/graphic-designers-kenya.png'
import { Link } from 'react-router-dom'
import { homeProjectAPI } from '../services/allAPI'


function Home() {
    //state to store token
    const[islogin,setIsLogin] = useState(false)
    const[homeProject,setHomeProject] = useState([])


    const getHomeProject = async ()=>{
        const result = await homeProjectAPI()
        console.log(result);
        setHomeProject(result.data)
    }

    useEffect(()=>{
       if(sessionStorage.getItem("token")){
        setIsLogin(sessionStorage.getItem("token"))
       }
       else{
        setIsLogin("")
       }
    },[])

    useEffect(()=>{
        getHomeProject()

    },[])
    console.log(islogin);
  return (
    <>
    <div style={{width:'100p%',height:'100vh',backgroundColor:"yellowgreen"}} className='mb-5'>
        <div className="container-fluid rounded">
            <Row className='align-items-center p-5'>
                <Col sm={12} md={6}>
                    <h1 className='text-light' style={{fontSize:'100px'}}>Project-Fair</h1>
                    <p>one stop destination for all software development projects</p>
                    {islogin?
                    <Link to={'/dashboard'}  className='btn btn-success rounded'>Manage Project <i class="fa-solid fa-arrow-right ms-3"></i></Link>:
                   <Link to={'/login'}  className='btn btn-success rounded'>Get started <i class="fa-solid fa-arrow-right ms-3"></i></Link>}
                </Col>
                <Col sm={12} md={6}>
                    <img src={titleImage} alt="" />
                </Col>
            </Row>

        </div>

    </div>
    
        {/* section for all projects */}
        <div className='all-project mt-5 mb-5'>
            <div className='text-center'>
                <h1>Explore Our Projects</h1>

               <marquee scrollAmount={20} className='mt-5'>

                    <div className='d-flex'>
    
                            { homeProject?.length>0?
                            homeProject.map((item)=>(<div className='ms-5' style={{width:'500px'}}>
                            <ProjectCard project ={item}/>
                            </div>))
                               : null}
                            
                    </div>
    
               </marquee>
               <div className='text-center mt-5'>
                <h6><Link to={'/project'}>see more projects</Link></h6>

               </div>
               

            </div>


        </div>
    </>
  )
}

export default Home