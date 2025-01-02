import { Dispatch, SetStateAction } from "react"
import styles from './../CreateProfile.module.scss'
import { Button } from "../../../components/Button/Button"
import { motion } from "framer-motion"
import { PHandlers } from "../../../../api/profiles/handlers"
import { useForm } from "react-hook-form"


interface SecondStagePropsType {
    stage: number,
    setStage: Dispatch<SetStateAction<number>>,
    setFirstname: Dispatch<SetStateAction<string>>,
    access_token: string,
    user_id: number
}

const SecondStage: React.FC<SecondStagePropsType> = ({ user_id, stage, setStage, setFirstname, access_token }) => {

    interface FormStatetype {
        firstname: string,
        surname: string
    }

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isValid
        },
        reset
    } = useForm<FormStatetype>({
        mode: "onBlur"
    })

    const onSubmit = async (data: FormStatetype) => {
        await PHandlers.create_profile(data.firstname, user_id, data.surname, access_token)
        setFirstname(data.firstname)
        reset()
        setStage(stage + 1)
    }

    const variants = {
        initial: {
            opacity: 0
        },
        animate: (custom: number) => ({
            opacity: 1,
            transition: { delay : custom * 0.3}
        })
    }

    return (
        <div className={styles.second}>
            <motion.h2 custom={2} variants={variants} initial={"initial"} animate={"animate"}>Как вас зовут?</motion.h2>
            <motion.form custom={4} variants={variants} initial={"initial"} animate={"animate"} onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <motion.input whileFocus={{ scale: 1.2, x: -20}} type="text" placeholder='Ваше имя' {...register("firstname", {
                        required: "Имя обязательно",
                        minLength: {
                            value: 2,
                            message: "Минимум 2 буквы"
                        }
                    })}/>
                    <motion.input whileFocus={{ scale: 1.2, x: 20}} type="text" placeholder='Фамилия' {...register("surname", {
                        required: "Укажите фамилию"
                    })}/>
                </div>
                {isValid && <motion.div initial={{opacity: 0}} animate={{opacity: 1, transition: { duration: 0.5 }}}><Button type='submit' width='100%'>Дальше</Button></motion.div>}
            </motion.form>
        </div>
    )
}

export { SecondStage };