import styles from './Auth.module.scss'
import { useForm } from 'react-hook-form';
import { Button } from '../Button/Button';
import { AHandlers } from '../../../api/auth/handlers';


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

    const onSubmit = async (data: FormStateType) => {
        const res = await AHandlers.login(data.email, data.password)
        console.log(res)
        reset()
    }


    return (
        <div className={styles.wrapper}>
            <h2>Вход</h2>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor='email'>Эл. почта</label>
                    <input type="email" placeholder='@mail...' {...register("email", {
                        required: "Заполните почту",
                        pattern: {
                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Такой почты не бывает"
                        }
                    })}/>
                    {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                </div>
                <div>
                    <label htmlFor="password">Пароль</label>
                    <input type="password" placeholder='123...' {...register("password", {
                        required: "Придумайте пароль",
                        minLength: {
                            value: 6,
                            message: "Минимум 6 символов"
                        }
                    })}/>
                    {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                </div>
                <Button width='85%' type='submit' disabled={!isValid}>
                    Войти
                </Button>
            </form>
        </div>
    )
}

export default Login;