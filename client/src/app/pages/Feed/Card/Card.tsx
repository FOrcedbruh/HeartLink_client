import styles from './Card.module.scss'
import { SwiperSlide, Swiper } from 'swiper/react';
import { EffectCube } from 'swiper/modules';
import "swiper/scss"
import "swiper/scss/effect-cube"
import { IProfile } from '../../../../types/IProfile';

interface ICardProps {
    profile: IProfile
}

const Card: React.FC<ICardProps> = ({ profile }) => {


    return (
        <section className={styles.card}>
           <Swiper className={styles.imagesSlider}>
                {profile.profileImages.map(image => {
                    return (
                        <SwiperSlide className={styles.image} key={image}><img src={image} alt=''/></SwiperSlide>
                    )
                })}
           </Swiper>
           <div className={styles.info}>
                
           </div>
        </section>
    )
}

export default Card;