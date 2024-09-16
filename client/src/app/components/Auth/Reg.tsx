import styles from './Auth.module.scss'
import { Button } from '../Button/Button';
import { useForm } from 'react-hook-form';


interface FormStateType {
    email: string,
    password: string,
    username: string,
    confirmPass: string
}



const Reg: React.FC = () => {


    const {
        handleSubmit,
        register,
        formState: {
            errors,
            isValid
        },
        setError,
        reset
    } = useForm<FormStateType>(
        {
            mode: "onChange"
        }
    )

    

    const onSubmit = (data: FormStateType) => {
        
        if (data.password != data.confirmPass) {
            setError("confirmPass", {
                message: "Пароли не совпадают"
            })
            return
        }
        console.log(data)
        reset()
    }


    return (
        <div className={styles.wrapper}>
            <h2>Регистрация</h2>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="username">Придумайте имя</label>
                    <input type="text" placeholder='name...' {...register("username", {
                        required: "Придумайте теговое имя",
                        minLength: {
                            value: 4,
                            message: "Минимум 4 символа"
                        }
                    })}/>
                    {errors.username && <p className={styles.error}>{errors.username.message}</p>}
                </div>
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
                    <label htmlFor="password">Придумайте пароль</label>
                    <input type="password" placeholder='123...' {...register("password", {
                        required: "Придумайте пароль",
                        minLength: {
                            value: 6,
                            message: "Минимум 6 символов"
                        }
                    })}/>
                    {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                </div>
                <div>
                    <label htmlFor="confirmPass">Введите пароль еще раз</label>
                    <input type="password" {...register("confirmPass", {
                        required: "Повторите придуманный пароль"
                    })}/>
                    {errors.confirmPass && <p className={styles.error}>{errors.confirmPass.message}</p>}
                </div>
                <Button disabled={!isValid} type='submit' width='85%'>
                    Регистрация
                </Button>
            </form>
        </div>
    )
}

export default Reg;