import { instance } from "../instance";
import { IUpdateProfile } from "../../types/IUpdateProfile";
import deleteEmptyProps from "../../utils/helpers/removeEmptyFields";

class ProfileHandlers {
    async get_profile(access_token: string) {
        const res = await instance.get(`/profile/`, {
            headers: {"Authorization": `Bearer ${access_token}`}
        })

        return res.data
    }
    async create_profile(firstname: string, user_id: number, surname: string, access_token: string): Promise<any> {
        const res = await instance.post("profile/create", {
            firstname,
            surname,
            user_id
        }, {headers: {"Authorization": `Bearer ${access_token}`}})

        return res.data
    }
    async update_gender_age(gender: string, age: number, access_token: string): Promise<any> {
        const res = await instance.patch("profile/update_gender_age", {
            gender,
            age
        }, {headers: {"Authorization": `Bearer ${access_token}`}})

        return res.data
    }
    async update_bio_hobbies(bio: string, hobbies: string[], access_token: string): Promise<any> {
        const res = await instance.patch("profile/update_bio_hobbies", {
            bio,
            hobbies
        }, {headers: {"Authorization": `Bearer ${access_token}`}})

        return res.data
    }
    async update_photos(formData: any, access_token: string, profile_id: number): Promise<any> {
       const res = await instance.patch(`profile/add_images/${profile_id}`, 
        formData
        , {
        headers: {
            "Authorization": `Bearer ${access_token}`,
            "Content-Type": "multipart/form-data"
        }
       })

       return res.data
    }
    async delete_photos(filenames: string[], access_token: string, profile_id: number): Promise<any> {
        const res = await instance.patch(`profile/erase_images/${profile_id}`, filenames, {
            headers: {"Authorization": `Bearer ${access_token}`}
        })

        return res.data
    }
    async feed(gender_in: string, access_token: string, offset: number, limit: number): Promise<any> {
        const res = await instance.post(`profile/feed/${offset}/${limit}`, gender_in, {
            headers: {'Authorization': `Bearer ${access_token}`}
        })

        return res.data
    }
    async get_profile_stage(access_token: string): Promise<number> {
        const res = await instance.post("profile/get_profile_stage", {}, {headers: {"Authorization": `Bearer ${access_token}`}})

        return res.data
    }
    async update_profile(access_token: string, data: IUpdateProfile): Promise<any> {
        try {
            const clearData: IUpdateProfile = deleteEmptyProps(data)
            const res = await instance.patch("/profile/update", clearData, {headers : {"Authorization": `Bearer ${access_token}`}})
            
            return res.data
        } catch (e: any) {
            return e.response.data.detail
        }
        
    }
}


export const PHandlers = new ProfileHandlers()