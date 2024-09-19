import styles from './Notification.module.scss'
import { useMessage } from '../../zustand/useMessage'
import { useEffect } from 'react'
import { motion } from 'framer-motion'


interface NotificationPropsType {
    children: React.ReactNode
}

const Notification: React.FC<NotificationPropsType> = ({ children }) => {

    const { message, setMessage } = useMessage()

    useEffect(() => {
        setTimeout(() => {
            setMessage("")
        }, 3000);
    }, [message])

    return (
        <section className={styles.wrapper}>
            {message && <motion.div initial={{x: -30, y: -20, scale: 0.8}} animate={{x: 0, y: 0, scale: 1}} className={styles.message}>
                <p>{message}</p>
            </motion.div>}
            {children}
        </section>
    )
}

export default Notification