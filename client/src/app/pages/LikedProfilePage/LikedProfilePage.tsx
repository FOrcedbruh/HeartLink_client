import { FC, useEffect, useRef, useState } from "react";
import styles from './LikedProfilePage.module.scss'
import { LHandlers } from "../../../api/likes/handlers";
import { IProfile } from "../../../types/IProfile";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Scrollbar } from "swiper/modules";
import { setEndAge } from "../../../utils/utils";
import { Hobby, HobbyStatus } from "../../components/Hobby/Hobby";
import { useParams } from "react-router-dom";
import "swiper/scss";
import 'swiper/scss/effect-fade';
import 'swiper/scss/scrollbar';
import { motion } from "framer-motion";


const LikedProfilePage: FC = () => {

    const {id: profile_id} = useParams()
    
    const [profile, setProfile] = useState<IProfile | null>(null)
    const access_token: string | null = localStorage.getItem("access_token")

    const getProfile = async () => {
        const res = await LHandlers.get_profile_by_like(Number(profile_id), access_token!)
        console.log(res)

        setProfile(res)
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
                    <motion.div initial={{opacity: 0, x: -30}} animate={{opacity: 1, x: 0}} transition={{duration: 0.5}} className={styles.age}>
                        <p>{profile?.age} {setEndAge(Number(profile?.age))}</p>
                    </motion.div>
                    <motion.div initial={{opacity: 0, x: 30}} animate={{opacity: 1, x: 0}} transition={{duration: 0.5}} className={styles.firstname}>
                        <p>{profile?.firstname}</p>
                    </motion.div>
                </div>
                <div className={styles.rightSide}>
                   <div className={styles.bio}>
                        <p>{profile?.bio}</p>
                   </div>
                   <div className={styles.hobbies}>
                        {profile?.hobbies.map(hobby => {
                            return (
                                <Hobby key={hobby} hobby={hobby} status={HobbyStatus.primary}/>
                            )
                        })}
                   </div>
                    <div className={styles.btns}>
                        <motion.button whileTap={{ borderRadius:0 }} whileHover={{ scale: 1.05 }} className={`${styles.btn} ${styles.dislike}`}>Не нравится</motion.button>
                        <motion.button whileTap={{ borderRadius: 0 }} whileHover={{ scale: 1.05 }} className={`${styles.btn} ${styles.like}`}>Нравится</motion.button>
                    </div>
                </div>
            </article>
        </section>
    )
}

export default LikedProfilePage;