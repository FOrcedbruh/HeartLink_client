import { useState } from 'react';
import styles from './Auth.module.scss'
import Login from './Login';
import Reg from './Reg';

const Auth: React.FC = () => {

    const [toggle, setToggle] = useState<boolean>(true)


    return (
        <section className={styles.window}>
            {
                toggle ? 
                <Login /> :
                <Reg />
            }
            <div className={styles.onToggle} onClick={() => setToggle(!toggle)}>
                <h2>{toggle ? "Создать аккаунт" : "Войти"}</h2>
            </div>
        </section>
    )
}

export default Auth;