import styles from './Feed.module.scss'
import { PHandlers } from '../../../api/profiles/handlers';
import { useAuthContext } from '../../../api/auth/authContext';
import { useEffect, useState } from 'react';


const Feed: React.FC = () => {
    

    const { authUser } = useAuthContext()



    const getFeed = async () => {
        if (authUser.profile.data.gender === "Мужчина") {
            const res = await PHandlers.feed("MALE")
            console.log(res)
        } else {
            const res = await PHandlers.feed("FEMALE")
            console.log(res)
        }
    }

    useEffect(() => {
        getFeed()
    }, [])

    return (
        <section className={styles.feed}>
            <div className={styles.container}>
                <div>

                </div>
            </div>
        </section>
    )
}

export default Feed;