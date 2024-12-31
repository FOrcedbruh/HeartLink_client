import { instance } from "../instance";



class LikesHandlers {
    async like(profile_id: number, liked_profile_id: number, access_token: string): Promise<any> {
        const res = await instance.post("like/like", {
            profile_id,
            liked_profile_id
        }, {
            headers: {"Authorization": `Bearer ${access_token}`}
        })

        return res.data
    }
    async likes(profile_id: number): Promise<any> {
        const res = await instance.get(`like/${profile_id}`)

        return res.data
    }
    async get_profile_by_like(profile_id: string): Promise<any> {
        const res = await instance.post(`like/check_like_profile/${profile_id}`)

        return res.data
    }
    async get_likes_count(liked_profile: number, access_token: string): Promise<any> {
        const res = await instance.get(`like/likes_count/${liked_profile}`, 
        {
            headers: {"Authorization": `Bearer ${access_token}`}
        })

        return res.data
    }
}



export const LHandlers = new LikesHandlers()