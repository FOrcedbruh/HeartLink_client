import styles from './LikesPage.module.scss'
import { FC, useEffect, useState } from 'react'
import { LHandlers } from '../../../api/likes/handlers'
import { useAuthContext } from '../../../api/auth/authContext'
import { ILike } from '../../../types/ILike'




const TITLE: string = 'Мне поставили отметки "нравится"'
const BROKENHEART: string = "Пока тут пусто (:"





const LikesPage: FC = () => {

    const { authUser } = useAuthContext()

    const [likes, setLikes] = useState<ILike[]>([])

    const profile_id: number = authUser.profile.data.id

    const getLikes = async () => {
        const res = await LHandlers.likes(profile_id)

        setLikes(res)
    }

    useEffect(() => {
        
        getLikes()
    }, [])

    return (
        <section className={styles.window}>
            <h1>{TITLE}</h1>
            <ul className={styles.likes}>
                {
                    likes.length ? likes.map(like => {
                        return (
                            <li>❤️</li>
                        )
                    })
                : <h3 className={styles.broken}>{BROKENHEART}</h3>}
            </ul>
        </section>
    )
}


export default LikesPage