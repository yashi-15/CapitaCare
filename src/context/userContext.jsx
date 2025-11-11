import { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();

const UserProvider = ({ children }) =>{
    const [user, setUser] = useState(null)

    const updateUser = (userData) => {
        setUser(userData)
    }

    const clearUser = () =>{
        setUser(null)
    }

    return (
        <UserContext.Provider value={{ user, updateUser, clearUser}} >{children}</UserContext.Provider>
    )
}

export default UserProvider