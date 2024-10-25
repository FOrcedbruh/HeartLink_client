import styles from './Card.module.scss'
import { SwiperSlide, Swiper } from 'swiper/react';
import { EffectCube } from 'swiper/modules';
import "swiper/scss"
import "swiper/scss/effect-cube"
import { IProfile } from '../../../../types/IProfile';
import { Hobby } from '../../../components/Hobby/Hobby';



interface ICardProps {
    profile: IProfile
}

const Card: React.FC<ICardProps> = ({ profile }) => {


    return (
        <section className={styles.card}>
           <Swiper effect='cube' modules={[EffectCube]} className={styles.imagesSlider}>
                {profile.profileImages.map(image => {
                    return (
                        <SwiperSlide className={styles.image} key={image}><img src={image} alt=''/></SwiperSlide>
                    )
                })}
           </Swiper>
           <div className={styles.info}>
               <h3>{profile.firstname} {profile.age}</h3>
               <div className={styles.bio}>
                    <p>
                        {profile.bio.length > 50 ? `${profile.bio.slice(0, 50)}...` : profile.bio}
                    </p>
                    <div>
                        {profile.hobbies.map(hobby => {
                            return (
                                <Hobby key={hobby} status='primary' hobby={hobby}/>
                            )
                        })}
                    </div>
               </div>
           </div>
        </section>
    )
}

export { Card };