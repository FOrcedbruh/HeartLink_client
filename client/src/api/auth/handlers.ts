import { AxiosResponse } from "axios";
import { instance } from "../instance";



class AuthHandlers {
    async registration(username: string, email: string, password: string): Promise<any> {
        const res: AxiosResponse = await instance.post("auth/registration", {
            email,
            username,
            password
        })
    
        return res.data
    }
    async login(email: string, password: string): Promise<any> {
        const res: AxiosResponse = await instance.post("auth/login", {
            email,
            password
        })

        return res.data
    }
    async logout(): Promise<any> {
        const res: AxiosResponse = await instance.post("auth/logout")


        return res.data
    }
}


export const AHandlers = new AuthHandlers()


