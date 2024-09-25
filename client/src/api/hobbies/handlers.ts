import { instance } from "../instance";



export const getHobbies = async (): Promise<any[]> => {
    const res = await instance.get("/hobbies")

    return res.data
}