import { Outlet } from "react-router-dom";
import styles from './Layout.module.scss'
import Navbar from "../Navbar/Navbar";
import { useAuthContext } from "../../../api/auth/authContext";

const Layout: React.FC = () => {

    const { authUser } = useAuthContext()

    return (
        <section className={styles.window}>
            <header className={styles.header}>
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