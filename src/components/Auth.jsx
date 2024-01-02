import React, { useContext, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthTokenContext } from '../Contexts/ContextShare';

function Auth({register}) {

    const{isAuthToken,setIsAuthToken} = useContext(isAuthTokenContext)
    //to hold the value from input box
    const [userData, setUserData] = useState({
        username:"",
        email:"",
        password:"",
    })
    console.log(userData);

    //navigate
    const navigate = useNavigate() 

    const registerForm = register?true:false

//register function

const handleRegister = async(e)=>{
    e.preventDefault()

    const { username , email , password} = userData

    if(!username || !email || !password){
        toast.info('Please fill the form completely')
    }
    else{
         const result = await registerAPI(userData)
        /*  console.log(result.data); */


             if(result.status === 200){
            toast.success(`${result.data.username}  is successfully registered`)
            setUserData({
                username:"",
                email:"",
                password:""

            }) 

            //move to login
            navigate('/login')
        }
       else{
            toast.error(result.response.data)
        }  
        
    }



}

//login function

const handleLogin = async (e)=>{
    e.preventDefault()

//destructure 
    const { email , password } = userData

    if(!email || !password){
        toast.error('Please fill the form completely')
    }
    else{
        const result = await loginAPI(userData)
        console.log(result);

        if(result.status ===200){
            toast.success(' login successfull ')


            sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
            sessionStorage.setItem("token",result.data.token)

            setUserData({
                username:"",
                email:"",
                password:""

            })
            setIsAuthToken(true)
            //navigate to home
            setTimeout(()=>{
                navigate('/')
            },2000)
           

        }
        else{
            toast.error(result.response.data)
        }
    }
}




    
  return (

    <div style={{width:'100%',height:'100vh'}} className=' d-flex justify-content-center align-items-center mt-4'>

        <div className='container w-75'>
            <Link style={{textDecoration:'none', color:'blue'}} to={'/'}><i class='fa-solid fa-arrow-right fa-rotate-180 me-2'></i>Back to home</Link>
            <div className='card bg-success p-5 rounded '>
                <div className='row align-items-center'>
                   <div className='col-lg-6'> 
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/app-login-5948720-4922487.png?f=webp" alt=""width={'100%'} />
                    </div>
                    <div className='col-lg-6'>
                    <h1 className='text-center text-light'><i class='fa-brands fa-stack-overflow fa-2x'></i>Project Fair</h1>
                    <h5 className='text-light text-center mt-3 ms-5'>
                        {
                            registerForm? "Sign Up to your Account": "Sign In to Account"
                        } {/* ternery operator */}
    
                    </h5>

                   <Form className='mt-4'>


                    {
                        registerForm &&
                        <Form.Group className='mb-3' controlId='formBasicEmail'>
                            <Form.Control type='text' placeholder='Username' value={userData.username}
                            onChange={(e)=>setUserData({...userData,username: e.target.value})}/>
                        </Form.Group>

                    }

                        <Form.Group className='mb-3' controlId='formBasicEmail'>
                            <Form.Control type='text' placeholder='Email Id' value={userData.email}
                            onChange={(e)=>setUserData({...userData,email:e.target.value})}/>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='formBasicEmail'>
                            <Form.Control type='password' placeholder='Password' value={userData.password}
                            onChange={(e)=>setUserData({...userData,password:e.target.value})}/>

                        </Form.Group>

                    {
                         registerForm?
                         <div>
                            <button onClick={handleRegister} className='btn btn-warning rounded '>Register</button>
                            <p>Already a user? click here to <Link to={'/login'} style={{color:'blue'}}>Login</Link></p>
                         </div>:
                         <div>
                         <button onClick={handleLogin} className='btn btn-warning rounded '>Login</button>
                         <p>New user? click here to <Link to={'/register'} style={{color:'blue'}}>Register</Link></p>
                      </div>
                    }


                   </Form>
                </div>

                </div>
                


        </div>
        </div>
                <ToastContainer autoClose={2000} theme='colored' position='top-center'/>

    </div>

  )
 }
                
                
export default Auth