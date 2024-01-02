import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthTokenContext } from '../Contexts/ContextShare';

function Header({Dashboard}) {

  const {isAuthToken,setIsAuthToken} = useContext(isAuthTokenContext) 
  const navigate = useNavigate()
  const handleLogout =()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existingUser")
    setIsAuthToken(false)
    navigate('/')

  }
  return (
    <div>
        <Navbar className="bg-success p-3">
        <Container>
          <Navbar.Brand className='text-light'>
            <Link className='text-light' style={{textDecoration:'none'}} to={'/'} >
            <i class="fa-brands fa-stack-overflow me-3"></i>
                <span className=''>Project-Fair</span>
            </Link>
          </Navbar.Brand>
          {
            Dashboard &&
            <button onClick={handleLogout} className='btn btn-warning rounded'>LogOut <i class="fa-solid fa-power-off"></i> </button>
          }
        </Container>
      </Navbar>
    </div>


  )
}

export default Header