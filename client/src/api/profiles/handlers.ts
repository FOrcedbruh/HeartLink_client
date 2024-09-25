import { instance } from "../instance";



class ProfileHandlers {
    async create_profile(firstname: string, surname: string): Promise<any> {
        const res = await instance.post("profiles/create", {
            firstname,
            surname
        })

        return res.data
    }
    async update_gender_age(gender: string, age: number): Promise<any> {
        const res = await instance.post("profiles/update_gender_age", {
            gender,
            age
        })

        return res.data
    }
    async update_bio_hobbies(bio: string, hobbies: string[]): Promise<any> {
        const res = await instance.post("profiles/update_bio_hobbies", {
            bio,
            hobbies
        })

        return res.data
    }
    async update_photos() {
        
    }
}


export const PHandlers = new ProfileHandlers()