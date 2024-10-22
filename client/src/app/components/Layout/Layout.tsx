import { Outlet } from "react-router-dom";
import styles from './Layout.module.scss'
import Navbar from "../Navbar/Navbar";
import { useAuthContext } from "../../../api/auth/authContext";
import menuIcon from './../../../icons/MenuIcon.svg'
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Menu from "../Menu/Menu";
import { useViewNavbar } from "../../zustand/settings/useViewNavbar";

const Layout: React.FC = () => {

    const { authUser } = useAuthContext()
    const [openMenu, setOpenMenu] = useState<boolean>(false)
    const { viewNavbar } = useViewNavbar()

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
                    <h2 className={styles.anim_typewriter}>❤️HeartLink</h2>
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