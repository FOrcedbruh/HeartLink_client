import styles from './Card.module.scss'
import { SwiperSlide, Swiper } from 'swiper/react';
import { EffectFade, Scrollbar } from 'swiper/modules';
import "swiper/scss"
import "swiper/scss/effect-fade"
import "swiper/scss/scrollbar"
import { IProfile } from '../../../../types/IProfile';
import { Hobby } from '../../../components/Hobby/Hobby';
import { Dispatch, SetStateAction, useRef } from 'react';
import { setEndAge } from '../../../../utils/utils';
import likeIcon from "./../../../../icons/likeIcon.svg"
import { motion, useTransform, useMotionValue, useMotionValueEvent, animate } from 'framer-motion';
import { LoaderComponent } from '../../../components/Loader/Loader';
import blackCrossIcon from './../../../../icons/blackCross.svg'
import { LHandlers } from '../../../../api/likes/handlers';
import { HobbyStatus } from '../../../components/Hobby/Hobby';



const EMPTY_PROFILES_TEXT: string = "Потенциальные партнеры закончились :("



interface ICardProps {
    profile: IProfile
    setCurrentUserIndex: Dispatch<SetStateAction<number>>
    currentUserIndex: number    
    profilesCount: number
    auth_profile_id: number
    access_token: string
}

const Card: React.FC<ICardProps> = ({ profile, setCurrentUserIndex, currentUserIndex, profilesCount , auth_profile_id, access_token}) => {

    // animate
    const x = useMotionValue<number>(0)
    const border = useTransform(x, [-100, 0, 100], ["2px solid #D91656", "2px solid #fff", "2px solid #00FF9C"])
    const rotate = useTransform(x, [-100, 0, 100], [-5, 0, 5])


    const sliderRef = useRef<any | null>(null)
    const islikeSetted = useRef(false)
    const isDislikeSetted  = useRef(false)

    const nextHandler = () => {
        sliderRef.current.swiper.slideNext()
    }

    const prevHandler = () => {
        sliderRef.current.swiper.slidePrev()
    }

    

    

    const like = async () => {
        if (!islikeSetted.current) {
            await LHandlers.like(auth_profile_id, profile.id)
            setCurrentUserIndex(currentUserIndex + 1)
            sliderRef.current.swiper.slideTo(0)
        }
        return
    }

    const likeBtnHandler = () => {
        animate(x, [200, 0], {
           duration: 0.4
        })
    }

    const dislike = () => {
        if (!isDislikeSetted.current) {
            setCurrentUserIndex(currentUserIndex + 1)
            sliderRef.current.swiper.slideTo(0)
        }
        return
    }

    const dislikeBtnHandler = () => {
        animate(x, [-200, 0], {
            duration: 0.4
         })
    }

    useMotionValueEvent(x, "change", () => {
        if (x.get() > 140) {
            like()
            islikeSetted.current = true
        } else if (x.get() < -140) {
            dislike()
            isDislikeSetted.current = true
        } else if (x.get() < 30 && x.get() > -30) {
            islikeSetted.current = false
            isDislikeSetted.current = false
        } else {
            return
        }
    })

    


    if (currentUserIndex >= profilesCount) {
        return (
            <motion.div className={styles.emptyProfiles} initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0, transition: { duration: 0.5 }}}>
                <h2>{EMPTY_PROFILES_TEXT}</h2>
            </motion.div>
        )
    }

    return (
        <motion.section
            className={styles.card}
            style={{ border, x, rotate }}
            drag={"x"}
            dragConstraints={{left: 0, right: 0}}
            >
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}onClick={likeBtnHandler}  className={styles.like}>
                <img src={likeIcon} alt="" width={30} height={30}/>
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}onClick={dislikeBtnHandler}  className={styles.dislike}>
                <img src={blackCrossIcon} alt="" width={30} height={30}/>
            </motion.div>
           <Swiper allowTouchMove={false} ref={sliderRef} scrollbar={{}} effect='fade' modules={[EffectFade, Scrollbar]} className={styles.imagesSlider}>
                {profile.profileImages.map(image => {
                    return (
                        <SwiperSlide className={styles.image} key={image}><div className={styles.prev} onClick={prevHandler}></div><div className={styles.next} onClick={nextHandler}></div><div className={styles.imgWrapper}>{profile.profileImages ? <img src={image} alt=''/>: <LoaderComponent/>}</div></SwiperSlide>
                    )
                })}
           </Swiper>
           <div className={styles.info}>
               <h3>{profile.firstname} <span>{profile.age} {setEndAge(profile.age)}</span></h3>
               <div className={styles.bio}>
                    <p>
                        {profile.bio.length > 50 ? `${profile.bio.slice(0, 50)}...` : profile.bio}
                    </p>
               </div>
               <div className={styles.hobbies}>
                        {profile.hobbies.map(hobby => {
                            return (
                                <Hobby key={hobby} status={HobbyStatus.primary} hobby={hobby}/>
                            )
                        })}
                </div>
           </div>
        </motion.section>
    )
}

export { Card };