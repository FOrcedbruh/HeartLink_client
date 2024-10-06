import styles from './Notification.module.scss'
import { useMessage } from '../../zustand/useMessage'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'


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
            <AnimatePresence>
                {message && <motion.div exit={{x: -30, y: -20, scale: 0.3, opacity: 0}} initial={{x: -30, y: -20, scale: 0.8}} animate={{x: 0, y: 0, scale: 1}} className={styles.message}>
                    <p>{message}</p>
                </motion.div>}
            </AnimatePresence>
            {children}
        </section>
    )
}

export default Notification