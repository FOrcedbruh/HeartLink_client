import { Outlet } from "react-router-dom";
import styles from './Layout.module.scss'
import Navbar from "../Navbar/Navbar";
import { useAuthContext } from "../../../api/auth/authContext";
import menuIcon from './../../../icons/MenuIcon.svg'
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Menu from "../Menu/Menu";
import { useViewNavbar } from "../../zustand/settings/useViewNavbar";
import LikeIcon from './../../../icons/likeIcon.svg'
import { LHandlers } from "../../../api/likes/handlers";

const Layout: React.FC = () => {

    const { authUser } = useAuthContext()
    const access_token: string | null = localStorage.getItem("access_token")
    const [openMenu, setOpenMenu] = useState<boolean>(false)
    const { viewNavbar } = useViewNavbar()
    const [likes, setLikes] = useState<number>(0)


    const getLikes = async (profile_id: number) => {
        const res = await LHandlers.get_likes_count(profile_id,  access_token!)

        setLikes(res.count)
    }

    useEffect(() => {
        if (authUser) {
            getLikes(authUser.profile.value?.data?.id)
        }
    }, [authUser])



    return (
        <section className={styles.window}>
            <AnimatePresence>
                {openMenu && <Menu setOpenMenu={setOpenMenu}/>}
            </AnimatePresence>
            <header className={styles.header}>
                {authUser && <motion.div onClick={() => setOpenMenu(!openMenu)} whileHover={{scale: 1.2}} whileTap={{scale: 0.8}} className={styles.menu}>
                    <img src={menuIcon} alt="" width={30} height={30}/>
                </motion.div>}
                <div className={styles.logo}>
                    <h2 className={styles.anim_typewriter}>
                        <img src={LikeIcon} width={30} height={30} alt="" />
                        <motion.sub initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 10}} transition={{delay: 2.2}} className={styles.likesCount}>{likes !== 0 && likes}</motion.sub>
                        HeartLink
                    </h2>
                </div>
            </header>
            <article className={styles.container}>
                <Outlet />
            </article>
            {(authUser && viewNavbar) && <Navbar />}
        </section>
    )
}

export default Layout;