import React, { useState } from 'react'
import "../style/form.scss"
import {Link, useNavigate} from "react-router"
import { useAuth } from '../hooks/useAuth'

const Register = () => {

  const [userName , setUsername] = useState("") ; 
  const [email , setEmail] = useState("") ; 
  const [password , setPassword] = useState("") ; 

  const { handelRegister , loading} = useAuth() ; 
  const navigate = useNavigate() ; 
  
  if(loading){
    return(
      <h1>Loading...</h1>
    )
  }

  async function handelSubmit(e){
    
    e.preventDefault() ; 

    handelRegister(userName , email , password).then(res=>{
      console.log(res) ;
      navigate("/") ;
    })

    // await axios.post("http://localhost:3000/api/auth/register" , {
    //   email , 
    //   userName , 
    //   password
    // },{
    //   withCredentials : true
    // })
    // .then(res=>{
    //   console.log(res.data)
    // })
  }

  return (
    <main className='auth-page'>
      <div className="form-container">
        <h1>Register</h1>

        <form onSubmit={handelSubmit}>

          <input 
            onInput={(e)=>{setUsername(e.target.value)}}
            type="text" 
            placeholder='userName'
           />

          <input 
            onInput={(e)=>{setEmail(e.target.value)}}
            type="text" 
            placeholder='email' 
          />

          <input
            onInput={(e)=>{setPassword(e.target.value)}}
            type='text' 
            placeholder='Password' 
          />

          <button type='submit'>Register</button>
        </form>

        <p>Already have an account? <Link className='toggleAuthForm' to="/login">Sign in</Link></p>
      </div>
    </main>
  )
}

export default Register