import { createContext, useEffect, useContext, useState, Dispatch, SetStateAction } from "react";
import { IUser } from "../../types/IUser";


interface ContextType {
    authUser: string | null | IUser,
    setAuthUser: null | Dispatch<SetStateAction<string | null | IUser>>
}


const AuthContext = createContext<ContextType>({
    authUser: null,
    setAuthUser: null
})



export const useAuthContext = () => {
    return useContext(AuthContext)
}


export const AuthContextProvider = ({children}: {children: React.ReactNode}) => {

    const [authUser, setAuthUser] = useState<string | null | IUser>("")

    useEffect(() => {
        // @ts-ignore
        setAuthUser(JSON.parse(localStorage.getItem("auser")))
    }, [])

    return (
        <AuthContext.Provider value={{authUser, setAuthUser}}>
            {children}
        </AuthContext.Provider>
    )
}