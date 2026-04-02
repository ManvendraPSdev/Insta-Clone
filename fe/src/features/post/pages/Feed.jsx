import React, { useEffect } from 'react'
import "./style/feed.scss"
import Post from '../components/Post'
import { usePost } from '../hook/usePost'
import Nav from '../../shared/components/Nav'

const Feed = () => {
    const {feed , loading , handelGetFeed} = usePost() ; 
    useEffect(()=>{
        handelGetFeed()
    } , [])

    if(loading || !feed){
        return (
            <main className='feed-page'>
                <section className='feed'>
                    <div className='feed-header'>
                        <h1>Your Feed</h1>
                        <p>Fetching the latest updates...</p>
                    </div>
                    <div className='feed-loading'>Feed is loading...</div>
                </section>
            </main>
        )
    }
    
    if(!feed.length){
        return (
            <main className='feed-page'>
                <section className='feed'>
                    <div className='feed-header'>
                        <h1>Your Feed</h1>
                        <p>No posts yet. Follow more people to populate your feed.</p>
                    </div>
                    <div className='feed-empty'>Nothing to show right now.</div>
                </section>
            </main>
        )
    }

    return (
        <main className='feed-page'>
            <Nav/>
            <section className='feed'>
                <div className='posts'>
                   {feed.map((post)=>{
                    return <Post key={post._id || post.id} user={post.user} post={post}/>
                   })}
                </div>
            </section>
        </main>
    )
}

export default Feed