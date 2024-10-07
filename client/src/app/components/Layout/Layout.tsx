import { Outlet } from "react-router-dom";
import styles from './Layout.module.scss'
import Navbar from "../Navbar/Navbar";
import { useAuthContext } from "../../../api/auth/authContext";
import menuIcon from './../../../icons/MenuIcon.svg'
import { motion } from "framer-motion";


const Layout: React.FC = () => {

    const { authUser } = useAuthContext()

    return (
        <section className={styles.window}>
            <header className={styles.header}>
                <motion.div whileHover={{scale: 1.2}} whileTap={{scale: 0.8}} className={styles.menu}><img src={menuIcon} alt="" width={30} height={30}/></motion.div>
                <div className={styles.logo}>
                    <h2 className={styles.anim_typewriter}>❤️HeartLink</h2>
                </div>
            </header>
            <article className={styles.container}>
                <Outlet />
            </article>
            {authUser && <Navbar />}
        </section>
    )
}

export default Layout;