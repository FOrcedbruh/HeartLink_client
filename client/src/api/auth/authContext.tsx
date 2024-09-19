import { createContext, useEffect, useContext, useState, Dispatch, SetStateAction } from "react";


interface ContextType {
    authUser: any,
    setAuthUser: null | Dispatch<SetStateAction<any>>
}


const AuthContext = createContext<ContextType>({
    authUser: null,
    setAuthUser: null
})



export const useAuthContext = () => {
    return useContext(AuthContext)
}


export const AuthContextProvider = ({children}: {children: React.ReactNode}) => {

    const [authUser, setAuthUser] = useState<any>("")

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