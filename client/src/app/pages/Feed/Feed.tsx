import styles from './Feed.module.scss'
import { PHandlers } from '../../../api/profiles/handlers';
import { useAuthContext } from '../../../api/auth/authContext';
import { useEffect, useState } from 'react';
import { Card } from './Card/Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IProfile } from '../../../types/IProfile';
import { EffectFlip } from 'swiper/modules';
import "swiper/scss"
import "swiper/scss/effect-flip"


const Feed: React.FC = () => {
    

    const { authUser } = useAuthContext()
    const [profiles, setProfiles] = useState<IProfile[]>([])



    const getFeed = async () => {
        if (authUser.profile.data.gender === "Мужчина") {
            const res = await PHandlers.feed("MALE")
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

    return (
        <section className={styles.feed}>
            <div className={styles.container}>
                <Swiper
                    className={styles.swiperCards}
                    grabCursor={true}
                    effect={'flip'}
                    modules={[EffectFlip]}>

                    {profiles.map(profile => {
                        return (
                            <SwiperSlide className={styles.cardSlide} key={profile.user_id}>
                                <Card profile={profile}/>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
                    
                
            </div>
        </section>
    )
}

export default Feed;