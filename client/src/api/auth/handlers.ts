import { AxiosResponse } from "axios";
import { instance } from "../instance";
import { useMessage } from "../../app/zustand/useMessage";


class AuthHandlers {
    async registration(username: string, email: string, password: string): Promise<any> {
        try {
            const res: AxiosResponse = await instance.post("auth/registration", {
                email,
                username,
                password
            })
        
            return res.data
        } catch(error: any) {
            return error.response.data.detail
        }
       
    }
    async login(email: string, password: string): Promise<any> {
        try {
            const res: AxiosResponse = await instance.post("auth/login", {
                email,
                password
            })
            if (res.status == 400) {
                return "Hello"
            }
    
            return res.data
        } catch(error: any) {
            return error.response.data.detail
        }
        
    }
    async logout(): Promise<any> {
        const res: AxiosResponse = await instance.post("auth/logout")


        return res.data
    }
}


export const AHandlers = new AuthHandlers()


