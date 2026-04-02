import { getFeed , createPost } from "../services/post.api";
import { useContext , useEffect} from "react";
import { PostContext } from "../post.context";

export const usePost = ()=>{
    const context = useContext(PostContext) ; 
    const {loading , setLoading , post , setPost , feed , setFeed} = context ;

    const handelGetFeed = async()=>{
        setLoading(true) ;
        try{
            const data = await getFeed() ; 
            setFeed(data?.posts || []) ; 
        }catch(error){
            console.error("Failed to fetch feed:", error) ;
            setFeed([]) ;
        }finally{
            setLoading(false) ;
        }
    }

    const handelCreatePost = async(imageFile , caption)=>{
        setLoading(true) ; 
        const data = await createPost(imageFile , caption) ; 
        setFeed([data.post , ...feed]) ; 
        setLoading(false) ; 

    }

    useEffect(()=>{
        handelGetFeed()
    } , [])

    return {loading , feed , post , handelGetFeed , handelCreatePost} ; 
}