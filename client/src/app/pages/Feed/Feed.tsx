import styles from './Feed.module.scss'
import { PHandlers } from '../../../api/profiles/handlers';
import { useAuthContext } from '../../../api/auth/authContext';
import { useEffect, useState } from 'react';
import { Card } from './Card/Card';
import { IProfile } from '../../../types/IProfile';




const Feed: React.FC = () => {
    
    document.title = "HeartLink | Главная"

    const { authUser } = useAuthContext()
    const [profiles, setProfiles] = useState<IProfile[]>([])

    const [currentUserIndex, setCurrentUserIndex] = useState<number>(0)

    const getFeed = async () => {
        if (authUser.profile.data.gender === "Мужчина") {
            const res = await PHandlers.feed("MALE")
            setProfiles(res.profiles)
            console.log(res)
        } else {
            const res = await PHandlers.feed("FEMALE")
            console.log(res)
            setProfiles(res.profiles)
        }
    }

    useEffect(() => {
        getFeed()
    }, [])


    useEffect(() => {
        
    }, [])


    return (
        <section className={styles.feed}>
            <div className={styles.container}>
                {profiles.length && <Card profilesCount={profiles.length} setCurrentUserIndex={setCurrentUserIndex} currentUserIndex={currentUserIndex} profile={profiles[currentUserIndex]}/>}
            </div>
        </section>
    )
}

export default Feed;