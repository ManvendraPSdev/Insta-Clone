import { createContext , useState , useEffect } from "react";
import { login , register , getMe } from "../../services/auth.api";

export const AuthContext = createContext()

export function AuthProvider({children}){
    const [user , setUser] = useState(null) ; 
    const [loading , setLoading] = useState(false) ; 

    const handelLogin = async(email , password)=>{
        setLoading(true) ; 
        try {
            const response = await login(email , password)
            setUser(response.user) ; 
            return response ; 
        } catch (error) {
            console.log(error) ; 
            throw error ; 
        }finally{
            setLoading(false)  ;
        }
    }

    const handelRegister = async(userName , email  , password)=>{
        setLoading(true) ; 
        try {
            const response = await register(userName , email , password) ; 
            setUser(response.user) ; 
            return response ; 
        } catch (error) {
            console.log(error) ; 
            throw error ; 
        }finally{
            setLoading(false) ;     
        }
    }

    return (
        <AuthContext.Provider value={{user , loading , handelLogin , handelRegister}}>
            {children}
        </AuthContext.Provider>
    )
}