import styles from './Card.module.scss'
import { SwiperSlide, Swiper } from 'swiper/react';
import { EffectFade, Scrollbar } from 'swiper/modules';
import "swiper/scss"
import "swiper/scss/effect-fade"
import "swiper/scss/scrollbar"
import { IProfile } from '../../../../types/IProfile';
import { Hobby } from '../../../components/Hobby/Hobby';
import { forwardRef, RefObject, useRef } from 'react';
import { setEndAge } from '../../../../utils/utils';
import likeIcon from "./../../../../icons/likeIcon.svg"
import { motion, useTransform, useMotionValue } from 'framer-motion';

interface ICardProps {
    profile: IProfile
}

const Card: React.FC<ICardProps> = ({ profile }) => {

    // animate
    const x = useMotionValue<number>(0)
    const border = useTransform(x, [-100, 0, 100], ["2px solid chartreuse", "2px solid #fff", "2px solid #D91656"])


    const sliderRef = useRef<any | null>(null)

    const nextHandler = () => {
        sliderRef.current.swiper.slideNext()
    }

    const prevHandler = () => {
        sliderRef.current.swiper.slidePrev()
    }


    return (
        <motion.section
            className={styles.card}
            style={{ border, x }}
            drag={"x"}
            dragConstraints={{left: 0, right: 0}}
            >
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}  className={styles.like}>
                <img src={likeIcon} alt="" width={30} height={30}/>
            </motion.div>
           <Swiper allowTouchMove={false} ref={sliderRef} scrollbar={{}} effect='fade' modules={[EffectFade, Scrollbar]} className={styles.imagesSlider}>
                {profile.profileImages.map(image => {
                    return (
                        <SwiperSlide className={styles.image} key={image}><div className={styles.prev} onClick={prevHandler}></div><div className={styles.next} onClick={nextHandler}></div><div className={styles.imgWrapper}><img src={image} alt=''/></div></SwiperSlide>
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
                                <Hobby key={hobby} status='primary' hobby={hobby}/>
                            )
                        })}
                </div>
           </div>
        </motion.section>
    )
}

export { Card };