import styles from './Notification.module.scss'
import { useMessage } from '../../zustand/useMessage'
import { useEffect } from 'react'


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
            {message && <div className={styles.message}>
                <p>{message}</p>
            </div>}
            {children}
        </section>
    )
}

export default Notification