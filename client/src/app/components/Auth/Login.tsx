import styles from './Auth.module.scss'
import { useForm } from 'react-hook-form';


interface FormStateType {
    email: string,
    password: string
}

const Login: React.FC = () => {

    const {
        handleSubmit,
        register,
        formState: {
            errors,
            isValid
        },
        reset
    } = useForm<FormStateType>(
        {
            mode: "onChange"
        }
    )

    const onSubmit = (data: FormStateType) => {
        console.log(data)
    }


    return (
        <div className={styles.wrapper}>
            <h2>Вход</h2>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor='email'>Эл. почта</label>
                    <input type="email" placeholder='Typing...'/>
                </div>
                <div>
                    <label htmlFor="password">Пароль</label>
                    <input type="password" placeholder='123...'/>
                </div>
            </form>
        </div>
    )
}

export default Login;