import styles from './Card.module.scss'
import { SwiperSlide, Swiper } from 'swiper/react';
import { EffectFade, Scrollbar } from 'swiper/modules';
import "swiper/scss"
import "swiper/scss/effect-fade"
import "swiper/scss/scrollbar"
import { IProfile } from '../../../../types/IProfile';
import { Hobby } from '../../../components/Hobby/Hobby';
import { useRef } from 'react';
import { setEndAge } from '../../../../utils/utils';



interface ICardProps {
    profile: IProfile
}

const Card: React.FC<ICardProps> = ({ profile }) => {

    const sliderRef = useRef<any | null>(null)

    const nextHandler = () => {
        sliderRef.current.swiper.slideNext()
    }

    const prevHandler = () => {
        sliderRef.current.swiper.slidePrev()
    }


    return (
        <section className={styles.card}>
           <Swiper allowTouchMove={false} ref={sliderRef} scrollbar={{}} effect='fade' modules={[EffectFade, Scrollbar]} className={styles.imagesSlider}>
                {profile.profileImages.map(image => {
                    return (
                        <SwiperSlide className={styles.image} key={image}><div className={styles.prev} onClick={prevHandler}></div><div className={styles.next} onClick={nextHandler}></div><img src={image} alt=''/></SwiperSlide>
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
        </section>
    )
}

export { Card };