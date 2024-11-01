import styles from './Feed.module.scss'
import { PHandlers } from '../../../api/profiles/handlers';
import { useAuthContext } from '../../../api/auth/authContext';
import { useEffect, useState } from 'react';
import { Card } from './Card/Card';
import { IProfile } from '../../../types/IProfile';
import { LoaderComponent } from '../../components/Loader/Loader';


const Feed: React.FC = () => {
    
    document.title = "HeartLink | Главная"

    const { authUser } = useAuthContext()
    const [profiles, setProfiles] = useState<IProfile[]>([])

    const getFeed = async () => {
        if (authUser.profile.data.gender === "Мужчина") {
            const res = await PHandlers.feed("MALE")
            setProfiles(res.profiles)
        } else {
            const res = await PHandlers.feed("FEMALE")
            setProfiles(res.profiles)
        }
    }

    useEffect(() => {
        getFeed()
    }, [])

    return (
        <section className={styles.feed}>
            <div className={styles.container}>
                {profiles.length && <Card profile={profiles[0]}/>}
            </div>
        </section>
    )
}

export default Feed;