import styles from './LikesPage.module.scss'
import { FC, useEffect, useState } from 'react'
import { LHandlers } from '../../../api/likes/handlers'
import { useAuthContext } from '../../../api/auth/authContext'
import { ILike } from '../../../types/ILike'
import { replaceAll } from '../../../utils/utils'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { IProfile } from '../../../types/IProfile'


const TITLE: string = 'Мне поставили отметки "нравится"'
const BROKENHEART: string = "Пока тут пусто 💔"


const LikesPage: FC = () => {

    const { authUser } = useAuthContext()
    const profile: IProfile = authUser.profile.value?.data

    const [likes, setLikes] = useState<ILike[]>([])

    const navigate =  useNavigate()

    const getLikes = async () => {
        const res = await LHandlers.likes(profile.id)
        setLikes(res)
    }

    useEffect(() => {
        if (profile) {
            getLikes()
        }
    }, [])

    const variants = {
        hidden: {
            opacity: 0,
            y: 10
        },
        animate: (custom: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: custom * 0.1 }
        })
    }


    return (
        <section className={styles.window}>
            <h1>{TITLE}</h1>
            <ul className={styles.likes}>
                {
                    likes.length ? likes.map((like, index) => {
                        const date: string = replaceAll(like.liked_at, "-", ".").slice(0, 10)
                        const time: string = like.liked_at.slice(11, 16)
                        return (
                            <motion.li
                                variants={variants}
                                animate={"animate"}
                                initial={"hidden"}
                                custom={index+1}
                                whileHover={{
                                    backgroundColor: "#8576FF",
                                }}
                                whileTap={{
                                    scale: 0.9
                                }}
                                key={index} 
                                className={styles.listItem}
                                onClick={() => navigate(`/check_profile/${like.profile_id}`)}
                            ><h2>❤️</h2><p>Вы понравились одному человеку</p><span>{date} в {time}</span></motion.li>
                        )
                    })
                : <h3 className={styles.broken}>{BROKENHEART}</h3>}
            </ul>
        </section>
    )
}


export default LikesPage