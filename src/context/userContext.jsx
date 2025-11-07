import { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();

const UserProvider = ({ children }) =>{
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const fetchUserData = async() => {
        try{
            const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO)
            if(response.status(200)){
                setUser(response.data)
                setIsAuthenticated(true)
            }
        }
        catch(err){
            setIsAuthenticated(false)
            alert('Not authenticated')
        }
    }

    useEffect(()=>{
        fetchUserData()
    },[])

    const updateUser = (userData) => {
        setUser(userData)
    }

    const clearUser = () =>{
        setUser(null)
    }

    return (
        <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, updateUser, clearUser}} >{children}</UserContext.Provider>
    )
}

export default UserProvider