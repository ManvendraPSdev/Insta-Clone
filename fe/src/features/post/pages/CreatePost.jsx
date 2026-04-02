import React from 'react'
import "./style/CreatePost.scss"
import { useState , useRef } from 'react'
import { usePost } from '../hook/usePost'
import { useNavigate } from 'react-router'
import Nav from '../../shared/components/Nav'

const CreatePost = () => {
  const [caption , setCaption] = useState("") ; 
  const postImageInputFeild = useRef(null) ; 
  const navigate = useNavigate() ; 
  const {loading , handelCreatePost} = usePost() ; 

  async function handelSubmit (e){
    e.preventDefault() ; 
    const file = postImageInputFeild.current?.files?.[0] ; 
    if(!file){
      return ;
    }
    await handelCreatePost(file , caption) ; 
    navigate("/") ; 
  }

  if(loading){
    return(
      <h1>Creating Post</h1>
    )
  }

  return (
    <div className='create-post-page'>
      <Nav/>
      <div className="form-container">
        <h1>Create Post</h1>
        <p>Share a beautiful moment with your followers.</p>
        <form onSubmit={handelSubmit}>
          <label className='post-image-label' htmlFor="postImage">Choose Image</label>

          <input
            ref={postImageInputFeild}
            hidden  type="file" name='postImage' id='postImage' 
          />

          <input 
          value={caption}
          onChange={(e)=>{setCaption(e.target.value)}}
            type="text" 
            name='caption'
            id='caption' 
            placeholder='Write a caption'
          />


          <button className='button primary-button'>Create Post</button>
        </form>
      </div>
    </div>
  )
}

export default CreatePost