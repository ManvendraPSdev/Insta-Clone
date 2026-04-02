import React from 'react' ; 
import "../button.scss" ; 
import "../nav.scss" ; 
import {useNavigate} from "react-router" ; 

const Nav = () => {

  const navigate = useNavigate() ; 

  return (
    <nav className='nav-bar'>
        <p className='brand'>InstaClone</p>
        <button 
          onClick={()=>{navigate("/create-post")}}
          className='button primary-button'
        >
          New Post
        </button>
    </nav>
  )
}

export default Nav