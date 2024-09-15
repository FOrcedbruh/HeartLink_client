import { Outlet } from "react-router-dom";
import styles from './Layout.module.scss'



const Layout: React.FC = () => {

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
            <footer className={styles.footer}>

            </footer>
        </section>
    )
}

export default Layout;