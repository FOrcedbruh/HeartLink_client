import { AxiosResponse } from "axios";
import { instance } from "../instance";



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
    
            return res.data
        } catch(error: any) {
            return error.response.data.detail
        }
    }

    async me(access_token: string): Promise<any> {
        try {
            const [user, profile] = await Promise.allSettled([
                instance.get("auth/users/me", {
                headers: {"Authorization": `Bearer ${access_token}`}
            }),
                instance.get("profile/", {
                headers: {"Authorization": `Bearer ${access_token}`}
            })
        ])
            

            return { user, profile }
        } catch(error: any) {
            return error.response.data.detail
        }
    }
}


export const AHandlers = new AuthHandlers()


