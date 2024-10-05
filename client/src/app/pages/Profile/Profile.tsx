import styles from './Profile.module.scss'
import { useAuthContext } from '../../../api/auth/authContext'
import { useEffect, useState } from 'react'
import { IProfile } from '../../../types/IProfile'
import { IUser } from '../../../types/IUser'
import { setEndAge, checkProfileKeys } from '../../../utils/utils'
import { Hobby } from '../../components/Hobby/Hobby'
import { Button } from '../../components/Button/Button'
import { AHandlers } from '../../../api/auth/handlers'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCube, Pagination } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/effect-cube';
import 'swiper/scss/pagination';
import plusIcon from './../../../icons/plusIcon.svg'
import { motion } from 'framer-motion'
import { LoaderWindow } from '../../components/Loader/Loader'
import logoutIcon from './../../../icons/logout.svg'


const Profile: React.FC = () => {

    const { authUser, setAuthUser } = useAuthContext()

    const [profile, setProfile] = useState<IProfile | null>(null)
    const [user, setUser] = useState<IUser | null>(null)

    const navigate = useNavigate()


    useEffect(() => {
        if (authUser) {
            setProfile(authUser.profile.data)
            setUser(authUser.user.data)
        }
    })

    const logout = async () => {
        localStorage.clear()
        //@ts-ignore
        setAuthUser(null)
        await AHandlers.logout()
        navigate("/")
    }

    const variants = {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 1 }
        }
    }

    if (!authUser) {
        return <LoaderWindow />
    }
    

    return (
        <section className={styles.window}>
            <div className={styles.userData}>
                <motion.div initial={"initial"} animate={"animate"} variants={variants} className={styles.userWrapper}>
                    <div className={styles.user}>
                            <h3>Ваш тег: <span>{user?.username}</span></h3>
                    </div>
                </motion.div>
                {profile && <motion.div initial={"initial"} animate={"animate"} variants={variants} className={styles.swiper_wrapper}>
                   {profile?.profileImages 
                   // if not profile images logics
                    ? 
                    <Swiper pagination={true} className={styles.swiper} cubeEffect={{shadow: false}} effect={'cube'} grabCursor={true} modules={[EffectCube, Pagination]}>
                            <SwiperSlide>slide 1</SwiperSlide>
                            <SwiperSlide>slide 2</SwiperSlide>
                            <SwiperSlide>slide 3</SwiperSlide>
                    </Swiper>
                    :
                    <motion.div whileHover={{scale: 1.06, rotate: 6}} className={styles.notSwiper}>
                        <h2>Добавьте фото <img src={plusIcon} alt="" width={30} height={30}/></h2>
                    </motion.div>
                    }
                </motion.div>}
                
                {profile?.firstname
                // If not profile logics
                ?
                <motion.div initial={"initial"} animate={"animate"} variants={variants} className={styles.profile}>
                    <h1>Ваш профиль</h1>

                    <ul>
                        <li>
                           <h2>{profile?.firstname} {profile?.surname} </h2> {profile.age && <h2>{profile?.age} {setEndAge(Number(profile?.age))}</h2>}
                        </li>
                        <li>
                            <h3>{user?.email}</h3>
                        </li>
                       {profile.gender && <li>
                            <h3>{profile?.gender}</h3>
                        </li>}
                    </ul>
                    {profile.hobbies && <div className={styles.hobbieDiv}>
                        <h3>Увлечения</h3>
                        <div className={styles.hobbies}>
                            {profile?.hobbies.map(hobby => {
                                return (
                                    <Hobby status='primary' key={hobby} hobby={hobby}/>
                                )
                            })}
                        </div>
                    </div>}
                    {profile.bio && <div className={styles.bio}>
                        <h3>Немного о себе</h3>
                        <textarea disabled value={profile?.bio} name="bio" className={styles.textarea}>
                        </textarea>
                    </div>}
                    {checkProfileKeys(profile) && <div>
                        <Button onClick={() => navigate("/me/create")} type='button' width='300px'>Продолжить настройку профиля</Button>
                    </div>}
                </motion.div>
                :
                <motion.div initial={"initial"} animate={"animate"} variants={variants} className={styles.createProfileBtn}>
                    <h1>Создайте свой <span>профиль</span>, чтобы вас могли видеть другие люди</h1>
                    <Button type="button" onClick={() => navigate("/me/create")} width='60%'>
                        <p>Создать</p>
                    </Button>
                </motion.div>
                }
            </div>
            <div className={styles.controller}>
                <Button onClick={logout} type='button' width='200px'>
                    <p>Выйти</p> <img src={logoutIcon} width={24} height={24} alt="" />
                </Button>
            </div>
        </section>
    )
}

export default Profile


