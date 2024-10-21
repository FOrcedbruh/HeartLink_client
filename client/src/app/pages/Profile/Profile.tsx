import styles from './Profile.module.scss'
import { useAuthContext } from '../../../api/auth/authContext'
import { useEffect, useLayoutEffect, useState } from 'react'
import { IProfile } from '../../../types/IProfile'
import { IUser } from '../../../types/IUser'
import { setEndAge } from '../../../utils/utils'
import { Hobby } from '../../components/Hobby/Hobby'
import { Button } from '../../components/Button/Button'
import { AHandlers } from '../../../api/auth/handlers'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCube, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/effect-fade';
import 'swiper/scss/pagination';
import plusIcon from './../../../icons/plusIcon.svg'
import { motion, AnimatePresence } from 'framer-motion'
import { LoaderWindow } from '../../components/Loader/Loader'
import logoutIcon from './../../../icons/logout.svg'
import { ModalFiles } from './ModalFiles/ModalFiles'
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal'
import trashIcon from './../../../icons/trashIcon.svg'
import { PHandlers } from '../../../api/profiles/handlers'
import { useMessage } from '../../zustand/useMessage'

const Profile: React.FC = () => {

    const { setMessage } = useMessage()
    const [imageTools, setImageTools] = useState<boolean>(false)

    const { authUser, setAuthUser } = useAuthContext()

    //@ts-ignore
    const access_token: string = localStorage.getItem("access_token")

    const [profile, setProfile] = useState<IProfile | null>(null)
    const [user, setUser] = useState<IUser | null>(null)

    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [logoutConfirm, setLogoutConfirm] = useState<boolean>(false)

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

    const deleteImagesHandler = async (filename: string) => {

        const filenames: string[] = [filename]
        const res = await PHandlers.delete_photos(filenames, access_token)

        if (res.status === 200) {
            setMessage(res.message)
            localStorage.removeItem("auser")
            const data = await AHandlers.me(access_token)
            //@ts-ignore
            setAuthUser(data)
            localStorage.setItem("auser", JSON.stringify(data))
        } else {
            setMessage("Ошибка на сервере")
        }
    }

    if (!authUser) {
        return <LoaderWindow />
    }
    

    return (
        <section className={styles.window}>
            <AnimatePresence>
                {logoutConfirm && <ConfirmModal confirmBtnText='Выйти' variant="primary" text='выйти из аккаунта' confirmFn={logout} onClose={setLogoutConfirm}/>}
            </AnimatePresence>
            <AnimatePresence>
                {modalOpen && <ModalFiles access_token={access_token} setModalOpen={setModalOpen}/>}
            </AnimatePresence>
            <div className={styles.userData}>
                {profile && <motion.div initial={"initial"} animate={"animate"} variants={variants} className={styles.swiper_wrapper}>
                   {profile?.profileImages?.length > 0
                    ? 
                    <Swiper pagination={true} className={styles.swiper} cubeEffect={{shadow: false}} effect={'fade'} grabCursor={true} modules={[EffectFade, Pagination]}>
                            {profile.profileImages.map(image => {
                               return (
                                <SwiperSlide 
                                    onMouseOver={() => setImageTools(true)} 
                                    onMouseOut={() => setImageTools(false)}
                                    key={image}
                                    className={styles.slide}><img src={image} alt="" />
                                    <AnimatePresence>{imageTools && <motion.div 
                                        initial={{opacity: 0, scale: 0}}
                                        animate={{opacity: 1, scale: 1}}
                                        exit={{opacity: 0, scale: 0}} 
                                        whileTap={{scale: 0.8}} 
                                        whileHover={{scale: 1.2}} 
                                        className={styles.deleteBtn}onClick={() => deleteImagesHandler(image)}>
                                            <img  src={trashIcon} 
                                            width={100} height={10} alt="" /></motion.div>}</AnimatePresence></SwiperSlide>
                               )
                            })}
                    </Swiper>
                    :
                    <motion.div onClick={() => setModalOpen(true)} whileHover={{scale: 1.06, rotate: 6}} className={styles.notSwiper}>
                        <h2>Добавьте фото <img src={plusIcon} alt="" width={30} height={30}/></h2>
                    </motion.div>
                    }
                </motion.div>}
                
                {profile?.firstname
                // If not profile logics
                ?
                <motion.div initial={"initial"} animate={"animate"} variants={variants} className={styles.profile}>
                    <h1>Ваш профиль</h1>
                    <p className={styles.tag}>@{user?.username}</p>
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
                   {!profile.bio && <div>
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
                <Button onClick={() => setLogoutConfirm(true)} type='button' width='200px'>
                    <p>Выйти</p> <img src={logoutIcon} width={24} height={24} alt="" />
                </Button>
            </div>
        </section>
    )
}

export default Profile


