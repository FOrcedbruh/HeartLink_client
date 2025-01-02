import styles from './Profile.module.scss'
import { useAuthContext } from '../../../api/auth/authContext'
import { useEffect, useRef, useState } from 'react'
import { IProfile } from '../../../types/IProfile'
import { IUser } from '../../../types/IUser'
import { setEndAge } from '../../../utils/utils'
import { Hobby, HobbyStatus } from '../../components/Hobby/Hobby'
import { Button } from '../../components/Button/Button'
import { AHandlers } from '../../../api/auth/handlers'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Scrollbar } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/effect-fade';
import 'swiper/scss/scrollbar'
import 'swiper/scss/pagination';
import plusIcon from './../../../icons/plusIcon.svg'
import { motion, AnimatePresence } from 'framer-motion'
import { LoaderWindow } from '../../components/Loader/Loader'
import logoutIcon from './../../../icons/logout.svg'
import { ModalFiles } from './ModalFiles/ModalFiles'
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal'
import { ConfirmVariantEnum } from '../../components/ConfirmModal/ConfirmModal'
import trashIcon from './../../../icons/trashIcon.svg'
import { PHandlers } from '../../../api/profiles/handlers'
import { useMessage } from '../../zustand/useMessage'
import editIcon from './../../../icons/editIcon.svg'







const Profile: React.FC = () => {

    document.title = "HeartLink | Аккаунт"

    const { setMessage } = useMessage()
    const [imageTools, setImageTools] = useState<boolean>(false)

    const { authUser, setAuthUser } = useAuthContext()

    //@ts-ignore
    const access_token: string = localStorage.getItem("access_token")

    const [profile, setProfile] = useState<IProfile | null>(null)
    const [user, setUser] = useState<IUser | null>(null)

    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [logoutConfirm, setLogoutConfirm] = useState<boolean>(false)


    const swiperRef = useRef<any>(null)

    const navigate = useNavigate()

    useEffect(() => {
        if (authUser) {
            setProfile(authUser.profile.value?.data)
            setUser(authUser.user.value.data)
        }
    })

    const logout = async () => {
        localStorage.clear()
        //@ts-ignore
        setAuthUser(null)
        navigate("/")
    }

    const deleteImagesHandler = async (filename: string) => {

        const filenames: string[] = [filename]
        let res;
        try {
            res = await PHandlers.delete_photos(filenames, access_token, profile?.id!)
        } catch(e) {
            setMessage(`Ошибка на сервере: ${e}`)
        } finally {
            setMessage(res.message)
            localStorage.removeItem("auser")
            const data = await AHandlers.me(access_token)
            //@ts-ignore
            setAuthUser(data)
            localStorage.setItem("auser", JSON.stringify(data))
        }
    }

    const nextslide = () => {
        swiperRef.current.swiper.slideNext()
    }

    const prevSlide = () => {
        swiperRef.current.swiper.slidePrev()
    }



    if (!authUser) {
        return <LoaderWindow />
    }
    

    return (
        <section className={styles.window}>
            <AnimatePresence>
                {logoutConfirm && <ConfirmModal confirmBtnText='Выйти' variant={ConfirmVariantEnum.primary} text='выйти из аккаунта' confirmFn={logout} onClose={setLogoutConfirm}/>}
            </AnimatePresence>
            <AnimatePresence>
                {modalOpen && <ModalFiles modalOpen={modalOpen} profile_id={profile?.id!} access_token={access_token} setModalOpen={setModalOpen}/>}
            </AnimatePresence>
            {profile && 
            <div className={styles.avatar}>
                {profile.profileImages && <img src={profile.profileImages[0]} alt="avatar" />}
                <h1 className={styles.firstname}>{profile.firstname}</h1>
            </div>}
            <div className={styles.userData}>
                {profile && <motion.div initial={{opacity: 0, y: 30}} transition={{duration: 0.7}} whileInView={{opacity: 1, y: 0}} className={styles.swiper_wrapper}>
                   {profile?.profileImages?.length > 0
                    ? 
                    <Swiper ref={swiperRef} allowTouchMove={false} className={styles.swiper} scrollbar={{}} cubeEffect={{shadow: false}} effect={'fade'}  modules={[EffectFade, Scrollbar]}>
                            {profile.profileImages.map(image => {
                               return (
                                <SwiperSlide
                                    onMouseOver={() => setImageTools(true)}
                                    onMouseOut={() => setImageTools(false)}
                                    key={image}
                                    className={styles.slide}>
                                        <div onClick={nextslide} className={styles.next}></div>
                                        <div onClick={prevSlide} className={styles.prev}></div>
                                        <img src={image} alt="" />
                                    <AnimatePresence>{imageTools && <motion.div
                                        className={styles.tools}>
                                            <motion.div
                                                initial={{opacity: 0, scale: 0}}
                                                animate={{opacity: 1, scale: 1}}
                                                exit={{opacity: 0, scale: 0}}
                                                whileTap={{scale: 0.8}}
                                                whileHover={{scale: 1.2}}
                                                className={styles.toolBtn}onClick={() => deleteImagesHandler(image)}>
                                            <img  src={trashIcon}
                                            width={10} height={10} alt="" />
                                                </motion.div>
                                                <motion.div
                                                    onClick={() => setModalOpen(true)}
                                                    className={styles.toolBtn}
                                                    initial={{opacity: 0, scale: 0}}
                                                    animate={{opacity: 1, scale: 1}}
                                                    exit={{opacity: 0, scale: 0}} 
                                                    whileTap={{scale: 0.8}}
                                                    whileHover={{scale: 1.2}}>
                                                        <img src={plusIcon} alt="" width={10} height={10}/>
                                                    </motion.div>
                                            </motion.div>}
                                    </AnimatePresence></SwiperSlide>
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
                ?
                <motion.div initial={{opacity: 0, y: 30}} transition={{duration: 0.7}} whileInView={{opacity: 1, y: 0}} className={styles.profile}>
                    <div className={styles.editBtn} onClick={() => navigate("/me/edit")}>
                        <img src={editIcon} alt="" width={20} height={20} />
                    </div>
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
                                    <Hobby status={HobbyStatus.primary} key={hobby} hobby={hobby}/>
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
                <motion.div initial={{opacity: 0, y: 30}} transition={{duration: 0.7}} whileInView={{opacity: 1, y: 0}} className={styles.createProfileBtn}>
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


