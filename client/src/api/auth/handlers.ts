import { instance } from "../instance";


export async function registration(username: string, email: string, password: string): Promise<any> {
    const res = await instance.post("auth/registration", {
        email,
        username,
        password
    })

    return res.data
}