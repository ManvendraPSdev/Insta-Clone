import React, { useState } from 'react'
import "../style/form.scss"
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
// import { useNavigate } from 'react-router'

const Login = () => {
  const [email , setEmail] = useState("") ; 
  const [password , setPassword] = useState("") ; 

  const { handelLogin , loading } = useAuth(); 
  const navigate = useNavigate() ; 

  if(loading){
    return (
      <h1>Loading...</h1>
    )
}

  async function handelSubmit(e){
    e.preventDefault() ; 

    handelLogin (email , password)
    .then(
      res=>{
        console.log(res)
        navigate("/")
      }
    ) ; 

    // await axios.post("http://localhost:3000/api/auth/login" , {
    //   email , 
    //   password
    // } ,{
    //   withCredentials : true
    // }).then(res => {
    //   console.log(res.data)
    // })
  }
  return (
    <main className='auth-page'>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handelSubmit}>

                <input 
                  onInput={(e)=>{setEmail(e.target.value)}}
                  type="text" 
                  placeholder='Email/UserName' 
                />

                <input 
                  onInput={(e)=>{setPassword(e.target.value)}}
                  type="text" 
                  placeholder='password' 
                />
                <button type='submit'>Login</button>
            </form>
            <p>New here? <Link className='toggleAuthForm' to="/register">Create account</Link></p>
        </div>
    </main>
  )
}

export default Login