import { useState } from 'react';
import styles from './Auth.module.scss'
import Login from './Login';
import Reg from './Reg';
import { motion } from 'framer-motion';

const Auth: React.FC = () => {

    const [toggle, setToggle] = useState<boolean>(true)


    return (
        <section className={styles.window}>
            {
                toggle ? 
                <Login /> :
                <Reg />
            }
            <motion.div whileHover={{ scaleX: 1.05 }} whileTap={{ scaleX: 1.1 }} className={styles.onToggle} onClick={() => setToggle(!toggle)}>
                <h2>{toggle ? "Создать аккаунт" : "Войти"}</h2>
            </motion.div>
        </section>
    )
}

export default Auth;