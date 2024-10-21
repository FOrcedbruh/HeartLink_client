import styles from './SettingsPage.module.scss'
import { motion } from 'framer-motion'
import { ISetting, settings } from '../../../utils/settings/settings'
import { useViewNavbar } from '../../zustand/settings/useViewNavbar'


const SettingsItem: React.FC<ISetting> = ({ title, onAction}) => {
    return (
        <li>
            <p>{title}</p>
            <div onClick={onAction} className={styles.toggleBtn}>
                <motion.div></motion.div>
            </div>
        </li>
    )
}



const SettingsPage: React.FC = () => {

    const { setViewNavbar, viewNavbar } = useViewNavbar()

    document.title = "Настройки"

    const variants = {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: (custom: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: custom * 0.3 }
        })
    }


    return (
        <section className={styles.window}>
            <motion.h1 custom={1} variants={variants} initial={"initial"} animate={"animate"} className={styles.title}>Настройки</motion.h1>
            <ul className={styles.settings}>
                {settings.map(item => {
                    return (
                        <SettingsItem key={item.title} title={item.title} onAction={item.onAction}/>
                    )
                })}
            </ul>
        </section>
    )
}

export default SettingsPage;