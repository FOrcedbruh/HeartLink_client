import styles from './Auth.module.scss'
import { Button } from '../Button/Button';
import { useForm } from 'react-hook-form';
import { AHandlers } from '../../../api/auth/handlers';
import eye from './../../../icons/eye.svg';
import closeEye from './../../../icons/closeEye.svg';
import { useState } from 'react';
import { useMessage } from '../../zustand/useMessage';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';



interface FormStateType {
    email: string,
    password: string,
    username: string,
    confirmPass: string
}



const Reg: React.FC = () => {



    const [view, setView] = useState<Boolean>(false)

    const { setMessage } = useMessage()

    const navigate = useNavigate()

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

    

    const onSubmit = async (data: FormStateType) => {
        
        if (data.password != data.confirmPass) {
            setError("confirmPass", {
                message: "Пароли не совпадают"
            })
            return
        }

        const res = await AHandlers.registration(data.username, data.email, data.password)
        if (res.access_token) {
            setTimeout(async () => {
                const data = await AHandlers.me(res.access_token)
                console.log(data)
                //@ts-ignore
                setAuthUser(data)
                localStorage.setItem("auser", JSON.stringify(data))
            }, 300);
            navigate("/me")
        } else {
            setMessage(res)
        }
        reset()
    }


    return (
        <div className={styles.wrapper}>
            <motion.h2 initial={{opacity: 0, scale: 0.8, y: 30}} animate={{opacity: 1, scale: 1, y: 0, transition: { delay: 0.7 }}}>Регистрация</motion.h2>
            <motion.form initial={{y: 40, opacity: 0}} animate={{y: 0, opacity: 1, transition: { duration: 0.7 }}} className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
                    <label htmlFor="password" onClick={() => setView(!view)}>Придумайте пароль <img src={view ? eye : closeEye} width={24} height={24} alt="" /></label>
                    <input type={view ? "text" : "password"} placeholder='123...' {...register("password", {
                        required: "Придумайте пароль",
                        minLength: {
                            value: 6,
                            message: "Минимум 6 символов"
                        }
                    })}/>
                    {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                </div>
                <div>
                    <label htmlFor="confirmPass" >Введите пароль еще раз</label>
                    <input type="password" {...register("confirmPass", {
                        required: "Повторите придуманный пароль"
                    })}/>
                    {errors.confirmPass && <p className={styles.error}>{errors.confirmPass.message}</p>}
                </div>
                <Button disabled={!isValid} type='submit' width='85%'>
                    Регистрация
                </Button>
            </motion.form>
        </div>
    )
}

export default Reg;