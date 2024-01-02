import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import Myprojects from '../components/Myprojects'
import Profile from '../components/Profile'

function Dashboard() {
  
  const [username,setUsername] =useState("")
  useEffect(()=>{
    setUsername(JSON.parse(sessionStorage.getItem('existingUser')).username)

   },[]) 
   console.log(username);
 return (
    <>
      <Header Dashboard />
      <h1>Welcome <span style={{color:'orange'}}>{username}</span></h1>

      <Row className='container-fluid mt-5'>
        {/* my project */}
      <Col sm={12} md={8}>

        <Myprojects/>

      </Col>
      {/* my profile */}
      <Col sm={12} md={4}>

        <Profile/>
        
      </Col>



      </Row>
    </>
  )
}

export default Dashboard