import { IProfile } from "../../types/IProfile";
import { instance } from "../instance";



class ProfileHandlers {
    async create_profile(firstname: string, surname: string, access_token: string): Promise<any> {
        const res = await instance.post("profile/create", {
            firstname,
            surname
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
    async update_photos() {
        
    }
    async feed(gender_in: string): Promise<any> {
        const res = await instance.post("profile/feed", gender_in)

        return res.data
    }
}


export const PHandlers = new ProfileHandlers()