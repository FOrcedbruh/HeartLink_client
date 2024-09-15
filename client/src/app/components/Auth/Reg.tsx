import styles from './Auth.module.scss'


const Reg: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <h2>Регистрация</h2>
            <form className={styles.form}>
                <div>
                    <label htmlFor="username">Придумайте имя</label>
                    <input type="text" placeholder='name...'/>
                </div>
                <div>
                    <label htmlFor='email'>Эл. почта</label>
                    <input type="email" placeholder='Typing...'/>
                </div>
                <div>
                    <label htmlFor="password">Придумайте пароль</label>
                    <input type="password" placeholder='123...'/>
                </div>
                <div>
                    <label htmlFor="confirmPass">Введите пароль еще раз</label>
                    <input type="password"/>
                </div>
            </form>
        </div>
    )
}

export default Reg;