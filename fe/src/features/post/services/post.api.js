import axios from 'axios' ; 

const api = axios.create({
    baseURL : "http://localhost:3000" ,
    withCredentials : true
})

export async function getFeed(){
    const response = await api.get("/api/posts/feed") ; 
    return response.data ; 
}

export async function createPost(imageFile , caption){
    // whenever we want to send the data like file from frontend to backend with the help of axios then
    /* we dont do 
    const response = await api.get("/api/posts/feed") ; 
    return response.data ; 
     */
    // we do 
    const formData = new FormData() ; 
    formData.append("image" , imageFile) ; 
    formData.append("caption" , caption) ; 
    const response = await api.post("/api/posts" , formData) ; 
    return (
        response.data
    )
}