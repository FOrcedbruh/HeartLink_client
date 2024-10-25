import styles from './Feed.module.scss'
import { PHandlers } from '../../../api/profiles/handlers';
import { useAuthContext } from '../../../api/auth/authContext';
import { useEffect, useState } from 'react';
import { Card } from './Card/Card';
import { IProfile } from '../../../types/IProfile';
import "swiper/scss"
import { LoaderComponent } from '../../components/Loader/Loader';





const Feed: React.FC = () => {
    

    const { authUser } = useAuthContext()
    const [profile, setProfile] = useState<IProfile | null>(null)



    const getFeed = async () => {
        if (authUser.profile.data.gender === "Мужчина") {
            const res = await PHandlers.feed("MALE")
            setProfile(res.profile)
        } else {
            const res = await PHandlers.feed("FEMALE")
            setProfile(res.profile)
        }
    }

    useEffect(() => {
        getFeed()
    }, [])

    return (
        <section className={styles.feed}>
            <div className={styles.container}>
                {profile ? <Card profile={profile}/> : <LoaderComponent />}
            </div>
        </section>
    )
}

export default Feed;