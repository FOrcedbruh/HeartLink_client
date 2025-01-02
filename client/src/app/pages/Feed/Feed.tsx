import styles from './Feed.module.scss'
import { PHandlers } from '../../../api/profiles/handlers';
import { useAuthContext } from '../../../api/auth/authContext';
import { useEffect, useState } from 'react';
import { Card } from './Card/Card';
import { IProfile } from '../../../types/IProfile';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


const Feed: React.FC = () => {
    
    document.title = "HeartLink | Главная"

    const { authUser } = useAuthContext()
    const [profiles, setProfiles] = useState<IProfile[]>([])
    const access_token: string | null = localStorage.getItem("access_token")

    const [currentUserIndex, setCurrentUserIndex] = useState<number>(0)

    const profile: IProfile = authUser.profile.value?.data


    const detect_gender = (gender: string): string => {
        if (gender === "Мужчина") {
            return "MALE"
        } else {
            return "FEMALE"
        }
    }

    const getFeed = async () => {
        const gender_in: string = detect_gender(profile.gender)
        const res = await PHandlers.feed(gender_in, access_token!, 0 , 10)

        setProfiles(res)
    }

    useEffect(() => {
        if (profile) {
            getFeed()
        }
    }, [])


    return (
        <section className={styles.feed}>
            <div className={styles.container}>
                {profiles.length ? <Card 
                    access_token={access_token!} 
                    auth_profile_id={authUser.profile.value.data.id} 
                    profilesCount={profiles.length} 
                    setCurrentUserIndex={setCurrentUserIndex} 
                    currentUserIndex={currentUserIndex} 
                    profile={profiles[currentUserIndex]}/> 
                : 
                    <motion.h1 
                        initial={{y: 20, opacity: 0}} 
                        animate={{y: 0, opacity: 1}} 
                        transition={{duration: 0.7}} 
                        className={styles.notProfileText}>
                        Чтобы вас заметили, создайте <Link to={"/me/create"}>профиль</Link>
                    </motion.h1>
                }
            </div>
        </section>
    )
}

export default Feed;