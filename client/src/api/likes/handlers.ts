import { instance } from "../instance";



class LikesHandlers {
    async like(profile_id: number, liked_profile_id: number, access_token: string): Promise<any> {
        const res = await instance.post("likes/like", {
            profile_id,
            liked_profile_id
        }, {
            headers: {"Authorization": `Bearer ${access_token}`}
        })

        return res.data
    }
    async likes(profile_id: number): Promise<any> {
        const res = await instance.get(`likes/${profile_id}`)

        return res.data
    }
    async get_profile_by_like(profile_id: string): Promise<any> {
        const res = await instance.post(`likes/check_like_profile/${profile_id}`)

        return res.data
    }
    async get_likes_count(liked_profile: number, access_token: string): Promise<any> {
        const res = await instance.post('likes/get_likes_count',
            liked_profile,
        {
            headers: {"Authorization": `Bearer ${access_token}`}
        })

        return res.data
    }
}



export const LHandlers = new LikesHandlers()