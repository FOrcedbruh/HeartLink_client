import { FC, useEffect, useRef, useState } from "react";
import styles from './LikedProfilePage.module.scss'
import { LHandlers } from "../../../api/likes/handlers";
import { useParams } from "react-router-dom";
import { IProfile } from "../../../types/IProfile";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Scrollbar } from "swiper/modules";
import { setEndAge } from "../../../utils/utils";
import { Hobby } from "../../components/Hobby/Hobby";
import "swiper/scss";
import 'swiper/scss/effect-fade';
import 'swiper/scss/scrollbar';



const LikedProfilePage: FC = () => {
    
    const { id: profile_id } = useParams()
    const [profile, setProfile] = useState<IProfile | null>(null)

    const getProfile = async () => {
        const res = await LHandlers.get_profile_by_like(profile_id!)

        setProfile(res.profile)
    }

    const swiperRef = useRef<any>(null)

    useEffect(() => {
        getProfile()
    }, [])

    const nextSlide = () => {
        swiperRef.current.swiper.slideNext();
    }

    const prevSlide = () => {
        swiperRef.current.swiper.slidePrev();
    }


    return (
        <section className={styles.window}>
            <article>
                <div className={styles.leftSide}>
                    <Swiper ref={swiperRef} allowTouchMove={false} scrollbar={true} modules={[EffectFade, Scrollbar]} effect={"fade"} className={styles.swiper}>
                        {profile?.profileImages.map((image, index) => {
                            return (
                                <SwiperSlide key={index} className={styles.slide}>
                                    <img src={image} alt="image"/>
                                    <div className={styles.prev} onClick={prevSlide}></div>
                                    <div className={styles.next} onClick={nextSlide}></div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                    <div className={styles.age}>
                        <p>{profile?.age} {setEndAge(Number(profile?.age))}</p>
                    </div>
                    <div className={styles.firstname}>
                        <p>{profile?.firstname}</p>
                    </div>
                </div>
                <div className={styles.rightSide}>
                   <div className={styles.bio}>
                        <p>{profile?.bio}</p>
                   </div>
                   <div className={styles.hobbies}>
                        {profile?.hobbies.map(hobby => {
                            return (
                                <Hobby key={hobby} hobby={hobby} status="primary"/>
                            )
                        })}
                   </div>
                   <div className={styles.btns}>
                        <button className={`${styles.btn} ${styles.dislike}`}>Не нравится</button>
                        <button className={`${styles.btn} ${styles.like}`}>Нравится</button>
                    </div>
                </div>
            </article>
        </section>
    )
}

export default LikedProfilePage;